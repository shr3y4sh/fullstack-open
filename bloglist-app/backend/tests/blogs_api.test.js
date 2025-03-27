const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
const blogs = require('./test_helper');

const Blog = require('../models/blog');

const api = supertest(app);

const INVALID_ID = '900000';

describe('for blog posts', () => {
	beforeEach(async () => {
		await Blog.deleteMany();

		let nextBlog = new Blog({
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
			likes: 12
		});

		await nextBlog.save();

		nextBlog = new Blog({
			title: 'Type wars',
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
			likes: 2
		});

		await nextBlog.save();
	});
});

test('get notes in json form', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
	const res = await api.get('/api/blogs');
	assert.strictEqual(res.body.length, 2);
});

test('blogs contain userid', async () => {
	const res = await api.get('/api/blogs');
	const blogList = res.body;
	assert.ok(blogList.every((blog) => blog.userId));
});

test('add one blog to the database', async () => {
	const newBlog = new Blog({
		title: 'Test Blog',
		author: 'Test Author',
		url: 'http://www.test.com',
		likes: 10
	});

	const blogsBefore = await Blog.find();

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/);

	const res = await api.get('/api/blogs');
	const blogList = res.body;
	assert.strictEqual(blogList.length, blogsBefore.length + 1);
});

test('increase likes of one blog', async () => {
	const oldBlog = await Blog.findOne();

	const res = await api.put(`/api/blogs/${oldBlog.id}`).expect(200);
	const newBlog = res.body;

	assert.strictEqual(newBlog.likes, oldBlog.likes + 1);
});

describe('about keys of blog object', () => {
	test('empty likes default to zero', async () => {
		const newBlog = new Blog({
			title: 'Test Blog',
			author: 'Test Author',
			url: 'http://www.test.com'
		});

		const res = await api.post('/api/blogs').send(newBlog).expect(201);

		assert.strictEqual(res.body.likes, 0);
	});

	test('empty title or url values', async () => {
		const newBlog = new Blog({
			author: 'Test Author',
			likes: 10
		});
		await api.post('/api/blogs').send(newBlog).expect(400);
	});

	test('unique identifier is named "id"', async () => {
		const res = await api.get('/api/blogs').expect(200);
		const singleBlog = res.body[0];
		assert.ok(singleBlog && typeof singleBlog === 'object');
		assert('id' in singleBlog);
	});
});

describe('deletion of blog', () => {
	test('with a valid id succeeds', async () => {
		const blogDeleted = await Blog.findOne();

		const id = blogDeleted.id;

		await api.delete(`/api/blogs/${id}`).expect(204);

		const blogsAfter = await Blog.find();

		assert.strictEqual(blogsAfter.length, blogs.length - 1);
	});

	test('valid non-existent id fails', async () => {
		const blogDeleted = await Blog.findOne();
		const id = blogDeleted.id;
		await Blog.findByIdAndDelete(id);
		await api.delete(`/api/blogs/${id}`).expect(404);
	});

	test('invalid id fails', async () => {
		await api.delete(`/api/blogs/${INVALID_ID}`).expect(400);
	});
});

after(async () => {
	await mongoose.connection.close();
});

const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const blogs = require('./test_helper');
const Blog = require('../models/blog');

const api = supertest(app);

const testBlog = [
	{
		title: 'Canonical string reduction',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
		likes: 12
	},
	{
		title: 'Type wars',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
		likes: 2
	}
];

beforeEach(async () => {
	await Blog.deleteMany();

	for (let blog of blogs) {
		blog = new Blog(blog);
		await blog.save();
	}
});

describe('for blog posts', () => {
	test('get all notes in json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/);
	});

	test('there are exactly 4 blogs', async () => {
		const res = await api.get('/api/blogs');
		assert.strictEqual(res.body.length, blogs.length);
	});

	test('add one blog to the database', async () => {
		const newBlog = testBlog[0];

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		const res = await api.get('/api/blogs');
		const blogList = res.body;
		assert.strictEqual(blogList.length, blogs.length + 1);
	});

	test('empty likes default to zero', async () => {
		const newBlog = {
			author: 'Martin',
			title: 'This is some weird post',
			url: 'www.alpha.com'
		};

		const res = await api.post('/api/blogs').send(newBlog).expect(201);

		assert.strictEqual(res.body.likes, 0);
	});

	test('empty title or url values', async () => {
		const newBlog = {
			author: 'Testing',
			likes: 2
		};
		await api.post('/api/blogs').send(newBlog).expect(400);
	});

	test('unique identifier is named "id"', async () => {
		const res = await api.get('/api/blogs').expect(200);
		const singleBlog = res.body[0];
		const keysArray = Object.keys(singleBlog);

		assert(keysArray.includes('id'));
	});
});

after(async () => {
	await mongoose.connection.close();
});

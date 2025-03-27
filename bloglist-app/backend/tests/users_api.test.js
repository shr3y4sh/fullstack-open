const User = require('../models/user');

const { test, describe, after, beforeEach } = require('node:test');
const assert = require('assert');
const supertest = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

const api = supertest(app);

describe('when there is initially one user in db', () => {
	beforeEach(async () => {
		await User.deleteMany({});
		await User.create({ username: 'root', password: 'sekret' });
	});

	test('users are returned as json', async () => {
		await api
			.get('/api/users')
			.expect(200)
			.expect('Content-Type', /application\/json/);
	});

	test('creation succeeds with a fresh username', async () => {
		const usersAtStart = await User.find();
		const nextUser = {
			username: 'test',
			name: 'test',
			password: 'test'
		};
		const res = await api
			.post('/api/users')
			.send(nextUser)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		assert.strictEqual(nextUser.username, res.body.username);

		const usersAtEnd = await User.find();
		assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);
	});

	test('creation fails with proper statuscode username already taken', async () => {
		const usersAtStart = await User.find();
		const nextUser = {
			username: 'root',
			name: 'test',
			password: 'test'
		};
		await api.post('/api/users').send(nextUser).expect(400);
		const usersAtEnd = await User.find();
		assert.strictEqual(usersAtEnd.length, usersAtStart.length);
	});
	test('creation fails with proper statuscode username too short', async () => {
		const usersAtStart = await User.find();
		const nextUser = {
			username: 'te',
			name: 'test',
			password: 'test'
		};
		await api.post('/api/users').send(nextUser).expect(400);
		const usersAtEnd = await User.find();
		assert.strictEqual(usersAtEnd.length, usersAtStart.length);
	});
	test('creation fails with proper statuscode when password too short', async () => {
		const usersAtStart = await User.find();
		const nextUser = {
			username: 'test',
			name: 'test',
			password: 'te'
		};
		await api.post('/api/users').send(nextUser).expect(400);
		const usersAtEnd = await User.find();
		assert.strictEqual(usersAtEnd.length, usersAtStart.length);
	});
});

after(async () => {
	await mongoose.connection.close();
});

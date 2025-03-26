const { describe, test, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const helper = require('./test_helper');

const api = supertest(app);

describe('when there is initially one user in db', () => {
	beforeEach(async () => {
		await User.deleteMany();

		const passwordHash = await bcrypt.hash('sEcretPasSwoRD', 10);
		const user = new User({ username: 'root', passwordHash: passwordHash });

		await user.save();
	});

	test('creation succeeds with fresh username', async () => {
		const usersAtStart = await helper.usersInDb();

		const nextUser = {
			username: 'admin',
			name: 'Marshall Mathers',
			password: 'just_another_password'
		};

		await api
			.post('/api/users')
			.send(nextUser)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		const usersAtEnd = await helper.usersInDb();

		assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);
	});

	test('creation fails if username already taken', async () => {
		const usersAtStart = await helper.usersInDb();

		const nextUser = {
			username: 'root',
			name: 'SuperUser',
			password: 'alphabetagamma'
		};

		const res = await api
			.post('/api/users')
			.send(nextUser)
			.expect(400)
			.expect('Content-Type', /application\/json/);

		const usersAtEnd = await helper.usersInDb();
		assert(res.body.error.includes('expected `username` to be unique'));
		assert.strictEqual(usersAtEnd.length, usersAtStart.length);
	});

	after(async () => {
		await mongoose.connection.close();
	});
});

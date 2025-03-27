const User = require('../models/user');
const bcrypt = require('bcryptjs');

const userRouter = require('express').Router();

userRouter.get('/', async (req, res) => {
	const users = await User.find({}).populate('blogs', {
		title: 1,
		author: 1,
		url: 1
	});
	res.status(200).json(users);
});

userRouter.post('/', async (req, res) => {
	const body = req.body;
	if (!body.username || !body.password) {
		return res
			.status(400)
			.json({ error: 'username or password fields cannot be empty' });
	}
	if (body.password.length < 3) {
		return res
			.status(400)
			.json({ error: 'password must be at least 3 characters long' });
	}
	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(body.password, saltRounds);
	const user = new User({
		username: body.username,
		name: body.name,
		passwordHash
	});
	const savedUser = await user.save();
	res.status(201).json(savedUser);
});

module.exports = userRouter;

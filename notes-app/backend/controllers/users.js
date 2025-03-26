const bcrypt = require('bcryptjs');
const usersRouter = require('express').Router();

const User = require('../models/user');

usersRouter.get('/', async (req, res) => {
	const users = await User.find().populate('notes', {
		content: 1,
		important: 1
	});
	res.status(200).json(users);
});

usersRouter.post('/', async (req, res) => {
	const { username, name, password } = req.body;

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password, saltRounds);

	let user = new User({
		name: name,
		username: username,
		passwordHash: passwordHash
	});

	user = await user.save();

	res.status(201).json(user);
});

module.exports = usersRouter;

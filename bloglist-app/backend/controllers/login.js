const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const loginRouter = require('express').Router();

const User = require('../models/user');

loginRouter.post('/', async (req, res) => {
	const body = req.body;
	const user = await User.findOne({ username: body.username });

	if (!user) {
		return res.status(401).json({ error: 'invalid username or password' });
	}
	const passwordCorrect = bcrypt.compare(body.password, user.passwordHash);

	if (!passwordCorrect) {
		return res.status(401).json({ error: 'invalid username or password' });
	}

	const userForToken = {
		username: user.username,
		id: user._id
	};
	const token = jwt.sign(userForToken, process.env.SECRET, {
		expiresIn: 60 * 60
	});

	res.status(200).json({ token, username: user.username });
});

module.exports = loginRouter;

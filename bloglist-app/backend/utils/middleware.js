const jwt = require('jsonwebtoken');

const logger = require('./logger');
const User = require('../models/user');

const requestLogger = (req, res, next) => {
	logger.info('Method:', req.method);
	logger.info('Path:  ', req.path);
	logger.info('Body:  ', req.body);
	logger.info('---');
	next();
};

const getTokenFrom = (req, res, next) => {
	let newToken;
	const authorization = req.get('authorization');
	if (authorization && authorization.startsWith('Bearer ')) {
		newToken = authorization.replace('Bearer ', '');
	} else {
		newToken = null;
	}

	req.token = newToken;
	next();
};

const userExtractor = async (req, res, next) => {
	const decodedToken = jwt.verify(req.token, process.env.SECRET);
	if (!decodedToken.id) {
		return res.status(401).json({ error: 'token invalid' });
	}
	const userId = decodedToken.id;
	const user = await User.findById(userId);

	req.user = user;
	next();
};

const unknownEndpoint = (req, res) => {
	res.status(404).json({ error: 'Unknown Endpoint' });
};

const errorHandler = (error, req, res, next) => {
	logger.error(error.message);

	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'malformed id' });
	}

	if (error.name === 'ValidationError') {
		return res.status(400).json({ error: error.message });
	}

	if (error.name === 'MongoServerError') {
		return res.status(400).json({ error: error.message });
	}

	if (error.name === 'JsonWebTokenError') {
		return res.status(401).json({ error: 'invalid token' });
	}

	if (error.name === 'TokenExpiredError') {
		return res.status(401).json({ error: 'token expired' });
	}

	next(error);
};

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	getTokenFrom,
	userExtractor
};

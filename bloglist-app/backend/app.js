const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const blogRouter = require('./controllers/blogPosts');
const commentsRouter = require('./controllers/comments');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

logger.info('connecting to mongodb');

mongoose
	.connect(config.DB_URI)
	.then(() => {
		logger.info('connected to database');
	})
	.catch((err) => {
		logger.error('error connecting to mongodb', err.message);
	});

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.getTokenFrom);
// app.use();

app.use('/api/blogs', blogRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;

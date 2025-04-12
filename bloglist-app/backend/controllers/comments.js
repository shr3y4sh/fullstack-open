const commentsRouter = require('express').Router();

const middleware = require('../utils/middleware');

const User = require('../models/user');
const Blog = require('../models/blog');

commentsRouter.get('/:id', middleware.userExtractor, async (req, res) => {
	const blogId = req.params.id;
	const blog = await Blog.findById(blogId);

	if (!blog) {
		return res.status(400).json({ message: 'Bad request' });
	}

	const comments = [...blog.comments];

	res.status(200).json(comments);
});

commentsRouter.post('/:id', middleware.userExtractor, async (req, res) => {
	const { comment, username } = req.body;
	const blogId = req.params.id;
	const user = await User.findOne({ username });

	if (!user) {
		return res.status(400).json({
			message: `${username} user doesn't exist. Please login with correct credentials.`
		});
	}

	const blog = await Blog.findById(blogId);

	if (!blog) {
		return res.status(400).json({ message: 'Bad request' });
	}
	const newComment = { comment, username, addedBy: user._id };

	blog.comments.push(newComment);

	await blog.save();
	res.status(201).json(newComment);
});

module.exports = commentsRouter;

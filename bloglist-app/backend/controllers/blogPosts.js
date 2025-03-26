const blogRouter = require('express').Router();

const Blog = require('../models/blog');

blogRouter.get('/', async (req, res) => {
	const blogs = await Blog.find();

	res.status(200).json(blogs);
});

blogRouter.post('/', async (req, res) => {
	const body = req.body;
	if (!body.title || !body.url) {
		return res
			.status(400)
			.send({ error: 'title or url fields cannot be empty' });
	}

	if (!body.likes) {
		body.likes = 0;
	}

	let blog = new Blog(body);

	blog = await blog.save();

	res.status(201).json(blog);
});

module.exports = blogRouter;

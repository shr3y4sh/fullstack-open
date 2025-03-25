const blogRouter = require('express').Router();

const Blog = require('../models/blog');

blogRouter.get('/', async (req, res, next) => {
	try {
		const blogs = await Blog.find();

		res.status(200).json(blogs);
	} catch (err) {
		next(err);
	}
});

blogRouter.post('/', async (req, res, next) => {
	let blog = new Blog(req.body);

	try {
		blog = await blog.save();

		res.status(201).json(blog);
	} catch (err) {
		next(err);
	}
});

module.exports = blogRouter;

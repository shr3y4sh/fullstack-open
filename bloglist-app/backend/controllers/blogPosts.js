const blogRouter = require('express').Router();

const Blog = require('../models/blog');

blogRouter.get('/', async (req, res) => {
	const blogs = await Blog.find();

	res.status(200).json(blogs);
});

blogRouter.post('/', async (req, res) => {
	let blog = new Blog(req.body);

	blog = await blog.save();

	res.status(201).json(blog);
});

module.exports = blogRouter;

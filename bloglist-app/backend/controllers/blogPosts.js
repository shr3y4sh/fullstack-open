const blogRouter = require('express').Router();

const middleware = require('../utils/middleware');

const Blog = require('../models/blog');

blogRouter.get('/', async (req, res) => {
	const blogs = await Blog.find().populate('user', {
		username: 1,
		name: 1,
		id: 1
	});

	res.status(200).json(blogs);
});

blogRouter.post('/', middleware.userExtractor, async (req, res) => {
	const user = req.user;

	const body = req.body;
	if (!body.title || !body.url) {
		return res
			.status(400)
			.send({ error: 'title or url fields cannot be empty' });
	}

	if (!body.likes) {
		body.likes = 0;
	}

	const nextBlog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: user.id
	});

	let blog = new Blog(nextBlog);

	blog = await blog.save();

	res.status(201).json(blog);
});

blogRouter.delete('/:id', middleware.userExtractor, async (req, res) => {
	const id = req.params.id;
	const userId = req.user.id;

	const blog = await Blog.findById(id);

	if (!blog) {
		return res
			.status(404)
			.json({ error: `blog with id: ${id} doesn't exist` });
	}

	if (blog.user.toString() !== userId.toString()) {
		return res.status(401).json({ error: 'unauthorized' });
	}

	await Blog.findByIdAndDelete(id);

	res.status(204).json(blog);
});

blogRouter.put('/:id', middleware.userExtractor, async (req, res) => {
	const id = req.params.id;

	const blog = await Blog.findById(id);

	if (!blog) {
		return res
			.status(404)
			.json({ error: `blog with id: ${id} doesn't exist` });
	}

	if (blog.user.toString() !== req.user.id.toString()) {
		return res.status(401).json({ error: 'unauthorized' });
	}

	blog.likes++;

	await blog.save();
	res.status(200).json(blog);
});

module.exports = blogRouter;

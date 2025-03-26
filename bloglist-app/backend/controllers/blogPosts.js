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

blogRouter.delete('/:id', async (req, res) => {
	const id = req.params.id;

	const blog = await Blog.findById(id);

	if (!blog) {
		return res
			.status(404)
			.json({ error: `blog with id: ${id} doesn't exist` });
	}

	await Blog.findByIdAndDelete(id);

	res.status(204).json(blog);
});

blogRouter.put('/:id', async (req, res) => {
	const id = req.params.id;

	const blog = await Blog.findById(id);

	if (!blog) {
		return res
			.status(404)
			.json({ error: `blog with id: ${id} doesn't exist` });
	}

	blog.likes++;

	await blog.save();
	res.status(201).json(blog);
});

module.exports = blogRouter;

const blogRouter = require('express').Router();

const middleware = require('../utils/middleware');

const User = require('../models/user');
const Blog = require('../models/blog');

blogRouter.get('/', async (_req, res) => {
	const blogs = await Blog.find().populate('user', {
		username: 1,
		name: 1,
		_id: 1
	});

	res.status(200).json(blogs);
});

blogRouter.post('/', middleware.userExtractor, async (req, res) => {
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
		user: req.user._id,
		comments: []
	});

	const user = await User.findById(req.user._id);

	let blog = new Blog(nextBlog);

	user.blogs.push(blog);
	blog = await blog.save();
	await user.save();

	res.status(201).json(blog);
});

blogRouter.delete('/:id', middleware.userExtractor, async (req, res) => {
	const id = req.params.id;
	console.log(id);

	const userId = req.user._id;

	const blog = await Blog.findById(id);

	if (!blog) {
		return res
			.status(404)
			.json({ error: `blog with id: ${id} doesn't exist` });
	}

	if (blog.user.toString() !== userId.toString()) {
		return res.status(401).json({
			error: 'Unauthorized: only the creator of the blog can delete it.'
		});
	}

	await Blog.findByIdAndDelete(id);

	const user = await User.findById(userId);

	user.blogs = user.blogs.filter((b) => b._id.toString() !== id);
	await user.save();

	res.status(204).json(blog);
});

blogRouter.put('/:id', middleware.userExtractor, async (req, res) => {
	const id = req.params.id;
	console.log(id);

	const user = await User.findById(req.user._id);
	const blog = await Blog.findById(id).populate('user');

	if (!blog) {
		return res
			.status(404)
			.json({ error: `blog with id: ${id} doesn't exist` });
	}

	blog.likes++;

	user.blogs = user.blogs.map((b) =>
		b._id.toString() === id.trim() ? blog : b
	);

	await user.save();
	await blog.save();
	res.status(200).json(blog);
});

module.exports = blogRouter;

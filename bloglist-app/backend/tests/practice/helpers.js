const blogs = [
	{
		_id: '5a422a851b54a676234d17f7',
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
		__v: 0
	},
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
		__v: 0
	},
	{
		_id: '5a422b3a1b54a676234d17f9',
		title: 'Canonical string reduction',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
		likes: 12,
		__v: 0
	},
	{
		_id: '5a422b891b54a676234d17fa',
		title: 'First class tests',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
		likes: 10,
		__v: 0
	},
	{
		_id: '5a422ba71b54a676234d17fb',
		title: 'TDD harms architecture',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
		likes: 0,
		__v: 0
	},
	{
		_id: '5a422bc61b54a676234d17fc',
		title: 'Type wars',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
		likes: 2,
		__v: 0
	}
];

const { _ } = require('lodash');

const logger = require('./logger');

const dummy = (blogs) => {
	logger.info(blogs);
	return 1;
};

const totalLikes = (blogs) => {
	return blogs.length !== 0
		? blogs.reduce((sum, item) => {
				return item.likes + sum;
		  }, 0)
		: 0;
};

const favouriteBlog = (blogs) => {
	const likesList = blogs.map((b) => b.likes);

	const max = likesList.reduce((max, item) => Math.max(max, item), 0);
	const result = blogs.find((b) => b.likes === max);
	return {
		title: result.title,
		author: result.author,
		likes: result.likes
	};
};

const authorMaxBlogs = (blogs) => {
	const aggregate = _.countBy(blogs, (blog) => {
		return blog.author;
	});

	const maxBlogs = _.max(Object.values(aggregate));
	const author =
		Object.keys(aggregate)[
			Object.values(aggregate).findIndex((item) => item === maxBlogs)
		];
	console.log(author);

	return {
		author: String(author),
		blogs: maxBlogs
	};
};

const authorMostLikes = (blogs) => {
	const aggregate = _.groupBy(blogs, (blog) => {
		return blog.author;
	});
	let result = [];
	for (const author in aggregate) {
		result.push(aggregate[author].map((item) => item.likes));
	}

	result = result.map((item) => {
		return item.reduce((sum, item) => sum + item, 0);
	});
	const maxLikes = _.max(result);

	const index = _.indexOf(result, maxLikes);

	return {
		author: Object.keys(aggregate)[index],
		likes: maxLikes
	};
};

module.exports = {
	blogs,
	totalLikes,
	favouriteBlog,
	authorMaxBlogs,
	authorMostLikes,
	dummy
};

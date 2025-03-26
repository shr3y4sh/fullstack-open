// favourite blog
/*
const { test, describe } = require('node:test');
const assert = require('node:assert');

const { blogs, favouriteBlog } = require('../utils/helpers');

describe('favourite blog is', () => {
	test('should have title, author and number of likes', () => {
		assert.deepStrictEqual(favouriteBlog(blogs), {
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			likes: 12
		});
	});
});
*/

// maximum number blogs

/*
const { test, describe } = require('node:test');
const assert = require('node:assert');

const { blogs, authorMaxBlogs, authorMostLikes } = require('../utils/helpers');

describe('author with', () => {
	test('maximum number of blogs', () => {
		assert.deepEqual(authorMaxBlogs(blogs), {
			author: 'Robert C. Martin',
			blogs: 3
		});
	});
});

describe('most liked', () => {
	test('author is', () => {
		assert.deepStrictEqual(authorMostLikes(blogs), {
			author: 'Edsger W. Dijkstra',
			likes: 17
		});
	});
});

*/

// total number of likes

/*
const { test, describe } = require('node:test');
const assert = require('node:assert');

// const average = require('../utils/for_testing').average;

const { blogs, totalLikes } = require('../utils/helpers');

describe('total likes', () => {
	test('when list has 1 blog only', () => {
		assert.strictEqual(totalLikes(blogs.slice(0, 1)), blogs[0].likes);
	});
	test('when list has 0 blog only', () => {
		assert.strictEqual(totalLikes([]), 0);
	});
	test('for more than one blogs', () => {
		assert.strictEqual(totalLikes(blogs), 36);
	});
});

*/

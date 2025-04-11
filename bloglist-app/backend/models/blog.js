const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	author: {
		type: String,
		required: true
	},
	url: {
		type: String,
		required: true
	},
	likes: {
		type: Number,
		required: true
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	comments: [
		{
			comment: {
				type: String,
				required: true
			},
			username: {
				type: String,
				required: true
			},
			addedBy: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User'
			}
		}
	]
});

blogSchema.set('toJSON', {
	transform: (_doc, returned) => {
		delete returned.__v;
	}
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;

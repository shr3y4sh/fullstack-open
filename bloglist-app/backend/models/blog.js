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
	}
});

blogSchema.set('toJSON', {
	transform: (doc, returned) => {
		returned.id = returned._id.toString();
		delete returned._id;
		delete returned.__v;
	}
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;

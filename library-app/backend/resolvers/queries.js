import Book from '../models/books.js';
import Author from '../models/authors.js';
import User from '../models/users.js';

export const Books = {
	author: async (root) => {
		let newAuthor = await Author.findOne({ name: root.author });
		if (!newAuthor) {
			newAuthor = new Author({
				name: root.name
			});

			return await newAuthor.save();
		}

		return {
			name: newAuthor.name,
			born: newAuthor.born,
			booksCount: newAuthor.books.length,
			id: newAuthor._id
		};
	}
};
export const Authors = {
	booksCount: async (root) => {
		const author = await Author.findOne({ name: root.name });
		return author.books.length;
	}
};

export const Query = {
	bookCount: async () => await Book.countDocuments({}),

	authorCount: async () => await Author.countDocuments({}),

	allBooks: async (_root, args) => {
		if (!args.author && !args.genre) {
			return await Book.find({});
		}

		if (!args.genre) {
			return await Book.find({ author: args.author });
		}

		if (!args.author) {
			return await Book.find({ genres: { $elemMatch: args.genres } });
		}

		return await Book.find({
			author: args.author,
			genres: { $elemMatch: args.genre }
		});
	},
	allAuthors: async () => await Author.find(),
	me: (_root, _args, context) => {
		return context.currentUser;
	}
};

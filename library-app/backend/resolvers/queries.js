import Book from '../models/books.js';
import Author from '../models/authors.js';

export const Books = {
	author: async (root) => {
		try {
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
				id: newAuthor._id.toString()
			};
		} catch (error) {
			console.error(error);

			throw new GraphQLError(`${error}`);
		}
	}
};
export const Authors = {
	booksCount: async (root) => {
		try {
			const author = await Author.findOne({ name: root.name });
			return author.books.length;
		} catch (error) {
			console.error(error);

			throw new GraphQLError(`${error}`);
		}
	}
};

export const Query = {
	booksCount: async () => await Book.countDocuments({}).lean(),

	authorCount: async () => await Author.countDocuments({}).lean(),

	allBooks: async (_root, args) => {
		try {
			let books = await Book.find({}).lean();

			if (args.genre) {
				books = books.filter((book) =>
					book.genres.includes(args.genres)
				);
			}

			if (args.author) {
				books = books.filter((book) => book.author === args.author);
			}

			return books.map((book) => {
				return {
					...book,
					id: book._id.toString()
				};
			});
		} catch (error) {
			console.error(error);

			throw new GraphQLError(`${error}`);
		}
	},
	allAuthors: async () => {
		try {
			const authors = await Author.find({}).lean();

			return authors.map((author) => {
				return {
					...author,
					id: author._id.toString()
				};
			});
		} catch (error) {
			console.error(error);

			throw new GraphQLError(`${error}`);
		}
	},
	me: (_root, _args, context) => {
		return context.currentUser;
	}
};

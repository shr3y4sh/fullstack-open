import Book from '../../models/books.js';
import Author from '../../models/authors.js';
import { GraphQLError } from 'graphql';

export default async (_root, args, { currentUser }) => {
	if (!currentUser) {
		console.error('Unauthorized, current user missing');

		throw new GraphQLError('Unauthorized');
	}

	try {
		const { title, published, genres } = { ...args };
		let book = await Book.findOne({ title });

		if (book) {
			throw new Error('Book already exist');
		}
		let author = await Author.findOne({ name: args.author });

		if (!author) {
			author = new Author({ name: args.author });
		}
		book = new Book({
			title,
			published,
			genres,
			author: author.name
		});

		author.books.push(book._id);
		await author.save();
		await book.save();

		return {
			...book._doc,
			id: book._id.toString()
		};
	} catch (err) {
		console.error(err);

		throw new GraphQLError(`${err}`, {
			extensions: {
				error: err
			}
		});
	}
};

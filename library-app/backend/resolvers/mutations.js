import Book from '../models/books.js';
import Author from '../models/authors.js';
import User from '../models/users.js';
import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';

const Mutation = {
	addBook: async (_root, args, { currentUser }) => {
		if (!currentUser) {
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

			return book;
		} catch (err) {
			throw new GraphQLError(`${err}`, {
				extensions: {
					error: err
				}
			});
		}
	},

	editAuthor: async (_root, args, { currentUser }) => {
		if (!currentUser) {
			throw new GraphQLError('Unauthorized');
		}
		try {
			let author = await Author.findOne({ name: args.name });

			if (!author) {
				throw new GraphQLError(`${args.author} doesn't exist`, {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.name
					}
				});
			}
			author.born = args.setBornTo;

			await author.save();

			return {
				name: author.name,
				born: author.born,
				booksCount: author.books.length,
				id: author._id
			};
		} catch (err) {
			throw new GraphQLError('Error, thrown by me', {
				extensions: {
					error: err
				}
			});
		}
	},

	createUser: async (_root, args) => {
		try {
			let user = await User.findOne({ username: args.username });

			if (user) {
				throw new Error('user exists');
			}

			user = await User.create({
				username: args.username,
				favouriteGenre: args.favouriteGenre
			});
			console.log(user.username);
			return user;
		} catch (error) {
			console.error(error);

			throw new GraphQLError('', {
				extensions: {
					code: 'BAD_USER_INPUT',
					invalidArgs: username,
					error
				}
			});
		}
	},

	login: async (_root, { username, password }) => {
		try {
			const user = await User.findOne({ username });

			if (!user || password !== 'secret') {
				throw new Error('invalid credentials');
			}

			const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY);

			return { value: token };
		} catch (error) {
			console.error(error);

			throw new GraphQLError(`${error}`, {
				extensions: {
					code: 'BAD_USER_INPUT',
					invalidArgs: username,
					error
				}
			});
		}
	}
};

export default Mutation;

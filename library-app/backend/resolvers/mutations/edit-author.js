import Author from '../../models/authors.js';
import { GraphQLError } from 'graphql';

export default async (_root, args, { currentUser }) => {
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
		throw new GraphQLError(`${err}`, {
			extensions: {
				error: err
			}
		});
	}
};

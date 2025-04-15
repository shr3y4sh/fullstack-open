import User from '../../models/users.js';
import { GraphQLError } from 'graphql';

export default async (_root, args) => {
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

		throw new GraphQLError(`${error}`, {
			extensions: {
				code: 'BAD_USER_INPUT',
				invalidArgs: username,
				error
			}
		});
	}
};

import User from '../../models/users.js';
import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';

export default async (_root, { username, password }) => {
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
};

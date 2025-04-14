import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { Query, Books, Authors } from './resolvers/queries.js';
import Mutation from './resolvers/mutations.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import typeDefs from './types.js';
import 'dotenv/config';
import User from './models/users.js';

mongoose.set('strictQuery', false);

const db_url = process.env.MONGODB_URI;

console.log(`connecting to mongodb`);

mongoose
	.connect(db_url)
	.then(() => {
		console.log('connection successful');
	})
	.catch((err) => {
		console.error('error connecting to mongodb', err);
	});

const resolvers = {
	Author: Authors,
	Book: Books,
	Query,
	Mutation
};

const server = new ApolloServer({
	typeDefs,
	resolvers
});

startStandaloneServer(server, {
	listen: { port: 4000 },
	context: async ({ req }) => {
		const auth = req.headers.authorization || null;

		if (auth && auth.startsWith('Bearer ')) {
			const decodedToken = jwt.verify(
				auth.substring(7),
				process.env.JWT_KEY
			);

			const currentUser = await User.findById(decodedToken.userId);

			return { currentUser };
		}
	}
}).then(({ url }) => {
	console.log(`Server ready at ${url}`);
});

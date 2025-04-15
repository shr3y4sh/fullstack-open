const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { GraphQLError } = require('graphql');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Person = require('./models/persons');
const User = require('./models/users');

mongoose.set('strictQuery', false);

require('dotenv').config();

const db_uri = process.env.MONGODB_URI;

console.log('connecting to mongodb');

mongoose
	.connect(db_uri)
	.then(() => {
		console.log('Connection to database successful');
	})
	.catch((err) => {
		console.log('connection failed');
		console.error(err);
	});

const typeDefs = `
    type Address {
        street: String!
        city: String!
    }

    type Person {
        name: String!
        phone: String
        address: Address!
        id: ID!
    }

	type User {
		username: String!
		friends: [Person!]!
		id: ID!
	}

	type Token {
		value: String!
	}

	enum YesNo {
		YES
		NO
	}
    
    type Query {
        personCount: Int!

        allPersons(phone: YesNo): [Person!]!

        findPerson(name: String!): Person

		me: User
    }

    type Mutation {
		addPerson(
            name: String!
            phone: String
            street: String!
            city: String!
        ): Person
	
		editNumber(
			name: String!
			phone: String!
		): Person
	
		createUser(
			username: String!
		): User
	
		login(
			username: String!
			password: String!
		): Token

		addAsFriend(
			name: String!
		): User
    }
`;

const resolvers = {
	Query: {
		personCount: async () => Person.collection.countDocuments,
		allPersons: async (_root, args) => {
			if (!args.phone) {
				return Person.find({});
			}

			return Person.find({ phone: { $exists: args.phone === 'YES' } });
		},
		findPerson: async (_root, args) => Person.findOne({ name: args.name }),
		me: (_root, _args, context) => {
			return context.currentUser;
		}
	},
	Person: {
		address: (root) => {
			return {
				street: root.street,
				city: root.city
			};
		}
	},
	Mutation: {
		addPerson: async (_root, args, context) => {
			const person = new Person({ ...args });
			const currentUser = context.currentUser;

			if (!currentUser) {
				throw new GraphQLError('Unauthorized', {
					extensions: {
						code: 'BAD_USER_INPUT'
					}
				});
			}

			try {
				await person.save();
				currentUser.friends.push(person);
				await currentUser.save();
			} catch (err) {
				throw new GraphQLError('Saving person failed', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.name,
						error: err
					}
				});
			}

			return person;
		},
		editNumber: async (_root, args) => {
			const person = await Person.findOne({ name: args.name });
			person.phone = args.phone;
			try {
				await person.save();
			} catch (err) {
				throw new GraphQLError('Saving number failed', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.name,
						error: err
					}
				});
			}

			return person;
		},

		createUser: async (_root, args) => {
			const user = new User({ username: args.username });

			return user.save().catch((err) => {
				throw new GraphQLError('Creating user failed', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.username,
						error: err
					}
				});
			});
		},

		login: async (_root, args) => {
			try {
				const user = await User.findOne({ username: args.username });

				if (!user || args.password !== 'secret') {
					throw new GraphQLError('Invalid credentials', {
						extensions: { code: 'BD_USER_INPUT' }
					});
				}

				const userForToken = {
					username: user.username,
					id: user._id
				};

				return {
					value: jwt.sign(userForToken, process.env.JWT_SECRET)
				};
			} catch (err) {
				console.error(err);

				throw new GraphQLError(`${err}`);
			}
		},

		addAsFriend: async (_root, args, { currentUser }) => {
			const isFriend = (person) =>
				currentUser.friends
					.map((f) => f._id.toString())
					.includes(person._id.toString());

			if (!currentUser) {
				throw new GraphQLError('Unauthorized', {
					extensions: {
						code: 'BAD_USER_INPUT'
					}
				});
			}

			const person = await Person.findOne({ name: args.name });

			if (!isFriend(person)) {
				currentUser.friends.push(person);
			}

			return await currentUser.save();
		}
	}
};

const server = new ApolloServer({
	typeDefs,
	resolvers
});

startStandaloneServer(server, {
	listen: { port: 4000 },
	context: async ({ req }) => {
		const auth = req ? req.headers.authorization : null;

		if (auth && auth.startsWith('Bearer ')) {
			const decodedToken = jwt.verify(
				auth.substring(7),
				process.env.JWT_SECRET
			);

			const currentUser = await User.findById(decodedToken.id).populate(
				'friends'
			);

			return { currentUser };
		}
	}
}).then(({ url }) => {
	console.log(`Server ready at ${url}`);
});

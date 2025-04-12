const { ApolloServer } = require('@apollo/server');
const { v1 } = require('uuid');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { GraphQLError } = require('graphql');

let authors = [
	{
		name: 'Robert Martin',
		id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
		born: 1952
	},
	{
		name: 'Martin Fowler',
		id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
		born: 1963
	},
	{
		name: 'Fyodor Dostoevsky',
		id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
		born: 1821
	},
	{
		name: 'Joshua Kerievsky', // birthyear not known
		id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e'
	},
	{
		name: 'Sandi Metz', // birthyear not known
		id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e'
	}
];

/*
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 */

let books = [
	{
		title: 'Clean Code',
		published: 2008,
		author: 'Robert Martin',
		id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
		genres: ['refactoring']
	},
	{
		title: 'Agile software development',
		published: 2002,
		author: 'Robert Martin',
		id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
		genres: ['agile', 'patterns', 'design']
	},
	{
		title: 'Refactoring, edition 2',
		published: 2018,
		author: 'Martin Fowler',
		id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
		genres: ['refactoring']
	},
	{
		title: 'Refactoring to patterns',
		published: 2008,
		author: 'Joshua Kerievsky',
		id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
		genres: ['refactoring', 'patterns']
	},
	{
		title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
		published: 2012,
		author: 'Sandi Metz',
		id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
		genres: ['refactoring', 'design']
	},
	{
		title: 'Crime and punishment',
		published: 1866,
		author: 'Fyodor Dostoevsky',
		id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
		genres: ['classic', 'crime']
	},
	{
		title: 'Demons',
		published: 1872,
		author: 'Fyodor Dostoevsky',
		id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
		genres: ['classic', 'revolution']
	}
];

const typeDefs = `
    type Author {
        name: String!
        born: Int
        booksCount: Int
        id: ID!
    }

    type Book {
        title: String!
        published: Int!
        author: Author!
        genres: [String!]!
        id: ID!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(
            author: String,
            genre: String
            ): [Book!]!
        allAuthors: [Author!]!
    }

    type Mutation {
        addBook(
            title: String!
            author: String
            published: Int
            genres: [String]
        ): Book
        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author
    }
`;

const resolvers = {
	Book: {
		author: (root) => {
			const newAuthor = authors.find((a) => a.name === root.author);
			if (!newAuthor) {
				return {
					name: root.author,
					id: v1()
				};
			}

			return newAuthor;
		}
	},
	Author: {
		booksCount: (root) => books.filter((b) => b.author === root.name).length
	},
	Query: {
		bookCount: () => books.length,
		authorCount: () => authors.length,
		allBooks: (_root, args) => {
			if (!args.author && !args.genre) {
				return books;
			}

			if (!args.genre) {
				return books.filter((book) => book.author === args.author);
			}

			if (!args.author) {
				return books.filter((book) => book.genres.includes(args.genre));
			}

			return books.filter(
				(book) =>
					book.author === args.author &&
					book.genres.includes(args.genre)
			);
		},
		allAuthors: () => authors
	},

	Mutation: {
		addBook: (_root, args) => {
			const book = books.map((b) => b.title === args.title);

			if (book && args.author === book.author) {
				throw new GraphQLError(
					`${args.title} by ${args.author} already exist in the library`
				);
			}

			const newBook = {
				title: args.title,
				published: args.published,
				genres: args.genres,
				author: args.author,
				id: v1()
			};

			const newAuthor = {
				name: args.author,
				id: v1()
			};

			authors.push(newAuthor);

			books.push(newBook);
			return newBook;
		},
		editAuthor: (_root, args) => {
			const author = authors.find((a) => a.name === args.name);

			if (!author) {
				return null;
			}
			author.born = args.setBornTo;

			authors = authors.map((a) => (a.id === author.id ? author : a));

			return author;
		}
	}
};

const server = new ApolloServer({
	typeDefs,
	resolvers
});

startStandaloneServer(server, {
	listen: { port: 4000 }
}).then(({ url }) => {
	console.log(`Server ready at ${url}`);
});

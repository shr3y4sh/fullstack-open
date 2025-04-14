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
    type User {
        username: String!
        favouriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }

    type Query {
        bookCount: Int!

        authorCount: Int!

        allBooks(
            author: String,
            genre: String
            ): [Book!]!

        allAuthors: [Author!]!

        me: User
    }

    type Mutation {

        addBook(
            title: String!
            author: String!
            published: Int
            genres: [String]
        ): Book

        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author

        
        createUser(
            username: String!
            favouriteGenre: String!
        ): User

        login(
            username: String!
            password: String!
        ): Token
    }
`;

export default typeDefs;
/**
 * 

    

 */

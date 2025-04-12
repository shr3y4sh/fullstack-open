import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
    query { 
        allAuthors {
            name
            born
            booksCount
        }
    }
`;
export const ALL_BOOKS = gql`
    query {
        allBooks {
            title
            published
            author {
                name
            }
        }
    }
`;

export const ADD_BOOK = gql`
    mutation createBook(
                $title: String!
                $author: String
                $published: Int
                $genres: [String]
            ) {
                addBook(
                    title: $title
                    author: $author
                    published: $published
                    genres: $genres
                ) {
                    title
                    published
                    author {
                        name
                    }
                    genres
                }
            }
`;

export const EDIT_BIRTH_YEAR = gql`
    mutation setBirthYear(
        $name: String!
        $born: Int!
    ) {
        editAuthor(
            name: $name
            setBornTo: $born
        ) {
            name
            born
        }
    }
`;

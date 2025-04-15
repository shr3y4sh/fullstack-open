/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries/queries';
import Genres, { BooksTable } from './Genres';

const Books = (props) => {
	const { loading, error, data } = useQuery(ALL_BOOKS);

	const [genreFilter, setGenreFilter] = useState('all');

	if (!props.show) {
		return null;
	}

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error.message}</div>;
	}

	let books = data.allBooks.slice();

	const allBooks = books.slice();

	if (genreFilter !== 'all') {
		books = books.filter((book) => book.genres.includes(genreFilter));
	}

	return (
		<div>
			<h2>books</h2>

			<BooksTable books={books} />
			<Genres books={allBooks} changeGenre={setGenreFilter} />
			<button onClick={() => setGenreFilter('all')}>all</button>
		</div>
	);
};

/* NEED WORK
export const RecommendedBooks = ({books, genre, show}) => {
	books = books.filter(book => book.genre === genre)

	if (!show) {
		return null;
	}

	return <>
		
		<h2>Recommendations</h2>
		<p>books inf your favourite genre <strong>{ genre}</strong></p>
		<BooksTable books={books} /></>

}
*/

export default Books;

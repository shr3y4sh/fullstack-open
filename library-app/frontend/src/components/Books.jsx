/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries/queries';
import Genres, { BooksTable } from './Genres';

const Books = (props) => {
	const { loading, error, data } = useQuery(ALL_BOOKS);

	const [genreFilter, setGenreFilter] = useState('all');

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error.message}</div>;
	}

	if (!props.show) {
		return null;
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

export const RecommendedBooks = ({ books, genre }) => {
	books = books.filter((book) => book.genres.includes(genre));
	return (
		<>
			<h2>Recommendations</h2>
			<p>
				books in your favourite genre <strong>{genre}</strong>
			</p>
			<BooksTable books={books} />
		</>
	);
};

export default Books;

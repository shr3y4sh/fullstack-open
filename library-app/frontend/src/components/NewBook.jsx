/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries/queries';

const NewBook = (props) => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [published, setPublished] = useState('');
	const [genre, setGenre] = useState('');
	const [genres, setGenres] = useState([]);

	const [createBook, { loading }] = useMutation(ADD_BOOK, {
		refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
		onError: (error) => {
			const messages = error.graphQLErrors
				.map((e) => e.message)
				.join('\n');
			props.setError(messages);
		}
	});

	if (!props.show) {
		return null;
	}

	const sanitize = (str) => str.replace(/[<>]/g, '');
	const isValid = () =>
		title.trim() && author.trim() && !isNaN(Number(published));

	const submit = async (event) => {
		event.preventDefault();

		if (!isValid()) {
			props.setError('Please fill all fields correctly.');
			return;
		}

		await createBook({
			variables: {
				title: sanitize(title),
				author: sanitize(author),
				published: Number(published),
				genres: genres.map(sanitize)
			}
		});

		setTitle('');
		setPublished('');
		setAuthor('');
		setGenres([]);
		setGenre('');
	};

	const addGenre = () => {
		setGenres(genres.concat(genre.split(',')));
		setGenre('');
	};

	return (
		<div>
			<form onSubmit={submit}>
				<div>
					title
					<input
						value={title}
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					author
					<input
						value={author}
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					published
					<input
						type='number'
						value={published}
						onChange={({ target }) => setPublished(target.value)}
					/>
				</div>
				<div>
					<input
						value={genre}
						onChange={({ target }) => setGenre(target.value)}
					/>
					<button onClick={addGenre} type='button'>
						add genre
					</button>
				</div>
				<div>genres: {genres.join(' ')}</div>
				<button type='submit' disabled={loading}>
					create book
				</button>
			</form>
		</div>
	);
};

export default NewBook;

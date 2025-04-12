/* eslint-disable react/prop-types */
import { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';

const Error = ({ message }) => {
	if (!message) {
		return null;
	}

	return (
		<div
			style={{
				border: '1px solid gray',
				width: 'max-content',
				padding: '1rem'
			}}>
			{message}
		</div>
	);
};

const App = () => {
	const [page, setPage] = useState('authors');
	const [error, setError] = useState(null);

	function notify(message) {
		setError(message);

		setTimeout(() => {
			setError(null);
		}, 5000);
	}
	return (
		<div>
			<Error message={error} />
			<div>
				<button onClick={() => setPage('authors')}>authors</button>
				<button onClick={() => setPage('books')}>books</button>
				<button onClick={() => setPage('add')}>add book</button>
			</div>

			<Authors show={page === 'authors'} setError={notify} />

			<Books show={page === 'books'} />

			<NewBook show={page === 'add'} setError={notify} />
		</div>
	);
};

export default App;

/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import { useApolloClient, useQuery } from '@apollo/client';
import { ME } from './queries/queries';

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

const ButtonPanel = ({ setPage, token, setUser }) => {
	const client = useApolloClient();

	const logout = () => {
		token.current = null;
		setUser(null);
		localStorage.clear();
		client.clearStore();
	};

	if (!token.current) {
		return (
			<div>
				<button onClick={() => setPage('authors')}>authors</button>
				<button onClick={() => setPage('books')}>books</button>
				<button onClick={() => setPage('login')}>login</button>
			</div>
		);
	}

	return (
		<div>
			<button onClick={() => setPage('authors')}>authors</button>
			<button
				onClick={() => {
					setPage('books');
				}}>
				books
			</button>
			<button onClick={() => setPage('add')}>add book</button>
			<button
				onClick={() => {
					setPage('books');
				}}>
				recommended
			</button>
			<button onClick={logout}>logout</button>
		</div>
	);
};

const App = () => {
	const [page, setPage] = useState('authors');
	const [error, setError] = useState(null);
	const [user, setUser] = useState(null);

	const token = useRef(null);
	const userClient = useQuery(ME);

	useEffect(() => {
		if (!userClient.loading && !userClient.error && token.current) {
			setUser(userClient.data.me);
		}
	}, [userClient, token]);

	if (!token.current) {
		token.current = localStorage.getItem('users-lib-token');
	}

	function notify(message) {
		setError(message);

		setTimeout(() => {
			setError(null);
		}, 5000);
	}

	return (
		<div>
			<Error message={error} />
			<ButtonPanel setPage={setPage} token={token} setUser={setUser} />
			{user && <div>Logged in: {user.username}</div>}
			<Authors
				show={page === 'authors'}
				setError={notify}
				token={token}
			/>

			<Books show={page === 'books'} user={user} />

			<LoginForm
				show={page === 'login'}
				setError={notify}
				setPage={setPage}
				token={token}
				setUser={setUser}
			/>

			<NewBook show={page === 'add'} setError={notify} />
		</div>
	);
};

export default App;

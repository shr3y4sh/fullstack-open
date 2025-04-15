import { useEffect, useState } from 'react';
import { useApolloClient, useQuery } from '@apollo/client';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import PhoneForm from './components/PhoneForm';
import LoginForm from './components/LoginForm';
import { ALL_PERSONS } from './queries/queries';

const Notify = ({ errorMessage }) => {
	if (!errorMessage) {
		return null;
	}

	return (
		<div
			style={{
				width: 'max-content',
				color: 'red',
				border: '1px solid gray',
				padding: '1rem'
			}}>
			{errorMessage}
		</div>
	);
};

function App() {
	const [token, setToken] = useState(null);
	const client = useApolloClient();

	useEffect(() => {
		if (!token) {
			setToken(localStorage.getItem('users-token'));
		}
	}, [token]);

	const [errorMessage, setErrorMessage] = useState(null);
	const result = useQuery(ALL_PERSONS);

	if (result.loading) {
		return <div>Loading...</div>;
	}

	const notify = (message) => {
		setErrorMessage(message);
		setTimeout(() => {
			setErrorMessage(null);
		}, 5000);
	};

	const logout = () => {
		setToken(null);
		localStorage.clear();
		client.clearStore();
	};

	if (!token) {
		return (
			<div>
				<Notify errorMessage={errorMessage} />
				<h2>Login</h2>
				<LoginForm setToken={setToken} setError={notify} />
			</div>
		);
	}

	return (
		<div>
			<div>
				<Notify errorMessage={errorMessage} />
				<button onClick={logout}>Logout</button>
				<Persons persons={result.data.allPersons} />
			</div>
			<div>
				<PersonForm setError={notify} />
			</div>
			<div>
				<PhoneForm setError={notify} />
			</div>
		</div>
	);
}

export default App;

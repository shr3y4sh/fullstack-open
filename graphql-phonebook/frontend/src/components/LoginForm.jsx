import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries/queries';

function LoginForm({ setToken, setError }) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const [login, result] = useMutation(LOGIN, {
		onError: (err) => {
			setError(err.graphQLErrors[0].message);
		}
	});

	useEffect(() => {
		if (result.data) {
			const token = result.data.login.value;
			setToken(token);
			localStorage.setItem('users-token', token);
		}
	}, [result.data, setToken]);

	function submit(e) {
		e.preventDefault();
		login({ variables: { username, password } });
	}

	return (
		<form onSubmit={submit}>
			<div>
				username:{' '}
				<input
					type='text'
					value={username}
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password:{' '}
				<input
					type='password'
					value={password}
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<div>
				<button type='submit'>login</button>
			</div>
		</form>
	);
}

export default LoginForm;

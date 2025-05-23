import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries/queries';

function LoginForm({ show, token, setError, setPage }) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const [login] = useMutation(LOGIN, {
		onError: (err) => {
			console.dir(err);

			setError(err.message);
		},
		onCompleted: (data) => {
			token.current = data.login.value;
			localStorage.setItem('users-lib-token', token.current);
			setUsername('');
			setPassword('');
			setPage('authors');
		}
	});

	function submit(e) {
		e.preventDefault();
		login({ variables: { username, password } });
	}

	if (!show) {
		return null;
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

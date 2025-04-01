import { useState } from 'react';
import { login } from '../services/login';

export default ({ setUser }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	async function handleLogin(event) {
		event.preventDefault();
		const username = event.target.username.value;
		const password = event.target.password.value;
		console.log(username, password);
		const data = await login({ username, password });
		setUser({ token: data.token, username: username });
	}
	return (
		<>
			<h1>Login to post blogs</h1>
			<form onSubmit={handleLogin}>
				<div>
					<label htmlFor='username'>Username:</label>
					<input
						type='text'
						name='username'
						value={username}
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					<label htmlFor='password'>Password:</label>
					<input
						type='password'
						name='password'
						value={password}
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<div>
					<button type='submit'>Login</button>
				</div>
			</form>
		</>
	);
};

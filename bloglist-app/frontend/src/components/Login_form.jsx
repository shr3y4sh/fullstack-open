import { useState } from 'react';
import React from 'react';
import { useUserLogin } from '../contexts/user-reducer';

const Login_Form = () => {
	const user = useUserLogin();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	async function handleLogin(event) {
		event.preventDefault();
		user.loginUser({ username, password });
	}
	return (
		<>
			<h1>Login to post blogs</h1>
			<form onSubmit={handleLogin} className='blog-form'>
				<div className='form-controls'>
					<label htmlFor='username'>Username:</label>
					<input
						type='text'
						name='username'
						value={username}
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div className='form-controls'>
					<label htmlFor='password'>Password:</label>
					<input
						type='password'
						name='password'
						value={password}
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<div>
					<button type='submit' className='btn'>
						Login
					</button>
				</div>
			</form>
		</>
	);
};

export default Login_Form;

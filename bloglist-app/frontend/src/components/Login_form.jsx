import { useState } from 'react';
import React from 'react';

import { TextField, Button, Typography } from '@mui/material';

import { useUserLogin } from '../contexts/user-reducer';

const Login_Form = () => {
	const user = useUserLogin();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	async function handleLogin(e) {
		e.preventDefault();
		await user.loginUser({ username, password });
	}
	return (
		<>
			<Typography variant='h4'>Login to post blogs</Typography>
			<form onSubmit={handleLogin} className='blog-form'>
				<div className='form-controls'>
					<TextField
						variant='outlined'
						label='username'
						value={username}
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div className='form-controls'>
					<TextField
						variant='outlined'
						label='password'
						type='password'
						value={password}
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<div>
					<Button type='submit' variant='contained'>
						Login
					</Button>
				</div>
			</form>
		</>
	);
};

export default Login_Form;

import { useState } from 'react';
import React from 'react';

import { TextField, Button } from '@mui/material';

import { useUserLogin } from '../contexts/user-reducer';

const Login_Form = () => {
	const user = useUserLogin();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	async function handleLogin(e) {
		e.preventDefault();
		const nextUsername = e.target.username.value;
		const nextPassword = e.target.password.value;
		await user.loginUser({ nextUsername, nextPassword });
		setUsername('');
		setPassword('');
	}
	return (
		<>
			<h1>Login to post blogs</h1>
			<form onSubmit={handleLogin} className='blog-form'>
				<div className='form-controls'>
					<TextField
						variant='outlined'
						label='username'
						name='username'
					/>
				</div>
				<div className='form-controls'>
					<TextField
						variant='outlined'
						label='password'
						type='password'
						name='password'
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

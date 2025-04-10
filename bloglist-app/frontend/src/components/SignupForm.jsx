import { useState } from 'react';

import { TextField, Button, Typography } from '@mui/material';

import { useUserLogin } from '../contexts/user-reducer';
import { signUp } from '../services/users';

const SignupForm = () => {
	const [username, setusername] = useState('');
	const [name, setFullName] = useState('');
	const [password, setPassword] = useState('');

	const user = useUserLogin();

	async function handleFormSubmit(e) {
		e.preventDefault();
		await signUp({ username, name, password });
		await user.loginUser({ username, password });
	}

	return (
		<form onSubmit={handleFormSubmit}>
			<Typography variant='h3'>Sign Up</Typography>
			<div>
				<TextField
					label='username'
					value={username}
					onChange={({ target }) => setusername(target.value)}
				/>
			</div>

			<div>
				<TextField
					label='full name'
					value={name}
					onChange={({ target }) => setFullName(target.value)}
				/>
			</div>

			<div>
				<TextField
					type='password'
					label='password'
					value={password}
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>

			<div>
				<Button type='submit' variant='contained'>
					Sign Up
				</Button>
			</div>
		</form>
	);
};

export default SignupForm;

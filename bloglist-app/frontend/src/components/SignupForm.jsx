import { useState } from 'react';

import { TextField, Button } from '@mui/material';

import { useUserLogin } from '../contexts/user-reducer';
import { signUp } from '../services/login';

const SignupForm = () => {
	const [username, setusername] = useState();
	const [_fullName, setFullName] = useState();
	const [password, setPassword] = useState();

	const user = useUserLogin();

	async function handleFormSubmit({ target }) {
		const Username = target.username.value;
		const Fullname = target.full_name.value;
		const Password = target.password.value;

		await signUp({ Username, Fullname, Password });
		await user.loginUser({ username, password });

		setusername(null);
		setFullName(null);
		setPassword(null);
	}

	return (
		<form onSubmit={handleFormSubmit}>
			<h1>Sign Up</h1>
			<div>
				<TextField label='username' name='username' />
			</div>

			<div>
				<TextField label='full name' name='full_name' />
			</div>

			<div>
				<TextField type='password' label='password' name='password' />
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

import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({
	username,
	setUsername,
	password,
	setPassword,
	handleLogin
}) => {
	return (
		<form onSubmit={handleLogin}>
			<div>
				username{' '}
				<input
					type='text'
					name='username'
					value={username}
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password{' '}
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
	);
};
LoginForm.propTypes = {
	handleLogin: PropTypes.func.isRequired,
	setUsername: PropTypes.func.isRequired,
	setPassword: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired
};

export default LoginForm;

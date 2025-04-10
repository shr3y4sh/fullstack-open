import axios from 'axios';

const baseUrl = '/api/login';

export async function login({ nextUsername, nextPassword }) {
	const res = await axios.post(baseUrl, {
		username: nextUsername,
		password: nextPassword
	});
	return res.data;
}

export async function signUp(body) {
	const res = await axios.post('/api/users/', { ...body });
	return res.data;
}

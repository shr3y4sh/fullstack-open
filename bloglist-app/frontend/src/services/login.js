import axios from 'axios';

const baseUrl = '/api/login';

export async function login({ username, password }) {
	const res = await axios.post(baseUrl, {
		username,
		password
	});
	return res.data;
}

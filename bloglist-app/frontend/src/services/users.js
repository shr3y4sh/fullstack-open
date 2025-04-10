import axios from 'axios';

const base_url = '/api/users';

export async function signUp(body) {
	const res = await axios.post(base_url, { ...body });
	return res.data;
}

export async function getAllUsers() {
	const res = await axios.get(base_url);
	return res.data;
}

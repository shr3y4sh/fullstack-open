import axios from 'axios';

const BASE_URL = 'http://localhost:3001/anecdotes';

export const getAll = async () => {
	const res = await axios.get(BASE_URL);
	return res.data;
};

export const createAnecdote = async (content) => {
	const res = await axios.post(BASE_URL, content);
	return res.data;
};

export const updateAnecdote = async (anecdote) => {
	const res = await axios.put(`${BASE_URL}/${anecdote.id}`, anecdote);
	return res.data;
};

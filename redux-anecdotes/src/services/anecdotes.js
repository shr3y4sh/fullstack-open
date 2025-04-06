import axios from 'axios';

const BASE_URL = 'http://localhost:3001/anecdotes';

const getAll = async () => {
	const res = await axios.get(BASE_URL);

	return res.data;
};

const createNew = async (content) => {
	const res = await axios.post(BASE_URL, content);
	return res.data;
};

const upvote = async (id, votes) => {
	const res = await axios.patch(`${BASE_URL}/${id}`, {
		votes: votes
	});
	return res.data;
};

const deleteAnecdote = '';

export default {
	getAll,
	createNew,
	upvote,
	deleteAnecdote
};

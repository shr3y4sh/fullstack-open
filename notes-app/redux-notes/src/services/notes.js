import axios from 'axios';

const BASE_URL = 'http://localhost:3001/notes';

const getAll = async () => {
	const res = await axios.get(BASE_URL);
	return res.data;
};

const createNew = async (content) => {
	const object = { content, important: false };
	const res = await axios.post(BASE_URL, object);
	return res.data;
};

export default { getAll, createNew };

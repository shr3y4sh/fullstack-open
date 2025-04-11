import axios from 'axios';

const base_url = '/api/comments';

const authHeader = (token) => {
	return {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};
};

export const getComments = async (blogId, token) => {
	const res = await axios.get(`${base_url}/${blogId}`, authHeader(token));
	return res.data;
};

export const postComment = async (comment, username, blogId, token) => {
	const res = await axios.post(
		`${base_url}/${blogId}`,
		{
			comment,
			username
		},
		authHeader(token)
	);
	return res.data;
};

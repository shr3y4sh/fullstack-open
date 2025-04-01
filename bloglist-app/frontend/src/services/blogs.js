import axios from 'axios';
const baseUrl = '/api/blogs';

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then((response) => response.data);
};

export const addBlogPost = async (input) => {
	const res = await axios.post(
		baseUrl,
		{
			title: input.title,
			author: input.author,
			url: input.url
		},
		{
			headers: {
				Authorization: `Bearer ${input.token}`
			}
		}
	);
	return res.data;
};

export default { getAll };

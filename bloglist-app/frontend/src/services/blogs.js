import axios from 'axios';
const baseUrl = '/api/blogs';

export const getAll = () => {
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

export const incrementLike = async (blog, token) => {
	const res = await axios.put(
		`${baseUrl}/${blog.id}`,
		{ ...blog },
		{
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
	);
	return res.data;
};

export const deleteBlog = async (blog, token) => {
	const res = await axios.delete(`${baseUrl}/${blog.id}`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	return res.data;
};

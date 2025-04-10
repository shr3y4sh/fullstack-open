import axios from 'axios';
const baseUrl = '/api/blogs';

export const getAll = async () => {
	const response = await axios.get(baseUrl);
	return response.data;
};

export const addBlogPost = async (input, token) => {
	const res = await axios.post(
		baseUrl,
		{
			title: input.title,
			author: input.author,
			url: input.url
		},
		{
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
	);
	return res.data;
};

export const incrementLike = async (blog, token) => {
	const res = await axios.put(
		`${baseUrl}/${blog._id.toString()}`,
		{ ...blog },
		{
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
	);
	return res.data;
};

export const deleteBlogFromServer = async (blog, token) => {
	const res = await axios.delete(`${baseUrl}/${blog._id.toString()}`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	return res.data;
};

import { useState } from 'react';
import { addBlogPost } from '../services/blogs';
// import blogsData from '../../../data/blogsData';

const AddNewBlog = (props) => {
	const token = props.token;
	const blogs = props.blogs;
	const setBlogs = props.setBlogs;
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');

	async function handleBlogSubmit(e) {
		e.preventDefault();
		const res = await addBlogPost({
			title,
			author,
			url,
			token: token
		});
		setBlogs([...blogs, res]);
		props.setNotification(`A new Blog ${res.title} by ${res.author} added`);
		setTimeout(() => {
			props.setNotification(null);
		}, 3500);
		setTitle('');
		setAuthor('');
		setUrl('');
	}
	return (
		<div>
			<h2>AddNewBlog</h2>
			<form onSubmit={handleBlogSubmit}>
				<div>
					<label htmlFor='title'>Title</label>
					<input
						type='text'
						name='title'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
				</div>
				<div>
					<label htmlFor='author'>Author</label>
					<input
						type='text'
						name='author'
						value={author}
						onChange={(e) => setAuthor(e.target.value)}
						required
					/>
				</div>
				<div>
					<label htmlFor='url'>Url</label>
					<input
						type='text'
						name='url'
						value={url}
						onChange={(e) => setUrl(e.target.value)}
						required
					/>
				</div>
				<div>
					<button type='submit'>Submit</button>
				</div>
			</form>
		</div>
	);
};

export default AddNewBlog;

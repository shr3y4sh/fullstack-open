import { useState, forwardRef } from 'react';
import React from 'react';

// import blogsData from '../../../data/blogsData';
import '../styles/blog-form.css';
const AddNewBlog = ({ createBlog, setNotification }) => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');

	async function handleBlogSubmit(e) {
		e.preventDefault();
		await createBlog(title, author, url);
		setNotification(`A new Blog ${title} by ${author} added`);
		setTimeout(() => {
			setNotification(null);
		}, 3500);
		setTitle('');
		setAuthor('');
		setUrl('');
	}
	return (
		<div>
			<h2 className='new-blog-head'>AddNewBlog</h2>
			<form onSubmit={handleBlogSubmit} className='blog-form'>
				<div className='form-controls'>
					<label htmlFor='title'>Title</label>
					<input
						type='text'
						name='title'
						id='title'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
				</div>
				<div className='form-controls'>
					<label htmlFor='author'>Author</label>
					<input
						type='text'
						name='author'
						id='author'
						value={author}
						onChange={(e) => setAuthor(e.target.value)}
						required
					/>
				</div>
				<div className='form-controls'>
					<label htmlFor='url'>Url</label>
					<input
						type='text'
						name='url'
						id='url'
						value={url}
						onChange={(e) => setUrl(e.target.value)}
						required
					/>
				</div>
				<div className='button-div'>
					<button type='submit' className='btn'>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddNewBlog;

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addBlogPost } from '../services/blogs';
import React from 'react';
import { useSetNotifications } from '../redux/notification-reducer';
import '../styles/blog-form.css';

const AddNewBlog = ({ token, ref }) => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');

	const queryClient = useQueryClient();

	const blogMutation = useMutation({
		mutationFn: async (data) => {
			return await addBlogPost(data, token);
		},
		onSuccess: (data) => {
			queryClient.setQueriesData(['blogs'], (oldBlogs) =>
				oldBlogs.concat(data)
			);
		}
	});

	const setNotification = useSetNotifications();

	async function handleBlogSubmit(e) {
		e.preventDefault();
		blogMutation.mutate({ title, author, url });
		setNotification(`A new blog: ${title} by ${author} was added`);
		setTitle('');
		setAuthor('');
		setUrl('');
		ref.current.toggleVisibility();
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

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addBlogPost } from '../services/blogs';
import { TextField, Button, Typography } from '@mui/material';
import React from 'react';
import { useSetNotifications } from '../contexts/notification-reducer';

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
		setNotification(`A new blog: ${title} by ${author} was added`, false);
		setTitle('');
		setAuthor('');
		setUrl('');
		ref.current.toggleVisibility();
	}
	return (
		<div>
			<Typography variant='h5' component={'h3'}>
				AddNewBlog
			</Typography>
			<form onSubmit={handleBlogSubmit} className='blog-form'>
				<div className='form-controls'>
					<TextField
						type='text'
						label='Title'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
				</div>
				<div className='form-controls'>
					<TextField
						type='text'
						label='Author'
						value={author}
						onChange={(e) => setAuthor(e.target.value)}
						required
					/>
				</div>
				<div className='form-controls'>
					<TextField
						type='text'
						label='URL'
						value={url}
						onChange={(e) => setUrl(e.target.value)}
						required
					/>
				</div>
				<div className='button-div'>
					<Button type='submit' variant='outlined'>
						Submit
					</Button>
				</div>
			</form>
		</div>
	);
};

export default AddNewBlog;

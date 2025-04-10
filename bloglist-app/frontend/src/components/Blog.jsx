import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSetNotifications } from '../contexts/notification-reducer';
import { incrementLike, deleteBlogFromServer } from '../services/blogs';
import { Button, Box, Typography, Link } from '@mui/material';
import { useParams, Link as RouterLink } from 'react-router-dom';

import React from 'react';

export const BlogDetails = ({ blogs, token }) => {
	const setNotification = useSetNotifications();

	const { id } = useParams();

	const blog = blogs.find((b) => b._id.toString() === id);
	if (!blog) {
		return <div>Blog not found</div>;
	}

	const queryClient = useQueryClient();

	const updateMutation = useMutation({
		mutationFn: async (data) => await incrementLike(data, token),

		onSuccess: (data) =>
			queryClient.setQueryData(['blogs'], (oldBlogs) =>
				oldBlogs.map((b) =>
					b._id.toString() === data._id.toString() ? data : b
				)
			)
	});

	const deleteBlogMutation = useMutation({
		mutationFn: async (data) => await deleteBlogFromServer(data, token),
		onSuccess: () => {
			setNotification('Deletion successfull', false);
			return queryClient.setQueryData(['blogs'], (oldBlogs) =>
				oldBlogs.filter((b) => b._id.toString() !== blog._id.toString())
			);
		},
		onError: (data) =>
			setNotification(`Error: ${data.response.data.error}`, true)
	});

	function handleBlogDelete() {
		const reply = confirm(`Remove blog ${blog.title}?`);
		if (!reply) {
			return;
		}

		deleteBlogMutation.mutate(blog);
		setNotification(`${blog.title} was deleted`, false);
	}

	function handleLike(blog) {
		updateMutation.mutate({
			...blog
		});
	}
	return (
		<>
			<Typography variant='h4'>{blog.title} </Typography>
			<Link href={blog.url}>
				<Typography variant='subtitle2'>{blog.url}</Typography>
			</Link>

			<Typography variant='subtitle1'>
				Likes: {blog.likes}
				<Button onClick={() => handleLike(blog)}>like</Button>
			</Typography>
			<Typography variant='h5'>{blog.author}</Typography>
			<div>
				<Button onClick={handleBlogDelete} variant='outlined'>
					Delete
				</Button>
			</div>
			<Typography variant='subtitle1'>
				Added by: {blog.user.username}
			</Typography>
		</>
	);
};

const Blog = ({ blog }) => {
	return (
		<>
			<Box sx={{ p: 2, border: '2px solid gray' }}>
				<Link
					component={RouterLink}
					to={`/blogs/${blog._id.toString()}`}>
					<Typography variant='h5'>{blog.title} </Typography>
				</Link>
			</Box>
		</>
	);
};

export default Blog;

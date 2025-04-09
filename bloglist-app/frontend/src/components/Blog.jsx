import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSetNotifications } from '../redux/notification-reducer';
import { incrementLike, deleteBlogFromServer } from '../services/blogs';
import React from 'react';
import '../styles/blog-list.css';

const Blog = ({ blog, token }) => {
	const [visible, setVisible] = useState(false);

	const setNotification = useSetNotifications();

	const queryClient = useQueryClient();

	const updateMutation = useMutation({
		mutationFn: async (data) => await incrementLike(data, token),

		onSuccess: (data) =>
			queryClient.setQueryData(['blogs'], (oldBlogs) =>
				oldBlogs.map((blog) => (blog.id === data.id ? data : blog))
			)
	});

	const buttonLabel = () => {
		if (visible) {
			return 'Hide';
		} else {
			return 'View';
		}
	};

	const deleteBlogMutation = useMutation({
		mutationFn: async (data) => await deleteBlogFromServer(data, token),
		onSuccess: () =>
			queryClient.setQueryData(['blogs'], (oldBlogs) =>
				oldBlogs.filter((b) => b.id !== blog.id)
			)
	});

	function handleBlogDelete() {
		const reply = confirm(`Remove blog ${blog.title}?`);
		if (!reply) {
			return;
		}

		deleteBlogMutation.mutate(blog);
		setNotification(`${blog.title} was deleted`);
	}

	function handleLike(blog) {
		updateMutation.mutate(blog);
	}

	return (
		<div className='blog blog-list'>
			<div className='title'>
				{blog.title}{' '}
				<button className='btn' onClick={() => setVisible((v) => !v)}>
					{buttonLabel()}
				</button>
			</div>
			{visible && (
				<>
					<p className='url'>{blog.url}</p>
					<p className='likes'>
						Likes: {blog.likes}
						<button
							className='like-btn'
							onClick={() => handleLike(blog)}>
							like
						</button>
					</p>
					<div className='author'>{blog.author}</div>
					<div>
						<button onClick={handleBlogDelete} className='btn'>
							Delete
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default Blog;

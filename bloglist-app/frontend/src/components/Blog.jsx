import { useState } from 'react';
import React from 'react';
import '../styles/blog-list.css';
import { useDispatch } from 'react-redux';
import { updateBlogs } from '../redux/blogs-reducer';

const Blog = ({ blog, token, deleteBlog }) => {
	const [visible, setVisible] = useState(false);

	const dispatch = useDispatch();

	const buttonLabel = () => {
		if (visible) {
			return 'Hide';
		} else {
			return 'View';
		}
	};

	async function handleLike(blog) {
		dispatch(updateBlogs(blog, token));
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
						<button
							onClick={() => deleteBlog(blog)}
							className='btn'>
							Delete
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default Blog;

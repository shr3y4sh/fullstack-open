import { useState } from 'react';
import React from 'react';
import '../styles/blog-list.css';
import { incrementLike } from '../services/blogs';

const Blog = ({ blog, token, deleteBlog }) => {
	const [visible, setVisible] = useState(false);

	const [likes, setLikes] = useState(blog.likes);

	const buttonLabel = () => {
		if (visible) {
			return 'Hide';
		} else {
			return 'View';
		}
	};

	async function handleLike() {
		const newBlog = await incrementLike(blog, token);
		setLikes(newBlog.likes);
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
						Likes: {likes}
						<button className='like-btn' onClick={handleLike}>
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

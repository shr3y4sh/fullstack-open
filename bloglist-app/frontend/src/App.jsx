import { useState, useEffect, useRef } from 'react';
import React from 'react';
import { addBlogPost } from './services/blogs';
import Blog from './components/Blog';
import AddNewBlog from './components/AddNewBlog';
import Login_form from './components/Login_form';
import { getAll, deleteBlog } from './services/blogs';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);
	const [notification, setNotification] = useState(null);
	const blogRef = useRef();

	useEffect(() => {
		getAll().then((blogs) => {
			blogs.sort((a, b) => -a.likes + b.likes);
			return setBlogs(blogs);
		});
	}, []);

	useEffect(() => {
		if (!user) {
			const loggedUser = window.localStorage.getItem('userLogged');
			const user = JSON.parse(loggedUser);
			setUser(user);
		}
	}, []);

	useEffect(() => {
		if (user) {
			window.localStorage.setItem('userLogged', JSON.stringify(user));
		}
	}, [user]);

	async function addBlog(title, author, url) {
		blogRef.current.toggleVisibility();
		const nextBlog = await addBlogPost({
			title,
			author,
			url,
			token: user.token
		});
		setBlogs([...blogs, nextBlog]);
	}

	async function handleBlogDelete(blog) {
		const reply = confirm(`Remove blog ${blog.title}?`);
		if (!reply) {
			return;
		}
		await deleteBlog(blog, user.token);
		const blogList = blogs.filter((b) => b.id !== blog.id);
		setBlogs(blogList);
	}

	function handleLogout() {
		window.localStorage.removeItem('userLogged');
		setUser(null);
	}
	const userLogin = () => (
		<div>
			<Login_form setUser={setUser} />
		</div>
	);
	const blogList = () => (
		<>
			<h2 className='new-blog-head'>Blogs</h2>
			<ul>
				{blogs.map((blog) => (
					<Blog
						key={blog.id}
						blog={blog}
						token={user.token}
						deleteBlog={handleBlogDelete}
					/>
				))}
			</ul>
		</>
	);
	return (
		<div>
			{notification !== null && <Notification message={notification} />}
			{user ? (
				<>
					<div className='login'>
						<span>Logged in user: {user.username}</span>

						<button className='btn' onClick={handleLogout}>
							Logout
						</button>
					</div>
					<Togglable buttonLabel='New Blog' ref={blogRef}>
						<AddNewBlog
							createBlog={addBlog}
							setNotification={setNotification}
						/>
					</Togglable>

					{blogList()}
				</>
			) : (
				userLogin()
			)}
		</div>
	);
};

export default App;

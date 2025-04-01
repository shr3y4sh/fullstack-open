import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import AddNewBlog from './components/AddNewBlog';
import Login_form from './components/Login_form';
import blogService from './services/blogs';
import Notification from './components/Notification';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);
	const [notification, setNotification] = useState(null);

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
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
			<h2>blogs</h2>
			<ul>
				{blogs.map((blog) => (
					<Blog key={blog.id} blog={blog} />
				))}
			</ul>
		</>
	);
	return (
		<div>
			{notification !== null && <Notification message={notification} />}
			{user ? (
				<>
					<p>
						Logged in user: {user.username}
						<button onClick={handleLogout}>Logout</button>
					</p>
					<AddNewBlog
						token={user.token}
						blogs={blogs}
						setBlogs={setBlogs}
						setNotification={setNotification}
					/>
					{blogList()}
				</>
			) : (
				userLogin()
			)}
		</div>
	);
};

export default App;

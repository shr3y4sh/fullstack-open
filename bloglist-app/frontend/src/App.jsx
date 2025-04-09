import { useEffect } from 'react';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BlogList from './components/BlogList';
import AddNewBlog from './components/AddNewBlog';
import Login_Form from './components/Login_form';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

import { setExistingLoggedUser, logoutUser } from './redux/user-reducer';

import { getAllBlogs } from './redux/blogs-reducer';

const App = () => {
	const user = useSelector((state) => state.user);

	const notification = useSelector((state) => state.notifications);
	const blogs = useSelector((state) => state.blogs);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllBlogs());
	}, []);

	useEffect(() => {
		if (!user) {
			dispatch(setExistingLoggedUser());
		}
	}, []);

	function handleLogout() {
		dispatch(logoutUser());
	}

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
					<Togglable buttonLabel='New Blog'>
						<AddNewBlog token={user.token} />
					</Togglable>

					<BlogList blogs={blogs} token={user.token} />
				</>
			) : (
				<div>
					<Login_Form />
				</div>
			)}
		</div>
	);
};

export default App;

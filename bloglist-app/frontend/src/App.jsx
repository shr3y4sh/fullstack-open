import { useEffect, useContext, useRef } from 'react';
import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { getAll } from './services/blogs';

import BlogList from './components/BlogList';
import AddNewBlog from './components/AddNewBlog';
import Login_Form from './components/Login_form';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import { NotificationContext } from './contexts/notification-reducer';
import { useUserLogin } from './contexts/user-reducer';

const App = () => {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ['blogs'],
		queryFn: getAll
	});

	const blogRef = useRef(); // using ref and imperative_handle to toggle visibility after adding new blog

	const notification = useContext(NotificationContext);

	const user = useUserLogin();

	useEffect(() => {
		if (!user.data) {
			user.setExistingLoggedUser();
		}
	}, []);

	function handleLogout() {
		user.logoutUser();
	}

	if (isPending) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return (
			<div>
				<h2>Error fetching request</h2>
				<p>{error.message}</p>
			</div>
		);
	}

	return (
		<div>
			{notification !== null && <Notification message={notification} />}
			{user.data ? (
				<>
					<div className='login'>
						<span>Logged in user: {user.data.username}</span>

						<button className='btn' onClick={handleLogout}>
							Logout
						</button>
					</div>
					<Togglable buttonLabel='New Blog' ref={blogRef}>
						<AddNewBlog token={user.data.token} ref={blogRef} />
					</Togglable>

					<BlogList blogs={data} token={user.data.token} />
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

import { useEffect, useContext, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Routes, Route, NavLink } from 'react-router-dom';

import '@fontsource/roboto/500.css';
import { Button, Typography } from '@mui/material';

import UsersList from './components/UsersList';
import IndividualUser from './components/IndividualUser';
import BlogList from './components/BlogList';
import AddNewBlog from './components/AddNewBlog';
import Login_Form from './components/Login_form';
import SignupForm from './components/SignupForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import { BlogDetails } from './components/Blog';
import './index.css';

import { getAll } from './services/blogs';
import { getAllUsers } from './services/users';
import { NotificationContext } from './contexts/notification-reducer';
import { useUserLogin } from './contexts/user-reducer';

const Home = ({ data, token }) => {
	const blogRef = useRef();

	if (!token) {
		return null;
	}

	return (
		<>
			<div>
				<Typography variant='h3' component={'h1'}>
					Blogs
				</Typography>
				<Button
					variant='outlined'
					onClick={() => blogRef.current.toggleVisibility()}>
					Add Blog
				</Button>
			</div>
			<Togglable ref={blogRef}>
				<AddNewBlog token={token} ref={blogRef} />
			</Togglable>
			<BlogList blogs={data} token={token} />
		</>
	);
};

const App = () => {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ['blogs'],
		queryFn: getAll
	});

	const notification = useContext(NotificationContext);

	const user = useUserLogin();

	const [usersList, setUsersList] = useState([]);

	useEffect(() => {
		getAllUsers().then((data) => {
			setUsersList(data);
		});
	}, []);

	const displayList = usersList.map((user) => {
		return {
			id: user._id.toString(),
			name: user.name,
			blogs: {
				count: user.blogs.length,
				list: [...user.blogs]
			}
		};
	});

	useEffect(() => {
		if (!user.data) {
			user.setExistingLoggedUser();
		}
	}, [user.data]);

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
		<>
			{notification !== null && (
				<Notification
					message={notification.message}
					error={notification.error}
				/>
			)}
			{user.data ? (
				<>
					<header className='navbar'>
						<NavLink to={'/'} className={'nav-links'}>
							Blogs
						</NavLink>
						<NavLink to={'/users'} className={'nav-links'}>
							Users
						</NavLink>
						<div className='login-user'>
							Logged in user: {user.data.username}
							<button className='btn' onClick={handleLogout}>
								Logout
							</button>
						</div>
					</header>

					<Routes>
						<Route
							path='/blogs/:id'
							element={
								<BlogDetails
									loggedUser={user.data}
									blogs={data}
								/>
							}
						/>
						<Route
							path='/users/:id'
							element={
								<IndividualUser displayList={displayList} />
							}
						/>
						<Route
							path='/users'
							element={<UsersList displayList={displayList} />}
						/>
						<Route
							path='/'
							element={
								<Home data={data} token={user.data.token} />
							}
						/>
					</Routes>
				</>
			) : (
				<div>
					<SignupForm />
					<Login_Form />
				</div>
			)}
		</>
	);
};

export default App;

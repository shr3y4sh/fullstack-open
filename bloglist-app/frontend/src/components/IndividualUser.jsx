import React from 'react';
import { useParams } from 'react-router-dom';

import { Typography, List, ListItem } from '@mui/material';

const IndividualUser = ({ displayList }) => {
	const { id } = useParams();

	const individualUser = displayList.find((element) => element.id === id);

	if (!individualUser) {
		return <div>User not found</div>;
	}

	return (
		<>
			<Typography variant='h4' component={'h1'}>
				{individualUser.name}
			</Typography>

			<Typography variant='h6'>Added Blogs</Typography>
			<List>
				{individualUser.blogs.list.map((blog) => (
					<ListItem key={blog._id}>{blog.title}</ListItem>
				))}
			</List>
		</>
	);
};

export default IndividualUser;

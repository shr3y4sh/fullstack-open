import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Typography, Link } from '@mui/material';

const UsersList = ({ displayList }) => {
	return (
		<>
			<Typography variant='h4' component={'h1'}>
				List of Users
			</Typography>
			<Grid container>
				<Grid size={4}>
					<Typography variant='h6'>Users</Typography>
				</Grid>
				<Grid size={8}>
					<Typography variant='h6'>Blogs Created</Typography>
				</Grid>
				{displayList.map((element) => (
					<React.Fragment key={element.name}>
						<Grid size={4}>
							<Link
								component={RouterLink}
								to={`/users/${element.id}`}>
								{element.name}
							</Link>
						</Grid>
						<Grid size={8}>{element.blogs.count}</Grid>
					</React.Fragment>
				))}
			</Grid>
		</>
	);
};

export default UsersList;

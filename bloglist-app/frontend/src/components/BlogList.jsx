import Blog from './Blog';
import { Typography } from '@mui/material';

const BlogList = ({ blogs, token }) => {
	return (
		<>
			<Typography variant='h3' component={'h1'}>
				Blogs
			</Typography>
			<ul>
				{blogs.map((blog) => (
					<Blog key={blog.id} blog={blog} token={token} />
				))}
			</ul>
		</>
	);
};

export default BlogList;

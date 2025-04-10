import Blog from './Blog';

const BlogList = ({ blogs, token }) => {
	return (
		<>
			<ul>
				{blogs.map((blog) => (
					<Blog key={blog._id} blog={blog} token={token} />
				))}
			</ul>
		</>
	);
};

export default BlogList;

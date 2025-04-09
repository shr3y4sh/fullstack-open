import Blog from './Blog';

const BlogList = ({ blogs, token }) => {
	return (
		<>
			<h2 className='new-blog-head'>Blogs</h2>
			<ul>
				{blogs.map((blog) => (
					<Blog key={blog.id} blog={blog} token={token} />
				))}
			</ul>
		</>
	);
};

export default BlogList;

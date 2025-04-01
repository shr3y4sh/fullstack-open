const Blog = ({ blog }) => (
	<>
		<li>
			{blog.title} - {blog.author}
		</li>
		<p>{blog.url}</p>
	</>
);

export default Blog;

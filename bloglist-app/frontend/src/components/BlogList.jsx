import { useDispatch } from 'react-redux';
import { deleteBlogPost } from '../redux/blogs-reducer';
import Blog from './Blog';

const BlogList = ({ blogs, token }) => {
	const dispatch = useDispatch();

	function handleBlogDelete(blog) {
		const reply = confirm(`Remove blog ${blog.title}?`);
		if (!reply) {
			return;
		}

		dispatch(deleteBlogPost(blog, token));
	}
	return (
		<>
			<h2 className='new-blog-head'>Blogs</h2>
			<ul>
				{blogs.map((blog) => (
					<Blog
						key={blog.id}
						blog={blog}
						token={token}
						deleteBlog={() => handleBlogDelete(blog)}
					/>
				))}
			</ul>
		</>
	);
};

export default BlogList;

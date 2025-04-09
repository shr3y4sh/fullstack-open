import { createSlice } from '@reduxjs/toolkit';

import {
	getAll,
	addBlogPost,
	incrementLike,
	deleteBlogFromServer
} from '../services/blogs';

const blogSlice = createSlice({
	name: 'blogs',

	initialState: [],

	reducers: {
		setBlogs(_state, action) {
			return action.payload;
		},

		append(state, action) {
			state.push(action.payload);
		},

		update(state, action) {
			return state.map((b) =>
				b.id === action.payload.id ? action.payload : b
			);
		},

		deleteBlog(state, action) {
			return state.filter((b) => b.id !== action.payload);
		}
	}
});

export const getAllBlogs = () => {
	return async (dispatch) => {
		const blogs = await getAll();

		dispatch(setBlogs(blogs));
	};
};

export const addNewBlog = (blog, token) => {
	return async (dispatch) => {
		const nextBlog = await addBlogPost(blog, token);

		dispatch(append(nextBlog));
	};
};

export const updateBlogs = (blog, token) => {
	return async (dispatch) => {
		const nextBlog = await incrementLike(blog, token);

		dispatch(update(nextBlog));
	};
};

export const deleteBlogPost = (blog, token) => {
	return async (dispatch) => {
		await deleteBlogFromServer(blog, token);
		console.log(blog.id);

		dispatch(deleteBlog(blog.id));
	};
};

const { setBlogs, append, update, deleteBlog } = blogSlice.actions;

export default blogSlice.reducer;

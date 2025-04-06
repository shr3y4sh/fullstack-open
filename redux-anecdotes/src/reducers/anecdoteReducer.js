import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

export const initializeAnecdotes = () => {
	return async (dispatch) => {
		const anecdotes = await anecdoteService.getAll();
		anecdotes.sort((a, b) => b.votes - a.votes);
		dispatch(setAnecdotes(anecdotes));
	};
};

export const createNew = (content) => {
	return async (dispatch) => {
		const object = {
			content,
			votes: 0
		};
		const anecdote = await anecdoteService.createNew(object);
		dispatch(createAnecdote(anecdote));
	};
};

export const voteAnecdote = (anecdote) => {
	return async (dispatch) => {
		const newAnecdote = await anecdoteService.upvote(
			anecdote.id,
			anecdote.votes + 1
		);
		dispatch(voteForAnecdote(newAnecdote));
	};
};

const anecdoteSlice = createSlice({
	name: 'anecdotes',

	initialState: [],

	reducers: {
		createAnecdote(state, action) {
			state.push(action.payload);
		},
		setAnecdotes(state, action) {
			return action.payload;
		},

		voteForAnecdote(state, action) {
			const sortedState = state.map((a) =>
				a.id === action.payload.id ? action.payload : a
			);

			sortedState.sort((a, b) => b.votes - a.votes);
			return sortedState;
		}
	}
});

export default anecdoteSlice.reducer;

export const { createAnecdote, setAnecdotes, voteForAnecdote } =
	anecdoteSlice.actions;

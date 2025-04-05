// import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
	const dispatch = useDispatch();
	return (
		<>
			<h2>create new</h2>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					dispatch(createAnecdote(e.target.anecdote.value));
					e.target.anecdote.value = '';
				}}>
				<div>
					<input type='text' name='anecdote' />
				</div>
				<button>create</button>
			</form>
		</>
	);
};

export default AnecdoteForm;

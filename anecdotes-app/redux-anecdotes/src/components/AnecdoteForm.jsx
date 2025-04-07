// import React from 'react';
import { useDispatch } from 'react-redux';
import { createNew } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notification-reducer';

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	function handleSubmit(e) {
		e.preventDefault();
		const content = e.target.anecdote.value;
		dispatch(createNew(content));
		dispatch(setNotification(`Anecdote added: ${content}`, 3));

		e.target.anecdote.value = '';
	}

	return (
		<>
			<h2>create new</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<input type='text' name='anecdote' />
				</div>
				<button>create</button>
			</form>
		</>
	);
};

export default AnecdoteForm;

import React from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote, initializeAnecdotes } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notification-reducer';

const AnecdoteList = () => {
	const filter = useSelector((state) => state.filter);

	const filterAnecdotes = createSelector(
		[(state) => state.anecdotes],
		(anecdotes) => anecdotes.filter((a) => a.content.includes(filter))
	);

	const anecdotes = useSelector(filterAnecdotes);

	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(initializeAnecdotes());
	}, [dispatch]);

	function handleVoting(anecdote) {
		dispatch(voteAnecdote(anecdote));
		dispatch(setNotification(`Voted for: ${anecdote.content}`, 3));
	}

	return (
		<div>
			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => handleVoting(anecdote)}>
							vote
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default AnecdoteList;

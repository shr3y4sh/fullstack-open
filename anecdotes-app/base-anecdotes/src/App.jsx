import { useState } from 'react';

const anecdotes = [
	'If it hurts, do it more often.',
	'Adding manpower to a late software project makes it later!',
	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	'Premature optimization is the root of all evil.',
	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
	'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
	'The only way to go fast, is to go well.'
];

function App() {
	const [selected, setSelected] = useState(0);
	const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

	function handleSelection() {
		const randomAnecdote = Math.floor(Math.random() * anecdotes.length);
		setSelected(randomAnecdote);
	}

	function handleVoting(id) {
		const copyVote = votes.map((vote, index) =>
			id !== index ? vote : vote + 1
		);

		setVotes(copyVote);
	}

	function mostVotes() {
		const max = Math.max(...votes);
		const index = votes.findIndex((item) => item === max);

		return { max, index };
	}

	const { max, index } = mostVotes();

	return (
		<>
			<h1>Anecdote of the day</h1>
			<div>{anecdotes[selected]}</div>
			<p>Has {votes[selected]}</p>
			<button
				onClick={() => {
					handleVoting(selected);
				}}>
				vote
			</button>
			<button onClick={handleSelection}>next anecdote</button>

			<h2>Anecdote with most votes</h2>
			<div>{anecdotes[index]}</div>
			<p> has {max} </p>
		</>
	);
}

export default App;

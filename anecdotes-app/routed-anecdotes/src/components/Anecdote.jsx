/* eslint-disable react/prop-types */
const Anecdote = ({ anecdote }) => {
	return (
		<>
			<h2>
				{anecdote.content} by {anecdote.author}
			</h2>

			<p>has {anecdote.votes} votes</p>

			<p>
				for more info see{' '}
				<a href={anecdote.info} target='blank'>
					{anecdote.info}
				</a>
			</p>
		</>
	);
};

export default Anecdote;

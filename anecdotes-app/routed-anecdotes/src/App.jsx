/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Routes, Route, useMatch } from 'react-router-dom';

import Anecdote from './components/Anecdote';
import Menu from './components/Menu';
import AnecdoteList from './components/AnecdoteList';
import About from './components/About.jsx';
import Footer from './components/Footer.jsx';
import CreateNew from './components/CreateNew.jsx';
import Notification from './components/Notification.jsx';

const App = () => {
	const match = useMatch('/anecdotes/:id');
	const [anecdotes, setAnecdotes] = useState([
		{
			content: 'If it hurts, do it more often',
			author: 'Jez Humble',
			info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
			votes: 0,
			id: 1
		},
		{
			content: 'Premature optimization is the root of all evil',
			author: 'Donald Knuth',
			info: 'http://wiki.c2.com/?PrematureOptimization',
			votes: 0,
			id: 2
		}
	]);

	const anecdote = match
		? anecdotes.find((a) => a.id === Number(match.params.id))
		: null;

	const [notification, setNotification] = useState(null);

	const showNotification = (message) => {
		setNotification(message);

		setTimeout(() => {
			setNotification(null);
		}, 3000);
	};

	const addNew = (anecdote) => {
		anecdote.id = Math.round(Math.random() * 10000);
		setAnecdotes(anecdotes.concat(anecdote));
	};

	// const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

	// const vote = (id) => {
	// 	const anecdote = anecdoteById(id);

	// 	const voted = {
	// 		...anecdote,
	// 		votes: anecdote.votes + 1
	// 	};

	// 	setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
	// };

	return (
		<div>
			<h1>Software anecdotes</h1>
			<Menu />
			{notification !== null && (
				<Notification notification={notification} />
			)}
			<Routes>
				<Route
					path='/anecdotes/:id'
					element={<Anecdote anecdote={anecdote} />}
				/>
				<Route
					path='/create'
					element={
						<CreateNew
							addNew={addNew}
							showNotification={showNotification}
						/>
					}
				/>

				<Route path='/about' element={<About />} />
				<Route
					path='/'
					element={<AnecdoteList anecdotes={anecdotes} />}
				/>
			</Routes>
			<Footer />
		</div>
	);
};

export default App;

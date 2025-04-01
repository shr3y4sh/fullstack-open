import { useState, useEffect } from 'react';

import service from './services/notesService';
import { NotesRender, NoteForm } from './components/Note';
import Notification from './components/Notification';
import Footer from './components/Footer';
import loginService from './services/login';
import notesService from './services/notesService';

function App() {
	const [notes, setNotes] = useState([]);
	const [showAll, setShowAll] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setuser] = useState(null);
	useEffect(() => {
		service
			.getAll()
			.then((response) => {
				setNotes(response);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	useEffect(() => {
		const loggedUser = localStorage.getItem('loggedNoteAppUser');
		if (loggedUser) {
			const user = JSON.parse(loggedUser);
			setuser(user);
			notesService.setToken(user.token);
		}
	}, []);

	async function handleLogin(event) {
		event.preventDefault();
		// console.log('logging in with', username, password);
		try {
			const user = await loginService.login({
				username,
				password
			});
			localStorage.setItem('loggedNoteAppUser', JSON.stringify(user));
			notesService.setToken(user.token);
			setuser(user);
			setUsername('');
			setPassword('');
		} catch (error) {
			setErrorMessage('Wrong credentials');
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	}

	function handleFormSubmit(formData) {
		const nextNote = {
			content: formData.get('notes'),
			importance: Math.random() > 0.5
		};

		service
			.create(nextNote)
			.then((returnedNote) => {
				setNotes(notes.concat(returnedNote));
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function toggleImportance(id) {
		const note = notes.find((n) => n.id === id);
		const changedNote = { ...note, important: !note.important };

		service
			.update(id, changedNote)
			.then((returnedNote) => {
				setNotes(notes.map((n) => (n.id === id ? returnedNote : n)));
			})
			.catch((err) => {
				console.log(err);
				setErrorMessage(
					`Note ${note.content} was already removed from the server`
				);

				setTimeout(() => {
					setErrorMessage(null);
				}, 5000);
				setNotes(notes.filter((n) => n.id !== id));
			});
	}

	const loginForm = () => {
		return (
			<form onSubmit={handleLogin}>
				<div>
					username{' '}
					<input
						type='text'
						name='username'
						value={username}
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					password{' '}
					<input
						type='password'
						name='password'
						value={password}
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
			</form>
		);
	};

	const noteForm = () => <NoteForm formSubmit={handleFormSubmit} />;

	return (
		<>
			{user === null ? (
				loginForm()
			) : (
				<div>
					<p>{user.name} logged in</p>
					{noteForm()}
				</div>
			)}
			<h1>Notes</h1>
			{errorMessage === null ? null : (
				<Notification message={errorMessage} />
			)}
			<div>
				<button onClick={() => setShowAll((s) => !s)}>
					show {showAll ? 'important' : 'all'}
				</button>
			</div>

			<NotesRender
				notes={notes}
				showAll={showAll}
				toggleImportance={toggleImportance}
			/>
			<Footer />
		</>
	);
}

export default App;

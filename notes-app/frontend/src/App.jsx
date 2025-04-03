import { useState, useEffect, useRef } from 'react';
import React from 'react';
import { NotesRender, NoteForm } from './components/Note';
import Notification from './components/Notification';
import Footer from './components/Footer';
import Togglable from './components/Togglable';
import LoginForm from './components/LoginForm';
import loginService from './services/login';
import notesService from './services/notesService';

function App() {
	const [notes, setNotes] = useState([]);
	const [showAll, setShowAll] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setuser] = useState(null);
	const noteFormref = useRef();

	useEffect(() => {
		notesService
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

	async function addNote(nextNote) {
		noteFormref.current.toggleVisibility();
		try {
			const returnedNote = await notesService.create(nextNote);
			setNotes(notes.concat(returnedNote));
		} catch (err) {
			console.log(err);
		}
	}

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

	function toggleImportance(id) {
		const note = notes.find((n) => n.id === id);
		const changedNote = { ...note, important: !note.important };

		notesService
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

	return (
		<>
			<h1>Notes</h1>
			{user === null ? (
				<Togglable buttonLabel='Login'>
					<LoginForm
						handleLogin={handleLogin}
						username={username}
						password={password}
						setUsername={setUsername}
						setPassword={setPassword}
					/>
				</Togglable>
			) : (
				<div>
					<p>{user.name} logged in</p>
					<Togglable buttonLabel='new note' ref={noteFormref}>
						<NoteForm createNote={addNote} />
					</Togglable>
				</div>
			)}
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

import { useState, useEffect } from 'react';

import service from './services/notesService';
import { NotesRender, NoteForm } from './components/Note';
import Notification from './components/Notification';
import Footer from './components/Footer';

function App() {
	const [notes, setNotes] = useState([]);
	const [showAll, setShowAll] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null);

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

	return (
		<>
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

			<NoteForm formSubmit={handleFormSubmit} />

			<Footer />
		</>
	);
}

export default App;

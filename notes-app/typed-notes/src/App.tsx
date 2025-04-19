import { useState, useEffect } from 'react';
import { Note } from './types';
import { getAllNotes, createNote } from './notes-services';

function App() {
	const [notes, setNotes] = useState<Note[]>([
		{
			id: '1',
			content: 'text'
		}
	]);
	const [newNote, setNewNote] = useState('');

	useEffect(() => {
		getAllNotes().then((notes) => {
			setNotes(notes);
		});
	}, []);

	const noteCreation = (e: React.SyntheticEvent) => {
		e.preventDefault();
		createNote({ content: newNote });
		setNewNote('');
	};

	return (
		<div>
			<form onSubmit={noteCreation}>
				<input
					type='text'
					value={newNote}
					onChange={({ target }) => setNewNote(target.value)}
				/>
				<button type='submit'>add</button>
			</form>

			<ul>
				{notes.map((note) => (
					<li key={note.id}>{note.content}</li>
				))}
			</ul>
		</div>
	);
}

export default App;

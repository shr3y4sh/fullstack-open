import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import notesService from '../services/notesService';

export function Note({ notes, toggleImportance }) {
	const label = notes.important ? 'make not important' : 'make important';

	return (
		<li key={notes.id} className='note'>
			<button
				className={`${
					notes.important ? 'important' : 'not-important'
				} imp-btn`}
				onClick={toggleImportance}>
				{label}
			</button>{' '}
			{notes.content}
		</li>
	);
}

Note.propTypes = {
	notes: PropTypes.object.isRequired,
	toggleImportance: PropTypes.func
};

export function NotesRender({ notes, showAll, toggleImportance }) {
	return (
		<ul>
			{notes.map((note) => {
				{
					return !showAll ? (
						note.important && (
							<Note
								key={note.id}
								notes={note}
								toggleImportance={() =>
									toggleImportance(note.id)
								}
							/>
						)
					) : (
						<Note
							key={note.id}
							notes={note}
							toggleImportance={() => toggleImportance(note.id)}
						/>
					);
				}
			})}
		</ul>
	);
}

NotesRender.propTypes = {
	notes: PropTypes.array.isRequired,
	showAll: PropTypes.func.isRequired,
	toggleImportance: PropTypes.func.isRequired
};

export function NoteForm({ createNote }) {
	const [_, setNextNote] = useState(second);

	function handleFormSubmit(formData) {
		const noteObject = {
			content: formData.get('notes'),
			importance: Math.random() > 0.5
		};
		createNote(noteObject);
		setNextNote('');
	}
	return (
		<div>
			<h2>Create a new note</h2>
			<form action={handleFormSubmit}>
				<input type='text' name='notes' />
				<button type='submit'>save</button>
			</form>
		</div>
	);
}

NoteForm.propTypes = {
	createNote: PropTypes.func.isRequired
};

import { createNote } from '../reducers/note-reducer';
import { useDispatch } from 'react-redux';

import React from 'react';

const NoteForm = () => {
	const dispatch = useDispatch();

	function addNote(e) {
		e.preventDefault();
		const content = e.target.note.value;
		e.target.note.value = '';

		dispatch(createNote(content));
	}
	return (
		<form onSubmit={addNote}>
			<input type='text' name='note' />
			<button type='submit'>Add</button>
		</form>
	);
};

export default NoteForm;

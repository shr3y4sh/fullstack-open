import { createSlice, current } from '@reduxjs/toolkit';
import noteService from '../services/notes';

export const initializeNotes = () => {
	return async (dispatch) => {
		const notes = await noteService.getAll();
		dispatch(setNotes(notes));
	};
};

export const createNote = (content) => {
	return async (dispatch) => {
		const nextNote = await noteService.createNew(content);
		dispatch(appendNote(nextNote));
	};
};

const noteSlice = createSlice({
	name: 'notes',
	initialState: [],
	reducers: {
		toggleImportanceOf(state, action) {
			const id = action.payload;
			const noteToChange = state.find((n) => n.id === id);
			console.log(current(state));

			const changedNote = {
				...noteToChange,
				important: !noteToChange.important
			};
			return state.map((note) => (note.id !== id ? note : changedNote));
		},

		appendNote(state, action) {
			state.push(action.payload);
		},

		setNotes(state, action) {
			return action.payload;
		}
	}
});

export const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions;

export default noteSlice.reducer;

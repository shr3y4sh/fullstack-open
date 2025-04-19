import axios from 'axios';
import { NewNote, Note } from './types';

const JSON_URI = 'http://localhost:3001/notes';

export const getAllNotes = async (): Promise<Note[]> => {
	const res = await axios.get<Note[]>(JSON_URI);
	return res.data;
};

export const createNote = async (note: NewNote): Promise<Note> => {
	const res = await axios.post<Note>(JSON_URI, note);
	return res.data;
};

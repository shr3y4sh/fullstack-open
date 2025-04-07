import axios from 'axios';

const BASE_URL = 'http://localhost:3001/notes';

export const getNotes = () => axios.get(BASE_URL).then((res) => res.data);

export const createNote = (newNote) =>
	axios.post(BASE_URL, newNote).then((res) => res.data);

export const updateNote = (updatedNote) =>
	axios
		.put(`${BASE_URL}/${updatedNote.id}`, updatedNote)
		.then((res) => res.data);

const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/testNotesApp';

const noteSchema = new mongoose.Schema({
	content: {
		type: String,
		required: true,
		minLength: 5
	},
	important: Boolean
});

const Note = mongoose.model('notes', noteSchema);

async function saveNewEntry(content) {
	let note = new Note({
		content: content,
		important: false
	});

	try {
		await mongoose.connect(DB_URL);

		await note.save();

		await mongoose.connection.close();

		return 'Ok';
	} catch (err) {
		console.log(err);
	}
}

async function displayNotes() {
	try {
		await mongoose.connect(DB_URL);
		const people = await Note.find();

		console.log(people);

		await mongoose.connection.close();

		return 'Ok';
	} catch (err) {
		console.log(err);
	}
}

if (process.argv.length >= 3) {
	const content = process.argv[2];

	saveNewEntry(content).then((result) => {
		console.log(result, 'adios');
	});
}

if (process.argv.length === 2) {
	displayNotes().then((result) => {
		console.log(result, 'adios');
	});
}

console.log('exiting');

require('dotenv').config();
//

// named imports
const express = require('express');
const cors = require('cors');
//

// local imports
const Note = require('./models/note');
//

// constants
const port = process.env.PORT || 3001;

const app = express();
//

// allow cross origin resource sharing
app.use(cors());

// use static build
app.use(express.static('dist'));

// read json data in body
app.use(express.json());
//

// GET home page
app.get('/', (req, res) => {
	res.setHeader('Content-Type', 'text/html');
	res.send('<h1>Hello World</h1>');
});

// GET all notes
app.get('/api/notes', async (req, res) => {
	try {
		const notes = await Note.find();

		res.status(200).json(notes);
	} catch (err) {
		console.log(err);
	}
});

// GET single note
app.get('/api/notes/:id', async (req, res, next) => {
	const id = req.params.id;
	try {
		const note = await Note.findById(id);

		if (!note) {
			return res.status(404).json({ error: 'invalid id' });
		}

		res.status(200).json(note);
	} catch (err) {
		next(err);
	}
});

// POST new note
app.post('/api/notes', async (req, res) => {
	const body = req.body;

	if (!body.content) {
		return res.status(400).json({ error: 'content missing' });
	}

	const note = new Note({
		content: body.content,
		important: body.important || false
	});

	try {
		await note.save();
		res.status(201).json(note);
	} catch (err) {
		console.log(err);
	}
});

// PUT update a note
app.put('/api/notes/:id', async (req, res, next) => {
	const { content, important } = req.body;

	try {
		let note = await Note.findById(req.params.id);

		if (!note) {
			return res.status(404).end();
		}

		note.content = content;
		note.important = important;

		note = await note.save();

		res.status(201).json(note);
	} catch (err) {
		next(err);
	}
});

// DELETE a note
app.delete('/api/notes/:id', async (req, res, next) => {
	const id = req.params.id;
	try {
		await Note.findByIdAndDelete(id);

		res.status(204).end();
	} catch (err) {
		next(err);
	}
});
//

// Unknown endpoint
app.use((req, res) => {
	res.status(404).json({ error: 'Endpoint not found ' });
});

// Error middleware
app.use((error, req, res, next) => {
	console.log(error.message);

	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'malformed id' });
	}

	next(error);
});
//

//

// Start server
app.listen(port, () => {
	console.log(`Server running on port:${port}`);
});

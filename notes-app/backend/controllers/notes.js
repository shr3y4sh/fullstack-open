const notesRouter = require('express').Router();
const Note = require('../models/note');
const User = require('../models/user');

// GET all notes
notesRouter.get('/', async (req, res) => {
	const notes = await Note.find().populate('user', { username: 1, name: 1 });

	res.status(200).json(notes);
});

// GET single note
notesRouter.get('/:id', async (req, res) => {
	const id = req.params.id;
	const note = await Note.findById(id);

	if (!note) {
		return res.status(404).json({ error: 'invalid id' });
	}

	res.status(200).json(note);
});

// POST new note
notesRouter.post('/', async (req, res) => {
	const body = req.body;

	if (!body.content) {
		return res.status(400).json({ error: 'content missing' });
	}

	const user = await User.findById(body.userId);
	let note = new Note({
		content: body.content,
		important: body.important || false,
		user: user.id
	});

	note = await note.save();

	user.notes.push(note._id);
	await user.save();

	res.status(201).json(note);
});

// PUT update a note
notesRouter.put('/:id', async (req, res) => {
	const { content, important } = req.body;

	let note = await Note.findById(req.params.id);

	if (!note) {
		return res.status(404).end();
	}

	note.content = content;
	note.important = important;

	note = await note.save();

	res.status(201).json(note);
});

// DELETE a note
notesRouter.delete('/:id', async (req, res) => {
	const id = req.params.id;
	await Note.findByIdAndDelete(id);

	res.status(204).end();
});
//

module.exports = notesRouter;

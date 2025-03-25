const notesRouter = require('express').Router();
const Note = require('../models/note');

// GET all notes
notesRouter.get('/', async (req, res) => {
	try {
		const notes = await Note.find();

		res.status(200).json(notes);
	} catch (err) {
		console.log(err);
	}
});

// GET single note
notesRouter.get('/:id', async (req, res, next) => {
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
notesRouter.post('/', async (req, res) => {
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
notesRouter.put('/:id', async (req, res, next) => {
	const { content, important } = req.body;

	try {
		let note = await Note.findById(req.params.id);

		if (!note) {
			return res.status(404).end();
		}

		note.content = content;
		note.important = important;

		note = await note.save();
		console.log(req.params.id);

		res.status(201).json(note);
	} catch (err) {
		next(err);
	}
});

// DELETE a note
notesRouter.delete('/:id', async (req, res, next) => {
	const id = req.params.id;
	try {
		await Note.findByIdAndDelete(id);

		res.status(204).end();
	} catch (err) {
		next(err);
	}
});
//

module.exports = notesRouter;

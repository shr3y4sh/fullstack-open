const express = require('express');

const port = 3001;

let notes = [
	{
		id: '1',
		content: 'HTML is easy',
		important: false
	},
	{
		id: '2',
		content: 'Browser can execute only JavaScript',
		important: true
	},
	{
		id: '3',
		content: 'GET and POST are the most important methods of HTTP protocol',
		important: true
	}
];

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	res.setHeader('Content-Type', 'text/html');
	res.send('<h1>Hello World</h1>');
});

app.get('/api/notes', (req, res) => {
	res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
	const id = req.params.id;
	const note = notes.find((n) => n.id === id);

	if (!note) {
		return res.status(404).end();
	}

	res.json(note);
});

function generateId() {
	const maxId =
		notes.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0;
	return String(maxId + 1);
}

app.post('/api/notes', (req, res) => {
	const body = req.body;

	if (!body.content) {
		return res.status(400).json({ error: 'content missing' });
	}

	const note = {
		content: body.content,
		important: body.important || false,
		id: generateId()
	};

	notes.push(note);

	res.status(201).json(note);
});

app.delete('/api/notes/:id', (req, res) => {
	const id = req.params.id;
	notes = notes.filter((n) => n.id !== id);
	res.status(204).end();
});

app.listen(port, () => {
	console.log(`Server running on port:${port}`);
});

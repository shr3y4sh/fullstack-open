const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 3001;

let phoneData = [
	{
		id: '1',
		name: 'Arto Hellas',
		number: '040-123456'
	},
	{
		id: '2',
		name: 'Ada Lovelace',
		number: '39-44-5323523'
	},
	{
		id: '3',
		name: 'Dan Abramov',
		number: '12-43-234345'
	},
	{
		id: '4',
		name: 'Mary Poppendieck',
		number: '39-23-6423122'
	}
];

app.use(express.json());

morgan.token('body', (req, res) => {
	if (!req.body) {
		return '';
	}
	return JSON.stringify(req.body);
});

app.use(
	morgan(
		':method :url :status :response-time ms - :res[content-length] :body'
	)
);

app.get('/api/persons', (req, res) => {
	res.status(200).json(phoneData);
});

app.get('/api/persons/:id', (req, res) => {
	const id = req.params.id;

	const person = phoneData.find((p) => p.id === id);

	if (!person) {
		return res.status(404).send('Person not found');
	}

	res.status(200).json(person);
});

function generateId() {
	return Math.floor(Math.random() * 1000);
}

app.get('/info', (req, res) => {
	const currentDate = new Date().toString();
	const numberOfPeople = phoneData.length;

	res.setHeader('Content-Type', 'text/html');
	res.send(
		`<p>Phone has info for ${numberOfPeople} people</p><p>${currentDate}</p>`
	);
});

app.post('/api/persons', (req, res) => {
	const body = req.body;

	if (!body.name || !body.number) {
		return res.status(400).end();
	}

	const existing = phoneData.find(
		(p) => p.name.toLowerCase() === body.name.toLowerCase()
	);

	if (existing) {
		return res.status(400).send({ error: 'name must be unique' });
	}

	const record = {
		id: String(generateId()),
		name: body.name,
		number: body.number
	};

	phoneData.push(record);

	res.status(201).json(record);
});

app.delete('/api/persons/:id', (req, res) => {
	const id = req.params.id;

	const person = phoneData.find((p) => p.id === id);

	if (!person) {
		return res.status(404).end('Person not found');
	}

	phoneData = phoneData.filter((p) => p.id !== id);
	res.status(204).json(person);
});

app.listen(port, () => {
	console.log(`server running on localhost:${port}`);
});

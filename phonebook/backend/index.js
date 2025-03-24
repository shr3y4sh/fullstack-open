require('dotenv').config();

const express = require('express');
const morgan = require('morgan');

const Person = require('./models/person');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.use(express.static('dist'));

morgan.token('body', (req) => {
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

app.get('/api/persons', async (req, res, next) => {
	try {
		const phoneData = await Person.find();

		res.status(200).json(phoneData);
	} catch (err) {
		next(err);
	}
});

app.get('/api/persons/:id', async (req, res, next) => {
	try {
		const id = req.params.id;
		const person = await Person.findById(id);
		if (!person) {
			return res.status(404).json({ error: 'invalid id' });
		}

		res.status(200).json(person);
	} catch (err) {
		next(err);
	}
});

app.get('/info', async (req, res, next) => {
	const currentDate = new Date().toString();

	try {
		const numberOfPeople = await Person.countDocuments();

		res.setHeader('Content-Type', 'text/html');
		res.send(
			`<p>Phone has info for ${numberOfPeople} people</p><p>${currentDate}</p>`
		);
	} catch (err) {
		next(err);
	}
});

app.post('/api/persons', async (req, res, next) => {
	try {
		const body = req.body;

		if (!body.name || !body.number) {
			return res
				.status(400)
				.json({ error: 'Cannot have name or number be empty ' });
		}

		const person = new Person({
			name: String(body.name),
			number: String(body.number)
		});

		const record = await person.save();
		res.status(201).json(record);
	} catch (err) {
		next(err);
	}
});

app.put('/api/persons/:id', async (req, res, next) => {
	const id = req.params.id;

	const body = req.body;
	if (!body.number) {
		return res.status(400).json({ error: 'Number field cannot be empty' });
	}

	try {
		let person = await Person.findByIdAndUpdate(id, {
			name: body.name,
			number: body.number
		});

		person = await person.save();

		res.status(201).json(person);
	} catch (err) {
		next(err);
	}
});

app.delete('/api/persons/:id', async (req, res, next) => {
	const id = req.params.id;

	try {
		const person = await Person.findByIdAndDelete(id);
		console.log(person);

		res.status(200).json(person);
	} catch (err) {
		next(err);
	}
});

// Unknown endpoint
app.use((req, res) => {
	res.status(404).json({ error: 'Endpoint not found ' });
});

app.use((error, req, res, next) => {
	console.log(error.message);

	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'malformed id' });
	}

	if (error.name === 'ValidationError') {
		return res.status(400).json({ error: error.message });
	}

	next(error);
});

app.listen(port, () => {
	console.log(`server running on localhost:${port}`);
});

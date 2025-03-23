const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/phonebook';

const personSchema = new mongoose.Schema({
	name: String,
	number: String
});

const Person = mongoose.model('persons', personSchema);

async function saveNewEntry(pName, pNumber) {
	let person = new Person({
		name: String(pName),
		number: String(pNumber)
	});

	try {
		await mongoose.connect(DB_URL);

		person = await person.save();

		await mongoose.connection.close();

		return 'Ok';
	} catch (err) {
		console.log(err);
	}
}

async function displayPeople() {
	try {
		await mongoose.connect(DB_URL);
		const people = await Person.find();

		console.log(people);

		await mongoose.connection.close();

		return 'Ok';
	} catch (err) {
		console.log(err);
	}
}

/*
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
 */

if (process.argv.length === 4) {
	const name = process.argv[2];
	const number = process.argv[3];

	saveNewEntry(name, number).then((result) => {
		console.log(result, 'adios');
	});
}

if (process.argv.length === 2) {
	displayPeople().then((result) => {
		console.log(result, 'adios');
	});
}

console.log('exiting');

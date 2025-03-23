import service from './phone-records.js';

function notificationDisplay(notification, setter) {
	setter(notification);

	return setTimeout(() => {
		setter({ ...notification, message: null });
	}, 2000);
}

export async function getAll(setter) {
	try {
		const persons = await service.getAllListings();
		return setter(persons);
	} catch (err) {
		console.log(err);
	}
}

async function putUpdate(person, setter, number, persons, notifier) {
	try {
		const newPerson = await service.updateListing({
			...person,
			number: number
		});

		newPerson.number = number;
		const newList = persons.map((p) =>
			p.id === person.id ? newPerson : p
		);
		setter(newList);
		return notificationDisplay(
			{
				message: `Record of ${newPerson.name} updated`,
				className: 'success'
			},
			notifier
		);
	} catch (err) {
		notificationDisplay(
			{
				message: `${person.name} is already deleted`,
				className: 'error'
			},
			notifier
		);

		setter(persons.filter((p) => p.id !== person.id));

		console.log(err);
	}
}

async function postAdd(name, number, setter, persons, notifier) {
	try {
		const person = await service.postListing({
			name: name,
			number: number
		});

		setter(persons.concat(person));

		return notificationDisplay(
			{
				message: `${name} added to the phonebook`,
				className: 'success'
			},
			notifier
		);
	} catch (err) {
		console.log(err);
	}
}

export async function deleteEntry(id, persons, setter, notifier) {
	try {
		const person = await service.deleteListing(id);
		const newList = persons.filter((p) => p.id !== person.id);
		setter(newList);

		return notificationDisplay(
			{
				message: `${person.name} deleted from the phonebook`,
				className: 'error'
			},
			notifier
		);
	} catch (err) {
		console.log(err);
	}
}

export function formSubmission(formData, persons, setPersons, setNotifMessage) {
	const givenName = formData.get('name').trim();
	const givenNumber = formData.get('number');

	if (
		persons.find(
			(person) =>
				person.name === givenName && person.number === givenNumber
		)
	) {
		return notificationDisplay(
			{
				message: `${givenName} with ${givenNumber} is already added to the phonebook`,
				className: 'error'
			},
			setNotifMessage
		);
	}

	const person = persons.find((person) => person.name === givenName);

	if (person) {
		return putUpdate(
			person,
			setPersons,
			givenNumber,
			persons,
			setNotifMessage
		);
	}

	return postAdd(
		givenName,
		givenNumber,
		setPersons,
		persons,
		setNotifMessage
	);
}

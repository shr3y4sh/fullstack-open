import service from './phone-records.js';

function notificationDisplay(notification, notifier) {
	notifier(notification);

	return setTimeout(() => {
		notifier({ ...notification, message: null });
	}, 2500);
}

export async function getAll(dispatch) {
	try {
		const persons = await service.getAllListings();
		return dispatch({ type: 'get_all', persons: persons });
	} catch (err) {
		console.log(err);
	}
}

async function putUpdate(person, dispatch, number, notifier) {
	try {
		const newPerson = await service.updateListing({
			...person,
			number: number
		});

		dispatch({
			type: 'update_person',
			person: newPerson,
			number: number
		});
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

		dispatch({
			type: 'delete_person',
			id: person.id
		});

		console.log(err);
	}
}

async function postAdd(name, number, dispatch, notifier) {
	try {
		const person = await service.postListing({
			name: name,
			number: number
		});

		dispatch({ type: 'add_person', postPerson: person });

		return notificationDisplay(
			{
				message: `${person.name} added to the phonebook`,
				className: 'success'
			},
			notifier
		);
	} catch (err) {
		notificationDisplay(
			{
				message: err.response.data.error,
				className: 'error'
			},
			notifier
		);
	}
}

export async function deleteEntry(id, dispatch, notifier) {
	try {
		const person = await service.deleteListing(id);
		dispatch({ type: 'delete_person', id: person.id });

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

export function formSubmission(formData, persons, dispatch, setNotifMessage) {
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
		return putUpdate(person, dispatch, givenNumber, setNotifMessage);
	}

	return postAdd(givenName, givenNumber, dispatch, setNotifMessage);
}

import { useState, useEffect, useReducer } from 'react';

import { getAll, deleteEntry, formSubmission } from './services/operations.js';
import personReducer from './services/personReducer.js';

import Filter from './components/Filter';
import PhoneForm from './components/PhoneBookForm';
import People from './components/People';
import Notification from './components/Notification';

export default function App() {
	const [persons, dispatch] = useReducer(personReducer, []);
	const [notifMessage, setNotifMessage] = useState({
		message: null,
		className: 'success'
	});
	const [filter, setfilter] = useState('');

	useEffect(() => {
		getAll(dispatch);
	}, []);

	function handleFormSubmit(formData) {
		formSubmission(formData, persons, dispatch, setNotifMessage);
	}

	function handleFilterChange(e) {
		e.preventDefault();
		console.log(e.target.value);
		setfilter(e.target.value);
	}

	function handleDelete(id) {
		deleteEntry(id, dispatch, setNotifMessage);
	}

	return (
		<>
			<h1>PhoneBook</h1>
			<Notification notification={notifMessage} />
			<Filter filter={filter} changeFilter={handleFilterChange} />
			<PhoneForm handleFormSubmit={handleFormSubmit} />

			<h2>Numbers</h2>

			{persons.map((person) => {
				return (
					person.name
						.toLowerCase()
						.includes(filter.toLowerCase()) && (
						<People
							person={person}
							key={person.id}
							onDelete={() => handleDelete(person.id)}
						/>
					)
				);
			})}
		</>
	);
}

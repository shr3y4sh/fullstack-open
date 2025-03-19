import { useState, useEffect } from 'react';

import service from './services/phone-records';

import Filter from './components/Filter';
import PhoneForm from './components/PhoneBookForm';
import People from './components/People';

function App() {
	const [persons, setPersons] = useState([]);

	useEffect(() => {
		service
			.getAllListings()
			.then((persons) => {
				setPersons(persons);
			})
			.catch((err) => console.log(err));
	}, []);

	const [filter, setfilter] = useState('');

	function handleFormSubmit(formData) {
		const givenName = formData.get('name').trim();
		const givenNumber = formData.get('number');

		if (
			persons.find(
				(person) =>
					person.name === givenName && person.number === givenNumber
			)
		) {
			return alert(
				`${givenName} with ${givenNumber} is already added to the phonebook`
			);
		}

		const person = persons.find((person) => person.name === givenName);

		if (person) {
			const reply = confirm(
				`${person.name} is already in the phonebook. Do you want to replace old number with the new one.`
			);
			//

			if (!reply) {
				return;
			}

			return service
				.updateListing({ ...person, number: givenNumber })
				.then((updated) => {
					setPersons(
						persons.map((p) => (p.id === person.id ? updated : p))
					);
				})
				.catch((err) => console.log(err));
		}

		service
			.postListing({ name: givenName, number: givenNumber })
			.then((person) => {
				setPersons(persons.concat(person));
			})
			.catch((err) => console.log(err));
	}

	function handleFilterChange(e) {
		e.preventDefault();
		console.log(e.target.value);
		setfilter(e.target.value);
	}

	function handleDelete(id) {
		service
			.deleteListing(id)
			.then((person) => {
				setPersons(persons.filter((p) => p.id !== person.id));
			})
			.catch((err) => {
				console.log(err);
				setPersons(persons.filter((p) => p.id !== id));
			});
	}

	return (
		<>
			<h1>PhoneBook</h1>
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

export default App;

import { useState, useEffect } from 'react';
import axios from 'axios';

import Filter from './components/Filter';
import PhoneForm from './components/PhoneBookForm';
import People from './components/People';

function App() {
	const [persons, setPersons] = useState([]);

	useEffect(() => {
		axios
			.get('http://localhost:3001/persons')
			.then((response) => {
				setPersons(response.data);
			})
			.catch((err) => console.log(err));
	}, []);

	const [filter, setfilter] = useState('');

	function handleFormSubmit(formData) {
		const givenName = formData.get('name').trim();
		const givenNumber = formData.get('number');

		if (persons.find((person) => person.name === givenName)) {
			return alert(`${givenName} is already added to the phonebook`);
		}
		setPersons([...persons, { name: givenName, number: givenNumber }]);
	}

	function handleFilterChange(e) {
		e.preventDefault();
		console.log(e.target.value);
		setfilter(e.target.value);
	}

	return (
		<>
			<h1>PhoneBook</h1>
			<Filter filter={filter} changeFilter={handleFilterChange} />
			<PhoneForm handleFormSubmit={handleFormSubmit} />

			<h2>Numbers</h2>

			<People filter={filter} persons={persons} />
		</>
	);
}

export default App;

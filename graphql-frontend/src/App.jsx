import { useState } from 'react';
import { useQuery } from '@apollo/client';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import PhoneForm from './components/PhoneForm';
import { ALL_PERSONS } from './queries/queries';

const Notify = ({ errorMessage }) => {
	if (!errorMessage) {
		return null;
	}

	return (
		<div
			style={{
				width: 'max-content',
				color: 'red',
				border: '1px solid gray',
				padding: '1rem'
			}}>
			{errorMessage}
		</div>
	);
};

function App() {
	const [errorMessage, setErrorMessage] = useState(null);
	const result = useQuery(ALL_PERSONS);

	if (result.loading) {
		return <div>Loading...</div>;
	}

	const notify = (message) => {
		setErrorMessage(message);
		setTimeout(() => {
			setErrorMessage(null);
		}, 5000);
	};

	return (
		<div>
			<div>
				<Notify errorMessage={errorMessage} />
				<Persons persons={result.data.allPersons} />
			</div>
			<div>
				<PersonForm setError={notify} />
			</div>
			<div>
				<PhoneForm setError={notify} />
			</div>
		</div>
	);
}

export default App;

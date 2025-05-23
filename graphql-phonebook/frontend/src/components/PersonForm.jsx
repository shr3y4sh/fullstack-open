import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ALL_PERSONS, CREATE_PERSON } from '../queries/queries';

function PersonForm({ setError }) {
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [street, setStreet] = useState('');
	const [city, setCity] = useState('');

	const [createPerson] = useMutation(CREATE_PERSON, {
		onError: (error) => {
			const messages = error.graphQLErrors
				.map((e) => e.message)
				.join('\n');
			setError(messages);
		},
		update: (cache, res) => {
			cache.updateQuery({ query: ALL_PERSONS }, ({ allPersons }) => {
				return {
					allPersons: allPersons.concat(res.data.addPerson)
				};
			});
		}
	});

	const submit = (e) => {
		e.preventDefault();
		createPerson({
			variables: {
				name,
				street,
				city,
				phone: phone.length > 0 ? phone : undefined
			}
		});
		console.log('Form submission?');

		setName('');
		setPhone('');
		setStreet('');
		setCity('');
	};

	return (
		<div>
			<h2>Create new</h2>
			<form onSubmit={submit}>
				<div>
					name{' '}
					<input
						value={name}
						onChange={({ target }) => setName(target.value)}
					/>
				</div>
				<div>
					phone{' '}
					<input
						value={phone}
						onChange={({ target }) => setPhone(target.value)}
					/>
				</div>
				<div>
					street{' '}
					<input
						value={street}
						onChange={({ target }) => setStreet(target.value)}
					/>
				</div>
				<div>
					city{' '}
					<input
						value={city}
						onChange={({ target }) => setCity(target.value)}
					/>
				</div>
				<div>
					<button type='submit'>submit</button>
				</div>
			</form>
		</div>
	);
}

export default PersonForm;

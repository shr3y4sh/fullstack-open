import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_PHONE } from '../queries/queries';

function PhoneForm({ setError }) {
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');

	const [changeNumber, result] = useMutation(EDIT_PHONE);

	useEffect(() => {
		if (result.data && !result.data.editNumber) {
			setError('Person not found');
		}
	}, [result.data]);

	const submit = (e) => {
		e.preventDefault();
		changeNumber({
			variables: { name, phone }
		});

		setName('');
		setPhone('');
	};

	return (
		<div>
			<h2>Change Number</h2>

			<form onSubmit={submit}>
				<div>
					name{' '}
					<input
						type='text'
						value={name}
						onChange={({ target }) => setName(target.value)}
					/>
				</div>
				<div>
					phone{' '}
					<input
						type='text'
						value={phone}
						onChange={({ target }) => setPhone(target.value)}
					/>
				</div>
				<div>
					<button type='submit'>edit</button>
				</div>
			</form>
		</div>
	);
}

export default PhoneForm;

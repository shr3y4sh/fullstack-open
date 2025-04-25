import { MutableRefObject, useState } from 'react';
import { HospitalEntry } from '../../types';

const Hospital = ({
	discharge
}: {
	discharge: MutableRefObject<Pick<HospitalEntry, 'discharge'> | undefined>;
}) => {
	const [date, setDate] = useState('');
	const [criteria, setCriteria] = useState('');

	if (date.length > 0 && criteria.length > 0) {
		discharge.current = {
			discharge: { criteria, date }
		};
	}

	return (
		<div>
			<label htmlFor='discharge'>Discharge</label>
			<div>
				Date:{' '}
				<input
					type='date'
					value={date}
					onChange={({ target }) => setDate(target.value)}
				/>
			</div>
			<div>
				Criteria:{' '}
				<input
					type='text'
					value={criteria}
					onChange={({ target }) => setCriteria(target.value)}
				/>
			</div>
		</div>
	);
};

export default Hospital;

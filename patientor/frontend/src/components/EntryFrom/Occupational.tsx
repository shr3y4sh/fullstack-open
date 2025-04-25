import { MutableRefObject, useState } from 'react';
import { OccupationalHealthcareEntry } from '../../types';

const Occupational = ({
	occupation
}: {
	occupation: MutableRefObject<
		| Pick<OccupationalHealthcareEntry, 'sickLeave' | 'employerName'>
		| undefined
	>;
}) => {
	const [employer, setEmployer] = useState('');
	const [startSL, setStartSL] = useState('');
	const [endSL, setEndSL] = useState('');

	if (employer.length > 0 && startSL.length > 0 && endSL.length > 0) {
		occupation.current = {
			employerName: employer,
			sickLeave: {
				startDate: startSL,
				endDate: endSL
			}
		};
	}

	return (
		<div>
			<div>
				<label htmlFor='employer'>Employer Name</label>
				<div>
					<input
						type='text'
						value={employer}
						onChange={({ target }) => setEmployer(target.value)}
					/>
				</div>
			</div>
			<div>
				<label htmlFor='sickLeave'>Sick Leave Dates</label>
				<div>
					Start:{' '}
					<input
						type='date'
						value={startSL}
						onChange={({ target }) => setStartSL(target.value)}
					/>
				</div>
				<div>
					End:{' '}
					<input
						type='date'
						value={endSL}
						onChange={({ target }) => setEndSL(target.value)}
					/>
				</div>
			</div>
		</div>
	);
};

export default Occupational;

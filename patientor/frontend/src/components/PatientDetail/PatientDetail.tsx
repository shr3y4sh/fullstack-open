import { useParams } from 'react-router';
import { SyntheticEvent, useEffect, useState } from 'react';

import patientService from '../../services/patients';
import { Entry, EntryFormType, Patient } from '../../types';
import EntryDetail from './EntryDetail/EntryDetail';
import EntryForm from '../EntryFrom/EntryForm';
import { Button } from '@mui/material';

function PatientDetail() {
	const { id } = useParams();

	const [patient, setPatient] = useState<Patient>();

	const [formType, setFormType] = useState<string>();

	let typeProp;

	if (formType) {
		typeProp = Object.values(EntryFormType).find((v) => v === formType);
	}

	useEffect(() => {
		if (id && typeof id === 'string') {
			patientService.getPatient(id).then(({ data }) => {
				setPatient(data);
			});
		}
	}, [id]);

	if (!patient || !id) {
		return null;
	}

	const toggleFormEntry = (e: SyntheticEvent) => {
		if (formType === e.currentTarget.id) {
			setFormType(undefined);
			return;
		}
		setFormType(e.currentTarget.id);
	};

	const entries: Entry[] = patient.entries;

	return (
		<div>
			<h2>{patient.name}</h2>
			<div>
				<p>ssh: {patient.ssn}</p>
				<p>occupation {patient.occupation}</p>
			</div>
			<h3>Add Entry</h3>
			<div>
				<Button
					variant='outlined'
					id={EntryFormType.healthCheckRating}
					onClick={toggleFormEntry}>
					{EntryFormType.healthCheckRating}
				</Button>{' '}
				<Button
					variant='outlined'
					id={EntryFormType.occupationalHealthcare}
					onClick={toggleFormEntry}>
					{EntryFormType.occupationalHealthcare}
				</Button>{' '}
				<Button
					variant='outlined'
					id={EntryFormType.hospital}
					onClick={toggleFormEntry}>
					{EntryFormType.hospital}
				</Button>
			</div>
			{typeProp && (
				<EntryForm
					type={typeProp}
					id={id}
					patientsState={[patient, setPatient]}
				/>
			)}
			<div>
				{entries.length > 0 && (
					<>
						<h3>Entries</h3>
						{entries.map((entry) => (
							<EntryDetail key={entry.id} entry={entry} />
						))}
					</>
				)}
			</div>
		</div>
	);
}

export default PatientDetail;

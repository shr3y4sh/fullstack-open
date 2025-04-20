import { useParams } from 'react-router';
import { useEffect, useState } from 'react';

import patientService from '../../services/patients';
import { Patient } from '../../types';

function PatientDetail() {
	const { id } = useParams();

	const [patient, setPatient] = useState<Patient>();

	useEffect(() => {
		if (id && typeof id === 'string') {
			patientService.getPatient(id).then((data) => {
				setPatient(data);
			});
		}
	}, [id]);

	if (!patient) {
		return null;
	}

	return (
		<div>
			<h2>{patient.name}</h2>
			<p>ssh: {patient.ssn}</p>
			<p>occupation {patient.occupation}</p>
		</div>
	);
}

export default PatientDetail;

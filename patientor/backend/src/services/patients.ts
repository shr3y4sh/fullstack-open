import { v1 as uuid } from 'uuid';

import { NonSensitivePatients, Patient, NewPatient } from '../types';
import patientData from '../../data/patients';

const getPatientsNonSensitive = (): NonSensitivePatients[] => {
	const nonSensitiveData: NonSensitivePatients[] = patientData.map(
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		({ ssn, ...others }) => {
			return {
				...others
			};
		}
	);
	return nonSensitiveData;
};

const getSinglePatient = (id: string): Patient => {
	const requiredPatient = patientData.find((p) => p.id === id);
	if (!requiredPatient) {
		throw new Error('Invalid Id');
	}

	return requiredPatient;
};

const createNewPatient = (object: NewPatient): Patient => {
	const newPatient: Patient = {
		...object,
		id: uuid(),
		entries: []
	};
	patientData.push(newPatient);
	return newPatient;
};

export default {
	getPatientsNonSensitive,
	createNewPatient,
	getSinglePatient
};

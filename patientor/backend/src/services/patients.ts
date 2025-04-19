import { v1 as uuid } from 'uuid';

import { PatientsWithoutSSN, Patient, NewPatient } from '../types';
import patientData from '../../data/patients';

const getPatientsNonSensitive = (): PatientsWithoutSSN[] => {
	const nonSensitiveData: PatientsWithoutSSN[] = patientData.map(
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		({ ssn, ...others }) => {
			return {
				...others
			};
		}
	);
	return nonSensitiveData;
};

const createNewPatient = (object: NewPatient): Patient => {
	const newPatient: Patient = {
		...object,
		id: uuid()
	};
	patientData.push(newPatient);
	return newPatient;
};

export default {
	getPatientsNonSensitive,
	createNewPatient
};

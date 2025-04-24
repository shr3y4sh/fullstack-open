import { v1 as uuid } from 'uuid';

import {
	NonSensitivePatients,
	Patient,
	NewPatient,
	EntryWithoutId,
	Entry,
	Diagnosis
} from '../types';
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

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
	if (!object || typeof object !== 'object' || !('diagnosisCodes' in object))
		return [] as Array<Diagnosis['code']>;

	return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const createNewEntry = (object: EntryWithoutId, id: string): Entry => {
	const patient = patientData.find((p) => p.id === id);

	if (!patient) throw new Error('Invalid Id');

	const newEntry: Entry = {
		...object,
		id: uuid()
	};

	patient.entries.push(newEntry);

	patientData.map((p) => (p.id === id ? patient : p));

	return newEntry;
};

export default {
	getPatientsNonSensitive,
	createNewPatient,
	getSinglePatient,
	createNewEntry,
	parseDiagnosisCodes
};

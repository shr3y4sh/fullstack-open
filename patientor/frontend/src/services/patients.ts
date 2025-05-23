import axios from 'axios';
import { Entry, EntryWithoutId, Patient, PatientFormValues } from '../types';

import { apiBaseUrl } from '../constants';

const getAll = async () => {
	const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

	return data;
};

const getPatient = async (id: string) => {
	const { data, status } = await axios.get<Patient>(
		`${apiBaseUrl}/patients/${id}`
	);
	return { data, status };
};

const createNewEntry = async (object: EntryWithoutId, id: string) => {
	const { data, status } = await axios.post<Entry>(
		`${apiBaseUrl}/patients/${id}/entries`,
		object
	);
	return { data, status };
};

const create = async (object: PatientFormValues) => {
	const { data } = await axios.post<Patient>(
		`${apiBaseUrl}/patients`,
		object
	);

	return data;
};

export default {
	getAll,
	create,
	getPatient,
	createNewEntry
};

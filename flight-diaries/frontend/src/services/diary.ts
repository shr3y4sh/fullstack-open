import axios, { AxiosError } from 'axios';

import { NonSensitiveDiaryEntry, NewDiaryEntry, DiaryEntry } from '../types';

const BASE_URL = 'http://localhost:3000/api/diaries';

export const getEntries = async (): Promise<NonSensitiveDiaryEntry[]> => {
	const res = await axios.get<NonSensitiveDiaryEntry[]>(BASE_URL);
	return res.data;
};

export const addEntry = async (
	object: NewDiaryEntry
): Promise<DiaryEntry | AxiosError> => {
	try {
		const res = await axios.post<DiaryEntry>(BASE_URL, object);
		return res.data;
	} catch (err) {
		return err as AxiosError;
	}
};

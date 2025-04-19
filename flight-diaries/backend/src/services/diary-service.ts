import diaryData from '../../data/diary-entries';
import { DiaryEntry, NonSensitiveDiaryEntry, NewDiaryEntry } from '../types';

const diaries: DiaryEntry[] = diaryData;

const getEntries = () => {
	return diaries;
};

const getNonSensitiveDiaryEntries = (): NonSensitiveDiaryEntry[] => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	return diaries.map(({ comment, ...others }) => {
		return {
			...others
		};
	});
};

const findById = (id: number): DiaryEntry | undefined => {
	const entry = diaries.find((d) => d.id === id);

	return entry;
};

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
	const newDiaryEntry = {
		id: Math.max(...diaries.map((d) => d.id)) + 1,
		...entry
	};

	diaries.push(newDiaryEntry);
	return newDiaryEntry;
};

export default {
	getEntries,
	addDiary,
	getNonSensitiveDiaryEntries,
	findById
};

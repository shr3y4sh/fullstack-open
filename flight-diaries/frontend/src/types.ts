export enum Weather {
	sunny = 'sunny',
	rainy = 'rainy',
	cloudy = 'cloudy',
	windy = 'windy',
	stormy = 'stormy'
}

export enum Visibility {
	great = 'great',
	good = 'good',
	ok = 'ok',
	poor = 'poor'
}

export interface NewDiaryEntry {
	weather: Weather;
	visibility: Visibility;
	date: string;
	comment: string;
}

export interface DiaryEntry extends NewDiaryEntry {
	id: string;
}

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;

export function isDiaryEntry(obj: unknown): obj is DiaryEntry {
	return (
		typeof obj === 'object' &&
		obj !== null &&
		'weather' in obj &&
		'visibility' in obj &&
		'date' in obj &&
		'comment' in obj &&
		'id' in obj
	);
}

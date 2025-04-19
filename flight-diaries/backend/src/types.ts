import { z } from 'zod';
import { newEntrySchema } from './utils';

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

export type NewDiaryEntry = z.infer<typeof newEntrySchema>;

export interface DiaryEntry extends NewDiaryEntry {
	id: number;
}

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;

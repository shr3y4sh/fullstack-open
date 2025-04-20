import { z } from 'zod';

export enum Gender {
	male = 'male',
	female = 'female',
	other = 'other'
}

export interface Diagnosis {
	code: string;
	name: string;
	latin?: string;
}

export const diagnosisEntrySchema = z.object({});

export interface Entry {
	id: string;
}

export const newPatientEntrySchema = z.object({
	name: z.string(),
	dateOfBirth: z.string().date(),
	ssn: z.string(),
	gender: z.nativeEnum(Gender),
	occupation: z.string()
});

export type NewPatient = z.infer<typeof newPatientEntrySchema>;

export interface Patient extends NewPatient {
	id: string;
	entries: Entry[];
}

export type PatientWithoutEntries = Omit<Patient, 'entries'>;

export type NonSensitivePatients = Omit<Patient, 'ssn' | 'entries'>;

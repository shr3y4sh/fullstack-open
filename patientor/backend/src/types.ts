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

export enum HealthCheckRating {
	'Healthy' = 0,
	'LowRisk' = 1,
	'HighRisk' = 2,
	'CriticalRisk' = 3
}

export interface BaseEntry {
	id: string;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface HealthCheckEntry extends BaseEntry {
	type: 'HealthCheck';
	healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
	type: 'OccupationalHealthcare';
	employerName: string;
	sickLeave?: {
		startDate: string;
		endDate: string;
	};
}

export interface HospitalEntry extends BaseEntry {
	type: 'Hospital';
	discharge: {
		date: string;
		criteria: string;
	};
}

export type Entry =
	| HospitalEntry
	| OccupationalHealthcareEntry
	| HealthCheckEntry;

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

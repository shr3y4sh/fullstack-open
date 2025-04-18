import { z } from 'zod';

enum Gender {
	male = 'male',
	female = 'female'
}

export interface Diagnosis {
	code: string;
	name: string;
	latin?: string;
}

export const newPatientEntrySchema = z.object({
	name: z.string(),
	dateOfBirth: z.string().date(),
	ssn: z.string(),
	gender: z.nativeEnum(Gender),
	occupation: z.string()
});

export interface Patient extends z.infer<typeof newPatientEntrySchema> {
	id: string;
}

export type PatientsWithoutSSN = Omit<Patient, 'ssn'>;

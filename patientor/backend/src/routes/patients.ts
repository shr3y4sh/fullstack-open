import express, { Response, Request, NextFunction } from 'express';
import patientService from '../services/patients';

import {
	NonSensitivePatients,
	newPatientEntrySchema,
	NewPatient,
	Patient
} from '../types';

const router = express.Router();

const patientEntry = (req: Request, _res: Response, next: NextFunction) => {
	try {
		newPatientEntrySchema.parse(req.body);
		next();
	} catch (error) {
		next(error);
	}
};

router.get('/', (_req, res: Response<NonSensitivePatients[]>) => {
	res.status(200).send(patientService.getPatientsNonSensitive());
});

router.get(
	'/:id',
	(req: Request, res: Response<Patient>, next: NextFunction) => {
		const { id } = req.params;

		try {
			const patient: Patient = patientService.getSinglePatient(id.trim());
			res.status(200).send(patient);
		} catch (error) {
			if (error instanceof Error) {
				next(error);
			} else {
				console.log(error);
			}
		}
	}
);

router.post(
	'/',
	patientEntry,
	(req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
		res.status(201).send(patientService.createNewPatient(req.body));
	}
);

export default router;

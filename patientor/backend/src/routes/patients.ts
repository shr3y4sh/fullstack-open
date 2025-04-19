import express, { Response, Request, NextFunction } from 'express';
import patientService from '../services/patients';

import {
	PatientsWithoutSSN,
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

router.get('/', (_req, res: Response<PatientsWithoutSSN[]>) => {
	res.status(200).send(patientService.getPatientsNonSensitive());
});

router.post(
	'/',
	patientEntry,
	(req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
		res.status(201).send(patientService.createNewPatient(req.body));
	}
);

export default router;

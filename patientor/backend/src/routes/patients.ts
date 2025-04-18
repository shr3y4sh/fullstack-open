import express, { Response } from 'express';

import { PatientsWithoutSSN } from '../types';

import patientData from '../../data/patients';

const router = express.Router();

router.get('/', (_req, res: Response<PatientsWithoutSSN[]>) => {
	const nonSensitiveData: PatientsWithoutSSN[] = patientData.map(
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		({ ssn, ...others }) => {
			return {
				...others
			};
		}
	);
	res.status(200).send(nonSensitiveData);
});

export default router;

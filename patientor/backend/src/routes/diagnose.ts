import express, { Response } from 'express';

import { Diagnosis } from '../types';

import diagnoseData from '../../data/diagnoses';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
	res.status(200).send(diagnoseData);
});

export default router;

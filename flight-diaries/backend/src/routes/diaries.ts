import express, { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

import diaryService from '../services/diary-service';
import { NonSensitiveDiaryEntry, NewDiaryEntry, DiaryEntry } from '../types';
import { newEntrySchema } from '../utils';

const router = express.Router();

const newDiaryParser = (req: Request, _res: Response, next: NextFunction) => {
	try {
		newEntrySchema.parse(req.body);
		next();
	} catch (error: unknown) {
		next(error);
	}
};

const errorMiddleware = (
	error: unknown,
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	if (error instanceof z.ZodError) {
		res.status(400).send({ error: error.issues });
	} else {
		next(error);
	}
};

router.get('/', (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
	res.send(diaryService.getNonSensitiveDiaryEntries());
});

router.get('/:id', (req, res) => {
	const diary = diaryService.findById(Number(req.params.id));
	if (!diary) {
		res.sendStatus(404);
	} else {
		res.send(diary);
	}
});

router.post(
	'/',
	newDiaryParser,
	(
		req: Request<unknown, unknown, NewDiaryEntry>,
		res: Response<DiaryEntry>
	) => {
		const addedEntry = diaryService.addDiary(req.body);
		res.json(addedEntry);
	}
);

router.use(errorMiddleware);

export default router;

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import bmiCalculator from './bmi-calculator';
import calculator, { Operation } from './calculator';
import { exercisecalculator, AverageExercise } from './exercise-calculator';

const app = express();

app.use(express.json());

app.get('/ping', (_req, res) => {
	res.send('ping');
});

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
	const { height, weight } = req.query;

	const height_t = Number(height);
	const weight_t = Number(weight);

	let bmi: string;

	try {
		bmi = bmiCalculator(weight_t, height_t);
	} catch (error) {
		console.log(error);
		res.send({ error: 'malformed parameters' });
		return;
	}

	res.send({
		weight,
		height,
		bmi
	});
});

app.post('/calculate', (req, res) => {
	const { value1, value2, op } = req.body;

	const result = calculator(Number(value1), Number(value2), op as Operation);
	res.send({ result });
});

app.post('/exercises', (req, res) => {
	const dailyExercises: number[] = req.body.daily_exercises;
	const target: number = req.body.target;

	if (!(dailyExercises && target)) {
		res.send({ error: 'parameters missing' });
		return;
	}

	if (
		isNaN(Number(target)) ||
		!dailyExercises.every((elem) => typeof elem === 'number')
	) {
		res.send({ error: 'malformed parameters' });
		return;
	}

	const result: AverageExercise = exercisecalculator(target, dailyExercises);

	res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on localhost:${PORT}`);
});

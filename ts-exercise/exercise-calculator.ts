export interface AverageExercise {
	periodLength: number;
	trainingDays: number;
	target: number;
	avgTime: number;
	targetSuccess: boolean;
	rating: 0 | 1 | 2 | 3;
	ratingDescription: string;
}

export const exercisecalculator = (
	target: number,
	hoursPerDayData: number[]
): AverageExercise => {
	const periodLength = hoursPerDayData.length;
	const trainingDays = hoursPerDayData.filter(
		(element) => element != 0
	).length;
	const avgTime =
		Math.round(
			(hoursPerDayData.reduce((sum, elem) => sum + elem) / periodLength) *
				1000
		) / 1000;
	const targetSuccess = avgTime >= target;

	let rating: 0 | 1 | 2 | 3;
	let ratingDescription: string;

	if (avgTime >= target * 1.5) {
		rating = 3;
		ratingDescription = 'Exceed expectations';
	} else if (avgTime >= target * 0.9) {
		rating = 2;
		ratingDescription = 'Good Job';
	} else if (avgTime >= target * 0.4) {
		rating = 1;
		ratingDescription = 'Can do better';
	} else {
		rating = 0;
		ratingDescription = 'Disappointed';
	}
	return {
		periodLength,
		trainingDays,
		target,
		avgTime,
		targetSuccess,
		rating,
		ratingDescription
	};
};

export const validInputs = (inputs: string[]): boolean => {
	let result = true;

	result = inputs.every((element) => !isNaN(Number(element)));

	return result;
};

if (require.main === module) {
	try {
		if (!validInputs(process.argv.slice(2)))
			throw new Error('Invalid inputs');

		const target = Number(process.argv[2]);
		const hoursPerDayData = process.argv
			.slice(3)
			.map((elem) => Number(elem));

		console.log(exercisecalculator(target, hoursPerDayData));
	} catch (error) {
		console.log(error);
	}
}

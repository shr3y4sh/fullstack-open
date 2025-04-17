const bmiCalculator = (weight: number, height: number): string => {
	if (isNaN(weight) || isNaN(height)) throw new Error('Invalid arguments');
	if (height === 0) throw new Error('Height cannot be 0');
	height = height / 100;
	const bmi = weight / (height * height);

	if (bmi < 16.0) {
		return 'Underweight (Severe thinnness)';
	} else if (bmi <= 16.9) {
		return 'Underwwight (Moderate thinness)';
	} else if (bmi <= 18.4) {
		return 'Underweight (mild thinness)';
	} else if (bmi <= 24.9) {
		return 'Normal range';
	} else if (bmi <= 29.9) {
		return 'Overweight (Pre obese)';
	} else if (bmi <= 34.9) {
		return 'Obese (class I)';
	} else if (bmi <= 39.9) {
		return 'Obese (class II)';
	} else {
		return 'Obese (class III)';
	}
};

export default bmiCalculator;

if (require.main === module) {
	try {
		const [height, weight] = process.argv.slice(2, 4);

		console.log(bmiCalculator(Number(weight), Number(height)));
	} catch (error) {
		console.log(error);
	}
}

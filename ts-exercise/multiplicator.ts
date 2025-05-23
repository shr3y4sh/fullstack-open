interface MultipliedValues {
	value1: number;
	value2: number;
}

const parsedArguments = (args: string[]): MultipliedValues => {
	if (args.length < 4) throw new Error('Not enough arguments');

	if (args.length > 4) throw new Error('Too many arguments');

	if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
		return {
			value1: Number(args[2]),
			value2: Number(args[3])
		};
	} else {
		throw new Error('Provided values not numbers');
	}
};

const multiplicator = (a: number, b: number, printText: string) => {
	console.log(printText, a * b);
};

try {
	const { value1, value2 } = parsedArguments(process.argv);

	multiplicator(
		value1,
		value2,
		`Multiplied ${value1} and ${value2}, the result is: `
	);
} catch (error: unknown) {
	let errorMessage = 'Error: ';
	if (error instanceof Error) {
		errorMessage += error.message;
	}

	console.log(errorMessage);
}

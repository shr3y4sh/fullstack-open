export type Operation = 'multipy' | 'add' | 'divide';

const calculator = (a: number, b: number, op: Operation): number => {
	switch (op) {
		case 'multipy':
			return a * b;
		case 'add':
			return a + b;
		case 'divide':
			if (b === 0) throw new Error('cannot divide by zero');
			return a / b;
		default:
			throw new Error(
				'Operation should be one of "multipy", "add" or "divide".'
			);
	}
};

export default calculator;

if (require.main === module) {
	try {
		console.log(calculator(1, 5, 'divide'));
	} catch (error: unknown) {
		let errorMessage = 'Something went wrong: ';

		if (error instanceof Error) {
			errorMessage += error.message;
		}

		console.log(errorMessage);
	}
}

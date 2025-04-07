import { useState } from 'react';

export const useField = (type) => {
	const [value, setValue] = useState('');

	function onChange(e) {
		setValue(e.target.value);
	}

	function reset() {
		console.log('whats happening?');

		setValue('');
	}

	return {
		type,
		value,
		onChange,
		reset
	};
};

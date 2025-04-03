import React from 'react';
import { render, screen } from '@testing-library/react';
import { Note } from './Note';

test('renders content', () => {
	const note = {
		content: 'Component testing is done with react-testing-library',
		important: true
	};

	render(<Note notes={note} />);

	const element = screen.getByText(
		'Component testing is done with react-testing-library'
	);
	expect(element).toBeDefined();
});

import { useState, useImperativeHandle, forwardRef } from 'react';
import PropTypes from 'prop-types';

import React from 'react';

const Togglable = forwardRef(({ buttonLabel, children }, ref) => {
	const [visible, setVisible] = useState(false);
	const hideWhenVisible = { display: visible ? 'none' : '' };
	const showWhenVisible = { display: visible ? '' : 'none' };

	function toggleVisibility() {
		setVisible((v) => !v);
	}

	useImperativeHandle(ref, () => {
		return {
			toggleVisibility
		};
	});

	return (
		<div>
			<div style={hideWhenVisible}>
				<button onClick={toggleVisibility}>{buttonLabel}</button>
			</div>
			<div style={showWhenVisible}>
				{children}
				<button onClick={toggleVisibility}>Cancel</button>
			</div>
		</div>
	);
});
Togglable.displayName = 'Togglable';

Togglable.propTypes = {
	buttonLabel: PropTypes.string.isRequired,
	children: PropTypes.func
};

export default Togglable;

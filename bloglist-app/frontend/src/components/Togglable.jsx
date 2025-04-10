import { useState, useImperativeHandle } from 'react';
import React from 'react';
import { Button } from '@mui/material';

const Togglable = ({ buttonLabel, children, ref }) => {
	const [visible, setVisible] = useState(false);
	const hideWhenVisible = { display: visible ? 'none' : '' };
	const showWhenVisible = { display: visible ? '' : 'none' };

	function toggleVisibility() {
		setVisible((v) => !v);
	}

	useImperativeHandle(ref, () => {
		return {
			visible,
			toggleVisibility
		};
	});

	if (!visible) {
		return null;
	}

	return (
		<div style={{ textAlign: 'center' }}>
			<div style={hideWhenVisible}>
				<Button variant='contained' onClick={toggleVisibility}>
					{buttonLabel}
				</Button>
			</div>
			<div style={showWhenVisible}>{children}</div>
		</div>
	);
};

export default Togglable;

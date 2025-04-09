import { useState } from 'react';
import React from 'react';

const Togglable = ({ buttonLabel, children }) => {
	const [visible, setVisible] = useState(false);
	const hideWhenVisible = { display: visible ? 'none' : '' };
	const showWhenVisible = { display: visible ? '' : 'none' };

	function toggleVisibility() {
		setVisible((v) => !v);
	}

	return (
		<div style={{ textAlign: 'center' }}>
			<div style={hideWhenVisible}>
				<button className='btn' onClick={toggleVisibility}>
					{buttonLabel}
				</button>
			</div>
			<div style={showWhenVisible}>
				{children}
				<button onClick={toggleVisibility} className='btn'>
					Cancel
				</button>
			</div>
		</div>
	);
};

export default Togglable;

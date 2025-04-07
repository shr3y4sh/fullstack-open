import React from 'react';
import PropTypes from 'prop-types';

export default function Notification({ message }) {
	if (!message) {
		return null;
	}

	return <div className='error'>{message}</div>;
}

Notification.propTypes = {
	message: PropTypes.string.isRequired
};

/* eslint-disable react/prop-types */
import React, { useReducer } from 'react';
import {
	NotificationContext,
	NotificationDispatch
} from './notification-context';
import { notificationReducer } from './notification-context';

const NotificationProvider = ({ children }) => {
	const [notification, dispatch] = useReducer(notificationReducer, null);
	return (
		<NotificationContext.Provider value={notification}>
			<NotificationDispatch.Provider value={dispatch}>
				{children}
			</NotificationDispatch.Provider>
		</NotificationContext.Provider>
	);
};

export default NotificationProvider;

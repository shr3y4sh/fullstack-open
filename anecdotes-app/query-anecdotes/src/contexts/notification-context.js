import { createContext, useContext } from 'react';

export const NotificationContext = createContext();

export const NotificationDispatch = createContext();

export const notificationReducer = (state, action) => {
	switch (action.type) {
		case 'SET_NOTIFICATION':
			return action.payload;
		case 'CLEAR_NOTIFICATION':
			return null;
		default:
			return state;
	}
};

export function useNotificationValue() {
	return useContext(NotificationContext);
}

export function useNotificationDispatch() {
	return useContext(NotificationDispatch);
}

export function setNotification(dispatch, message) {
	dispatch({ type: 'SET_NOTIFICATION', payload: message });
	setTimeout(() => {
		dispatch({ type: 'CLEAR_NOTIFICATION' });
	}, 3000);
}

import { createContext, useContext } from 'react';

export const NotificationContext = createContext(null);

export const NotificationsDispatch = createContext(null);

export const notificationReducer = (state, action) => {
	switch (action.type) {
		case 'SHOW':
			return { message: action.payload, error: action.isError };

		case 'DESTROY':
			return null;

		default:
			return state;
	}
};

export const useSetNotifications = () => {
	const dispatch = useContext(NotificationsDispatch);

	return (message, isError) => {
		dispatch({
			type: 'SHOW',
			payload: message,
			isError
		});

		setTimeout(() => {
			dispatch({
				type: 'DESTROY'
			});
		}, 3500);
	};
};

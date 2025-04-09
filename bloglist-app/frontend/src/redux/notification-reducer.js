import { createContext, useContext } from 'react';

export const NotificationContext = createContext(null);

export const NotificationsDispatch = createContext(null);

export const notificationReducer = (state, action) => {
	switch (action.type) {
		case 'SHOW':
			return action.payload;

		case 'DESTROY':
			return null;

		default:
			return state;
	}
};

export const useSetNotifications = () => {
	const dispatch = useContext(NotificationsDispatch);

	return (message) => {
		dispatch({
			type: 'SHOW',
			payload: message
		});

		setTimeout(() => {
			dispatch({
				type: 'DESTROY'
			});
		}, 3500);
	};
};

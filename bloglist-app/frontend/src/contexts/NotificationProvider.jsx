import { useReducer } from 'react';
import {
	NotificationContext,
	NotificationsDispatch,
	notificationReducer
} from './notification-reducer';

const NotificationProvider = ({ children }) => {
	const [notifications, dispatch] = useReducer(notificationReducer, null);

	return (
		<NotificationContext.Provider value={notifications}>
			<NotificationsDispatch.Provider value={dispatch}>
				{children}
			</NotificationsDispatch.Provider>
		</NotificationContext.Provider>
	);
};

export default NotificationProvider;

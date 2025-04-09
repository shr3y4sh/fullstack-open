import { configureStore } from '@reduxjs/toolkit';

import notificationReducer from './notification-reducer';
import blogsReducer from './blogs-reducer';
import userReducer from './user-reducer';

const store = configureStore({
	reducer: {
		notifications: notificationReducer,
		blogs: blogsReducer,
		user: userReducer
	}
});

export default store;

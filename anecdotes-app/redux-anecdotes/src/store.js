import { configureStore } from '@reduxjs/toolkit';
import anecdoteReducer from './reducers/anecdoteReducer';
import filterReducer from './reducers/filterReducer';
import notificationReducer from './reducers/notification-reducer';

const store = configureStore({
	reducer: {
		anecdotes: anecdoteReducer,
		filter: filterReducer,
		notification: notificationReducer
	}
});

export default store;

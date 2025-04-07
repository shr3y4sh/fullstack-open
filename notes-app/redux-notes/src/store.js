import noteReducer from './reducers/note-reducer.js';
import filterReducer from './reducers/filter-reducer.js';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
	reducer: {
		notes: noteReducer,
		filter: filterReducer
	}
});

export default store;

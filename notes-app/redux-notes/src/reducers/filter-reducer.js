import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
	name: 'filter',
	initialState: 'ALL',
	reducers: {
		filterChange(state, action) {
			state = action.payload;
			return state;
		}
	}
});

export default filterSlice.reducer;

export const { filterChange } = filterSlice.actions;

import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
	name: 'counter',

	initialState: {
		value: 0
	},

	reducers: {
		increment: (state) => {
			state.value++;
		},
		decrement: (state) => {
			state.value--;
		},
		zero: (state) => {
			state.value = 0;
		},
		amountAdd: (state, action) => {
			state.value += action.payload;
		}
	}
});

export const { increment, decrement, zero, amountAdd } = counterSlice.actions;

export default counterSlice.reducer;

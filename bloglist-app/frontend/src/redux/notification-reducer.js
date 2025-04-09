import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
	name: 'notifications',

	initialState: null,

	reducers: {
		show(_state, action) {
			return action.payload;
		},

		destroy() {
			return null;
		}
	}
});

const { show, destroy } = notificationSlice.actions;

export default notificationSlice.reducer;

export const setNotification = (message) => {
	return (dispatch) => {
		dispatch(show(message));

		setTimeout(() => {
			dispatch(destroy());
		}, 3500);
	};
};

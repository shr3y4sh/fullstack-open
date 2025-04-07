import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
	name: 'notification',
	initialState: null,

	reducers: {
		showNotification(state, action) {
			return action.payload;
		},

		removeNotification() {
			return null;
		}
	}
});

export const setNotification = (content, timeInSeconds = 3) => {
	return async (dispatch) => {
		setTimeout(() => {
			dispatch(removeNotification());
		}, timeInSeconds * 1000);

		dispatch(showNotification(content));
	};
};

export const { showNotification, removeNotification } =
	notificationSlice.actions;

export default notificationSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

import { login } from '../services/login';

const userSlice = createSlice({
	name: 'user',

	initialState: null,

	reducers: {
		setUser(_state, action) {
			return action.payload;
		},

		removeUser() {
			return null;
		}
	}
});

const { setUser, removeUser } = userSlice.actions;

export const setExistingLoggedUser = () => {
	return (dispatch) => {
		let user = localStorage.getItem('userLogged');

		if (!user) {
			return;
		}

		user = JSON.parse(user);

		dispatch(setUser(user));
	};
};

export const loginUser = (userInput) => {
	return async (dispatch) => {
		const user = await login(userInput);

		dispatch(setUser(user));

		localStorage.setItem('userLogged', JSON.stringify(user));
	};
};

export const logoutUser = () => {
	return (dispatch) => {
		localStorage.removeItem('userLogged');
		dispatch(removeUser());
	};
};

export default userSlice.reducer;

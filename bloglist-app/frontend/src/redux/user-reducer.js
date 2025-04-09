import { createContext, useContext } from 'react';

import { login } from '../services/login';

export const UserContext = createContext(null);
export const UserDispatch = createContext(null);

export const userReducer = (state, action) => {
	switch (action.type) {
		case 'SetUser':
			return action.payload;

		case 'RemoveUser':
			return null;

		default:
			return state;
	}
};

export const useUserLogin = () => {
	const dispatch = useContext(UserDispatch);
	const userLoggedIn = useContext(UserContext);

	return {
		data: userLoggedIn,
		setExistingLoggedUser: () => {
			let user = localStorage.getItem('userLogged');
			if (!user) {
				return;
			}
			user = JSON.parse(user);
			dispatch({
				type: 'SetUser',
				payload: user
			});
		},

		loginUser: async (userInput) => {
			const user = await login(userInput);

			dispatch({
				type: 'SetUser',
				payload: user
			});

			localStorage.setItem('userLogged', JSON.stringify(user));
		},

		logoutUser: () => {
			localStorage.removeItem('userLogged');
			dispatch({
				type: 'RemoveUser'
			});
		}
	};
};

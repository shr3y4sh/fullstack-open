import { useReducer } from 'react';
import { userReducer, UserContext, UserDispatch } from './user-reducer';

import React from 'react';

const UserProvider = ({ children }) => {
	const [user, dispatch] = useReducer(userReducer, null);

	return (
		<UserContext.Provider value={user}>
			<UserDispatch.Provider value={dispatch}>
				{children}
			</UserDispatch.Provider>
		</UserContext.Provider>
	);
};

export default UserProvider;

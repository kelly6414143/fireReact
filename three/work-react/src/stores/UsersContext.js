import React, { useState } from 'react';
import { createContext } from 'use-context-selector';

export const UsersContext = createContext(null);

const UsersProvider = ({ children }) => {
    const [usersInfo, setUsersInfo] = useState([])

    const store = {
        getUsersInfo: usersInfo,
        setUsersInfo: setUsersInfo,
    }

    return (
        <UsersContext.Provider value={store}>
            {children}
        </UsersContext.Provider>
    );
};

export default UsersProvider;
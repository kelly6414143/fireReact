import React, { useState } from 'react';
import { createContext } from 'use-context-selector';

export const UsersRowContext = createContext(null);

const UsersRowProvider = ({ children }) => {
    const [usersInfo, setUsersInfo] = useState({})

    const setClearUserInfo = () => {
        setUsersInfo({})
    }

    const store = {
        getUsersInfo: usersInfo,
        setUsersInfo: setUsersInfo,
        setClearUserInfo: setClearUserInfo
    }

    return (
        <UsersRowContext.Provider value={store}>
            {children}
        </UsersRowContext.Provider>
    );
};

export default UsersRowProvider;
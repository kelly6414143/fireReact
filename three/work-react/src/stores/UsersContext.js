import React, { useState } from 'react';
import { createContext } from 'use-context-selector';

export const UsersContext = createContext(null);

const UsersProvider = ({ children }) => {
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
        <UsersContext.Provider value={store}>
            {children}
        </UsersContext.Provider>
    );
};

export default UsersProvider;
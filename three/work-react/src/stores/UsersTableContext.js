import React, { useState } from 'react';
import { createContext } from 'use-context-selector';

export const UsersTableContext = createContext(null);

const UsersTableProvider = ({ children }) => {
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
        <UsersTableContext.Provider value={store}>
            {children}
        </UsersTableContext.Provider>
    );
};

export default UsersTableProvider;
import React, { useState } from 'react';
import { createContext } from 'use-context-selector';

interface IContextProps {
}

export const UsersRowContext = createContext({} as IContextProps);

const UsersRowProvider = ({ children }: any) => {
    const [usersInfo, setUsersInfo] = useState({})

    const setClearUserInfo = () => {
        setUsersInfo({})
    }

    const store = {
        // getUsersInfo: usersInfo,
        // setUsersInfo: setUsersInfo,
        // setClearUserInfo: setClearUserInfo
    }

    return (
        <UsersRowContext.Provider value={store}>
            {children}
        </UsersRowContext.Provider>
    );
};

export default UsersRowProvider;
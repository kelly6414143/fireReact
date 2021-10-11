import React, { useState } from 'react';
import { createContext } from 'use-context-selector';

type userInfostate = Array<any>

interface IContextProps {
}


export const UsersTableContext = createContext({} as IContextProps);

const UsersTableProvider = ({ children }: any) => {
    const [usersInfo, setUsersInfo] = useState({})

    const store = {
        // getUsersInfo: usersInfo,
        // setUsersInfo: setUsersInfo
    }

    return (
        <UsersTableContext.Provider value={store}>
            {children}
        </UsersTableContext.Provider>
    );
};

export default UsersTableProvider;
import React, { useState } from 'react';
import { createContext } from 'use-context-selector';

interface IUserInfo {
    users?: [{ [index: string]: any }];
    pageInfo?: {[index:string]:any};
}

interface IContextProps {
    getUsersInfo: IUserInfo;
    setUsersInfo: ({}:{}) => void;
}

export const UsersTableContext = createContext({} as IContextProps);

const UsersTableProvider = ({ children }: any) => {
    const [usersInfo, setUsersInfo] = useState<IUserInfo>({})

    const store = {
        getUsersInfo: usersInfo,
        setUsersInfo: setUsersInfo
    }

    return (
        <UsersTableContext.Provider value={store}>
            {children}
        </UsersTableContext.Provider>
    );
};

export default UsersTableProvider;
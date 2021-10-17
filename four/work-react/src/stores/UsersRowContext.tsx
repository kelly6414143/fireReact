import React, { ReactNode, useState } from 'react';
import { createContext } from 'use-context-selector';

interface IUserInfo {
    users?: [{ [index: string]: any }];
    pageInfo?: {[index:string]:any};
}

interface IContextProps {
    getUsersInfo: IUserInfo;
    setUsersInfo: ({}:{}) => void;
}

export const UsersRowContext = createContext({} as IContextProps);

const UsersRowProvider: React.FC = ({ children }: { children?: ReactNode }) => {
    const [usersInfo, setUsersInfo] = useState<IUserInfo>({})

    const store = {
        getUsersInfo: usersInfo,
        setUsersInfo: setUsersInfo
    }

    return (
        <UsersRowContext.Provider value={store}>
            {children}
        </UsersRowContext.Provider>
    );
};

export default UsersRowProvider;
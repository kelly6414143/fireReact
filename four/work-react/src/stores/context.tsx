import React, { useState, ReactNode } from 'react';

import { createContext } from 'use-context-selector';

interface IUserInfostate {
  name?: string;
}

interface IContextProps {
  getUserInfo?: IUserInfostate;
  setUserInfo: (c:IUserInfostate) => void;
}

export const context = createContext({} as IContextProps);


const Provider: React.FC = ({ children }:{children?: ReactNode}) => {
    const [userInfo, setUserInfo] = useState<IUserInfostate>({});

    const store = {
        getUserInfo: userInfo,
        setUserInfo: setUserInfo
    }

    return (
      <context.Provider value={store}>
        {children}
      </context.Provider>
    );
  };

export default Provider;


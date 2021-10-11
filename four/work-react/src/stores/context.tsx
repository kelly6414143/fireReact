import React, { useState } from 'react';

import { createContext } from 'use-context-selector';

type userInfostate = Array<any>

interface IContextProps {
  userInfo: userInfostate;
  drawerInfo: userInfostate;
}

export const context = createContext({} as IContextProps);

const Provider = ({ children }:any) => {
    const [userInfo, setUserInfo] = useState({});
    const [drawerInfo, setDrawerInfo] = useState({})

    const store = {
        userInfo : [userInfo, setUserInfo],
        drawerInfo: [drawerInfo, setDrawerInfo]
    }

    return (
      <context.Provider value={store}>
        {children}
      </context.Provider>
    );
  };

export default Provider;


import React, { useState } from 'react';

import { createContext } from 'use-context-selector';

export const context = createContext(null);

const Provider = ({ children }) => {
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


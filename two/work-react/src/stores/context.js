import React, { useState } from 'react';

import { createContext } from 'use-context-selector';

export const context = createContext(null);

const Provider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});

    const store = {
        userInfo : [userInfo, setUserInfo]
    }

    return (
      <context.Provider value={store}>
        {children}
      </context.Provider>
    );
  };

export default Provider;


import React, { useState } from 'react';

import { createContext } from 'use-context-selector';

export const context = createContext(null);

const Provider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});

    const store = {
        userInfo: userInfo,
        setUserInfo: setUserInfo
    }

    return (
      <context.Provider value={store}>
        {children}
      </context.Provider>
    );
  };

  console.log("context", context)

export default Provider;


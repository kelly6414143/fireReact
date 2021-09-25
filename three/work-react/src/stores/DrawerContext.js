import React, { useState } from 'react';
import { createContext } from 'use-context-selector';

export const DrawerContext = createContext(null);

const DrawerProvider = ({ children }) => {
  const [drawerInfo, setDrawerInfo] = useState({ isExtendDrawer: true })
  const [menuInfo, setMenuInfo] = useState([])

  const store = {
    getDrawerInfo: drawerInfo,
    setDrawerInfo: setDrawerInfo,
    getMenuInfo: menuInfo,
    setMenuInfo: setMenuInfo,
  }

  return (
    <DrawerContext.Provider value={store}>
      {children}
    </DrawerContext.Provider>
  );
};

export default DrawerProvider;
import React, { useState } from 'react';
import { createContext } from 'use-context-selector';

export const DrawerContext = createContext(null);

const DrawerProvider = ({ children }) => {
  const [drawerInfo, setDrawerInfo] = useState({ isExtendDrawer: true })
  const [menuInfo, setMenuInfo] = useState([])

  const clearMenuInfoChildShow = () => {
    menuInfo.forEach((el) => {
      el.isShowChild = false
    });
    setMenuInfo(menuInfo);
  }

  const store = {
    getDrawerInfo: drawerInfo,
    setDrawerInfo: setDrawerInfo,
    getMenuInfo: menuInfo,
    setMenuInfo: setMenuInfo,
    clearMenuInfoChildShow: clearMenuInfoChildShow
  }

  return (
    <DrawerContext.Provider value={store}>
      {children}
    </DrawerContext.Provider>
  );
};

export default DrawerProvider;
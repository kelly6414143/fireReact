import React, { useState } from 'react';
import { createContext } from 'use-context-selector';

interface ImenuObject {
  isShowChild?: boolean
} 

type drawerType = {
  isExtendDrawer: boolean
}

type menustate = Array<ImenuObject>;

interface IContextProps {
  getDrawerInfo: drawerType;
  setDrawerInfo: (isExtendDrawer:drawerType) => void;
  getMenuInfo?: menustate;
  setMenuInfo: ([]:IMenustate[])=>void;
}

interface IMenustate {
  
}

export const DrawerContext = createContext({} as IContextProps);

const DrawerProvider = ({ children }: any) => {
  const [drawerInfo, setDrawerInfo] = useState({ isExtendDrawer: true })
  const [menuInfo, setMenuInfo] = useState<IMenustate[]>([])

  const store = {
    getDrawerInfo: drawerInfo,
    setDrawerInfo: setDrawerInfo,
    getMenuInfo: menuInfo,
    setMenuInfo:setMenuInfo
  }

  return (
    <DrawerContext.Provider value={store}>
      {children}
    </DrawerContext.Provider>
  );
};

export default DrawerProvider;
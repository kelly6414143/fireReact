import React, { useState } from 'react';
import { createContext } from 'use-context-selector';

interface ImenuObject {
  isShowChild?: boolean
} 

type drawerType = {
  isExtendDrawer: boolean
}

type drawerstate = Array<any>;

type menustate = Array<ImenuObject>;

interface IContextProps {
  getDrawerInfo?: drawerType;
  setDrawerInfo?: (isExtendDrawer:drawerType) => void;
  getMenuInfo?: menustate;
  // setMenuInfo?: ([])=>void;
  // clearMenuInfoChildShow?: () => void
}

export const DrawerContext = createContext({} as IContextProps);

const DrawerProvider = ({ children }: any) => {
  const [drawerInfo, setDrawerInfo] = useState({ isExtendDrawer: true })
  const [menuInfo, setMenuInfo] = useState([])

  // const clearMenuInfoChildShow = () => {
  //   menuInfo.forEach((el: ImenuObject) => {
  //     el.isShowChild = false
  //   });
  //   setMenuInfo(menuInfo);
  // }

  const store = {
    getDrawerInfo: drawerInfo,
    setDrawerInfo: setDrawerInfo,
    getMenuInfo: menuInfo,
    // setMenuInfo: setMenuInfo,
    // clearMenuInfoChildShow: clearMenuInfoChildShow
  }

  return (
    <DrawerContext.Provider value={store}>
      {children}
    </DrawerContext.Provider>
  );
};

export default DrawerProvider;
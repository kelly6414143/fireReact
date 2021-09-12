import React from "react";
import { withRouter } from "react-router-dom";
import { useContextSelector } from 'use-context-selector';
import { context } from '@/stores/context'

function Header(props) {

  const { history: { replace }, containerClassName } = props

  const userInfo = useContextSelector(context, state => state.userInfo[0]);

  return (
    <div className={`flex justify-between items-center p-6 border border-gray-800 ${containerClassName}`}>
      <div className="text-base font-bold cursor-pointer" onClick={() => replace("/")}>LOGO</div>
      <div className="flex items-center">
        <span className="mx-2 text-xs">{`${userInfo.name}(${userInfo.username})`}</span>
        <div onClick={() => {
          replace('/login')
        }}>登出</div>
      </div>
    </div>
  );
}

export default withRouter(Header)
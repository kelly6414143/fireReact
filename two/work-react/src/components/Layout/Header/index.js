import React from "react";
import { withRouter } from "react-router-dom";

function Header(props) {

  const { history: {replace}, containerClassName } = props

  return (
    <div className={`flex justify-between items-center p-6 border border-gray-800 ${containerClassName}`}>
      <div className="text-base font-bold cursor-pointer" onClick={()=> replace("/")}>LOGO</div>
      <div onClick={() => {
        sessionStorage.removeItem('userToken')
        replace('/login')
      }}>登出</div>
    </div>
  );
}

export default withRouter(Header)
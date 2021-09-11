import React from "react";
import { withRouter } from "react-router-dom";

function Header(props) {

  const { history: {replace}, containerClassName } = props

  return (
    <div className={`flex justify-between items-center p-6 shadow-md ${containerClassName}`}>
      <div className="text-base font-bold">LOGO</div>
      <div onClick={() => {
        sessionStorage.removeItem('userToken')
        replace('/login')
      }}>登出</div>
    </div>
  );
}

export default withRouter(Header)
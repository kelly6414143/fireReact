import React from "react";
import { withRouter } from "react-router-dom";
import { useContextSelector } from "use-context-selector";
import { context } from "@/stores/context";

function Header({
    history: { replace },
    containerClassName,
  }) {

  const userInfo = useContextSelector(context, (state) => state.userInfo[0]);
  const drawerInfo = useContextSelector(
    context,
    (state) => state.drawerInfo[0]
  );
  const setDrawerInfo = useContextSelector(
    context,
    (state) => state.drawerInfo[1]
  );

  return (
    <div
      className={`flex justify-between items-center p-6 border border-gray-800 ${containerClassName}`}
    >
      <div className="flex">
        <div
          className="text-base font-bold cursor-pointer mr-5"
          onClick={() => replace("/")}
        >
          LOGO
        </div>
        <div
          className={`flex flex-col justify-around items-center border border-black p-1`}
          onClick={() =>
            setDrawerInfo({
              ...drawerInfo,
              isExtendDrawer: !drawerInfo.isExtendDrawer,
            })
          }
        >
          {["", "", ""].map((el, idx) => {
            return (
              <div
                className={`w-5 bg-black`}
                style={{ height: "1px" }}
                key={idx}
              />
            );
          })}
        </div>
      </div>
      <div className="flex items-center">
        {userInfo.imgLink && <img className="w-6 h-6 rounded-full" alt={"profile"} src={userInfo.imgLink}></img>}
        <span className="mx-2 text-xs">{`${userInfo.name}(${userInfo.username})`}</span>
        <div
          onClick={() => {
            replace("/login");
          }}
        >
          登出
        </div>
      </div>
    </div>
  );
}

export default withRouter(Header);

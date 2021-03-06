import React, {useEffect} from "react";
import { withRouter } from "react-router-dom";
import { useContextSelector } from "use-context-selector";
import { context } from "@/stores/context";
import { DrawerContext } from "@/stores/DrawerContext"

function Header({
  history: { replace },
  containerClassName,
}) {

  const userInfo = useContextSelector(context, (state) => state.userInfo);

  const drawerInfo = useContextSelector(
    DrawerContext,
    (state) => state.getDrawerInfo
  );
  const setDrawerInfo = useContextSelector(
    DrawerContext,
    (state) => state.setDrawerInfo
  );

  // const clearMenuInfoChildShow = useContextSelector(
  //   DrawerContext,
  //   (state) => state.clearMenuInfoChildShow
  // );

  // useEffect(()=>{
  //   clearMenuInfoChildShow()
  // },[drawerInfo])

  return (
    <div
      className={`flex justify-between items-center p-6 border-b border-gray-800 ${containerClassName}`}
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
        <span className="mx-2 text-xs">{`${userInfo.name || ""}(${userInfo.username})`}</span>
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

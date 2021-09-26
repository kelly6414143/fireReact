import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { Transition } from "react-transition-group";
import { useContextSelector } from "use-context-selector";
import { DrawerContext } from "@/stores/DrawerContext"

function Drawer(props) {
  const { history } = props;

  const drawerInfo = useContextSelector(
    DrawerContext,
    (state) => state.getDrawerInfo
  );

  const drawerContent = useContextSelector(
    DrawerContext,
    (state) => state.getMenuInfo
  );

  const setDrawerContent = useContextSelector(
    DrawerContext,
    (state) => state.setMenuInfo
  );

  const content = [
    {
      name: "個人資訊管理",
      isShowChild: false,
      children: [
        {
          name: "帳戶設定",
          path: "/account/profile-setting",
          isClick: false
        },
      ],
    },
    {
      name: "會員管理",
      isShowChild: false,
      children: [
        {
          name: "列表式",
          path: "/users/rowDisplay",
          isClick: false
        },
        {
          name: "表格式",
          path: "/users",
          isClick: false
        },
      ],
    },
  ];

  useEffect(() => {
    drawerContent.length === 0 && onConstructDrawerContent();
  }, []);

  const onConstructDrawerContent = () => {
    // const newContent = content.filter((el) => {
    //   if (el.auth === "ADMIN" && sessionStorage["role"] !== "ADMIN") {
    //     return false;
    //   }
    //   return true;
    // });
    content.forEach((el) => {
      el.children && el.children.forEach(child => {
        if (history.location.pathname === child.path) {
          child.isClick = true
        } else {
          child.isClick = false
        }
      })
    });
    setDrawerContent(content);
    // setDrawerContent(newContent);
  };

  const onChangeDrawerContent = (item) => {
    const tempArr = Object.assign([], drawerContent)
    tempArr.forEach((el) => {
      if (el.name === item.name) {
        el.isShowChild = !el.isShowChild
      } else {
        el.isShowChild = false
      }
    });
    setDrawerContent(tempArr);
  };

  const onClickChildMenu = (e, item) => {
    e.stopPropagation()
    const tempArr = Object.assign([], drawerContent)
    tempArr.forEach((el) => {
      el.children && el.children.forEach(child => {
        if (child.name === item.name) {
          child.isClick = true
        } else {
          child.isClick = false
        }
      })
    });
    setDrawerContent(tempArr);
  }

  const RenderItem = (item, index) => {
    const children = item.children;

    // React.$commonTool.devConsole('RenderItem', item)

    return (
      <div key={index}>
        {children ? (
          <>
            <div
              className={`relative block ${children.filter(el => el.isClick).length > 0 &&
                "font-bold"
                } px-2 py-1`}
              onClick={(e) => {
                item.onClick && item.onClick()
                onChangeDrawerContent(item)
              }}
            >
              {drawerInfo.isExtendDrawer ?
                (<>
                  {item.name}
                  {item.isShowChild && children && children.map((el, idx) => RenderItem(el, idx))}
                </>)
                : (<>
                  {item.name.slice(0, 1)}
                  <div className="absolute left-full top-1/2">
                    {item.isShowChild &&
                      <div className=" whitespace-nowrap bg-white border border-black">
                        {
                          children.map((el, idx) => (
                            <Link
                              to={el.path || el.children[0].path}
                              key={idx}
                              className={`block ${el.isClick &&
                                "bg-gray-900 text-white"
                                } px-2 py-1`}
                              onClick={(e) => {
                                el.onClick && el.onClick()
                                onClickChildMenu(e, el)
                              }}
                            >
                              {el.name}
                            </Link>
                          ))
                        }
                      </div>
                    }
                  </div>
                </>)}
            </div>
          </>
        ) : (
          <Link
            to={item.path || item.children[0].path}
            className={`block ${item.isClick &&
              "bg-gray-900 text-white"
              } px-2 py-1`}
            onClick={(e) => {
              item.onClick && item.onClick()
              onClickChildMenu(e, item)
            }}
          >
            {drawerInfo.isExtendDrawer ? item.name : item.name.slice(0, 1)}
          </Link>
        )}
      </div>
    );
  };

  const duration = 500;

  const defaultStyle = {
    transition: `width ${duration}ms ease-in-out`,
    minHeight: "calc(100vh - 72px)",
    width: "200px",
  };

  const transitionStyles = {
    entering: { width: "200px" },
    entered: { width: "200px" },
    exiting: { width: "75px" },
    exited: { width: "75px" },
  };

  return (
    <Transition in={drawerInfo.isExtendDrawer} timeout={duration}>
      {(state) => (
        <div
          className="border-r border-gray-800"
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          {drawerContent.map((el, index) => (
            <div
              key={index}
              className={`py-3 mx-3 ${drawerContent.length - 1 > index && "border-b-2"
                } border-gray-500`}
            >
              {RenderItem(el, index)}
            </div>
          ))}
        </div>
      )}
    </Transition>
  );
}

export default withRouter(Drawer);

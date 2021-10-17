import React, { useEffect, useState } from "react";
import { ReactNode } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./dialog.css";

export default function Dialog({
  isShowDialog,
  children,
  onHandleClose = ()=>{},
  onBackDropClick,
  contentClassName,
}) {
  const [isShow, setIsShow] = useState(false); // 彈窗的存在週期

  useEffect(() => {
    setIsShow(isShowDialog)
  }, [isShowDialog]);

  const onClose = () => {
    onHandleClose && onHandleClose();
  };

  return isShow && ReactDOM.createPortal(
    <CSSTransition in={isShow} timeout={500} classNames="dialog" unmountOnExit>
      <div
        className={`absolute inset-0 bg-black bg-opacity-20 flex flex-col justify-center items-center`}
      >
        <div
          className="absolute inset-0 z-0"
          onClick={onBackDropClick || onClose}
        />
        <div
          className={`absolute bg-white w-450 max-h-450 rounded-xl flex flex-col justify-between items-center border border-gray-800 z-10 overflow-y-auto ${contentClassName}`}
        >
          {children}
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("dialog")
  );
}

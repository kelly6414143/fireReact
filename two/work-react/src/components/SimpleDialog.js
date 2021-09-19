import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

export default function Dialog({
    isShowDialog,
    children,
    onHandleClose
}) {

    const [isShow, setIsShow] = useState(false)

    useEffect(() => {
        setIsShow(isShowDialog)
    }, [isShowDialog])

    const onClose = () => {
        onHandleClose && onHandleClose()
        setIsShow(false)
    }

    return ReactDOM.createPortal(
        isShow && <div className="absolute inset-0 bg-black bg-opacity-20 flex flex-col justify-center items-center">
            <div
                className="absolute inset-0 z-0"
                onClick={onClose}
            />
            <div className="absolute bg-white w-450 h-450 rounded-xl flex flex-col justify-between items-center border border-gray-800 z-10">
               {children}
            </div>
        </div>, document.getElementById('dialog')
    );
}

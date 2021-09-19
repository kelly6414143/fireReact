import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

export default function Modal({
    isShowModal,
    title,
    children,
    onHandleClose,
    onHandleComfirm,
    onHandleCancle,
    ModalActions,
    isShowHeader
}) {

    const [isShow, setIsShow] = useState(false)

    useEffect(() => {
        setIsShow(isShowModal)
    }, [isShowModal])

    const onComfirm = () => {
        onHandleComfirm && onHandleComfirm()
        onClose()
    }

    const onCancle = () => {
        onHandleCancle && onHandleCancle()
        onClose()
    }

    const onClose = () => {
        onHandleClose && onHandleClose()
        setIsShow(false)
    }

    return ReactDOM.createPortal(
        isShow && <div className="absolute inset-0 bg-black bg-opacity-20 flex flex-col justify-center items-center">
            <div
                className="absolute inset-0 z-0"
                onClick={() => onClose}
            />
            <div className="absolute bg-white w-450 h-450 rounded-xl flex flex-col justify-between items-center border border-gray-800 z-10">
                {
                    isShowHeader && <div className="w-full bg-white border-b border-gray-800 text-center py-2 font-bold text-xl rounded-t-xl">{title || "標題"}</div>
                }
                <div className="items-start flex-1">
                    {children}
                </div>
                {
                    ModalActions || <div className="flex justify-center my-2">
                        <button className="bg-blue-500 rounded-lg px-3 py-1 m-1 text-white" onClick={onComfirm}>確定</button>
                        <button className="bg-gray-500 rounded-lg px-3 py-1 m-1 text-white" onClick={onCancle}>取消</button>
                    </div>
                }
            </div>
        </div>, document.getElementById('dialog')
    );
}

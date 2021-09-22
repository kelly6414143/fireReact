import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import SimpleDialog from "./SimpleDialog"

export default function Modal({
    isShowModal,
    title,
    children,
    onHandleClose,
    onHandleComfirm,
    onHandleCancle,
    ModalActions,
    isShowHeader,
    onBackDropClick
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
        <SimpleDialog
            isShowDialog={isShow}
            onBackDropClick={onBackDropClick}
            onHandleClose={onHandleClose}
        >
            {
                isShowHeader && <div className="w-full bg-white border-b border-gray-800 text-center py-2 font-bold text-xl rounded-t-xl">{title || "標題"}</div>
            }
            <div className="items-start flex-1 overflow-y-auto">
                {children}
            </div>
            {
                ModalActions || <div className="flex justify-center my-2">
                    <button className="bg-blue-500 rounded-lg px-3 py-1 m-1 text-white" onClick={onComfirm}>確定</button>
                    <button className="bg-gray-500 rounded-lg px-3 py-1 m-1 text-white" onClick={onCancle}>取消</button>
                </div>
            }
        </SimpleDialog>, document.getElementById('dialog')
    );
}

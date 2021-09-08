import React from "react";

export default function Dialog(props) {
    const { isShowDialog, children } = props

    console.log(isShowDialog)

    return (
        isShowDialog && (<div className="absolute inset-0 bg-black bg-opacity-20 flex flex-col justify-center items-center">
            {children}
        </div>)
    );
}

import React, { useEffect, useState } from "react";

export default function Dialog(props) {
    const { isShowDialog = true, children } = props

    const [isShow, setIsShow] = useState(true)

    useEffect(()=>{
        
    },[])

    useEffect(()=>{
        setIsShow(isShowDialog)
    },[isShowDialog])

    return (
        <div>
            {isShow && <div
                className="absolute inset-0 bg-black bg-opacity-20 flex flex-col justify-center items-center"
                onClick={() => setIsShow(false)}
            >
                {children}
            </div>}
        </div>
    );
}

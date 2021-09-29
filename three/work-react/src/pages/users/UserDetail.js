import React, { useEffect } from 'react'

export default function UserDetail({history: {replace, goBack}}) {


    return (
        <>
            <div>
                會員詳情
            </div>
            <span
                className="bg-blue-500 rounded-lg px-3 py-1 m-1 text-white"
                onClick={() => {goBack()}}
            >返回</span>
        </>
    );
}


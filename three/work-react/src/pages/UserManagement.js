import React, { useEffect, useState } from 'react'
import api from "@api/index";
import toast from "@components/Toast/Toast";
import { useContextSelector } from "use-context-selector";
import { UsersContext } from "@/stores/UsersContext"

export default function News({ history: { replace } }) {

    const usersInfo = useContextSelector(
        UsersContext,
        (state) => state.getUsersInfo
    );

    const setUsersInfo = useContextSelector(
        UsersContext,
        (state) => state.setUsersInfo
    );

    useEffect(() => {
        api()
            .get("/api/users", { page: 0, size: 15 })
            .then((res) => {
                if (res.success) {
                    setUsersInfo(res.data.content)
                    toast.success(res.message);
                } else {
                    toast.error(res.message);
                    replace("/login");
                }
            });
    }, [])

    return (
        <>
            <div>
                會員管理(列表式)
            </div>
            <div
                className="my-2 overflow-y-auto"
                style={{ height: "calc(100vh - 150px)" }}
            >
                {
                    usersInfo.map(user => {
                        return (
                            <div className="flex border border-gray-500 rounded py-3 px-2 my-3">
                                <span className="px-2 border-r border-gray-800">姓名：{user.name || "尚未填寫姓名"}</span>
                                <span className="px-2 border-r border-gray-800">帳號：{user.username}</span>
                                <span className="px-2">角色：{user.role}</span>
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
}


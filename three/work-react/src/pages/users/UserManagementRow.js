import React, { useEffect, useState, useRef } from 'react'
import api from "@api/index";
import toast from "@components/Toast/Toast";
import { useContextSelector } from "use-context-selector";
import { UsersContext } from "@/stores/UsersContext"

export default function UserManagementRow({ history: { replace }, history }) {

    const usersInfo = useContextSelector(
        UsersContext,
        (state) => state.getUsersInfo
    );

    const setUsersInfo = useContextSelector(
        UsersContext,
        (state) => state.setUsersInfo
    );

    const setClearUserInfo = useContextSelector(
        UsersContext,
        (state) => state.setClearUserInfo
    );

    const [message, setMessage] = useState("獲取更多數據中...")
    const [currentScrollTop, setCurrentScrollTop] = useState(0)

    const scrollRef = useRef(null)

    useEffect(() => {
        !usersInfo?.users && onHandleGetUser({ page: 0, size: 15 })
        usersInfo?.currentPosition && (scrollRef.current.scrollTop = usersInfo.currentPosition.scrollY)
        return () => {
            if(history.location.pathname === "/users/userDetail") return
            setClearUserInfo()
        }
    }, [])

    const onHandleGetUser = (params) => {
        api()
            .get("/api/users", params)
            .then((res) => {
                if (res.success) {
                    const users = usersInfo?.users || []
                    setUsersInfo({ users: [...users, ...res.data.content], pageInfo: { ...params, total: res.data.total } })
                    toast.success(res.message);
                } else {
                    toast.error(res.message);
                    replace("/login");
                }
            });
    }

    const onHandleGoDetail = ()=>{
        setUsersInfo({...usersInfo, currentPosition: {scrollY: currentScrollTop}})
        replace("/users/userDetail")
    }

    const onScroll = (e) => {
        const {
            scrollTop,
            scrollHeight,
            clientHeight,
        } = e.target

        setCurrentScrollTop(scrollTop)

        const { pageInfo } = usersInfo
        if (scrollTop + clientHeight === scrollHeight && (pageInfo?.page + 1) * pageInfo?.size < pageInfo?.total) {
            onHandleGetUser({ page: pageInfo?.page + 1, size: pageInfo?.size })
        } else if ((pageInfo?.page + 1) * pageInfo?.size >= pageInfo?.total) {
            setMessage("數據已到底!")
        }

    }

    return (
        <>
            <div>
                會員管理(列表式)
            </div>
            <div
                className="my-2 overflow-y-auto text-center"
                style={{ height: "calc(100vh - 150px)" }}
                onScroll={onScroll}
                ref={scrollRef}
            >
                {
                    usersInfo?.users?.map((user, index) => {
                        return (
                            <div key={index} className="flex justify-between border border-gray-800 rounded py-3 px-2 my-3">
                                <div>
                                    <span className="px-2 border-r border-gray-400">姓名：{user.name || "尚未填寫姓名"}</span>
                                    <span className="px-2 border-r border-gray-400">帳號：{user.username}</span>
                                    <span className="px-2">角色：{user.role}</span>
                                </div>
                                <div
                                    className="text-blue-500 mr-10 cursor-pointer"
                                    onClick={onHandleGoDetail}
                                >
                                    詳情
                                </div>
                            </div>
                        )
                    })
                }
                {<span className="text-gray-400">{message}</span>}
            </div>
        </>
    );
}

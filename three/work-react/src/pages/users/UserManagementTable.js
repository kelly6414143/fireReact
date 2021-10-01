import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import api from "@api/index";
import toast from "@components/Toast/Toast";
import { useContextSelector } from "use-context-selector";
import { UsersTableContext } from "@/stores/UsersTableContext"

function UserManagementTable({ history: { replace, location, push } }) {

    const [pageSize, setPageSize] = useState(10)
    const [pageTotal, setPageTotal] = useState(0)

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    const usersInfo = useContextSelector(
        UsersTableContext,
        (state) => state.getUsersInfo
    );

    const setUsersInfo = useContextSelector(
        UsersTableContext,
        (state) => state.setUsersInfo
    );

    const setClearUserInfo = useContextSelector(
        UsersTableContext,
        (state) => state.setClearUserInfo
    );

    let query = useQuery().get("page");

    useEffect(() => {
        (!query || !usersInfo?.users) && onHandleGetUser({ page: 0, size: 15 })
        setPageSize(usersInfo?.pageInfo?.size || 15)
    }, [])

    const onHandleGetUser = (params) => {
        api()
            .get("/api/users", params)
            .then((res) => {
                if (res.success) {
                    const users = usersInfo?.users || []
                    if(params.page === 0){
                        setUsersInfo({ users: [...res.data.content], pageInfo: { ...params, total: res.data.total } })
                    } else {
                        setUsersInfo({ users: [...users, ...res.data.content], pageInfo: { ...params, total: res.data.total } })
                    }
                    setPageTotal(res.data.total)
                    toast.success(res.message);
                } else {
                    toast.error(res.message);
                    replace("/login");
                }
            });
    }

    const onHandleGoDetail = (page) => {
        push(`/users/userDetail?page=${page}`)
    }

    return (
        <>
            <div className="text-lg mb-5">
                會員管理(表格式)
            </div>
            <table className="table-fixed w-full text-center">
                <thead className="text-white">
                    <tr>
                        <th className="w-1/2 py-2 bg-gray-500 border border-black">姓名</th>
                        <th className="w-1/2 py-2 bg-gray-500 border border-black">帳號</th>
                        <th className="w-1/4 py-2 bg-gray-500 border border-black">角色</th>
                        <th className="w-1/4 py-2 bg-gray-500 border border-black">操作</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usersInfo?.users?.map((el, index) => {
                            return (
                                <tr key={index}>
                                    <td className="py-1 border border-black">{el.name}</td>
                                    <td className="py-1 border border-black">{el.username}</td>
                                    <td className="py-1 border border-black">{el.role}</td>
                                    <td className="py-1 border border-black">
                                        <div
                                            className="text-blue-500 cursor-pointer"
                                        onClick={()=>onHandleGoDetail(usersInfo.pageInfo.page + 1)}
                                        >
                                            詳情
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div className="my-2 flex justify-center">
                {
                    new Array(Math.ceil(pageTotal / pageSize) || 1).fill(1).map((el, index) => {
                        return (
                            <span key={index} className={React.$commonTool.createClassName({
                                "text-blue-500": usersInfo?.pageInfo?.page || 0 === index,
                                "text-black": usersInfo?.pageInfo?.page || 0 !== index
                            })}>{index + 1}</span>
                        )
                    })
                }
            </div>
        </>
    );
}

export default UserManagementTable


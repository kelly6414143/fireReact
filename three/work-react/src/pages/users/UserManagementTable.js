import React, { useState, useEffect } from 'react'
import usersService from '@/service/usersService';
import { useContextSelector } from "use-context-selector";
import { UsersContext } from "@/stores/UsersContext"

function UserManagementTable({ history: { push, location }, store }) {

    const {
        usersInfo,
        setUsersInfo,
        onHandleGetUser,
        onGoDetail,
        setClearUserInfo
    } = store

    const [pageSize, setPageSize] = useState(10)
    const [pageTotal, setPageTotal] = useState(0)

    useEffect(() => {
        console.log(usersInfo)
        !usersInfo?.users && onHandleGetUser({ page: 0, size: 15 })
        setPageTotal(usersInfo?.pageInfo?.total || 1)
        setPageSize(usersInfo?.pageInfo?.size || 15)
        return () => {
            if (location.pathname === '/users/userDetail') return
            setClearUserInfo()
        }
    }, [])

    const onHandleGoDetail = () => {
        push("/users/userDetail")
    }

    // console.log('ddddddddddddd', pageTotal, pageSize , Math.ceil(pageTotal/pageSize))

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
                                        // onClick={onHandleGoDetail}
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

export default usersService(UserManagementTable)


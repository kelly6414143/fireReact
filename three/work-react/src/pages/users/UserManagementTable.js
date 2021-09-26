import React, { useEffect } from 'react'
import usersService from '@/service/usersService';

function UserManagementTable({store, history}) {

    const {usersInfo, onHandleGetUser} = store

    useEffect(() => {
        React.$commonTool.devConsole('useEffect', store, history)
        !usersInfo?.users && onHandleGetUser({ page: 0, size: 15 })
        // return () => {
        //     if (history.location.pathname === "/users/userDetail") return
        //     setClearUserInfo()
        // }
    }, [])

    return (
        <>
            <div>
                會員管理(表格式)
            </div>
        </>
    );
}

export default usersService(UserManagementTable)


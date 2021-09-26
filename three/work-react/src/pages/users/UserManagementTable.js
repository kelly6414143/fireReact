import React, { useEffect } from 'react'
import usersService from '@/service/usersService';

function UserManagementTable({store, history}) {

    const {usersInfo, onHandleGetUser, setClearUserInfo} = store

    return (
        <>
            <div>
                會員管理(表格式)
            </div>
        </>
    );
}

export default usersService(UserManagementTable)


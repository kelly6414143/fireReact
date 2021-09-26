import React, { useEffect } from 'react'
import usersService from '@/service/usersService';

function UserManagementTable({ store, history }) {

    const { usersInfo, onHandleGetUser, setClearUserInfo } = store

    return (
        <>
            <div>
                會員管理(表格式)
            </div>
            <table style={{tableLayout: "auto"}}>
                <colgroup></colgroup>
                <thead className="ant-table-thead">
                    <tr>
                        <th className="ant-table-cell">Name</th>
                        <th className="ant-table-cell">Name1</th>
                        <th className="ant-table-cell">Name2</th>
                        <th className="ant-table-cell">Name3</th>
                        <th className="ant-table-cell">Name4</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="ant-table-cell"><a>John Brown</a></td>
                        <td className="ant-table-cell">32</td>
                        <td className="ant-table-cell">New York No. 1 Lake Park</td>
                        <td className="ant-table-cell">
                            <span className="ant-tag ant-tag-green">NICE</span>
                            <span className="ant-tag ant-tag-geekblue">DEVELOPER</span>
                        </td>
                        <td className="ant-table-cell">
                            <div className="ant-space ant-space-horizontal ant-space-align-center">
                                <div className="ant-space-item">
                                    <a>Invite John Brown</a>
                                </div>
                                <div className="ant-space-item">
                                    <a>Delete</a>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default usersService(UserManagementTable)


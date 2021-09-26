import React from 'react'
import api from "@api/index";
import toast from "@components/Toast/Toast";
import { useContextSelector } from "use-context-selector";
import { UsersContext } from "@/stores/UsersContext"

export default function usersService(Component) {
    return (props) => {

        const { history: { replace } } = props

        React.$commonTool.devConsole('userService', props)

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

        const onGoDetail = () => {
            replace("/users/userDetail")
        }

        const store = {
            usersInfo: usersInfo,
            setUsersInfo: setUsersInfo,
            setClearUserInfo: setClearUserInfo,
            onHandleGetUser: onHandleGetUser,
            onGoDetail: onGoDetail
        }

        return (
            <Component store={store} {...props}></Component>
        );
    }

}


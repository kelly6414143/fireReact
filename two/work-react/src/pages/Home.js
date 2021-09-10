import React, { useEffect, useState } from 'react'
import api from '@api/index'
import toast from "@components/Toast/Toast"
import Dialog from "@components/Dialog"

export default function Home(props) {

    const { history: { replace } } = props

    const [isShowDialog, setIsShowDialog] = useState(false)

    useEffect(() => {
        api().get("/api/user", {
            headers: {
                ContentType: "application/x-www-form-urlencoded",
                Authorization: "Bearer " + sessionStorage["userToken"],
            },
        }).then((res) => {
            if (res.success) {
                toast.success(res.message);
                React.$devConsole(res.data.name)
                if(!res.data.name) {
                    setIsShowDialog(true)
                }
            } else {
                toast.error(res.message);
                replace("./login");
            }
        })
    }, [])

    return (
        <div>
            首頁
            <Dialog isShowDialog={isShowDialog}/>
        </div>
    );
}


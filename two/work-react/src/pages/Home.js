import { useEffect } from 'react'
import api from '../api/index'
import toast from "../components/Toast/Toast"

export default function Home(props) {

    const { history: { replace } } = props

    useEffect(() => {
        api().get("/api/user", {
            headers: {
                ContentType: "application/x-www-form-urlencoded",
                Authorization: "Bearer " + sessionStorage["userToken"],
            },
        }).then((res) => {
            if (res.success) {
                toast.success(res.message);
            } else {
                toast.error(res.message);
                replace("./login");
            }
        }).catch((err) => {
            console.error("err", err);
            toast.error(err.message);
        });
    }, [])

    return (
        <div>
            首頁
        </div>
    );
}


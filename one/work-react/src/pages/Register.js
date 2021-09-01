import React, { useState, useEffect } from "react"
import InputItem from "../components/InputItem"

export default function Register() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [comfirmPassword, setComfirmPassword] = useState("")

    const onSumit = () => {
        fetch('/api/register', {
            method: 'post', body: JSON.stringify({
                username: username,
                password: comfirmPassword
            }),
        }).then(res => {
            console.log('res', res)
        }).catch(err => {
            console.log('err', err)
        })
    }


    return (
        <div>
            <header>Register</header>
            <InputItem
                label="帳號"
                type="text"
                required={true}
                onChange={(val) => setUsername(val)}
            />
            <InputItem
                label="密碼"
                type="password"
                required={true}
                onChange={(val) => setPassword(val)}
            />
            <InputItem
                label="確認密碼"
                type="password"
                required={true}
                onChange={(val) => setComfirmPassword(val)}
            />
            <button onClick={onSumit}>確認</button>
        </div>
    );
}


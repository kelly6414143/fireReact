import React, { useState, useEffect } from "react"
import InputItem from "../components/InputItem/InputItem"
import toast from "../components/Toast/Toast"

export default function Login(props) {

    const {history} = props
    const [formObject, setFormObject] = useState({})

    useEffect(() => {
        setFormObject({
            data: {
                username: "",
                password: "",
            },
            vaildator: {
                username: (el) => /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(el),
                password: (el) => /^[A-z]\d{2,6}[A-z]$/.test(el),
            },
            error: {}
        })
    }, [])

    const onSubmit = async (event) => {
        event.preventDefault()
        let isValid = await onValidtor()
        if (!isValid) return
        fetch('/api/login', {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'post',
            body: JSON.stringify({
                username: formObject.data.username,
                password: formObject.data.password
            }),
        }).then(res => {
            return res.json()
        }).then(res=>{
            if(res.success){
                toast.success(res.message)
                sessionStorage.setItem('userToken', res.token)
                history.push('./')
            }else {
                toast.error(res.message)
            }
        }).catch(err => {
            console.error('err', err)
            toast.error(err.message)
            sessionStorage.removeItem('userToken')
        })
    }

    const onValidtor = async () => {
        let errorObject = {}
        let isValid = true

        for (let i = 0, len = Object.keys(formObject.data).length; i < len; i++) {
            const el = Object.keys(formObject.data)[i]

            if (!formObject.data[el]) isValid = false

            if (formObject.vaildator[el] !== undefined && formObject.vaildator[el]) {
                errorObject[el] = formObject.vaildator[el](formObject.data[el])
            }
        }
        setFormObject({ ...formObject, error: { ...formObject.error, ...errorObject } })
        return Object.keys(errorObject).filter(el => !errorObject[el]).length === 0 && isValid
    }

    return (
        <div>
            <header>登入</header>
            <InputItem
                label="帳號"
                type="text"
                required={true}
                placeholder={'必須是信箱'}
                onChange={(val) => setFormObject({ ...formObject, data: { ...formObject.data, username: val } })}
                valid={{ msg: '必須是信箱', testVal: formObject?.vaildator?.['username'], isValid: formObject?.error?.['username'] }}
            />
            <InputItem
                label="密碼"
                type="password"
                required={true}
                hasIcon={true}
                placeholder={'4-8字元；首尾必須是英文；中間必須是數字'}
                onChange={(val) => setFormObject({ ...formObject, data: { ...formObject.data, password: val } })}
                valid={{ msg: '4-8字元；首尾必須是英文；中間必須是數字', testVal: formObject?.vaildator?.['password'], isValid: formObject?.error?.['password'] }}
            />
            <span onClick={()=> history.push('./register')}>註冊</span>
            <button onClick={onSubmit}>登入</button>
        </div>
    );
}


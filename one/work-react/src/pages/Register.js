import React, { useState, useEffect } from "react"
import InputItem from "../components/InputItem/InputItem"
import toast from "../components/Toast/Toast"

export default function Register(props) {

    const { history } = props
    const [formObject, setFormObject] = useState({})

    useEffect(() => {
        setFormObject({
            data: {
                username: "",
                password: "",
                comfirmPassword: ""
            },
            vaildator: {
                username: (el) => /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(el),
                password: (el) => /^[A-z]\d{2,6}[A-z]$/.test(el),
            },
            error: {}
        })
    }, [])

    const onCheckComfirmPassword = (el) => {
        return formObject?.data?.password === el && el !== ""
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        let isValid = await onValidtor()
        if (!isValid) return
        fetch('/api/register', {
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
        }).then(res => {
            console.log('res', res)
            if (res.success) {
                onLogin(formObject.data)
                toast.success(res.message)
            } else {
                toast.error(res.message)
            }
        }).catch(err => {
            console.error('err', err)
            toast.error(err.message)
            sessionStorage.removeItem('userToken')
        })
    }

    const onLogin = (data) => {
        fetch('/api/login', {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'post',
            body: JSON.stringify({
                username: data.username,
                password: data.password
            }),
        }).then(res => {
            return res.json()
        }).then(res => {
            console.log('res', res)
            if (res.success) {
                sessionStorage.setItem('userToken', res.token)
                history.push('./')
                toast.success(res.message)
            } else {
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
            if (el === "comfirmPassword") {
                isValid = onCheckComfirmPassword(formObject.data[el])
                errorObject[el] = onCheckComfirmPassword(formObject.data[el])
            }

            if (formObject.vaildator[el] !== undefined && formObject.vaildator[el]) {
                errorObject[el] = formObject.vaildator[el](formObject.data[el])
            }
        }
        setFormObject({ ...formObject, error: { ...formObject.error, ...errorObject } })
        return Object.keys(errorObject).filter(el => !errorObject[el]).length === 0 && isValid
    }

    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 mx-auto bg-white rounded-xl shadow-lg items-center max-w-1/2 flex flex-col justify-start">
            <header className="text-center text-xl font-bold">註冊</header>
            <div className="mb-4 mt-6">
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
                <InputItem
                    label="確認密碼"
                    type="password"
                    required={true}
                    hasIcon={true}
                    placeholder={'4-8字元；首尾必須是英文；中間必須是數字'}
                    onChange={(val) => setFormObject({ ...formObject, data: { ...formObject.data, comfirmPassword: val } })}
                    valid={{ msg: '與密碼不同', testVal: formObject?.vaildator?.['password'], isValid: formObject?.error?.['comfirmPassword'] }}
                    onBlur={(val) => onCheckComfirmPassword(val)}
                />
            </div>
            <div className="flex flex-col justify-center">
                <span
                    className="text-blue-500 m-1 text-center cursor-pointer underline"
                    style={{textUnderlinePosition: 'under'}}
                    onClick={() => history.push('./login')}
                >
                    登入
                </span>
                <button
                    onClick={onSubmit}
                    className="bg-blue-500 rounded-lg px-3 py-1 m-1 text-white"
                >
                    註冊
                </button>
            </div>
        </div>
    );
}


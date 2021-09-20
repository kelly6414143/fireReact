import React, { useState, useEffect } from "react"
import { useContextSelector } from 'use-context-selector';
import { context } from '@/stores/context'
import InputItem from "@components/InputItem/InputItem"
import toast from "@components/Toast/Toast"
import api from '@api/index'

export default function Register(props) {

    const { history } = props
    const [formObject, setFormObject] = useState({})

    const setUserInfo = useContextSelector(context, state => state.userInfo[1]);

    useEffect(() => {
        setFormObject({
            data: {
                username: "",
                password: "",
                comfirmPassword: "",
                name: ""
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

        api().post("/api/register", {
            username: formObject.data.username,
            password: formObject.data.password,
            name: formObject.data.name
        }, {
            headers: {
                "Content-Type": "application/json"
            },
        }).then(res => {
            if (res.success) {
                onLogin(formObject.data)
                toast.success(res.message)
            } else {
                toast.error(res.message)
            }
        })
    }

    const onLogin = (data) => {
        api().post("/api/login", {
            username: formObject.data.username,
            password: formObject.data.password
        }, {
            headers: {
                ContentType: "application/json",
            },
        }).then(res => {
            if (res.success) {
                toast.success(res.message)
                setUserInfo((data) => ({ ...data, ...res.data, token: res.token }))
                sessionStorage.setItem('userToken', res.token)
                sessionStorage.setItem('role', res.data.role)
                history.push('./')
            } else {
                toast.error(res.message)
                setUserInfo((data) => ({ ...data, token: '' }))
            }
        })
    }

    const onValidtor = async () => {
        let errorObject = {}
        let isValid = true

        for (let i = 0, len = Object.keys(formObject.data).length; i < len; i++) {
            const el = Object.keys(formObject.data)[i]

            // if (!formObject.data[el]) isValid = false
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
            <div className="text-center text-xl font-bold">註冊</div>
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
                    label="使用者名稱"
                    type="text"
                    placeholder={'可選，對其他用戶顯示名稱'}
                    onChange={(val) => setFormObject({ ...formObject, data: { ...formObject.data, name: val } })}
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
                    style={{ textUnderlinePosition: 'under' }}
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


import React, { useState, useEffect } from "react"
import { useContextSelector } from 'use-context-selector';
import { context } from '@/stores/context'
import InputItem from "@components/InputItem/InputItem"
import toast from "@components/Toast/Toast"
import Validator from "@components/Validator"
import api from '@api/index'

export default function Login(props) {

    const { history } = props
    const [formObject, setFormObject] = useState({})
    const [isShowValidator, setIsShowValidator] = useState(false)

    const setUserInfo = useContextSelector(context, state => state.userInfo[1]);

    useEffect(() => {
        setFormObject({
            data: {
                username: "",
                password: "",
            },
            vaildator: {
                // username: (el) => /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(el),
                // password: (el) => /^[A-z]\d{2,6}[A-z]$/.test(el),
            },
            error: {}
        })
    }, [])

    const onSubmit = async (event) => {
        event.preventDefault()
        let isValid = await onValidator()
        if (!isValid) return
        setIsShowValidator(true)
    }

    const onValidator = async () => {
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

    const onLogin = () => {
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
            setIsShowValidator(false)
        })
    }

    return (
        <>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 mx-auto bg-white rounded-xl shadow-lg items-center max-w-1/2 flex flex-col justify-start">
                <div className="text-center text-xl font-bold">登入</div>
                <section className="mb-4 mt-6">
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
                </section>
                <div className="flex flex-col justify-center">
                    <span
                        className="text-blue-500 m-1 text-center cursor-pointer underline"
                        style={{ textUnderlinePosition: 'under' }}
                        onClick={() => history.push('./register')}>註冊</span>
                    <button
                        className="bg-blue-500 rounded-lg px-3 py-1 m-1 text-white"
                        onClick={onSubmit}>登入</button>
                </div>
            </div>
            <Validator isShowDialog={isShowValidator} onSuccessCallback={onLogin} onHandleClose={() => setIsShowValidator(false)} />
        </>
    );
}


import React, { useState, useEffect } from "react"
import InputItem from "../components/InputItem/InputItem"
import toast from "../components/Toast/Toast"
import Validtor from "../components/Validtor"

export default function Login(props) {

    const { history } = props
    const [formObject, setFormObject] = useState({})
    const [isShowValidtor, setIsShowValidtor] = useState(false)

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
        setIsShowValidtor(true)
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

    const onLogin = () => {
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
        }).then(res => {
            if (res.success) {
                toast.success(res.message)
                sessionStorage.setItem('userToken', res.token)
                history.push('./')
            } else {
                toast.error(res.message)
            }
            setIsShowValidtor(false)
        }).catch(err => {
            console.error('err', err)
            toast.error(err.message)
            sessionStorage.removeItem('userToken')
        })
    }

    return (
        <>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 mx-auto bg-white rounded-xl shadow-lg items-center max-w-1/2 flex flex-col justify-start">
                <header className="text-center text-xl font-bold">??????</header>
                <section className="mb-4 mt-6">
                    <InputItem
                        label="??????"
                        type="text"
                        required={true}
                        placeholder={'???????????????'}
                        onChange={(val) => setFormObject({ ...formObject, data: { ...formObject.data, username: val } })}
                        valid={{ msg: '???????????????', testVal: formObject?.vaildator?.['username'], isValid: formObject?.error?.['username'] }}
                    />
                    <InputItem
                        label="??????"
                        type="password"
                        required={true}
                        hasIcon={true}
                        placeholder={'4-8??????????????????????????????????????????????????????'}
                        onChange={(val) => setFormObject({ ...formObject, data: { ...formObject.data, password: val } })}
                        valid={{ msg: '4-8??????????????????????????????????????????????????????', testVal: formObject?.vaildator?.['password'], isValid: formObject?.error?.['password'] }}
                    />
                </section>
                <div className="flex flex-col justify-center">
                    <span
                        className="text-blue-500 m-1 text-center cursor-pointer underline"
                        style={{ textUnderlinePosition: 'under' }}
                        onClick={() => history.push('./register')}>??????</span>
                    <button
                        className=" bg-blue-500 rounded-lg px-3 py-1 m-1 text-white"
                        onClick={onSubmit}>??????</button>
                </div>
            </div>
            <Validtor isShowDialog={isShowValidtor} onSuccessCallback={onLogin}/>
        </>
    );
}


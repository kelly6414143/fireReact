import React, { useState, useEffect,Dispatch, SetStateAction } from "react"
import { useContextSelector } from 'use-context-selector';
import { context } from '@/stores/context'
// import Form, { Field } from "@components/Form";
import Input from "@components/InputItem/Input";
import toast from "@components/Toast/Toast"
// import Validator from "@components/Validator"
import api from '@api/index'

export default function Login() {

    interface IFormObject {
        username: string;
        password: string
    }


    const [formObject, setFormObject]= useState({})
    const [isShowValidator, setIsShowValidator] = useState(false)

    const setUserInfo = useContextSelector(context, state => state.setUserInfo);

    // const [form] = Form.useForm()
    // const usernameRules = { required: true, msg: "必須是信箱", validator: 'email' }
    // const passwordRules = { required: true, msg: "4-8字元；首尾必須是英文；中間必須是數字", validator: (val)=> /^[A-z]\d{2,6}[A-z]$/.test(val) }
    const usernameRules = { required: true, msg: "請輸入帳號" }
    const passwordRules = { required: true, msg: "請輸入密碼" }


    // const onFinish = (data) => {
    //     setFormObject(data)
    //     setIsShowValidator(true)
    // }

    // const onLogin = () => {
    //     api().post("/api/login", {
    //         username: formObject.username,
    //         password: formObject.password
    //     }, {
    //         headers: {
    //             ContentType: "application/json",
    //         },
    //     }).then(res => {
    //         if (res.success) {
    //             toast.success(res.message)
    //             setUserInfo((data) => ({ ...data, ...res.data, token: res.token }))
    //             sessionStorage.setItem('userToken', res.token)
    //             sessionStorage.setItem('role', res.data.role)
    //             history.push('./')
    //         } else {
    //             toast.error(res.message)
    //             setUserInfo((data) => ({ ...data, token: '' }))
    //         }
    //         setIsShowValidator(false)
    //     })
    // }

    return (
        <>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 mx-auto bg-white rounded-xl shadow-lg items-center max-w-1/2 min-w-450 flex flex-col justify-start">
                <div className="text-center text-xl font-bold">登入</div>
                {/* <Form className="text-center" form={form} onFinish={onFinish}>
                    <Field name="username" rules={[usernameRules]}>
                        <Input
                            label="帳號"
                            type="text"
                            placeholder={"請輸入帳號"}
                        />
                    </Field>
                    <Field name="password" rules={[passwordRules]}>
                        <Input
                            label="密碼"
                            type="password"
                            placeholder={"請輸入密碼"}
                        />
                    </Field>
                    <div className="flex flex-col justify-center w-minContent m-auto">
                        <span
                            className="text-blue-500 m-1 text-center cursor-pointer underline"
                            style={{ textUnderlinePosition: 'under' }}
                            onClick={() => history.push('./register')}>註冊</span>
                        <input
                            type="submit"
                            className=" bg-blue-500 rounded-lg px-3 py-1 m-1 text-white"
                            value={'登入'}
                        />
                    </div>
                </Form> */}
            </div>
            {/* <Validator
                isShowDialog={isShowValidator}
                onSuccessCallback={onLogin}
                onHandleClose={() => setIsShowValidator(false)}
                contentClassName={"h-450"}
            /> */}
        </>
    );
}


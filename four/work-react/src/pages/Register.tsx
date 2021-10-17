import React, { useState, useEffect } from "react";
import { useContextSelector } from "use-context-selector";
import { context } from "@/stores/context";
import Form, { Field , useForm} from "@components/Form";
import Input from "@components/InputItem/Input";
import toast from "@components/Toast/Toast";
import api from "@api/index";

interface IProps {
  history :{[index:string]:any}
}

interface IRegisterData {
  username: string;
  password: string;
  name?: string;
}

export default function Register({ history }:IProps) {
  const setUserInfo = useContextSelector(context, (state) => state.setUserInfo);

  const [form] = useForm();
  const usernameRules = {
    required: true,
    msg: "必須是信箱",
    validator: "email",
  };
  const passwordRules = {
    required: true,
    msg: "4-8字元；首尾必須是英文；中間必須是數字",
    validator: (val:string) => /^[A-z]\d{2,6}[A-z]$/.test(val),
  };
  const comfirmPasswordRules = {
    required: true,
    msg: "與密碼不同",
    validator: (val:string) => val === form.getFieldValue("password"),
  };

  const onFinish = (data:IRegisterData) => {
    onSubmit(data);
  };

  const onSubmit = async (data:IRegisterData) => {
    api()
      .post(
        "/api/register",
        {
          username: data.username,
          password: data.password,
          name: data.name,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.success) {
          onLogin(data);
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      });
  };

  const onLogin = (data:IRegisterData) => {
    api()
      .post(
        "/api/login",
        {
          username: data.username,
          password: data.password,
        },
        {
          headers: {
            ContentType: "application/json",
          },
        }
      )
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
          setUserInfo((data:{}) => ({ ...data, ...res.data, token: res.token }));
          sessionStorage.setItem("userToken", res.token);
          sessionStorage.setItem("role", res.data.role);
          history.push("./");
        } else {
          toast.error(res.message);
          setUserInfo((data:{}) => ({ ...data, token: "" }));
        }
      });
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 mx-auto bg-white rounded-xl shadow-lg items-center max-w-1/2 min-w-450 flex flex-col justify-start">
      <div className="text-center text-xl font-bold">註冊</div>
      <Form className="text-center" form={form} onFinish={onFinish}>
        <Field name="username" rules={[usernameRules]}>
          <Input label="帳號" placeholder={"必須是信箱"} />
        </Field>
        <Field name="name">
          <Input label="使用者名稱" placeholder={"可選，對其他用戶顯示名稱"} />
        </Field>
        <Field name="password" rules={[passwordRules]}>
          <Input
            label="密碼"
            type="password"
            placeholder={"4-8字元；首尾必須是英文；中間必須是數字"}
          />
        </Field>
        <Field name="comfirmPassword" rules={[comfirmPasswordRules]}>
          <Input
            label="確認密碼"
            type="password"
            placeholder={"4-8字元；首尾必須是英文；中間必須是數字"}
          />
        </Field>
        <div className="flex flex-col justify-center w-minContent m-auto">
          <span
            className="text-blue-500 m-1 text-center cursor-pointer underline"
            style={{ textUnderlinePosition: "under" }}
            onClick={() => history.push("./login")}
          >
            登入
          </span>
          <input
            type="submit"
            className=" bg-blue-500 rounded-lg px-3 py-1 m-1 text-white"
            value={"註冊"}
          />
        </div>
      </Form>
    </div>
  );
}

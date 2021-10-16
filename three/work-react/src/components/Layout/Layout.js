import React, { useEffect, useState } from "react";
import { useContextSelector } from "use-context-selector";
import { context } from "@/stores/context";
import api from "@api/index";
import toast from "@components/Toast/Toast";
import Modal from "@/components/Modal";
import Form, { Field } from "@components/Form";
import Input from "@components/InputItem/Input";
import Header from "./Header/index";
import Drawer from "./Drawer";
import {devConsole, createContext} from "@/tools"

function Wrapper({
  history: { replace },
  routes,
  children,
  setUserInfo,
  userInfo,
}) {

  const [form] = Form.useForm()
  const nameRules = { required: true, msg: "請輸入使用者名稱" }

  const [isShowDialog, setIsShowDialog] = useState(false);
  

  devConsole("layout userInfo", userInfo)

  useEffect(() => {
    if (userInfo.name) return;
    api()
      .get("/api/user", {
        headers: {
          ContentType: "application/x-www-form-urlencoded",
          Authorization: "Bearer " + sessionStorage["userToken"],
        },
      })
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
          setUserInfo((data) => ({ ...data, ...res.data }));
          if (!res.data.name) {
            setIsShowDialog(true);
          }
        } else {
          toast.error(res.message);
          replace("/login");
        }
      });
  }, []);

  const onFinish = (data) => {
    onSubmit(data)
  }

  const onSubmit = (data) => {
    api()
      .put(
        "/api/users/updateName",
        data,
        {
          headers: {
            ContentType: "application/x-www-form-urlencoded",
            Authorization: "Bearer " + sessionStorage["userToken"],
          },
        }
      )
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
          setUserInfo({ ...userInfo, name: data.name })
          setIsShowDialog(false);
        } else {
          toast.error(res.message);
        }
      });
  };

  return (
    <div className="border border-gray-800">
      <Header
        routes={routes}
        containerClassName="mb-2"
      />
      <div className="flex border-t border-gray-800">
        <Drawer />
        <div className="w-full p-3">{children}</div>
      </div>
      <Modal
        isShowModal={isShowDialog}
        isShowHeader={true}
        title={"使用者資料補全"}
        onBackDropClick={() => { return false }}
        ModalActions={<></>}
      >
        <Form className="text-center" form={form} onFinish={onFinish}>
          <Field name="name" rules={[nameRules]}>
            <Input
              label="使用者名稱"
              type="text"
              placeholder={"對其他用戶顯示的名稱"}
            />
          </Field>
          <input
            type="submit"
            className=" bg-blue-500 rounded-lg px-3 py-1 m-1 text-white"
            value={'確定'}
          />
        </Form>
      </Modal>
    </div>
  );
}

export default createContext(context)(Wrapper)
import React, { useEffect, useState } from "react";
import { useContextSelector } from "use-context-selector";
import { context } from "@/stores/context";
import FieldContext from "@/stores/FieldContext"
import api from "@api/index";
import toast from "@components/Toast/Toast";
import Modal from "@/components/Modal";
import Input from "@components/InputItem/Input";
import Form, { Field } from "@components/Form";
import Header from "./Header/index";
import Drawer from "./Drawer";

export default function Wrapper({
  history: { replace },
  routes,
  children,
}) {

  const nameRules = { required: true, msg: "請輸入使用者名稱" }

  const [form] = Form.useForm()

  const [isShowDialog, setIsShowDialog] = useState(false);

  const userInfo = useContextSelector(context, (state) => state.userInfo[0]);
  const setUserInfo = useContextSelector(context, (state) => state.userInfo[1]);

  const onFinish = (data) => {
    onSubmit(data)
  }

  const onFinishFailed = (val) => {
    // React.$commonTool.devConsole("onFinishFailed", val)
  }

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
          setUserInfo({...userInfo, name: data.name})
          setIsShowDialog(false);
        } else {
          toast.error(res.message);
        }
      });
  };

  return (
    <div>
      <Header
        routes={routes}
        containerClassName="mb-2"
      />
      <div className="flex border border-gray-800">
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
        {/* <div className="relative bg-white px-8 py-6 text-center"> */}
        <Form className="text-center" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
        {/* </div> */}
      </Modal>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useContextSelector } from "use-context-selector";
import { context } from "@/stores/context";
import api from "@api/index";
import toast from "@components/Toast/Toast";
import Modal from "@/components/Modal";
import InputItem from "@components/InputItem/InputItem";
import Header from "./Header/index";
import Drawer from "./Drawer";

export default function Wrapper(props) {
  const {
    history: { replace },
    routes,
    children,
  } = props;

  const [isShowDialog, setIsShowDialog] = useState(false);
  const [username, setUsername] = useState(undefined);

  const userInfo = useContextSelector(context, (state) => state.userInfo[0]);
  const setUserInfo = useContextSelector(context, (state) => state.userInfo[1]);

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

  const onSubmit = () => {
    api()
      .put(
        "/api/users/updateName",
        { name: username },
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
        onBackDropClick={()=> {return false}}
        ModalActions={<button
          className=" bg-blue-500 rounded-lg px-3 py-1 m-1 text-white"
          onClick={onSubmit}
        >
          確定
        </button>}
      >
        <div className="relative bg-white px-8 py-6 text-center">
          <section className="mb-4 mt-6">
            <InputItem
              label="使用者名稱"
              type="text"
              required={true}
              placeholder={"對其他用戶顯示的名稱"}
              onChange={(val) => setUsername(val)}
              valid={{ isValid: username }}
              labelClassName="w-auto"
            />
          </section>
        </div>
      </Modal>
    </div>
  );
}

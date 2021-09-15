import React, { useState } from 'react'
import { useContextSelector } from 'use-context-selector';
import { context } from '@/stores/context'
import toast from "@components/Toast/Toast"
import api from '@api/index'

export default function News() {

    const [userImage, setUserImage] = useState("")
    const [userPreviewImage, setPreviewImage] = useState("")

    const userInfo = useContextSelector(context, state => state.userInfo[0]);
    const setUserInfo = useContextSelector(context, state => state.userInfo[1]);

    const onChangeImage = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            setUserImage(img)
            setPreviewImage(URL.createObjectURL(img))
        }
    }

    const onSubmit = () => {

        let formData = new FormData()
        formData.append('image', userImage)

        api().post("/api/users/uploadPicture", formData, {
            headers: {
                "Content-type": "multipart/form-data",
                Authorization: "Bearer " + sessionStorage['userToken'],
            },
        }).then(res => {
            if (res.success) {
                toast.success(res.message)
                setUserInfo((data) => ({ ...data, imgLink: res.data }))
            } else {
                toast.error(res.message)
            }
        })
    }

    return (
        <div>
            <h2>帳戶設定</h2>
            <img className="w-450 h-auto" alt={"profile"} src={userPreviewImage || userInfo.imgLink}></img>
            <input type="file" id="file-input" onChange={onChangeImage} className="block mt-2 mb-5" />
            <span className="block">{`${userInfo.name}(${userInfo.username})`}</span>
            <button
                onClick={onSubmit}
                className="bg-blue-500 rounded-lg px-3 py-1 m-1 text-white"
            >
                上傳圖片
            </button>
        </div>
    );
}


import React from "react";
import { Link, withRouter } from "react-router-dom";

function Drawer(props) {

    const { history } = props

    const content = [
        {
            name: "個人資訊管理",
            children: [
                {
                    name: "帳戶設定",
                    path: "/account/profile-setting"
                }
            ]
        },
        {
            name: "會員管理",
            path: "/users"
        }
    ]

    const RenderItem = (item, index) => {

        const children = item.children

        return (
            <div key={index}>
                <Link
                    to={item.path || item.children[0].path}
                    className={`block ${history.location.pathname === item.path && "bg-gray-900 text-white"} px-2 py-1`}
                >
                    {children && <span>+</span>}
                    {item.name}
                </Link>
                {children && children.map((el, idx) => RenderItem(el, idx))}
            </div>
        )
    }

    return (
        <div
            className="border-r border-gray-800"
            style={{
                width: "200px",
                minHeight: "calc(100vh - 72px)"
            }}
        >
            {content.map((el, index) => (
                <div key={index} className={`py-3 mx-3 ${content.length - 1 > index && "border-b"} border-gray-500`}>
                    {RenderItem(el, index)}
                </div>
            ))}
        </div>
    );
}

export default withRouter(Drawer)
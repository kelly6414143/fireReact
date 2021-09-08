import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

export default function Header() {
  const routes = [
    {
      path: "./",
      name: "首頁",
    },
    {
      path: "./news",
      name: "最新消息",
    },
  ];

  return (
    <div className="header-wrapper">
      <div className="header-logo">LOGO</div>
      <ul className="flex-row">
        {routes.map((route, i) => {
          return (
            <li className="header-list" key={i}>
              <Link to={route.path}>{route.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

export default function Header({ routes }) {
  return (
    <div className="header-wrapper">
      <header className="header-logo">LOGO</header>
      <ul className="flex-row">
        {routes.map((route) => {
          return (
            <li className="header-list">
              <Link to={route.path}>{route.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

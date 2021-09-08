import React from "react";
import Header from "./Header/index";

export default function Wrapper(props) {
  const { routes, children } = props;

  return (
    <div>
      <Header routes={routes} />
      {children}
    </div>
  );
}

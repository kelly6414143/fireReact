import React from "react";
import { Switch } from "react-router-dom";
import Header from "../components/Header/index";
import tools from "../tools/index";

export default function Wrapper(props) {
  const { routes } = props;

  return (
    <div>
      <Header routes={routes} />
      <div style={{margin: "5px"}}>
        <Switch>
          {routes.map((route, i) => {
            return <tools.RouteWithSubRoutes key={i} {...route} />;
          })}
        </Switch>
      </div>
    </div>
  );
}

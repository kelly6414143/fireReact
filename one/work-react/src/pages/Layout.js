import React, { useEffect } from "react";
import Header from "../components/Header/index";

export default function Wrapper(props) {
  const { routes, history } = props;

  // useEffect(() => {
  //   console.log(history)
  // })

  return (
    <div>
      <Header routes={routes} />
      {/* <div style={{margin: "5px"}}>
        <Switch>
          {routes.map((route, i) => {
            return <tools.RouteWithSubRoutes key={i} {...route} />;
          })}
        </Switch>
      </div> */}
    </div>
  );
}

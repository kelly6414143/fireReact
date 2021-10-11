import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import routes from "./routerConfig";

/**
 * renderRoutes 渲染路由
 * @param  {array}      routes              路由列表
 * @param  {object}     extraProps  = {}    extra的屬性
 * @param  {object}     switchProps = {}    switch的屬性
 */

const renderRoutes = (props:any) => {
    
  function RenderRoute(props:any) {
    const {
      history: { replace },
      route,
      route: { isPrivate },
    } = props;
    if (isPrivate && !sessionStorage["userToken"]) replace("/login");
    if (route.auth === "ADMIN" && sessionStorage["role"] !== "ADMIN") return <Redirect to={"/notFound"}/>
    return <route.component {...props} routes={route.routes} />;
  }

  return (
    <Router>
      <Switch>
        {routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              render={(props) => <RenderRoute route={route} {...props} />}
            />
          );
        })}
      </Switch>
    </Router>
  );
};
export default renderRoutes;

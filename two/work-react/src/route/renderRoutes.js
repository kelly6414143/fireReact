import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "./routerConfig";
import toast from "../components/Toast/Toast";

/**
 * renderRoutes 渲染路由
 * @param  {array}      routes              路由列表
 * @param  {object}     extraProps  = {}    extra的屬性
 * @param  {object}     switchProps = {}    switch的屬性
 */
const renderRoutes = (props) => {
    
  function RenderRoute(props) {
    const {
      history: { replace },
      route,
      route: { isPrivate },
    } = props;
    if (isPrivate && !sessionStorage["userToken"]) replace("/login");
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

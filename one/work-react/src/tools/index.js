import { Route } from "react-router-dom";

function RouteWithSubRoutes(route) {
    // console.log('RouteWithSubRoutes', route)
    return (
        <Route
            path={route.path}
            exact={route.exact}
            render={props => (
                <route.component {...props} routes={route.routes} />
            )}
        />
    );
}

export default {
    RouteWithSubRoutes: (el) => RouteWithSubRoutes(el)
}
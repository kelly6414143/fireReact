import { Route } from "react-router-dom";

function RouteWithSubRoutes(route) {
    return (
        <Route
            exact
            path={route.path}
            render={props => (
                <route.component {...props} routes={route.routes} />
            )}
        />
    );
}

export default {
    RouteWithSubRoutes: (el) => RouteWithSubRoutes(el)
}
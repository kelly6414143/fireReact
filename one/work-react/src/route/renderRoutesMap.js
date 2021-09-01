import { Route } from "react-router-dom";
import RouterGuard from './routerGuard'

const renderRoutesMap = (routes) => (
    routes.map((route, index) => {
        return (
            <Route key={index} path={route.path} render={props => (
                <RouterGuard {...route} {...props} />
            )}
            />
        )
    })
)
export default renderRoutesMap
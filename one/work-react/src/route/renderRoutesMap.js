import { Route } from "react-router-dom";
import RouterGuard from './routerGuard'
import tools from '../tools/index'

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
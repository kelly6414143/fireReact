import React from "react"
import {
    Switch,
    Link
} from "react-router-dom";
import Header from "../components/Header"
import tools from "../tools/index"

export default function Wrapper(props) {
    const { routes } = props

    return (
        <div>
            <Header routes={routes}/>
            <Switch>
                {routes.map((route, i) => {
                    return (
                        <tools.RouteWithSubRoutes key={i} {...route} />
                    )
                })}
            </Switch>
        </div>
    );
}


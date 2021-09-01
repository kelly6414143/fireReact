import React from 'react'
import {
    Switch,
    Link
} from "react-router-dom";
import Header from '../components/Header'
import tools from '../tools/index'

export default function Home(props) {
    const { routes } = props
    console.log('routesroutesroutesroutes', routes)
    return (
        <div>
            <Header />
            <Switch>
                {routes.map((route, i) => {
                    console.log('routehome', route)
                    return (
                        <tools.RouteWithSubRoutes key={i} {...route} />
                    )
                })}
            </Switch>
        </div>
    );
}


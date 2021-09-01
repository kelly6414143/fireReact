import {
    BrowserRouter as Router,
    Switch
  } from "react-router-dom";
import renderRoutesMap from './renderRoutesMap'

/**
* renderRoutes 渲染路由
* @param  {array}      routes              路由列表
* @param  {object}     extraProps  = {}    extra的屬性
* @param  {object}     switchProps = {}    switch的屬性
*/
const renderRoutes = ({ routes, extraProps = {}, switchProps = {} }) => (
    <Router>
        <Switch {...switchProps}>
            {renderRoutesMap(routes)}
        </Switch>
    </Router>
)
export default renderRoutes
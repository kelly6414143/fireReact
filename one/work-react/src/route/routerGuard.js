import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// import Loadable from 'react-loadable'
// import { connect } from 'react-redux'
import renderRoutesMap from './renderRoutesMap'
import tools from '../tools/index'

const mapStateToProps = state => (state)
const mapDispatchToProps = dispatch => ({ ...dispatch })
class RouterGuard extends Component {
    constructor(props) {
        super()
    }
    componentWillMount() {
        const a = true
        let { history: { replace }, authorization, location, name } = this.props
        if (a) replace('./register')
        // if (name == '404') replace('./notFound')
        console.log('路由跳轉前的攔截', this.props)
    }
    render() {
        let { routes = [], location, path, route } = this.props
        
        console.log('準備渲染compoent前', this.props)
        return (
            <div>
                <tools.RouteWithSubRoutes {...this.props} />
                {renderRoutesMap(routes)}
            </div>
        )
    }
}
export default withRouter(RouterGuard)
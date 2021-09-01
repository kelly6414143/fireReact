import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// import Loadable from 'react-loadable'
// import { connect } from 'react-redux'
import renderRoutesMap from './renderRoutesMap'
const mapStateToProps = state => (state)
const mapDispatchToProps = dispatch => ({ ...dispatch })
class RouterGuard extends Component {
    constructor(props) {
        super()
    }
    componentWillMount() {
        const a = true
        let { history: { replace }, authorization, location } = this.props
        if (a) replace('./register')
        // if (location.pathname === '/') replace('./register')
        console.log('路由跳轉前的攔截', this.props)
    }
    render() {
        let { component, routes = [] } = this.props
        console.log('準備渲染compoent前', this.props)
        const LoadableComponent = {
            loader: () => import(`../${component}`),
            loading: () => (
                <span>11111</span>
            )
        }
        return (
            <div>
                <LoadableComponent {...this.props} />
                {renderRoutesMap(routes)}
            </div>
        )
    }
}
export default withRouter(RouterGuard)
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
        let { history: { replace }, authorization, location, name, isPrivate } = this.props
        if (!sessionStorage['userToken']) replace('./login')
        console.log('routerGuard', name, isPrivate )
        if(isPrivate){
            fetch('/api/authentication', {
                headers: {
                    "AUTHENTICATION_TOKEN": sessionStorage['userToken']
                }
            }).then(res => {
                return res.json()
            }).then(res=>{
                console.log('res',res)
                if(!res.success){
                    sessionStorage.removeItem('userToken')
                }
            }).catch(err => {
                console.error('err', err)
                sessionStorage.removeItem('userToken')
            })
        }
        // if (name == '404') replace('./notFound')
        // console.log('路由跳轉前的攔截', this.props)
    }
    render() {
        let { routes = [], location, path, route } = this.props
        
        // console.log('準備渲染compoent前', this.props)
        return (
            <div>
                <tools.RouteWithSubRoutes {...this.props} />
                {renderRoutesMap(routes)}
            </div>
        )
    }
}
export default withRouter(RouterGuard)
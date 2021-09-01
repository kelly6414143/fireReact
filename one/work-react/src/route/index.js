import renderRoutes from './renderRoutes'
import routerConfig from './routerConfig'

const router = () => (
    renderRoutes({
        routes: routerConfig
    })
)
export default router
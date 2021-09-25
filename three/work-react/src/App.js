import { BrowserRouter as Router } from "react-router-dom";
import renderRoutes from '@/route/renderRoutes'
import routerConfig from '@/route/nestRouterConfig'
import Provider from '@/stores/context'
import DrawerProvider from '@/stores/DrawerContext'
import UsersProvider from '@/stores/UsersContext'
import './App.css';


function App() {

  return (
    <Provider>
      <DrawerProvider>
        <UsersProvider>
          <Router>
            {renderRoutes({ routes: routerConfig })}
          </Router>
        </UsersProvider>
      </DrawerProvider>
    </Provider>
  );
}

export default App;

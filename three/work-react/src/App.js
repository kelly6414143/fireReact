import { BrowserRouter as Router } from "react-router-dom";
import renderRoutes from '@/route/renderRoutes'
import routerConfig from '@/route/nestRouterConfig'
import Provider from '@/stores/context'
import DrawerProvider from '@/stores/DrawerContext'
import './App.css';


function App() {

  return (
    <Provider>
      <DrawerProvider>
        <Router>
          {renderRoutes({ routes: routerConfig })}
        </Router>
      </DrawerProvider>
    </Provider>
  );
}

export default App;

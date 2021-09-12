import { BrowserRouter as Router } from "react-router-dom";
import renderRoutes from '@/route/renderRoutes'
import routerConfig from '@/route/nestRouterConfig'
import Provider from '@/stores/context'
import './App.css';


function App() {

  return (
    <Provider>
      <Router>
        {renderRoutes({ routes: routerConfig })}
      </Router>
    </Provider>
  );
}

export default App;

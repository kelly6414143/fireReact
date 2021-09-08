import { BrowserRouter as Router } from "react-router-dom";
import renderRoutes from './route/renderRoutes'
import routerConfig from './route/nestRouterConfig'
import './App.css';


function App() {

  return (
    <Router>
      {renderRoutes({routes: routerConfig})}
    </Router>
  );
}

export default App;

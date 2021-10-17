import { BrowserRouter as Router } from "react-router-dom";
import renderRoutes from "@/route/renderRoutes"
import routerConfig from '@/route/routerConfig'
import Provider from '@/stores/context'
import UsersRowProvider from '@/stores/UsersRowContext'
import UsersTableContext from '@/stores/UsersTableContext'
import './App.css';


function App() {

  return (
    <Provider>
        <UsersRowProvider>
          <UsersTableContext>
            <Router>
              {renderRoutes({ routes: routerConfig })}
            </Router>
          </UsersTableContext>
        </UsersRowProvider>
    </Provider>
  );
}

export default App;

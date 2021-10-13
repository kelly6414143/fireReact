import { BrowserRouter as Router } from "react-router-dom";
import renderRoutes from "@/route/renderRoutes"
import routerConfig from '@/route/routerConfig'
// import Provider from '@/stores/context'
// import DrawerProvider from '@/stores/DrawerContext'
// import UsersRowProvider from '@/stores/UsersRowContext'
// import UsersTableContext from '@/stores/UsersTableContext'
import './App.css';


function App() {

  return (
    // <Provider>
    //   <DrawerProvider>
    //     <UsersRowProvider>
          // <UsersTableContext>
            <Router>
              {renderRoutes({ routes: routerConfig })}
            </Router>
          //  </UsersTableContext>
    //     </UsersRowProvider>
    //   </DrawerProvider>
    // </Provider>
  );
}

export default App;

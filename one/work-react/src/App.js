import Route from './route/index'
import './App.css';


function App() {
  // fetch('/api/login', {method: 'post'}).then(res=>{
  //   console.log('res', res)
  // }).catch(err=>{
  //   console.log('err', err)
  // })

  return (
    <>
      <Route/>
    </>
    // <Router>
    //   <div>
    //     <Switch>
    //       {routes.map((route, i) => {
    //         console.log('routeapp', route)
    //         return (
    //           <tools.RouteWithSubRoutes key={i} {...route} />
    //         )
    //       })}
    //     </Switch>
    //   </div>
    // </Router>
  );
}

export default App;

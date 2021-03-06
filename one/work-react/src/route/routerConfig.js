import React, { Suspense, lazy, Fragment } from "react";

const Layout = lazy(() => import("../components/Layout"));
const Home = lazy(() => import("../pages/Home"));
const News = lazy(() => import("../pages/News"));
const Register = lazy(() => import("../pages/Register"));
const Login = lazy(() => import("../pages/Login"));

const routerConfig = [
  {
    path: "/register",
    component: (props) => {
      return (
        <Fragment>
          <Suspense fallback={<p>Loading~~~~</p>}>
            <Register {...props} />
          </Suspense>
        </Fragment>
      );
    },
  },
  {
    path: "/login",
    component: (props) => {
      return (
        <Fragment>
          <Suspense fallback={<p>Loading~~~~</p>}>
            <Login {...props} />
          </Suspense>
        </Fragment>
      );
    },
  },
  {
    path: "/",
    exact: true,
    isPrivate: true,
    component: (props) => {
      return (
        <Fragment>
          <Suspense fallback={<p>Loading~~~~</p>}>
            <Layout {...props}>
              <Home {...props} />
            </Layout>
          </Suspense>
        </Fragment>
      );
    },
  },
  {
    path: "/news",
    isPrivate: true,
    component: (props) => {
      return (
        <Fragment>
          <Suspense fallback={<p>Loading~~~~</p>}>
            <Layout {...props}>
              <News {...props} />
            </Layout>
          </Suspense>
        </Fragment>
      );
    },
  },
  {
    path: "/*",
    name: "404",
    component: (props) => {
      console.log('333333333333', props)
      return (
        <Fragment>
          <Suspense fallback={<p>Loading~~~~</p>}>
            <div>
              <span>找不到頁面</span>
              <button onClick={()=>props.history.replace('./')}><a>回首頁</a></button>
            </div>
          </Suspense>
        </Fragment>
      );
    },
  },
];

export default routerConfig;

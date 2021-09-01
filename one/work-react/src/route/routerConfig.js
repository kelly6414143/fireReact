import React, { Suspense, lazy, Fragment } from "react";

const Layout = lazy(() => import("../pages/Layout"));
const Home = lazy(() => import("../pages/Home"));
const News = lazy(() => import("../pages/News"));
const Register = lazy(() => import("../pages/Register"));
const Login = lazy(() => import("../pages/Login"));

const routerConfig = [
  {
    path: "/register",
    component: () => {
      return (
        <Fragment>
          <Suspense fallback={<p>Loading~~~~</p>}>
            <Register />
          </Suspense>
        </Fragment>
      );
    },
  },
  {
    path: "/login",
    component: () => {
      return (
        <Fragment>
          <Suspense fallback={<p>Loading~~~~</p>}>
            <Login />
          </Suspense>
        </Fragment>
      );
    },
  },
  {
    path: "/",
    component: (props) => {
      return (
        <Fragment>
          <Suspense fallback={<p>Loading~~~~</p>}>
            <Layout {...props} />
          </Suspense>
        </Fragment>
      );
    },
    routes: [
      {
        path: "/",
        exact: true,
        component: (props) => {
          return (
            <Fragment>
              <Suspense fallback={<p>Loading~~~~</p>}>
                <Home {...props} />
              </Suspense>
            </Fragment>
          );
        },
      },
      {
        path: "/news",
        component: () => {
          return (
            <Fragment>
              <Suspense fallback={<p>Loading~~~~</p>}>
                <News />
              </Suspense>
            </Fragment>
          );
        },
      },
    ],
  },
  {
    path: "*",
    component: () => {
      return (
        <Fragment>
          <Suspense fallback={<p>Loading~~~~</p>}>
            <div>404</div>
          </Suspense>
        </Fragment>
      );
    },
  },
];

export default routerConfig;

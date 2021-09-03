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
  // {
  //   path: "/notFound",
  //   component: () => {
  //     return (
  //       <Fragment>
  //         <Suspense fallback={<p>Loading~~~~</p>}>
  //           <div>找不到頁面</div>
  //         </Suspense>
  //       </Fragment>
  //     );
  //   },
  // },
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
        name: '首頁',
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
        name: '最新消息',
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
    path: "/*",
    name: '404',
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

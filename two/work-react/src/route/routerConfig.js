import React, { Suspense, lazy, Fragment } from "react";

const Layout = lazy(() => import("@components/Layout"));
const Home = lazy(() => import("@/pages/Home"));
const ProfileSetting = lazy(() => import("@/pages/ProfileSetting"));
const UserManagement = lazy(() => import("@/pages/UserManagement"));
const Register = lazy(() => import("@/pages/Register"));
const Login = lazy(() => import("@/pages/Login"));

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
    path: "/account/profile-setting",
    isPrivate: true,
    component: (props) => {
      return (
        <Fragment>
          <Suspense fallback={<p>Loading~~~~</p>}>
            <Layout {...props}>
              <ProfileSetting {...props} />
            </Layout>
          </Suspense>
        </Fragment>
      );
    },
  },
  {
    path: "/users",
    isPrivate: true,
    component: (props) => {
      return (
        <Fragment>
          <Suspense fallback={<p>Loading~~~~</p>}>
            <Layout {...props}>
              <UserManagement {...props} />
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
      return (
        <Fragment>
          <Suspense fallback={<p>Loading~~~~</p>}>
            <div>
              <span>找不到頁面</span>
              <button onClick={() => props.history.replace('/')}><a>回首頁</a></button>
            </div>
          </Suspense>
        </Fragment>
      );
    },
  },
];

export default routerConfig;

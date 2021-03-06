import React, { Suspense, lazy, Children } from "react";

const Layout = lazy(() => import("@components/Layout/Layout"));
const Home = lazy(() => import("@/pages/Home"));
const ProfileSetting = lazy(() => import("@/pages/ProfileSetting"));
const UserManagementRow = lazy(() => import("@/pages/users/UserManagementRow"));
const UserManagementTable = lazy(() => import("@/pages/users/UserManagementTable"));
const UserDetail = lazy(() => import("@/pages/users/UserDetail"));
const Register = lazy(() => import("@/pages/Register"));
const Login = lazy(() => import("@/pages/Login"));

const AsyncComponent = ({children}) => {
  return (
    <Suspense fallback={<p>Loading~~~~</p>}>
        {children}
    </Suspense>
  )
} 

const routerConfig = [
  {
    path: "/register",
    component: (props) => {
      return (
        <AsyncComponent>
          <Register {...props} />
        </AsyncComponent>
      );
    },
  },
  {
    path: "/login",
    component: (props) => {
      return (
        <AsyncComponent>
          <Login {...props} />
        </AsyncComponent>
      );
    },
  },
  {
    path: "/",
    exact: true,
    isPrivate: true,
    component: (props) => {
      return (
        <AsyncComponent>
          <Layout {...props}>
            <Home {...props} />
          </Layout>
        </AsyncComponent>
      );
    },
  },
  {
    path: "/account/profile-setting",
    isPrivate: true,
    component: (props) => {
      return (
        <AsyncComponent>
          <Layout {...props}>
            <ProfileSetting {...props} />
          </Layout>
        </AsyncComponent>
      );
    },
  },
  {
    path: "/users/tableDisplay",
    isPrivate: true,
    exact: true,
    // auth: "ADMIN",
    component: (props) => {
      return (
        <AsyncComponent>
          <Layout {...props}>
            <UserManagementTable {...props} />
          </Layout>
        </AsyncComponent>
      );
    },
  },
  {
    path: "/users/rowDisplay",
    isPrivate: true,
    // auth: "ADMIN",
    component: (props) => {
      return (
        <AsyncComponent>
          <Layout {...props}>
            <UserManagementRow {...props} />
          </Layout>
        </AsyncComponent>
      );
    },
  },
  {
    path: "/users/userDetail",
    isPrivate: true,
    component: (props) => {
      return (
        <AsyncComponent>
          <Layout {...props}>
            <UserDetail {...props} />
          </Layout>
        </AsyncComponent>
      );
    },
  },
  {
    path: "/*",
    name: "404",
    component: (props) => {
      return (
        <AsyncComponent>
          <div>
            <span>???????????????</span>
            <button onClick={() => props.history.replace('/')}><a>?????????</a></button>
          </div>
        </AsyncComponent>
      );
    },
  },
];

export default routerConfig;

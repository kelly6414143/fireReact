import React, { Suspense, lazy, Children, ReactNode } from "react";

const Layout = lazy(() => import("@components/Layout/Layout"));
const Home = lazy(() => import("@/pages/Home"));
const ProfileSetting = lazy(() => import("@/pages/ProfileSetting"));
const UserManagementRow = lazy(() => import("@/pages/users/UserManagementRow"));
const UserManagementTable = lazy(() => import("@/pages/users/UserManagementTable"));
// const UserDetail = lazy(() => import("@/pages/users/UserDetail"));
const Register = lazy(() => import("@/pages/Register"));
const Login = lazy(() => import("@/pages/Login"));

const AsyncComponent = ({children}:any) => {
  return (
    <Suspense fallback={<p>Loading~~~~</p>}>
        {children}
    </Suspense>
  )
} 

interface IProps {
  history: { [index: string]: any };
  routes: { [index: string]: any };
  children: ReactNode;
  setUserInfo?: ({ }) => void;
  getUserInfo?: { [index: string]: any };
}

interface ILayoutProps {
  history: { [index: string]: any };
  routes: { [index: string]: any };
  children: ReactNode;
  setUserInfo: ({ }) => void;
  getUserInfo: { [index: string]: any };
}

const routerConfig = [
  {
    path: "/register",
    component: (props:IProps) => {
      return (
        <AsyncComponent>
          <Register {...props} />
        </AsyncComponent>
      );
    },
  },
  {
    path: "/login",
    component: (props:IProps) => {
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
    component: (props:ILayoutProps) => {
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
    component: (props:ILayoutProps) => {
      return (
        <AsyncComponent>
          <Layout {...props}>
            <ProfileSetting/>
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
    component: (props:ILayoutProps) => {
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
    component: (props:ILayoutProps) => {
      return (
        <AsyncComponent>
          <Layout {...props}>
            <UserManagementRow {...props} />
          </Layout>
        </AsyncComponent>
      );
    },
  },
  // {
  //   path: "/users/userDetail",
  //   isPrivate: true,
  //   component: (props) => {
  //     return (
  //       <AsyncComponent>
  //         <Layout {...props}>
  //           <UserDetail {...props} />
  //         </Layout>
  //       </AsyncComponent>
  //     );
  //   },
  // },
  {
    path: "/*",
    name: "404",
    component: (props:IProps) => {
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

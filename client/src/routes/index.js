import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// layouts
import DashboardLayout from "../layouts/dashboard";
import MainLayout from "../layouts/main";

// config
import LoadingScreen from "../components/LoadingScreen";
import { PATH_DASHBOARD } from "./paths";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {

    const DEFAULT_PATH = PATH_DASHBOARD.general.app;

  return useRoutes([
    {
      path: "/auth",
      element: <MainLayout />,
      children: [
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
        // { path: "reset-password", element: <ResetPasswordPage /> },
        // { path: "new-password", element: <NewPasswordPage /> },
      ],
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: "add-student", element: <AddStudent /> },
        { path: "manage", element: <ManageStudent /> },
        // { path: "edit", element: <GroupPage /> },
        // { path: "view", element: <CallPage /> },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

const LoginPage = Loadable(lazy(() => import("../pages/auth/Login")));
const RegisterPage = Loadable(lazy(() => import("../pages/auth/Register")));
const AddStudent = Loadable(lazy(() => import("../pages/dashboard/AddStudent")));
const ManageStudent = Loadable(lazy(() => import("../pages/dashboard/ManageStudent")));
const Page404 = Loadable(lazy(() => import("../pages/Page404")));

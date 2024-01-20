import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login/Login";
import MainLayout from "../components/MainLayout";
import Dashboard from "../pages/Dashboard/dashboard";
const isLoggedIn = !!localStorage.getItem("access_token");
export const routesConfig = createBrowserRouter([
  {
    path: "/",
    element: !isLoggedIn ? <MainLayout /> : <Navigate to="/dashboard" />,
    children: [
      { path: "login", element: <Login /> },
      { path: "/", element: <Navigate to="/login" /> },
    ],
  },
  {
    path: "/dashboard",
    element: !isLoggedIn ? <Navigate to="/login" /> : <Dashboard />,
  },
  { path: "/login", element: <Login /> },
]);

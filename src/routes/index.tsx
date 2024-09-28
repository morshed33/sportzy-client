import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LandingPage from "@/pages/LandingPage";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Unauthorized from "@/pages/Unauthorized";
import PublicLayout from "@/components/layouts/PublicLayout";
import PrivateRoute from "@/components/PrivateRoutes";
import UserLayout from "@/components/layouts/UserLayout";
import UserDashboard from "@/pages/UserDashboard";
import AdminLayout from "@/components/layouts/AdminLayout";
import AdminDashboard from "@/pages/AdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <PublicLayout />,
        children: [
          {
            index: true,
            element: <LandingPage />,
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
        ],
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute roleRequired="user">
            <UserLayout />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <UserDashboard />,
          },
        ],
      },
      {
        path: "admin",
        element: (
          <PrivateRoute roleRequired="admin">
            <AdminLayout />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <AdminDashboard />,
          },
        ],
      },
      {
        path: "/unauthorized",
        element: <Unauthorized />,
      },
    ],
  },
]);

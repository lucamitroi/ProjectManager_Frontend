import { useState } from "react";
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import { action as registerAction } from './pages/RegisterPage';
import { action as loginAction } from './pages/LoginPage';
import { action as logoutAction } from './pages/Logout';
import LoginPage from "./pages/LoginPage";
import { checkAuth, checkNotAuth } from "./util/helperFunctions";

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: isAuthenticated() ? (
        <Navigate to="/dashboard" replace />
      ) : (
        <Navigate to="/login" replace />
      ),
    },
    {
      path: 'register',
      element: <RegisterPage />,
      action: registerAction,
      loader: checkNotAuth
    },
    {
      path: 'login',
      element: <LoginPage />,
      action: loginAction,
      loader: checkNotAuth
    },
    {
      path: 'dashboard',
      element: <DashboardPage />,
      loader: checkAuth
    },
    {
      path: 'logout',
      action: logoutAction,
    },
  ]);

  return (
    <div className="flex bg-[rgba(33,32,32,255)]">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

// src/App.tsx
import React, { type JSX } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Login from './pages/Login';
// We'll create Dashboard soon
import Dashboard from './pages/Dashboard';
import Home from './pages/Home'; 
import About from './pages/About';
import Contact from './pages/Contact';
import Graduation from './pages/Graduation';
import Team from './pages/Team';

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const context = useContext(AuthContext);
  if (!context) throw new Error('AuthContext not found');

  const { token, isLoading } = context;

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  const router = createBrowserRouter(
    [
      { path: '/login', element: <Login /> },
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
      { path: '/graduation', element: <Graduation /> },
      { path: '/team', element: <Team /> },
      { path: '/dashboard', element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
      { path: '*', element: <Navigate to="/login" replace /> },
    ],
    { future: { v7_relativeSplatPath: true } }
  );

  return <RouterProvider router={router} />;
}

export default App;
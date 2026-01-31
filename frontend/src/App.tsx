// src/App.tsx
import React, { type JSX } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const context = useContext(AuthContext);
  if (!context) throw new Error('AuthContext not found');

  const { token, isLoading } = context;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return token ? children : <Navigate to="/login" replace />;
}

// Layout component that includes Sidebar for all authenticated pages
function ProtectedLayout({ children }: { children: JSX.Element }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8 transition-all duration-300">
        <div className="mt-16 lg:mt-0">
          {children}
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Placeholder for future pages */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
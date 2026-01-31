// src/App.tsx
import React, { type JSX, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar';

// new imports for all pages
import Home from './pages/Home';
import About from './pages/About';
import Activate from './pages/Activate';
import ApplyPage from './pages/ApplyPage';
import Contact from './pages/Contact';
import Graduation from './pages/Graduation';
import Matches from './pages/Matches';
import MenteeDashboard from './pages/MenteeDashboard';
import MenteeLogin from './pages/MenteeLogin';
import Mentees from './pages/Mentees';
import Mentors from './pages/Mentors';
import Progress from './pages/Progress';
import ResendVerification from './pages/ResendVerification';
import Team from './pages/Team';
import VerifyEmail from './pages/VerifyEmail';

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
        {/* Public routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/activate/:token" element={<Activate />} />
        <Route path="/apply" element={<ApplyPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/graduation" element={<Graduation />} />
        <Route path="/team" element={<Team />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/resend-verification" element={<ResendVerification />} />

        <Route path="/login" element={<Login />} />
        <Route path="/mentee/login" element={<MenteeLogin />} />

        {/* Protected routes (require auth) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Dashboard />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/mentee/dashboard"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <MenteeDashboard />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        {/* Separation of concerns: protected pages */}
        <Route
          path="/matches"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Matches />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/mentees"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Mentees />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/mentors"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Mentors />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/progress"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Progress />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        {/* default/fallback */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
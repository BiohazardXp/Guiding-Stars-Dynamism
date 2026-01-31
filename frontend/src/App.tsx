// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar';
import Mentors from './pages/Mentors';
import Mentees from './pages/Mentees';
import Matches from './pages/Matches';
import Progress from './pages/Progress';
import Activate from './pages/Activate';
import MenteeLogin from './pages/MenteeLogin';
import MenteeDashboard from './pages/MenteeDashboard';
import ApplyPage from './pages/ApplyPage';

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
        {/* Public routes - no sidebar */}
        <Route path="/apply" element={<ApplyPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/activate/:token" element={<Activate />} />
        <Route path="/mentee/login" element={<MenteeLogin />} />
        <Route path="/mentee/dashboard" element={<MenteeDashboard />} />
        
        {/* Protected routes - with sidebar */}
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
          path="/progress"
          element={
            <ProtectedRoute>
              <ProtectedLayout>
                <Progress />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        {/* Redirect root to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        {/* 404 fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
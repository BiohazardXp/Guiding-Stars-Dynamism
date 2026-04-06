// src/components/ProtectedRoute.tsx
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (auth?.isLoading) {
      // Still checking auth status
      return;
    }

    if (!auth?.token) {
      // No token - redirect to login
      console.log('[ProtectedRoute] No token found, redirecting to login');
      navigate('/admin-login', { replace: true });
      return;
    }

    if (requiredRole && auth?.role !== requiredRole) {
      // Wrong role - redirect to login
      console.log('[ProtectedRoute] Incorrect role:', { required: requiredRole, current: auth?.role });
      navigate('/admin-login', { replace: true });
      return;
    }

    // Auth check passed
  }, [auth?.token, auth?.role, auth?.isLoading, requiredRole, navigate]);

  if (auth?.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!auth?.token) {
    return null; // Will redirect via useEffect
  }

  if (requiredRole && auth?.role !== requiredRole) {
    return null; // Will redirect via useEffect
  }

  return <>{children}</>;
}

// src/context/AuthContext.tsx
import { createContext, useState, useEffect, type ReactNode } from 'react';

interface AuthContextType {
  token: string | null;
  role: string | null;
  isLoading: boolean;
  login: (token: string, role: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    /**
     * PERSISTENCE CHECK
     * Check for both admin and mentee tokens on app load
     */
    const adminToken = localStorage.getItem('admin_token');
    const menteeToken = localStorage.getItem('mentee_token');
    
    if (adminToken) {
      setToken(adminToken);
      setRole('admin');
    } else if (menteeToken) {
      setToken(menteeToken);
      setRole('mentee');
    }

    setIsLoading(false);
  }, []);

  const login = (newToken: string, userRole: string) => {
    console.log('[AuthContext] Login called with:', { userRole, tokenLength: newToken?.length });
    if (userRole === 'admin') {
      /**
       * ADMIN LOGIN:
       * Save token to localStorage so it persists across page reloads
       */
      localStorage.setItem('admin_token', newToken);
      localStorage.removeItem('mentee_token');
      console.log('[AuthContext] Saved admin_token to localStorage:', newToken.substring(0, 20) + '...');
    } else {
      // Mentees stay logged in via localStorage
      localStorage.setItem('mentee_token', newToken);
      localStorage.removeItem('admin_token');
      console.log('[AuthContext] Saved mentee_token to localStorage');
    }
    
    setToken(newToken);
    setRole(userRole);
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('mentee_token');
    localStorage.removeItem('mentee_user');
    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
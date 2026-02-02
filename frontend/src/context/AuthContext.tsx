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
     * Admin: No check here. Admins must start at null on every refresh.
     * Mentee: Still checked in localStorage for convenience.
     */
    const menteeToken = localStorage.getItem('mentee_token');
    
    if (menteeToken) {
      setToken(menteeToken);
      setRole('mentee');
    }

    setIsLoading(false);
  }, []);

  const login = (newToken: string, userRole: string) => {
    if (userRole === 'admin') {
      /**
       * ADMIN SECURITY:
       * We do NOT save the token to localStorage or sessionStorage.
       * It lives only in the 'token' state variable above.
       */
      localStorage.removeItem('mentee_token'); 
    } else {
      // Mentees stay logged in via localStorage
      localStorage.setItem('mentee_token', newToken);
    }
    
    setToken(newToken);
    setRole(userRole);
  };

  const logout = () => {
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
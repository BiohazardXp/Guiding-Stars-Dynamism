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

// Session timeout duration in milliseconds (15 minutes)
const SESSION_TIMEOUT = 15 * 60 * 1000;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [inactivityTimer, setInactivityTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  // Track user activity to reset inactivity timer
  const resetInactivityTimer = () => {
    // Clear existing timer
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }

    // Only set timer if user is logged in
    if (token) {
      const newTimer = setTimeout(() => {
        console.log('[AuthContext] Session timeout due to inactivity');
        logout();
      }, SESSION_TIMEOUT);
      setInactivityTimer(newTimer);
    }
  };

  useEffect(() => {
    /**
     * PERSISTENCE CHECK
     * Check for admin, mentor, and mentee tokens on app load
     */
    const adminToken = localStorage.getItem('admin_token');
    const mentorToken = localStorage.getItem('mentor_token');
    const menteeToken = localStorage.getItem('mentee_token');
    
    if (adminToken) {
      setToken(adminToken);
      setRole('admin');
    } else if (mentorToken) {
      setToken(mentorToken);
      setRole('mentor');
    } else if (menteeToken) {
      setToken(menteeToken);
      setRole('mentee');
    }

    setIsLoading(false);
  }, []);

  // Reset inactivity timer on token change
  useEffect(() => {
    if (token) {
      resetInactivityTimer();
    }
    return () => {
      if (inactivityTimer) {
        clearTimeout(inactivityTimer);
      }
    };
  }, [token]);

  // Track user activity (mouse, keyboard, scroll)
  useEffect(() => {
    const handleUserActivity = () => {
      if (token) {
        resetInactivityTimer();
      }
    };

    // Add event listeners for user activity
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keypress', handleUserActivity);
    window.addEventListener('scroll', handleUserActivity);
    window.addEventListener('click', handleUserActivity);
    window.addEventListener('touchstart', handleUserActivity);

    return () => {
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keypress', handleUserActivity);
      window.removeEventListener('scroll', handleUserActivity);
      window.removeEventListener('click', handleUserActivity);
      window.removeEventListener('touchstart', handleUserActivity);
    };
  }, [token, inactivityTimer]);

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
    console.log('[AuthContext] Logout called');
    localStorage.removeItem('admin_token');
    localStorage.removeItem('mentee_token');
    localStorage.removeItem('mentee_user');
    setToken(null);
    setRole(null);
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
      setInactivityTimer(null);
    }
  };

  return (
    <AuthContext.Provider value={{ token, role, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
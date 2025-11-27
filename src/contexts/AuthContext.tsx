"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const AUTH_BASE_URL = process.env.NEXT_PUBLIC_AUTH_API_URL || 'https://synthai.pl/api';

export interface User {
  sub: string;
  email?: string;
  email_verified?: boolean;
  name?: string;
  preferred_username?: string;
  given_name?: string;
  family_name?: string;
  [key: string]: unknown;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  register: () => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  // Check if user is authenticated on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      
      // Add timeout to prevent infinite loading
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const response = await fetch(`${AUTH_BASE_URL}/auth/me`, {
        method: 'GET',
        credentials: 'include', // Important: include cookies
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = () => {
    // Redirect to backend login endpoint (which will redirect to Keycloak)
    window.location.href = `${AUTH_BASE_URL}/auth/login`;
  };

  const register = () => {
    // Redirect to backend register endpoint (which will redirect to Keycloak)
    window.location.href = `${AUTH_BASE_URL}/auth/register`;
  };

  const logout = async () => {
    try {
      await fetch(`${AUTH_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setUser(null);
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
      // Still clear user state on frontend
      setUser(null);
      window.location.href = '/';
    }
  };

  const refreshUser = async () => {
    await checkAuth();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

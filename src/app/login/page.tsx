"use client";
import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { LockOutlined, PersonOutline } from '@mui/icons-material';

export default function LoginPage() {
  const { isAuthenticated, isLoading, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/profile');
    }
  }, [isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-text">Loading...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
            <LockOutlined className="h-10 w-10 text-primary" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-primary">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-primary_muted">
            Sign in to access your SynthAI account
          </p>
        </div>

        <div className="mt-8 bg-surface rounded-2xl shadow-lg p-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg border border-outline">
              <PersonOutline className="text-primary" />
              <div>
                <p className="text-sm font-medium text-text">Secure Authentication</p>
                <p className="text-xs text-primary_muted">
                  Powered by Keycloak SSO
                </p>
              </div>
            </div>

            <button
              onClick={login}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
            >
              Sign in with Keycloak
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-surface text-primary_muted">
                  New to SynthAI?
                </span>
              </div>
            </div>

            <button
              onClick={() => router.push('/register')}
              className="w-full flex justify-center py-3 px-4 border border-outline rounded-lg shadow-sm text-sm font-medium text-primary bg-transparent hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
            >
              Create an account
            </button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs text-primary_muted">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}

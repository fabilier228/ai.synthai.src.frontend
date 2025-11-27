"use client";
import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, Error } from '@mui/icons-material';
import { useAuth } from '@/contexts/AuthContext';

const AUTH_BASE_URL = process.env.NEXT_PUBLIC_AUTH_API_URL || 'https://synthai.pl/api';

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUser } = useAuth();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [message, setMessage] = useState('Completing authentication...');
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    // Prevent double execution (React StrictMode, development mode)
    if (hasRun) return;
    setHasRun(true);

    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        const state = searchParams.get('state');

        if (!code) {
          setStatus('error');
          setMessage('Authentication failed: Missing authorization code');
          setTimeout(() => router.push('/login'), 3000);
          return;
        }

        // The backend will handle the token exchange
        // We just need to call the callback endpoint with the code
        const response = await fetch(
          `${AUTH_BASE_URL}/auth/callback?code=${code}&state=${state || ''}`,
          {
            method: 'GET',
            credentials: 'include', // Important: include cookies for session
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setStatus('success');
          setMessage(`Welcome, ${data.user?.preferred_username || 'User'}!`);
          
          // Refresh auth context to update user state
          await refreshUser();
          
          // Redirect to home page after successful authentication
          setTimeout(() => router.push('/'), 1500);
        } else {
          const errorData = await response.json();
          setStatus('error');
          setMessage(errorData.error || 'Authentication failed');
          setTimeout(() => router.push('/login'), 3000);
        }
      } catch (error) {
        console.error('Callback error:', error);
        setStatus('error');
        setMessage('An error occurred during authentication');
        setTimeout(() => router.push('/login'), 3000);
      }
    };

    handleCallback();
  }, [hasRun, searchParams, router, refreshUser]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full">
        <div className="bg-surface rounded-2xl shadow-lg p-8 text-center">
          {status === 'processing' && (
            <>
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-primary mb-6"></div>
              <h2 className="text-2xl font-bold text-primary mb-2">
                Processing...
              </h2>
              <p className="text-primary_muted">{message}</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="mx-auto h-16 w-16 bg-success/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="h-10 w-10 text-success" />
              </div>
              <h2 className="text-2xl font-bold text-success mb-2">
                Success!
              </h2>
              <p className="text-text">{message}</p>
              <p className="text-sm text-primary_muted mt-4">
                Redirecting to home page...
              </p>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="mx-auto h-16 w-16 bg-error/10 rounded-full flex items-center justify-center mb-6">
                <Error className="h-10 w-10 text-error" />
              </div>
              <h2 className="text-2xl font-bold text-error mb-2">
                Authentication Failed
              </h2>
              <p className="text-text">{message}</p>
              <p className="text-sm text-primary_muted mt-4">
                Redirecting to login page...
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-md w-full">
          <div className="bg-surface rounded-2xl shadow-lg p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-primary mb-6"></div>
            <h2 className="text-2xl font-bold text-primary mb-2">
              Loading...
            </h2>
            <p className="text-primary_muted">Please wait</p>
          </div>
        </div>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}

'use client'

import { signInWithGoogle } from '@/lib/auth';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const user = await signInWithGoogle();
      console.log('User:', user);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error signing in with Google:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <button
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="bg-blue-500 text-white p-2 rounded"
      >
        {loading ? 'Logging in...' : 'Sign in with Google'}
      </button>
    </div>
  );
};

export default LoginPage;

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { storeAdminEmail, isAdminEmail } from '@/lib/auth';
import '@/styles/admin.css';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!email) {
        setError('Please enter your email');
        setLoading(false);
        return;
      }

      if (!isAdminEmail(email)) {
        setError('This email does not have admin access');
        setLoading(false);
        return;
      }

      storeAdminEmail(email);
      router.push('/admin/dashboard');
    } catch {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="adminLoginContainer">
      <div className="adminLoginBox">
        <div className="adminLoginHeader">
          <h1 className="adminLoginTitle">Algoryme Admin</h1>
          <p className="adminLoginSubtitle">Sign in to manage your projects and messages</p>
        </div>

        <form onSubmit={handleLogin} className="adminLoginForm">
          <div className="adminFormGroup">
            <label htmlFor="email" className="adminFormLabel">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ahnaf.asad1413@gmail.com"
              className="adminFormInput"
              disabled={loading}
            />
          </div>

          {error && <div className="adminError">{error}</div>}

          <button
            type="submit"
            className="adminLoginButton"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="adminLoginFooter">
          <p className="adminLoginInfo">
            Only authorized admin emails can access this area.
          </p>
        </div>
      </div>
    </div>
  );
}

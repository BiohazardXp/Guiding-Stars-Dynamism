// src/pages/ForgotPassword.tsx
import { useState } from 'react';
import api from '../services/api';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (v: string) => /^\S+@\S+\.\S+$/.test(v);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!email || !validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email });
      // keep generic message to avoid account enumeration
      setMessage('If that email exists, a reset link has been sent!');
    } catch (err: any) {
      // log for debugging but show same generic message
      console.error('ForgotPassword error:', err?.response || err);
      setMessage('If that email exists, a reset link has been sent!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4" aria-live="polite">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 border rounded-lg"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          disabled={loading}
          aria-label="Email"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg"
          disabled={loading}
        >
          {loading ? 'Sending…' : 'Send Reset Link'}
        </button>
      </form>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      {message && <p className="mt-4 text-sm text-blue-600">{message}</p>}
    </div>
  );
}

export default ForgotPassword;
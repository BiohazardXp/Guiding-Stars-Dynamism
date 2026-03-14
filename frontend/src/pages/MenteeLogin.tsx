// src/pages/MenteeLogin.tsx
import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

function MenteeLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/mentee-auth/login', {
        email,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem('mentee_user', JSON.stringify(user));

      if (authContext) {
        authContext.login(token, 'mentee');
      }

      navigate('/mentee/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = '#FF9148';
    e.target.style.boxShadow = '0 0 0 3px rgba(255,145,72,0.15)';
  };
  const inputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = '#d1d5db';
    e.target.style.boxShadow = 'none';
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'linear-gradient(135deg, #FFB27A 0%, #FF9148 45%, #E8722E 100%)' }}
    >
      <div className="max-w-md w-full">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-white rounded-full shadow-lg mb-4">
            <svg
              className="w-12 h-12"
              style={{ color: '#FF9148' }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Guiding Stars</h1>
          <p className="text-white opacity-80">Mentee Portal</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Welcome Back</h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition text-gray-800"
                onFocus={inputFocus}
                onBlur={inputBlur}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition text-gray-800"
                onFocus={inputFocus}
                onBlur={inputBlur}
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 border-gray-300 rounded"
                  style={{ accentColor: '#FF9148' }}
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              
              <a
                href="#"
                className="text-sm hover:underline font-medium"
                style={{ color: '#FF9148' }}
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full text-white py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: loading ? '#d1d5db' : 'linear-gradient(135deg, #FF9148, #E8722E)' }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center space-y-3">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              
              <a
                href="#"
                className="font-medium hover:underline"
                style={{ color: '#FF9148' }}
              >
                Contact your administrator
              </a>
            </p>
            <Link
              to="/login"
              className="block text-sm text-gray-400 hover:text-gray-600 transition"
            >
              Are you an administrator? Click here
            </Link>
          </div>
          </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-white opacity-75">
            © 2026 Guiding Stars. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  );
}

export default MenteeLogin;
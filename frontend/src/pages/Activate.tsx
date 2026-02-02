import { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

function Activate() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    
    try {
      // Send password to activate account
      const response = await api.post(`/mentees/verify/${token}`, { password });
      
      // Destructure token if your backend provides it upon successful activation
      const { token: authToken, message } = response.data;
      
      setSuccess(message || 'Account activated successfully!');
      
      // Auto-login logic
      setTimeout(() => {
        if (authToken && authContext) {
          // Log them in immediately as a mentee
          authContext.login(authToken, 'mentee');
          navigate('/mentee/dashboard', { replace: true });
        } else {
          // If no token returned, send to MENTEE login, not admin login
          navigate('/mentee/login', { replace: true });
        }
      }, 2500);
      
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to activate account. The link may be invalid or expired.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-blue-600 rounded-full mb-4 shadow-lg">
            <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Activate Your Account</h1>
          <p className="text-gray-600">Welcome to Guiding Stars! Set your password to get started.</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-xl p-8 border border-gray-100">
          {success ? (
            <div className="text-center animate-pulse">
              <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
                <svg className="w-12 h-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-green-600 mb-2">Success!</h2>
              <p className="text-gray-600 mb-4">{success}</p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                Redirecting to your dashboard...
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Create Password *
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Minimum 6 characters"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Repeat your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Strength Meter */}
              {password && (
                <div className="space-y-2">
                  <div className="flex gap-1 h-1.5">
                    <div className={`flex-1 rounded-full ${password.length >= 1 ? (password.length < 6 ? 'bg-red-400' : password.length < 10 ? 'bg-yellow-400' : 'bg-green-500') : 'bg-gray-200'}`}></div>
                    <div className={`flex-1 rounded-full ${password.length >= 6 ? (password.length < 10 ? 'bg-yellow-400' : 'bg-green-500') : 'bg-gray-200'}`}></div>
                    <div className={`flex-1 rounded-full ${password.length >= 10 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                  </div>
                  <p className="text-xs text-gray-500">
                    {password.length < 6 ? 'Weak' : password.length < 10 ? 'Medium' : 'Strong'} password
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold shadow-md"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </span>
                ) : 'Activate Account'}
              </button>
            </form>
          )}
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            © 2026 Guiding Stars. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Activate;
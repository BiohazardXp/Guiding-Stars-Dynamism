// frontend/src/pages/VerifyEmail.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const VerifyEmail = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('');

  useEffect(() => {
    verifyEmail();
  }, []);

  const verifyEmail = async () => {
    try {
      const response = await api.get(`/mentees/verify/${token}`);
      setStatus('success');
      setMessage(response.data.message || 'Email verified successfully!');
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/mentee/login');
      }, 3000);
    } catch (error: any) {
      setStatus('error');
      setMessage(
        error.response?.data?.message || 
        'Verification failed. The link may be invalid or expired.'
      );
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: 'url(/img/Guiding-star-background-image.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-orange-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Content */}
      <div className="max-w-md w-full relative z-10">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <img src="/img/HORIZONTAL.png" alt="Guiding Stars" className="h-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Email Activation
            </h2>
          </div>

          {/* Verifying State */}
          {status === 'verifying' && (
            <div className="text-center py-8">
              <div className="flex justify-center mb-6">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full blur-md opacity-50 animate-pulse"></div>
                  <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-orange-500 border-r-orange-500"></div>
                </div>
              </div>
              <p className="text-gray-600 text-lg font-medium">Verifying your email...</p>
              <p className="text-gray-500 text-sm mt-2">Please wait while we activate your account</p>
            </div>
          )}

          {/* Success State */}
          {status === 'success' && (
            <div className="text-center py-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-green-400 to-green-500 mb-6 shadow-lg">
                <svg
                  className="h-10 w-10 text-white animate-bounce"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">🎉 Success!</h3>
              <p className="text-gray-600 mb-6">{message}</p>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-green-800 font-medium">
                  Your account is now active. Redirecting to login in a moment...
                </p>
              </div>
              <button
                onClick={() => navigate('/mentee/login')}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg hover:shadow-lg transition-all font-medium"
              >
                Go to Login
              </button>
            </div>
          )}

          {/* Error State */}
          {status === 'error' && (
            <div className="text-center py-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-red-400 to-red-500 mb-6 shadow-lg">
                <svg
                  className="h-10 w-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Verification Failed</h3>
              <p className="text-gray-600 mb-6">{message}</p>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/resend-verification')}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg hover:shadow-lg transition-all font-medium"
                >
                  Request New Link
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-medium"
                >
                  Go to Home
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
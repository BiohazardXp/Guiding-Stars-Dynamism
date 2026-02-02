import { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

interface DashboardStats {
  mentors: { total: number; active: number; };
  mentees: { total: number; pending: number; approved: number; active: number; };
  matches: { total: number; active: number; completed: number; };
  progress: { total: number; recent: number; onTrack: number; needsAttention: number; milestonesCompleted: number; };
}

function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 1. Access the token and loading state from context
  const context = useContext(AuthContext);
  const token = context?.token;
  const isAuthLoading = context?.isLoading;

  useEffect(() => {
    // 2. Only fetch stats if auth is finished and we have a token
    if (!isAuthLoading && token) {
      fetchStats();
    }
  }, [token, isAuthLoading]); // Re-run if token becomes available

  const fetchStats = async () => {
    try {
      setLoading(true);
      
      // 3. Explicitly pass the token in the headers
      const response = await api.get('/dashboard/stats', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setStats(response.data.data);
      setError('');
    } catch (err: any) {
      console.error('Failed to load stats:', err);
      // If the error is 401, it means our state token expired or is invalid
      if (err.response?.status === 401) {
        setError('Session expired. Please log in again.');
      } else {
        setError('Failed to load dashboard statistics');
      }
    } finally {
      setLoading(false);
    }
  };

  // 4. Handle initial loading state while checking Auth
  if (isAuthLoading || (loading && !stats)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
        <div className="text-gray-600 font-medium">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg shadow-sm">
          <p className="font-bold">Error</p>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-3 text-sm font-semibold underline"
          >
            Try Refreshing
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's an overview of your mentorship program.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium mb-1">Total Mentors</p>
              <p className="text-3xl font-bold text-gray-800">{stats?.mentors.total || 0}</p>
              <p className="text-xs text-green-600 font-semibold mt-2">
                ● {stats?.mentors.active || 0} active
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-xl">
              <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium mb-1">Total Mentees</p>
              <p className="text-3xl font-bold text-gray-800">{stats?.mentees.total || 0}</p>
              <p className="text-xs text-blue-600 font-semibold mt-2">
                ● {stats?.mentees.active || 0} active
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded-xl">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium mb-1">Pending Apps</p>
              <p className="text-3xl font-bold text-gray-800">{stats?.mentees.pending || 0}</p>
              <p className="text-xs text-orange-500 font-semibold mt-2">
                Requires review
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded-xl">
              <svg className="w-8 h-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium mb-1">Active Matches</p>
              <p className="text-3xl font-bold text-gray-800">{stats?.matches.active || 0}</p>
              <p className="text-xs text-purple-600 font-semibold mt-2">
                Out of {stats?.matches.total || 0}
              </p>
            </div>
            <div className="bg-purple-50 p-3 rounded-xl">
              <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Progress Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <p className="text-2xl font-bold text-gray-800">{stats?.progress.total || 0}</p>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">Total Entries</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <p className="text-2xl font-bold text-green-600">{stats?.progress.onTrack || 0}</p>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">On Track</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-xl">
            <p className="text-2xl font-bold text-yellow-600">{stats?.progress.needsAttention || 0}</p>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">Needs Attention</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <p className="text-2xl font-bold text-blue-600">{stats?.progress.milestonesCompleted || 0}</p>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">Milestones</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg p-6 text-white transform hover:scale-[1.02] transition-transform">
          <h3 className="text-lg font-bold mb-2">Review Applications</h3>
          <p className="text-blue-100 text-sm mb-6">
            {stats?.mentees.pending || 0} applications waiting for review
          </p>
          <a href="/mentees" className="inline-block bg-white text-blue-700 px-6 py-2 rounded-lg font-bold text-sm hover:bg-blue-50 transition shadow-sm">
            Review Now
          </a>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-[1.02] transition-transform">
          <h3 className="text-lg font-bold mb-2">Create Match</h3>
          <p className="text-emerald-100 text-sm mb-6">Pair mentors with mentees</p>
          <a href="/matches" className="inline-block bg-white text-emerald-700 px-6 py-2 rounded-lg font-bold text-sm hover:bg-emerald-50 transition shadow-sm">
            Create Match
          </a>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-fuchsia-700 rounded-xl shadow-lg p-6 text-white transform hover:scale-[1.02] transition-transform">
          <h3 className="text-lg font-bold mb-2">Track Progress</h3>
          <p className="text-purple-100 text-sm mb-6">Monitor mentee development</p>
          <a href="/progress" className="inline-block bg-white text-purple-700 px-6 py-2 rounded-lg font-bold text-sm hover:bg-purple-50 transition shadow-sm">
            View Progress
          </a>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
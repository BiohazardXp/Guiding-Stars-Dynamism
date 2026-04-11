import { useState, useEffect } from 'react';
import api from '../services/api';

interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'archived';
  source_page: string;
  created_at: string;
  updated_at: string;
}

const ContactSubmissions = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'read' | 'archived'>('all');

  // Load submissions on mount
  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/contact');
      
      if (response.data.success) {
        setSubmissions(response.data.contacts);
      } else {
        setError('Failed to load submissions');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load submissions');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (submissionId: number, newStatus: 'new' | 'read' | 'archived') => {
    try {
      const response = await api.put(`/contact/${submissionId}`, { status: newStatus });
      
      if (response.data.success) {
        setSubmissions(submissions.map(s => 
          s.id === submissionId ? { ...s, status: newStatus } : s
        ));
        if (selectedSubmission?.id === submissionId) {
          setSelectedSubmission({ ...selectedSubmission, status: newStatus });
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update status');
    }
  };

  const handleDelete = async (submissionId: number) => {
    if (!window.confirm('Are you sure you want to delete this submission?')) return;

    try {
      const response = await api.delete(`/contact/${submissionId}`);
      
      if (response.data.success) {
        setSubmissions(submissions.filter(s => s.id !== submissionId));
        if (selectedSubmission?.id === submissionId) {
          setSelectedSubmission(null);
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete submission');
    }
  };

  const filteredSubmissions = statusFilter === 'all' 
    ? submissions 
    : submissions.filter(s => s.status === statusFilter);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'read':
        return 'bg-gray-100 text-gray-800';
      case 'archived':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'home':
        return 'bg-purple-100 text-purple-800';
      case 'contact':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600 text-lg">Loading submissions...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Contact Submissions</h1>
            <p className="text-gray-600 mt-1">Manage all contact form submissions</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Submissions List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm">
              {/* Filters */}
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Filter by Status</h3>
                <div className="space-y-2">
                  {(['all', 'new', 'read', 'archived'] as const).map(status => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition capitalize ${
                        statusFilter === status
                          ? 'bg-[#FF9148] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {status === 'all' ? 'All Submissions' : `${status} (${submissions.filter(s => s.status === status).length})`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submissions List */}
              <div className="max-h-96 overflow-y-auto">
                {filteredSubmissions.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    No submissions found
                  </div>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {filteredSubmissions.map(submission => (
                      <li
                        key={submission.id}
                        onClick={() => setSelectedSubmission(submission)}
                        className={`p-4 cursor-pointer transition ${
                          selectedSubmission?.id === submission.id
                            ? 'bg-blue-50 border-l-4 border-[#FF9148]'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 truncate">{submission.name}</p>
                            <p className="text-sm text-gray-600 truncate">{submission.email}</p>
                            <p className="text-xs text-gray-500 mt-1">{formatDate(submission.created_at)}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusColor(submission.status)}`}>
                            {submission.status}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Stats */}
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  <p>Total: <span className="font-semibold">{submissions.length}</span></p>
                  <p>New: <span className="font-semibold text-blue-600">{submissions.filter(s => s.status === 'new').length}</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Submission Details */}
          <div className="lg:col-span-2">
            {selectedSubmission ? (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedSubmission.subject}</h2>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-200">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">From</p>
                      <p className="font-semibold text-gray-900">{selectedSubmission.name}</p>
                      <p className="text-sm text-gray-600">{selectedSubmission.email}</p>
                      {selectedSubmission.phone && (
                        <p className="text-sm text-gray-600">{selectedSubmission.phone}</p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Received</p>
                      <p className="font-semibold text-gray-900">{formatDate(selectedSubmission.created_at)}</p>
                      <div className="flex gap-2 mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedSubmission.status)}`}>
                          {selectedSubmission.status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getSourceColor(selectedSubmission.source_page)}`}>
                          from {selectedSubmission.source_page}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Message</h3>
                    <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap text-gray-700 leading-relaxed">
                      {selectedSubmission.message}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {selectedSubmission.status !== 'read' && (
                      <button
                        onClick={() => handleStatusChange(selectedSubmission.id, 'read')}
                        className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition font-semibold"
                      >
                        Mark as Read
                      </button>
                    )}
                    
                    {selectedSubmission.status !== 'archived' && (
                      <button
                        onClick={() => handleStatusChange(selectedSubmission.id, 'archived')}
                        className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition font-semibold"
                      >
                        Archive
                      </button>
                    )}
                    
                    <button
                      onClick={() => handleDelete(selectedSubmission.id)}
                      className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition font-semibold ml-auto"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="text-gray-500">
                  <p className="text-lg font-semibold mb-2">Select a submission to view details</p>
                  <p className="text-sm">Click on any submission from the list to see the full message</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSubmissions;

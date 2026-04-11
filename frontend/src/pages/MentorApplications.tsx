import { useState, useEffect } from 'react';
import api from '../services/api';

interface MentorApplication {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  professional_title: string;
  company: string | null;
  expertise_areas: string;
  professional_background: string;
  bio: string;
  availability: string;
  preferences: string | null;
  status: 'pending' | 'approved' | 'rejected';
  rejection_reason: string | null;
  created_at: string;
  updated_at: string;
}

const MentorApplications = () => {
  const [applications, setApplications] = useState<MentorApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<MentorApplication | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [rejectReason, setRejectReason] = useState('');
  const [processingId, setProcessingId] = useState<number | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/mentor-applications');

      if (response.data.success) {
        setApplications(response.data.applications);
      } else {
        setError('Failed to load applications');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: number) => {
    if (!window.confirm('Approve this mentor application? A mentor account will be created.')) return;

    try {
      setProcessingId(id);
      const response = await api.put(`/mentor-applications/${id}/approve`, {});

      if (response.data.success) {
        setApplications(applications.map((app) => (app.id === id ? { ...app, status: 'approved' } : app)));
        if (selectedApplication?.id === id) {
          setSelectedApplication({ ...selectedApplication, status: 'approved' });
        }
        alert('Application approved successfully! Email sent to mentor.');
      } else {
        setError(response.data.message || 'Failed to approve application');
      }
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to approve application';
      console.error('Approve error:', err);
      setError(errorMsg);
      alert(`Error: ${errorMsg}`);
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id: number) => {
    if (!rejectReason.trim()) {
      alert('Please provide a reason for rejection');
      return;
    }

    if (!window.confirm('Reject this mentor application?')) return;

    try {
      setProcessingId(id);
      const response = await api.put(`/mentor-applications/${id}/reject`, { reason: rejectReason });

      if (response.data.success) {
        setApplications(
          applications.map((app) =>
            app.id === id ? { ...app, status: 'rejected', rejection_reason: rejectReason } : app
          )
        );
        if (selectedApplication?.id === id) {
          setSelectedApplication({
            ...selectedApplication,
            status: 'rejected',
            rejection_reason: rejectReason,
          });
        }
        setRejectReason('');
        alert('Application rejected successfully! Rejection email sent to applicant.');
      } else {
        setError(response.data.message || 'Failed to reject application');
      }
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to reject application';
      console.error('Reject error:', err);
      setError(errorMsg);
      alert(`Error: ${errorMsg}`);
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Permanently delete this application?')) return;

    try {
      setProcessingId(id);
      const response = await api.delete(`/mentor-applications/${id}`);

      if (response.data.success) {
        setApplications(applications.filter((app) => app.id !== id));
        if (selectedApplication?.id === id) {
          setSelectedApplication(null);
        }
        alert('Application deleted successfully.');
      } else {
        setError(response.data.message || 'Failed to delete application');
      }
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to delete application';
      console.error('Delete error:', err);
      setError(errorMsg);
      alert(`Error: ${errorMsg}`);
    } finally {
      setProcessingId(null);
    }
  };

  const filteredApplications =
    statusFilter === 'all' ? applications : applications.filter((app) => app.status === statusFilter);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600 text-lg">Loading applications...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Mentor Applications</h1>
          <p className="text-gray-600 mt-1">Review and manage mentor applications</p>
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
          {/* Left: Applications List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm">
              {/* Filters */}
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Filter by Status</h3>
                <div className="space-y-2">
                  {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition capitalize ${
                        statusFilter === status
                          ? 'bg-[#FF9148] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {status === 'all'
                        ? 'All Applications'
                        : `${status} (${applications.filter((a) => a.status === status).length})`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Applications List */}
              <div className="max-h-96 overflow-y-auto">
                {filteredApplications.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">No applications found</div>
                ) : (
                  <ul className="divide-y divide-gray-200">
                    {filteredApplications.map((app) => (
                      <li
                        key={app.id}
                        onClick={() => setSelectedApplication(app)}
                        className={`p-4 cursor-pointer transition ${
                          selectedApplication?.id === app.id
                            ? 'bg-blue-50 border-l-4 border-[#FF9148]'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 truncate">
                              {app.first_name} {app.last_name}
                            </p>
                            <p className="text-sm text-gray-600 truncate">{app.professional_title}</p>
                            <p className="text-xs text-gray-500 mt-1">{formatDate(app.created_at)}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusColor(app.status)}`}>
                            {app.status}
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
                  <p>
                    Total: <span className="font-semibold">{applications.length}</span>
                  </p>
                  <p>
                    Pending:{' '}
                    <span className="font-semibold text-blue-600">
                      {applications.filter((a) => a.status === 'pending').length}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Application Details */}
          <div className="lg:col-span-2">
            {selectedApplication ? (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {selectedApplication.first_name} {selectedApplication.last_name}
                      </h2>
                      <p className="text-gray-600 mt-1">{selectedApplication.professional_title}</p>
                      {selectedApplication.company && (
                        <p className="text-sm text-gray-600">{selectedApplication.company}</p>
                      )}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(selectedApplication.status)}`}>
                      {selectedApplication.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-200">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Email</p>
                      <a href={`mailto:${selectedApplication.email}`} className="font-semibold text-[#FF9148] hover:underline">
                        {selectedApplication.email}
                      </a>
                    </div>
                    {selectedApplication.phone && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Phone</p>
                        <a href={`tel:${selectedApplication.phone}`} className="font-semibold text-gray-900">
                          {selectedApplication.phone}
                        </a>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Applied</p>
                      <p className="font-semibold text-gray-900">{formatDate(selectedApplication.created_at)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Availability</p>
                      <p className="font-semibold text-gray-900">{selectedApplication.availability}</p>
                    </div>
                  </div>

                  {/* Expertise */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Areas of Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedApplication.expertise_areas.split(',').map((area, idx) => (
                        <span key={idx} className="px-3 py-1 bg-[#FF9148]/10 text-[#FF9148] rounded-full text-sm font-medium">
                          {area.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Background */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Professional Background</h3>
                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {selectedApplication.professional_background}
                    </p>
                  </div>

                  {/* Bio */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Personal Bio & Motivation</h3>
                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{selectedApplication.bio}</p>
                  </div>

                  {/* Preferences */}
                  {selectedApplication.preferences && (
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-900 mb-2">Mentee Preferences</h3>
                      <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {selectedApplication.preferences}
                      </p>
                    </div>
                  )}

                  {/* Rejection Reason */}
                  {selectedApplication.status === 'rejected' && selectedApplication.rejection_reason && (
                    <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
                      <h3 className="font-semibold text-red-900 mb-2">Rejection Reason</h3>
                      <p className="text-red-800">{selectedApplication.rejection_reason}</p>
                    </div>
                  )}

                  {/* Actions */}
                  {selectedApplication.status === 'pending' && (
                    <div className="border-t border-gray-200 pt-6">
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Rejection Reason (if rejecting)
                        </label>
                        <textarea
                          value={rejectReason}
                          onChange={(e) => setRejectReason(e.target.value)}
                          placeholder="Explain why you're rejecting this application..."
                          className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                          rows={3}
                        />
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => handleApprove(selectedApplication.id)}
                          disabled={processingId === selectedApplication.id}
                          className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition font-semibold disabled:opacity-50"
                        >
                          ✓ Approve
                        </button>
                        <button
                          onClick={() => handleReject(selectedApplication.id)}
                          disabled={processingId === selectedApplication.id}
                          className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition font-semibold disabled:opacity-50"
                        >
                          ✗ Reject
                        </button>
                        <button
                          onClick={() => handleDelete(selectedApplication.id)}
                          disabled={processingId === selectedApplication.id}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-semibold ml-auto disabled:opacity-50"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="text-gray-500">
                  <p className="text-lg font-semibold mb-2">Select an application to view details</p>
                  <p className="text-sm">Click on any application from the list to see the full details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorApplications;

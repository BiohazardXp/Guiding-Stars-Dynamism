// src/pages/Progress.tsx
import { useState, useEffect } from 'react';
import api from '../services/api';

interface Mentee {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  goals: string;
  application_status: string;
}

interface Mentor {
  id: number;
  first_name: string;
  last_name: string;
}

interface ProgressEntry {
  id: number;
  mentee_id: number;
  mentor_id: number;
  entry_date: string;
  description: string;
  status: 'on_track' | 'needs_attention' | 'milestone_completed';
  notes: string;
  created_at: string;
  mentee_name?: string;
  mentor_name?: string;
}

function Progress() {
  const [activeTab, setActiveTab] = useState<'view' | 'add'>('view');
  const [progressEntries, setProgressEntries] = useState<ProgressEntry[]>([]);
  const [mentees, setMentees] = useState<Mentee[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [selectedMentee, setSelectedMentee] = useState<number | ''>('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form state for adding progress
  const [formMenteeId, setFormMenteeId] = useState('');
  const [formMentorId, setFormMentorId] = useState('');
  const [formDate, setFormDate] = useState(new Date().toISOString().split('T')[0]);
  const [formDescription, setFormDescription] = useState('');
  const [formStatus, setFormStatus] = useState<'on_track' | 'needs_attention' | 'milestone_completed'>('on_track');
  const [formNotes, setFormNotes] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [progressRes, menteesRes, mentorsRes] = await Promise.all([
        api.get('/progress'),
        api.get('/mentees'),
        api.get('/mentors')
      ]);

      // Enrich progress entries with names
      const enrichedProgress = progressRes.data.map((entry: ProgressEntry) => {
        const mentee = menteesRes.data.find((m: Mentee) => m.id === entry.mentee_id);
        const mentor = mentorsRes.data.find((m: Mentor) => m.id === entry.mentor_id);
        return {
          ...entry,
          mentee_name: mentee ? `${mentee.first_name} ${mentee.last_name}` : 'Unknown',
          mentor_name: mentor ? `${mentor.first_name} ${mentor.last_name}` : 'Unknown'
        };
      });

      setProgressEntries(enrichedProgress);
      setMentees(menteesRes.data.filter((m: Mentee) => m.application_status === 'active'));
      setMentors(mentorsRes.data);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load progress data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProgress = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formMenteeId || !formMentorId || !formDescription) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      await api.post('/progress', {
        mentee_id: parseInt(formMenteeId),
        mentor_id: parseInt(formMentorId),
        entry_date: formDate,
        description: formDescription,
        status: formStatus,
        notes: formNotes
      });

      setSuccess('Progress entry added successfully!');
      resetForm();
      setActiveTab('view');
      fetchData();

      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add progress entry');
    }
  };

  const handleDeleteProgress = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this progress entry?')) return;

    try {
      await api.delete(`/progress/${id}`);
      setSuccess('Progress entry deleted successfully!');
      fetchData();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete progress entry');
    }
  };

  const resetForm = () => {
    setFormMenteeId('');
    setFormMentorId('');
    setFormDate(new Date().toISOString().split('T')[0]);
    setFormDescription('');
    setFormStatus('on_track');
    setFormNotes('');
  };

  // Filter progress entries
  const filteredEntries = progressEntries.filter((entry) => {
    const matchesMentee = selectedMentee === '' || entry.mentee_id === selectedMentee;
    const matchesStatus = filterStatus === 'all' || entry.status === filterStatus;
    return matchesMentee && matchesStatus;
  });

  // Calculate statistics
  const stats = {
    total: progressEntries.length,
    onTrack: progressEntries.filter((e) => e.status === 'on_track').length,
    needsAttention: progressEntries.filter((e) => e.status === 'needs_attention').length,
    milestonesCompleted: progressEntries.filter((e) => e.status === 'milestone_completed').length
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'on_track':
        return 'bg-primary-100 text-primary-800';
      case 'needs_attention':
        return 'bg-yellow-100 text-yellow-800';
      case 'milestone_completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'on_track':
        return 'On Track';
      case 'needs_attention':
        return 'Needs Attention';
      case 'milestone_completed':
        return 'Milestone Completed';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading progress data...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Progress Tracking</h1>
        <p className="text-gray-600 mt-2">Monitor and record mentee progress throughout the program</p>
      </div>

      {/* Alert Messages */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError('')} className="text-red-700 hover:text-red-900">×</button>
        </div>
      )}

      {success && (
        <div className="mb-6 bg-primary-50 border border-primary-100 text-primary-700 px-4 py-3 rounded-lg flex items-center justify-between">
          <span>{success}</span>
          <button onClick={() => setSuccess('')} className="text-primary-700 hover:text-primary-900">×</button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Entries</p>
              <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">On Track</p>
              <p className="text-2xl font-bold text-primary-600">{stats.onTrack}</p>
            </div>
            <div className="bg-primary-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Needs Attention</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.needsAttention}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Milestones</p>
              <p className="text-2xl font-bold text-blue-600">{stats.milestonesCompleted}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('view')}
            className={`px-6 py-4 font-medium ${
              activeTab === 'view'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            View Progress ({filteredEntries.length})
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`px-6 py-4 font-medium ${
              activeTab === 'add'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Add Progress Entry
          </button>
        </div>

        {/* View Progress Tab */}
        {activeTab === 'view' && (
          <div className="p-6">
            {/* Filters */}
            <div className="mb-6 flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Mentee
                </label>
                <select
                  value={selectedMentee}
                  onChange={(e) => setSelectedMentee(e.target.value ? parseInt(e.target.value) : '')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Mentees</option>
                  {mentees.map((mentee) => (
                    <option key={mentee.id} value={mentee.id}>
                      {mentee.first_name} {mentee.last_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Status
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Statuses</option>
                  <option value="on_track">On Track</option>
                  <option value="needs_attention">Needs Attention</option>
                  <option value="milestone_completed">Milestone Completed</option>
                </select>
              </div>
            </div>

            {/* Progress Timeline */}
            {filteredEntries.length === 0 ? (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No progress entries found</h3>
                <p className="mt-2 text-gray-500">Start tracking progress by adding your first entry</p>
                <button
                  onClick={() => setActiveTab('add')}
                  className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Add Progress Entry
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredEntries
                  .sort((a, b) => new Date(b.entry_date).getTime() - new Date(a.entry_date).getTime())
                  .map((entry) => (
                    <div
                      key={entry.id}
                      className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-md transition"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-800">{entry.mentee_name}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(entry.status)}`}>
                              {getStatusLabel(entry.status)}
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-3">
                            Recorded by: <span className="font-medium">{entry.mentor_name}</span> on{' '}
                            {new Date(entry.entry_date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>

                          <div className="bg-white p-4 rounded-lg mb-3">
                            <p className="text-gray-700 leading-relaxed">{entry.description}</p>
                          </div>

                          {entry.notes && (
                            <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
                              <p className="text-sm text-blue-800">
                                <span className="font-medium">Notes:</span> {entry.notes}
                              </p>
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => handleDeleteProgress(entry.id)}
                          className="ml-4 text-red-600 hover:text-red-800 transition"
                          title="Delete entry"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* Add Progress Tab */}
        {activeTab === 'add' && (
          <div className="p-6">
            <form onSubmit={handleAddProgress} className="space-y-6 max-w-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mentee Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Mentee *
                  </label>
                  <select
                    value={formMenteeId}
                    onChange={(e) => setFormMenteeId(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Choose a mentee...</option>
                    {mentees.map((mentee) => (
                      <option key={mentee.id} value={mentee.id}>
                        {mentee.first_name} {mentee.last_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Mentor Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mentor *
                  </label>
                  <select
                    value={formMentorId}
                    onChange={(e) => setFormMentorId(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Choose a mentor...</option>
                    {mentors.map((mentor) => (
                      <option key={mentor.id} value={mentor.id}>
                        {mentor.first_name} {mentor.last_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Entry Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Entry Date *
                  </label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status *
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="on_track">On Track</option>
                    <option value="needs_attention">Needs Attention</option>
                    <option value="milestone_completed">Milestone Completed</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Progress Description *
                </label>
                <textarea
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  required
                  rows={4}
                  placeholder="Describe the progress made, achievements, or challenges..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  rows={3}
                  placeholder="Any additional observations or comments..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Add Progress Entry
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Clear Form
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Progress;
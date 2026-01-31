// src/pages/Matches.tsx
import { useState, useEffect } from 'react';
import api from '../services/api';

interface Mentor {
  id: number;
  first_name: string;
  last_name: string;
  expertise_areas: string;
  status: string;
  user_id: number;
}

interface Mentee {
  id: number;
  first_name: string;
  last_name: string;
  goals: string;
  application_status: string;
}

interface Match {
  id: number;
  mentor_id: number;
  mentee_id: number;
  match_date: string;
  status: string;
  notes: string;
  mentor_name?: string;
  mentee_name?: string;
}

function Matches() {
  const [activeTab, setActiveTab] = useState<'existing' | 'create'>('existing');
  const [matches, setMatches] = useState<Match[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [mentees, setMentees] = useState<Mentee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form state for creating new match
  const [selectedMentor, setSelectedMentor] = useState('');
  const [selectedMentee, setSelectedMentee] = useState('');
  const [matchDate, setMatchDate] = useState(new Date().toISOString().split('T')[0]);
  const [matchNotes, setMatchNotes] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [matchesRes, mentorsRes, menteesRes] = await Promise.all([
        api.get('/matches'),
        api.get('/mentors'),
        api.get('/mentees')
      ]);

      // Enrich matches with mentor and mentee names
      const enrichedMatches = matchesRes.data.map((match: Match) => {
        const mentor = mentorsRes.data.find((m: Mentor) => m.id === match.mentor_id);
        const mentee = menteesRes.data.find((m: Mentee) => m.id === match.mentee_id);
        return {
          ...match,
          mentor_name: mentor ? `${mentor.first_name} ${mentor.last_name}` : 'Unknown',
          mentee_name: mentee ? `${mentee.first_name} ${mentee.last_name}` : 'Unknown'
        };
      });

      setMatches(enrichedMatches);
      setMentors(mentorsRes.data.filter((m: Mentor) => m.status === 'active'));
      setMentees(menteesRes.data.filter((m: Mentee) => m.application_status === 'approved'));
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateMatch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMentor || !selectedMentee) {
      setError('Please select both a mentor and a mentee');
      return;
    }

    try {
      await api.post('/matches', {
        mentor_id: parseInt(selectedMentor),
        mentee_id: parseInt(selectedMentee),
        match_date: matchDate,
        notes: matchNotes,
        status: 'active'
      });

      setSuccess('Match created successfully!');
      setSelectedMentor('');
      setSelectedMentee('');
      setMatchNotes('');
      setActiveTab('existing');
      fetchData();
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create match');
    }
  };

  const handleUpdateMatchStatus = async (matchId: number, newStatus: string) => {
    try {
      await api.put(`/matches/${matchId}`, { status: newStatus });
      setSuccess('Match status updated!');
      fetchData();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update match');
    }
  };

  const handleDeleteMatch = async (matchId: number) => {
    if (!window.confirm('Are you sure you want to delete this match?')) return;

    try {
      await api.delete(`/matches/${matchId}`);
      setSuccess('Match deleted successfully!');
      fetchData();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete match');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading matches...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Mentor-Mentee Matches</h1>
        <p className="text-gray-600 mt-2">Manage mentor-mentee pairings and track matching history</p>
      </div>

      {/* Alert Messages */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError('')} className="text-red-700 hover:text-red-900">×</button>
        </div>
      )}

      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center justify-between">
          <span>{success}</span>
          <button onClick={() => setSuccess('')} className="text-green-700 hover:text-green-900">×</button>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('existing')}
            className={`px-6 py-4 font-medium ${
              activeTab === 'existing'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Existing Matches ({matches.length})
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`px-6 py-4 font-medium ${
              activeTab === 'create'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Create New Match
          </button>
        </div>

        {/* Existing Matches Tab */}
        {activeTab === 'existing' && (
          <div className="p-6">
            {matches.length === 0 ? (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No matches yet</h3>
                <p className="mt-2 text-gray-500">Get started by creating a new mentor-mentee match</p>
                <button
                  onClick={() => setActiveTab('create')}
                  className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Create First Match
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mentor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mentee
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Match Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Notes
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {matches.map((match) => (
                      <tr key={match.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{match.mentor_name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{match.mentee_name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {new Date(match.match_date).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={match.status}
                            onChange={(e) => handleUpdateMatchStatus(match.id, e.target.value)}
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              match.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : match.status === 'completed'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            <option value="active">Active</option>
                            <option value="completed">Completed</option>
                            <option value="terminated">Terminated</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-500 max-w-xs truncate">
                            {match.notes || 'No notes'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => handleDeleteMatch(match.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Create New Match Tab */}
        {activeTab === 'create' && (
          <div className="p-6">
            <form onSubmit={handleCreateMatch} className="space-y-6 max-w-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mentor Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Mentor *
                  </label>
                  <select
                    value={selectedMentor}
                    onChange={(e) => setSelectedMentor(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Choose a mentor...</option>
                    {mentors.map((mentor) => (
                      <option key={mentor.id} value={mentor.id}>
                        {mentor.first_name} {mentor.last_name}
                        {mentor.expertise_areas && ` - ${mentor.expertise_areas.split(',')[0]}`}
                      </option>
                    ))}
                  </select>
                  {mentors.length === 0 && (
                    <p className="mt-2 text-sm text-red-600">No active mentors available</p>
                  )}
                </div>

                {/* Mentee Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Mentee *
                  </label>
                  <select
                    value={selectedMentee}
                    onChange={(e) => setSelectedMentee(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Choose a mentee...</option>
                    {mentees.map((mentee) => (
                      <option key={mentee.id} value={mentee.id}>
                        {mentee.first_name} {mentee.last_name}
                        {mentee.goals && ` - ${mentee.goals.substring(0, 30)}...`}
                      </option>
                    ))}
                  </select>
                  {mentees.length === 0 && (
                    <p className="mt-2 text-sm text-red-600">No approved mentees available</p>
                  )}
                </div>
              </div>

              {/* Match Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Match Date *
                </label>
                <input
                  type="date"
                  value={matchDate}
                  onChange={(e) => setMatchDate(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Match Notes
                </label>
                <textarea
                  value={matchNotes}
                  onChange={(e) => setMatchNotes(e.target.value)}
                  rows={4}
                  placeholder="Add any relevant notes about this match..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={mentors.length === 0 || mentees.length === 0}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Create Match
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedMentor('');
                    setSelectedMentee('');
                    setMatchNotes('');
                  }}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Clear Form
                </button>
              </div>
            </form>

            {/* Preview Section */}
            {selectedMentor && selectedMentee && (
              <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">Match Preview</h3>
                <div className="text-sm text-blue-700">
                  <p>
                    <strong>Mentor:</strong>{' '}
                    {mentors.find((m) => m.id === parseInt(selectedMentor))?.first_name}{' '}
                    {mentors.find((m) => m.id === parseInt(selectedMentor))?.last_name}
                  </p>
                  <p>
                    <strong>Mentee:</strong>{' '}
                    {mentees.find((m) => m.id === parseInt(selectedMentee))?.first_name}{' '}
                    {mentees.find((m) => m.id === parseInt(selectedMentee))?.last_name}
                  </p>
                  <p>
                    <strong>Date:</strong> {new Date(matchDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Matches</p>
              <p className="text-2xl font-bold text-gray-800">
                {matches.filter((m) => m.status === 'active').length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed Matches</p>
              <p className="text-2xl font-bold text-gray-800">
                {matches.filter((m) => m.status === 'completed').length}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Matches</p>
              <p className="text-2xl font-bold text-gray-800">{matches.length}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Matches;
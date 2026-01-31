// frontend/src/pages/Mentees.tsx
import { useEffect, useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import api from '../services/api';
import Sidebar from '../components/Sidebar';

interface Mentee {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  background: string;
  goals: string;
  preferences: string;
  application_status: string;
  enrollment_date: string | null;
  notes?: string;
  mentor_id?: number | null;
}

interface MentorOption {
  id: number;
  User: { first_name: string; last_name: string; email: string };
}

const Mentees = () => {
  const [mentees, setMentees] = useState<Mentee[]>([]);
  const [mentors, setMentors] = useState<MentorOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMentee, setSelectedMentee] = useState<Mentee | null>(null);
  const [formData, setFormData] = useState({
    application_status: '',
    notes: '',
    mentor_id: '',
  });
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [menteesRes, mentorsRes] = await Promise.all([
        api.get('/mentees'),
        api.get('/mentors'),
      ]);
      setMentees(menteesRes.data.data || []);
      setMentors(mentorsRes.data.data || []);
      setError('');
    } catch (err: any) {
      setError('Failed to load data: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const openModal = (mentee: Mentee) => {
    setSelectedMentee(mentee);
    setFormData({
      application_status: mentee.application_status,
      notes: mentee.notes || '',
      mentor_id: mentee.mentor_id?.toString() || '',
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMentee) return;

    setSubmitLoading(true);
    setError('');

    try {
      await api.put(`/mentees/${selectedMentee.id}`, formData);
      setSuccess('Mentee updated successfully!');
      setIsModalOpen(false);
      fetchData();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError('Failed to update: ' + (err.response?.data?.message || err.message));
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading mentees...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1">
        <main className="max-w-7xl mx-auto p-4 md:p-6">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Mentees & Applications</h2>
            <p className="text-gray-600 mt-2">Manage mentee applications and assignments</p>
          </div>

          {/* Alert Messages */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center justify-between">
              <span className="text-sm md:text-base">{error}</span>
              <button onClick={() => setError('')} className="text-red-700 hover:text-red-900 text-xl">×</button>
            </div>
          )}

          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center justify-between">
              <span className="text-sm md:text-base">{success}</span>
              <button onClick={() => setSuccess('')} className="text-green-700 hover:text-green-900 text-xl">×</button>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Mentees</p>
                  <p className="text-2xl md:text-3xl font-bold text-gray-800">{mentees.length}</p>
                </div>
                <div className="bg-indigo-100 p-3 rounded-full">
                  <svg className="w-6 h-6 md:w-8 md:h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl md:text-3xl font-bold text-yellow-600">
                    {mentees.filter(m => m.application_status === 'pending').length}
                  </p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <svg className="w-6 h-6 md:w-8 md:h-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active</p>
                  <p className="text-2xl md:text-3xl font-bold text-green-600">
                    {mentees.filter(m => m.application_status === 'active').length}
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <svg className="w-6 h-6 md:w-8 md:h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Approved</p>
                  <p className="text-2xl md:text-3xl font-bold text-blue-600">
                    {mentees.filter(m => m.application_status === 'approved').length}
                  </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <svg className="w-6 h-6 md:w-8 md:h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Mentees List */}
          {mentees.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 md:p-12 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No mentees or applications yet</h3>
              <p className="text-gray-500">Applications will appear here once submitted</p>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block bg-white rounded-xl shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Goals</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mentees.map((mentee) => (
                        <tr key={mentee.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {mentee.first_name} {mentee.last_name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{mentee.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                mentee.application_status === 'active' ? 'bg-green-100 text-green-800' :
                                mentee.application_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                mentee.application_status === 'approved' ? 'bg-blue-100 text-blue-800' :
                                'bg-red-100 text-red-800'
                              }`}
                            >
                              {mentee.application_status.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-500">
                              {mentee.goals?.substring(0, 60) || 'N/A'}...
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => openModal(mentee)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              View / Update
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-4">
                {mentees.map((mentee) => (
                  <div key={mentee.id} className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {mentee.first_name} {mentee.last_name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">{mentee.email}</p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full whitespace-nowrap ml-2 ${
                          mentee.application_status === 'active' ? 'bg-green-100 text-green-800' :
                          mentee.application_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          mentee.application_status === 'approved' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}
                      >
                        {mentee.application_status.toUpperCase()}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      {mentee.phone && (
                        <div>
                          <p className="text-xs text-gray-500">Phone</p>
                          <p className="text-sm text-gray-900">{mentee.phone}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-xs text-gray-500">Goals</p>
                        <p className="text-sm text-gray-900">
                          {mentee.goals?.substring(0, 80) || 'N/A'}...
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => openModal(mentee)}
                      className="w-full bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-100 transition text-sm font-medium"
                    >
                      View / Update
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Modal for View/Update Mentee */}
          <Transition appear show={isModalOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={() => setIsModalOpen(false)}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 mb-4">
                        Update Mentee Application
                      </Dialog.Title>

                      {selectedMentee && (
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                              <p className="text-sm text-gray-900">
                                {selectedMentee.first_name} {selectedMentee.last_name}
                              </p>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                              <p className="text-sm text-gray-900">{selectedMentee.email}</p>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <p className="text-sm text-gray-900">{selectedMentee.phone || 'N/A'}</p>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Background</label>
                            <p className="text-sm text-gray-900">{selectedMentee.background || 'N/A'}</p>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Goals</label>
                            <p className="text-sm text-gray-900">{selectedMentee.goals || 'N/A'}</p>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Preferences</label>
                            <p className="text-sm text-gray-900">{selectedMentee.preferences || 'N/A'}</p>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Current Status <span className="text-red-500">*</span>
                            </label>
                            <select
                              name="application_status"
                              value={formData.application_status}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            >
                              <option value="pending">Pending</option>
                              <option value="approved">Approved</option>
                              <option value="rejected">Rejected</option>
                              <option value="active">Active</option>
                              <option value="completed">Completed</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Assign Mentor</label>
                            <select
                              name="mentor_id"
                              value={formData.mentor_id}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            >
                              <option value="">No mentor assigned</option>
                              {mentors.map((m) => (
                                <option key={m.id} value={m.id}>
                                  {m.User.first_name} {m.User.last_name} ({m.User.email})
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Admin Notes</label>
                            <textarea
                              name="notes"
                              value={formData.notes}
                              onChange={handleInputChange}
                              rows={4}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              placeholder="Internal notes, updates, reasons for status change..."
                            />
                          </div>

                          <div className="flex flex-col-reverse sm:flex-row gap-3 mt-6">
                            <button
                              type="button"
                              className="w-full sm:w-auto px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                              onClick={() => setIsModalOpen(false)}
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              disabled={submitLoading}
                              className="w-full sm:w-auto px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {submitLoading ? 'Saving...' : 'Update Mentee'}
                            </button>
                          </div>
                        </form>
                      )}
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </main>
      </div>
    </div>
  );
};

export default Mentees;
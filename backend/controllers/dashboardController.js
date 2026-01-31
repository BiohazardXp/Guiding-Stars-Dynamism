// backend/controllers/dashboardController.js
const Mentor = require('../models/Mentor');
const Mentee = require('../models/Mentee');
const Match = require('../models/Match');
const ProgressEntry = require('../models/ProgressEntry');

// Get dashboard statistics
exports.getStats = async (req, res) => {
  try {
    // Count total mentors
    const totalMentors = await Mentor.count();
    const activeMentors = await Mentor.count({ 
      where: { status: 'active' } 
    });

    // Count mentees by status
    const totalMentees = await Mentee.count();
    const pendingApplications = await Mentee.count({ 
      where: { application_status: 'pending' } 
    });
    const activeMentees = await Mentee.count({ 
      where: { application_status: 'active' } 
    });
    const approvedMentees = await Mentee.count({ 
      where: { application_status: 'approved' } 
    });

    // Count matches
    const totalMatches = await Match.count();
    const activeMatches = await Match.count({ 
      where: { status: 'active' } 
    });
    const completedMatches = await Match.count({ 
      where: { status: 'completed' } 
    });

    // Count progress entries
    const totalProgressEntries = await ProgressEntry.count();
    const recentProgressEntries = await ProgressEntry.count({
      where: {
        entry_date: {
          [require('sequelize').Op.gte]: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
        }
      }
    });

    // Progress by status
    const onTrack = await ProgressEntry.count({ 
      where: { status: 'on_track' } 
    });
    const needsAttention = await ProgressEntry.count({ 
      where: { status: 'needs_attention' } 
    });
    const milestonesCompleted = await ProgressEntry.count({ 
      where: { status: 'milestone_completed' } 
    });

    // Get recent activities (last 5 mentees)
    const recentMentees = await Mentee.findAll({
      limit: 5,
      order: [['created_at', 'DESC']],
      attributes: ['id', 'first_name', 'last_name', 'application_status', 'created_at']
    });

    // Get recent matches
    const recentMatches = await Match.findAll({
      limit: 5,
      order: [['created_at', 'DESC']],
      attributes: ['id', 'mentor_id', 'mentee_id', 'match_date', 'status']
    });

    res.json({
      success: true,
      data: {
        mentors: {
          total: totalMentors,
          active: activeMentors,
        },
        mentees: {
          total: totalMentees,
          pending: pendingApplications,
          approved: approvedMentees,
          active: activeMentees,
        },
        matches: {
          total: totalMatches,
          active: activeMatches,
          completed: completedMatches,
        },
        progress: {
          total: totalProgressEntries,
          recent: recentProgressEntries,
          onTrack: onTrack,
          needsAttention: needsAttention,
          milestonesCompleted: milestonesCompleted,
        },
        recentActivity: {
          mentees: recentMentees,
          matches: recentMatches,
        }
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching dashboard statistics',
      error: error.message 
    });
  }
};
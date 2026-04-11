// backend/routes/mentorPortal.js
const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const { User, Mentor, Match, ProgressEntry } = require('../models');

const router = express.Router();

/**
 * GET /api/mentors/portal
 * Get mentor dashboard data
 */
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    // Get current user's mentor profile
    const user = await User.findByPk(req.user.id);

    if (!user || user.role !== 'mentor') {
      return res.status(403).json({
        success: false,
        message: 'Not a mentor',
      });
    }

    const mentor = await Mentor.findOne({
      where: { user_id: user.id },
    });

    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: 'Mentor profile not found',
      });
    }

    // Get all matches for this mentor
    const matches = await Match.findAll({
      where: { mentor_id: mentor.id },
      include: [
        {
          model: require('../models').Mentee,
          as: 'Mentee',
          attributes: ['id', 'first_name', 'last_name', 'email', 'phone', 'goals', 'background'],
        },
      ],
      order: [['match_date', 'DESC']],
    });

    // Get recent progress entries for this mentor
    const recentProgress = await ProgressEntry.findAll({
      where: { mentor_id: mentor.id },
      include: [
        {
          model: require('../models').Mentee,
          as: 'Mentee',
          attributes: ['id', 'first_name', 'last_name'],
        },
      ],
      order: [['entry_date', 'DESC']],
      limit: 10,
    });

    // Calculate stats
    const stats = {
      totalMentees: matches.length,
      activePairings: matches.filter((m) => m.status === 'active').length,
      progressUpdates: recentProgress.length,
    };

    res.status(200).json({
      success: true,
      data: {
        mentor,
        user: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
        },
        matches,
        recentProgress,
        stats,
      },
    });
  } catch (error) {
    console.error('[MentorPortal] Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to load mentor dashboard',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

/**
 * PUT /api/mentors/profile
 * Update mentor profile
 */
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { phone, bio, expertise_areas, availability, preferences } = req.body;

    const user = await User.findByPk(req.user.id);

    if (!user || user.role !== 'mentor') {
      return res.status(403).json({
        success: false,
        message: 'Not a mentor',
      });
    }

    const mentor = await Mentor.findOne({
      where: { user_id: user.id },
    });

    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: 'Mentor profile not found',
      });
    }

    // Update mentor profile
    await mentor.update({
      phone: phone || mentor.phone,
      bio: bio || mentor.bio,
      expertise_areas: expertise_areas || mentor.expertise_areas,
      availability: availability || mentor.availability,
      preferences: preferences || mentor.preferences,
    });

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      mentor,
    });
  } catch (error) {
    console.error('[MentorPortal] Update error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

module.exports = router;

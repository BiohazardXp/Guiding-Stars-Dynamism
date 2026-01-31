const express = require('express');
const { authMiddleware, adminOnly } = require('../middleware/auth');
const { Match, Mentor, Mentee, User } = require('../models/index'); // ✅ Use index to ensure associations are loaded

const router = express.Router();

/**
 * @route   GET /api/matches
 * @desc    Get all matches with nested Mentor, User, and Mentee data
 * @access  Admin Only
 */
router.get('/', authMiddleware, adminOnly, async (req, res) => {
  try {
    const matches = await Match.findAll({
      include: [
        { 
          model: Mentor, 
          as: 'Mentor', 
          include: [{ 
            model: User, 
            as: 'User', // ✅ Crucial: Must match the alias in Mentor.js
            attributes: ['first_name', 'last_name', 'email'] 
          }] 
        },
        { 
          model: Mentee, 
          as: 'Mentee', // ✅ Crucial: Must match the alias in Match.js
          attributes: ['first_name', 'last_name', 'email', 'goals', 'preferences'] 
        },
      ],
      order: [['created_at', 'DESC']]
    });

    res.json({ success: true, data: matches });
  } catch (err) {
    console.error('Fetch Matches Error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   POST /api/matches
 * @desc    Create a new match between a Mentor and Mentee
 * @access  Admin Only
 */
router.post('/', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { mentor_id, mentee_id, match_date = new Date(), notes = '' } = req.body;

    // 1. Validate mentor and mentee existence
    const mentor = await Mentor.findByPk(mentor_id);
    const mentee = await Mentee.findByPk(mentee_id);

    if (!mentor || mentor.status !== 'active') {
      return res.status(400).json({ success: false, message: 'Mentor not found or inactive' });
    }

    // Checking for approved or pending (if you allow matching before activation)
    if (!mentee || (mentee.application_status !== 'approved' && mentee.application_status !== 'active')) {
      return res.status(400).json({ success: false, message: 'Mentee not found or not eligible for matching' });
    }

    // 2. Prevent duplicate active matches for this mentor (if your business logic is 1-to-1)
    const existingMatch = await Match.findOne({
      where: { mentor_id, status: 'active' },
    });

    if (existingMatch) {
      return res.status(400).json({ success: false, message: 'Mentor already has an active match' });
    }

    // 3. Create the Match
    const match = await Match.create({
      mentor_id,
      mentee_id,
      match_date,
      notes,
      status: 'active',
    });

    // 4. Update mentee status to 'active' now that they are matched
    await mentee.update({ application_status: 'active' });

    res.status(201).json({ success: true, data: match });
  } catch (err) {
    console.error('Create Match Error:', err);
    res.status(400).json({ success: false, message: err.message });
  }
});

/**
 * @route   GET /api/matches/unmatched
 * @desc    Get data for the matching dashboard (Available Mentors + Unmatched Mentees)
 * @access  Admin Only
 */
router.get('/unmatched', authMiddleware, adminOnly, async (req, res) => {
  try {
    // Find mentors who are active
    const availableMentors = await Mentor.findAll({
      where: { status: 'active' },
      include: [{
        model: User,
        as: 'User', // ✅ Added alias for consistency
        attributes: ['first_name', 'last_name', 'email'],
      }],
    });

    // Find mentees who are approved but not yet active/matched
    const unmatchedMentees = await Mentee.findAll({
      where: { application_status: 'approved' },
      attributes: ['id', 'first_name', 'last_name', 'email', 'goals', 'preferences']
    });

    res.json({ 
      success: true, 
      data: { availableMentors, unmatchedMentees } 
    });
  } catch (err) {
    console.error('Unmatched Fetch Error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
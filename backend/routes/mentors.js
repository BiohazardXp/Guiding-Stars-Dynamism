const express = require('express');
const { authMiddleware, adminOnly } = require('../middleware/auth');
const { Mentor, User, Match } = require('../models/index'); // ✅ Import from index

const router = express.Router();

/**
 * @route   GET /api/mentors
 * @desc    Get all mentors with their user profile details
 * @access  Public (or protected depending on your needs)
 */
router.get('/', async (req, res) => {
  try {
    const mentors = await Mentor.findAll({
      include: [
        {
          model: User,
          as: 'User', // ✅ Matches the alias in Mentor.js
          attributes: ['first_name', 'last_name', 'email']
        }
      ],
      order: [['created_at', 'DESC']]
    });
    res.json({ success: true, data: mentors });
  } catch (error) {
    console.error('FETCH ALL MENTORS ERROR:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @route   GET /api/mentors/:id
 * @desc    Get a single mentor's profile and their matches
 * @access  Public/Protected
 */
router.get('/:id', async (req, res) => {
  try {
    const mentor = await Mentor.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'User', // ✅ Alias required
          attributes: ['first_name', 'last_name', 'email']
        }
      ]
    });

    if (!mentor) {
      return res.status(404).json({ success: false, message: 'Mentor not found' });
    }

    res.json({ success: true, data: mentor });
  } catch (error) {
    console.error('FETCH MENTOR BY ID ERROR:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @route   PUT /api/mentors/:id
 * @desc    Update mentor profile (Admin Only)
 */
router.put('/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    const mentor = await Mentor.findByPk(req.params.id);
    if (!mentor) {
      return res.status(404).json({ success: false, message: 'Mentor not found' });
    }

    await mentor.update(req.body);
    res.json({ success: true, message: 'Mentor updated successfully', data: mentor });
  } catch (error) {
    console.error('UPDATE MENTOR ERROR:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @route   DELETE /api/mentors/:id
 * @desc    Delete a mentor (Admin Only)
 */
router.delete('/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    const mentor = await Mentor.findByPk(req.params.id);
    if (!mentor) {
      return res.status(404).json({ success: false, message: 'Mentor not found' });
    }

    await mentor.destroy();
    res.json({ success: true, message: 'Mentor deleted successfully' });
  } catch (error) {
    console.error('DELETE MENTOR ERROR:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
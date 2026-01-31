// backend/routes/progress.js
const express = require('express');
const { authMiddleware, adminOnly } = require('../middleware/auth');
const ProgressEntry = require('../models/ProgressEntry');
const Mentee = require('../models/Mentee');
const Mentor = require('../models/Mentor');

const router = express.Router();

// GET /api/progress - All progress entries (admin only for now)
router.get('/', authMiddleware, adminOnly, async (req, res) => {
  try {
    const entries = await ProgressEntry.findAll({
      include: [
        { model: Mentee, attributes: ['first_name', 'last_name', 'email'] },
        { model: Mentor, include: [{ model: require('../models/User'), attributes: ['first_name', 'last_name'] }] },
      ],
    });
    res.json({ success: true, data: entries });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/progress - Add new progress entry (mentor or admin)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const entry = await ProgressEntry.create({
      ...req.body,
      mentor_id: req.user.id, // from JWT token
    });
    res.status(201).json({ success: true, data: entry });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// GET /api/progress/mentee/:menteeId - Progress for specific mentee
router.get('/mentee/:menteeId', authMiddleware, async (req, res) => {
  try {
    const entries = await ProgressEntry.findAll({
      where: { mentee_id: req.params.menteeId },
      include: [
        { model: Mentor, include: [{ model: require('../models/User'), attributes: ['first_name', 'last_name'] }] },
      ],
      order: [['entry_date', 'DESC']],
    });
    res.json({ success: true, data: entries });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Optional: PUT /api/progress/:id - Update entry (mentor/admin)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const entry = await ProgressEntry.findByPk(req.params.id);
    if (!entry) return res.status(404).json({ success: false, message: 'Progress entry not found' });

    // Optional: check if req.user.id === entry.mentor_id (for mentor-only edit)

    await entry.update(req.body);
    res.json({ success: true, data: entry });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
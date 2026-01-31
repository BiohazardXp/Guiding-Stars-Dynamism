const express = require('express');
const router = express.Router();
const { authMiddleware, adminOnly } = require('../middleware/auth');
const menteeController = require('../controllers/menteeController');

// ==================== PUBLIC ROUTES ====================

// Submit application
router.post('/', menteeController.createMentee);

// ACTIVATE ACCOUNT (The only route you need for activation)
router.post('/verify/:token', menteeController.activateAccount);

// ==================== PROTECTED ADMIN ROUTES ====================

router.get('/', authMiddleware, adminOnly, menteeController.getAllMentees);
router.get('/:id', authMiddleware, adminOnly, menteeController.getMenteeById);
router.put('/:id', authMiddleware, adminOnly, menteeController.updateMentee);
router.delete('/:id', authMiddleware, adminOnly, menteeController.deleteMentee);

module.exports = router;
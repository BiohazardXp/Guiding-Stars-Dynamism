// backend/routes/dashboard.js
const express = require('express');
const { authMiddleware, adminOnly } = require('../middleware/auth');
const dashboardController = require('../controllers/dashboardController');

const router = express.Router();

// Get dashboard statistics (admin only)
router.get('/stats', authMiddleware, adminOnly, dashboardController.getStats);

module.exports = router;
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Mentee } = require('../models/index'); // ✅ Import from index for consistency

const router = express.Router();

/**
 * @route   POST /api/mentee-auth/login
 * @desc    Authenticate mentee & get token
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const mentee = await Mentee.findOne({ where: { email } });
    const testHash = await bcrypt.hash('password123', 10);
    console.log('COPY THIS HASH:', testHash);

    // Add these lines right at the start of your login route
    console.log('--- PASSWORD DATA CHECK ---');
    console.log('Password Type:', typeof password);
    console.log('Password Length:', password ? password.length : 0);
    console.log('Password Value: "' + password + '"'); // The quotes will show if there are spaces

    console.log('--- LOGIN ATTEMPT DEBUG ---');
    console.log('Email:', email);
    console.log('User Found?:', mentee ? 'YES' : 'NO');

    if (!mentee) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // DEBUG THE FLAGS
    console.log('Flag - email_verified:', mentee.email_verified);
    console.log('Flag - application_status:', mentee.application_status);
    console.log('Flag - has password_hash?:', mentee.password_hash ? 'YES' : 'NO');
    

    // If it's failing here, we'll see exactly which flag is 0 or wrong in the console
    if (!mentee.email_verified) {
      return res.status(403).json({ success: false, message: 'Account not verified (email_verified is 0)' });
    }

    if (mentee.application_status !== 'active') {
      return res.status(403).json({ success: false, message: `Status is ${mentee.application_status}, not active` });
    }

    const isPasswordValid = await bcrypt.compare(password, mentee.password_hash);
    console.log('Password Match?:', isPasswordValid ? 'YES' : 'NO');

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: mentee.id, role: 'mentee' }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ success: true, token, user: { id: mentee.id, email: mentee.email } });

  } catch (error) {
    console.error('CRITICAL LOGIN ERROR:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

/**
 * @route   GET /api/mentee-auth/me
 * @desc    Get current mentee info from token
 */
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== 'mentee') {
      return res.status(403).json({ success: false, message: 'Access denied: Not a mentee' });
    }

    // Get mentee info, excluding sensitive security fields
    const mentee = await Mentee.findByPk(decoded.id, {
      attributes: { 
        exclude: ['password_hash', 'verification_token', 'verification_token_expires'] 
      },
    });

    if (!mentee) {
      return res.status(404).json({ success: false, message: 'Mentee not found' });
    }

    res.json({
      success: true,
      data: mentee,
    });
  } catch (error) {
    console.error('Get mentee info error:', error);
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
});

module.exports = router;
const { Mentee, Mentor, User } = require('../models/index'); 
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const { 
  generateVerificationToken, 
  sendWelcomeEmail, // Matches your emailService.js
  sendRejectionEmail 
} = require('../services/emailService');

/**
 * GET ALL MENTEES (Admin)
 */
exports.getAllMentees = async (req, res) => {
  try {
    const mentees = await Mentee.findAll({
      order: [['created_at', 'DESC']],
    });
    res.json({ success: true, data: mentees });
  } catch (error) {
    console.error('Error fetching mentees:', error);
    res.status(500).json({ success: false, message: 'Server error: ' + error.message });
  }
};

/**
 * GET SINGLE MENTEE
 */
exports.getMenteeById = async (req, res) => {
  try {
    const mentee = await Mentee.findByPk(req.params.id);
    if (!mentee) return res.status(404).json({ success: false, message: 'Mentee not found' });
    res.json({ success: true, data: mentee });
  } catch (error) {
    console.error('Error fetching mentee:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

/**
 * CREATE MENTEE (Application Submission)
 */
exports.createMentee = async (req, res) => {
  try {
    const { first_name, last_name, email, phone, background, goals, preferences } = req.body;

    const existingMentee = await Mentee.findOne({ where: { email } });
    if (existingMentee) {
      return res.status(400).json({ success: false, message: 'Email already registered.' });
    }

    const mentee = await Mentee.create({
      first_name,
      last_name,
      email,
      phone: phone || null,
      background: background || '',
      goals: goals || '',
      preferences: preferences || '',
      application_status: 'pending',
      email_verified: false
    });

    res.status(201).json({ success: true, message: 'Application submitted!', data: mentee });
  } catch (error) {
    console.error('Create Mentee Error:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * UPDATE MENTEE (Approval & Rejection Logic)
 */
exports.updateMentee = async (req, res) => {
  try {
    const { id } = req.params;
    const { application_status } = req.body;

    const mentee = await Mentee.findByPk(id);
    if (!mentee) return res.status(404).json({ success: false, message: 'Mentee not found' });

    const oldStatus = mentee.application_status;
    const newStatus = application_status;

    // Handle transition to 'approved'
    if (newStatus === 'approved' && oldStatus !== 'approved') {
      const verificationToken = generateVerificationToken();
      const tokenExpiry = new Date();
      tokenExpiry.setHours(tokenExpiry.getHours() + 24);

      await mentee.update({
        ...req.body, // Update other fields from form
        verification_token: verificationToken,
        verification_token_expires: tokenExpiry,
        email_verified: false
      });

      try {
        // Corrected to use the function exported in your emailService.js
        await sendWelcomeEmail(mentee.email, mentee.first_name, verificationToken);
        console.log('✅ Activation email sent to:', mentee.email);
      } catch (emailErr) {
        console.error('❌ Email sending failed:', emailErr.message);
      }
    } 
    // Handle transition to 'rejected'
    else if (newStatus === 'rejected' && oldStatus !== 'rejected') {
      await mentee.update(req.body);
      try {
        await sendRejectionEmail(mentee.email, mentee.first_name);
        console.log('✅ Rejection email sent to:', mentee.email);
      } catch (emailErr) {
        console.error('❌ Rejection email failed:', emailErr.message);
      }
    } 
    // Standard update
    else {
      await mentee.update(req.body);
    }

    const updatedMentee = await Mentee.findByPk(id);
    res.json({ success: true, data: updatedMentee });

  } catch (error) {
    console.error('Update Mentee Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * ACTIVATE ACCOUNT (Set Password)
 */
exports.activateAccount = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    console.log('--- ACTIVATION ATTEMPT ---');
    console.log('Token from URL:', token);

    // 1. Find the mentee by verification_token
    const mentee = await Mentee.findOne({ 
      where: { verification_token: token.trim() } 
    });

    if (!mentee) {
      console.log('❌ Result: Token not found in database.');
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid or expired activation link.' 
      });
    }

    // 2. Hash and Update
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await mentee.update({
      password_hash: hashedPassword,
      email_verified: true,
      application_status: 'active',
      verification_token: null,
      verification_token_expires: null
    });

    console.log('✅ Account set to ACTIVE for:', mentee.email);
    res.json({ success: true, message: 'Account activated successfully!' });

  } catch (error) {
    console.error('Activation Error:', error);
    res.status(500).json({ success: false, message: 'Server error during activation.' });
  }
};

/**
 * DELETE MENTEE
 */
exports.deleteMentee = async (req, res) => {
  try {
    const mentee = await Mentee.findByPk(req.params.id);
    if (!mentee) return res.status(404).json({ success: false, message: 'Mentee not found' });
    await mentee.destroy();
    res.json({ success: true, message: 'Mentee deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
// backend/routes/contact.js
const express = require('express');
const { Contact } = require('../models');
const { authMiddleware, adminOnly } = require('../middleware/auth');

const router = express.Router();

/**
 * POST /api/contact
 * Submit a contact form (PUBLIC - no auth required)
 */
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message, source_page } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, subject, and message are required',
      });
    }

    // Create contact record
    const contact = await Contact.create({
      name,
      email,
      phone: phone || null,
      subject,
      message,
      source_page: source_page || 'website',
      status: 'new',
    });

    // Optional: Send email notification to admin (you can add this later)
    console.log(`[Contact] New message from ${name} (${email}): ${subject}`);

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received. We will get back to you soon.',
      contact_id: contact.id,
    });
  } catch (error) {
    console.error('[Contact] Submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit message. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

/**
 * GET /api/contact
 * Get all contact submissions (ADMIN ONLY)
 */
router.get('/', authMiddleware, adminOnly, async (req, res) => {
  try {
    const contacts = await Contact.findAll({
      order: [['created_at', 'DESC']],
    });

    res.status(200).json({
      success: true,
      contacts,
      count: contacts.length,
    });
  } catch (error) {
    console.error('[Contact] Fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts',
    });
  }
});

/**
 * GET /api/contact/:id
 * Get a single contact by ID (ADMIN ONLY)
 */
router.get('/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }

    // Mark as read
    await contact.update({ status: 'read' });

    res.status(200).json({
      success: true,
      contact,
    });
  } catch (error) {
    console.error('[Contact] Fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact',
    });
  }
});

/**
 * PUT /api/contact/:id
 * Update contact status (ADMIN ONLY)
 */
router.put('/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;

    if (!['new', 'read', 'archived'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be "new", "read", or "archived"',
      });
    }

    const contact = await Contact.findByPk(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }

    await contact.update({ status });

    res.status(200).json({
      success: true,
      message: 'Contact updated',
      contact,
    });
  } catch (error) {
    console.error('[Contact] Update error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update contact',
    });
  }
});

/**
 * DELETE /api/contact/:id
 * Delete a contact (ADMIN ONLY)
 */
router.delete('/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }

    await contact.destroy();

    res.status(200).json({
      success: true,
      message: 'Contact deleted',
    });
  } catch (error) {
    console.error('[Contact] Delete error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete contact',
    });
  }
});

module.exports = router;

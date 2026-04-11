// backend/models/Contact.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Contact = sequelize.define('Contact', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  subject: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('new', 'read', 'archived'),
    defaultValue: 'new',
    comment: 'Track if admin has read this message',
  },
  source_page: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: 'Which page the form was submitted from (home, contact, etc)',
  },
}, {
  tableName: 'contacts',
  timestamps: true,
  underscored: true,
});

module.exports = Contact;

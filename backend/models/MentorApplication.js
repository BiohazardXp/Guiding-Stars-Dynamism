const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const MentorApplication = sequelize.define('MentorApplication', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  professional_title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  company: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  expertise_areas: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: 'Comma-separated areas of expertise',
  },
  professional_background: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: 'Work experience and qualifications',
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: 'Personal bio and why they want to mentor',
  },
  availability: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: 'e.g., "5 hours per week", "weekends only"',
  },
  preferences: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Any preferences for mentee matching',
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending',
  },
  approval_token: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Token sent via email for approval',
  },
  approval_token_expires: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  rejection_reason: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  submitted_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'mentor_applications',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = MentorApplication;

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Mentee = sequelize.define('Mentee', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  first_name: { type: DataTypes.STRING, allowNull: false },
  last_name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  phone: { type: DataTypes.STRING, allowNull: true }, // Changed to true
  background: { type: DataTypes.TEXT, allowNull: true }, // Changed to true
  goals: { type: DataTypes.TEXT, allowNull: true }, // Changed to true
  preferences: { type: DataTypes.TEXT, allowNull: true },
  application_status: {
    type: DataTypes.ENUM('pending', 'approved', 'active', 'rejected'),
    defaultValue: 'pending',
  },
  email_verified: { type: DataTypes.BOOLEAN, defaultValue: false },
  password_hash: { type: DataTypes.STRING, allowNull: true }, // Must be true initially
  verification_token: { type: DataTypes.STRING, allowNull: true },
  verification_token_expires: { type: DataTypes.DATE, allowNull: true },
}, {
  tableName: 'mentees',
  timestamps: true,
  underscored: true,
});

Mentee.associate = (models) => {
  Mentee.hasMany(models.Match, { foreignKey: 'mentee_id', as: 'Matches' });
  Mentee.hasMany(models.ProgressEntry, { foreignKey: 'mentee_id', as: 'ProgressEntries' });
};

module.exports = Mentee;
// backend/models/User.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'mentor', 'mentee'),
    allowNull: false,
  },
}, {
  tableName: 'users',
  timestamps: true,
  underscored: true,
});

// Define associations
User.associate = (models) => {
  // User has one Mentor profile
  User.hasOne(models.Mentor, {
    foreignKey: 'user_id',
    as: 'Mentor',
  });
};

module.exports = User;
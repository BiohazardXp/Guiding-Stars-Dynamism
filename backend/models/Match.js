// backend/models/Match.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Match = sequelize.define('Match', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  mentor_id: { type: DataTypes.INTEGER, allowNull: false },
  mentee_id: { type: DataTypes.INTEGER, allowNull: false },
  match_date: { type: DataTypes.DATEONLY, allowNull: false },
  status: {
    type: DataTypes.ENUM('active', 'completed', 'terminated'),
    defaultValue: 'active',
  },
  notes: { type: DataTypes.TEXT },
}, {
  tableName: 'matches',
  timestamps: true,
  underscored: true,
});

// Define associations
Match.associate = (models) => {
  // Match belongs to a Mentor
  Match.belongsTo(models.Mentor, {
    foreignKey: 'mentor_id',
    as: 'Mentor',
  });

  // Match belongs to a Mentee
  Match.belongsTo(models.Mentee, {
    foreignKey: 'mentee_id',
    as: 'Mentee',
  });
};

module.exports = Match;
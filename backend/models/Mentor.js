const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Mentor = sequelize.define('Mentor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  phone: DataTypes.STRING(20),
  bio: DataTypes.TEXT,
  expertise_areas: DataTypes.TEXT,
  professional_background: DataTypes.TEXT,
  availability: DataTypes.STRING(100),
  preferences: DataTypes.TEXT,
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active',
  },
}, {
  tableName: 'mentors',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

// ✅ STANDARDIZED ASSOCIATION LOGIC
Mentor.associate = (models) => {
  // Mentor belongs to a User (Admin account)
  Mentor.belongsTo(models.User, { 
    foreignKey: 'user_id',
    as: 'User' 
  });

  // Mentor can have many matches
  Mentor.hasMany(models.Match, { 
    foreignKey: 'mentor_id',
    as: 'Matches'
  });
};

module.exports = Mentor;
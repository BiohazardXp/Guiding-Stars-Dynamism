const express = require('express');
const cors = require('cors');
require('dotenv').config();

// 1. Import initializeDatabase from config
const { initializeDatabase } = require('./config/db'); 

// 2. Import the models index (this handles connection AND associations)
const { sequelize } = require('./models/index'); 

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/mentors', require('./routes/mentors'));
app.use('/api/mentees', require('./routes/mentees'));
app.use('/api/matches', require('./routes/matches'));
app.use('/api/progress', require('./routes/progress'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/mentee-auth', require('./routes/menteeAuth'));
app.use('/api/mentee-portal', require('./routes/menteePortal'));

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'Guiding Stars API is running!' });
});

// Startup function
async function startServer() {
  try {
    // A. Create database if it doesn't exist
    await initializeDatabase();
    console.log('✓ Database initialization complete');

    // B. Test connection and initialize associations
    // (Simply requiring the index file above handles the association logic)
    await sequelize.authenticate();
    console.log('✓ MySQL connected successfully and associations initialized');

    // C. Sync database
    // Change alter to true once if you recently changed column names, then back to false
    await sequelize.sync({ alter: false }); 
    console.log('✓ Database tables synced');

    // D. Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`\n🚀 Server running on http://localhost:${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}\n`);
    });
  } catch (err) {
    console.error('❌ Startup failed:', err.message);
    process.exit(1);
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  process.exit(1);
});

startServer();
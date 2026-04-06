// backend/scripts/migrateVideoSupport.js
// Run with: node backend/scripts/migrateVideoSupport.js
// This script updates the Content model to support the 'video' content type

const { sequelize } = require('../config/db');

async function migrateVideoSupport() {
  try {
    console.log('🔄 Starting migration to add video support...\n');

    // Get the current database connection
    const queryInterface = sequelize.getQueryInterface();
    const dbName = sequelize.config.database;
    
    console.log(`📊 Database: ${dbName}`);
    console.log('🔧 Operation: Updating content_type ENUM to include "video"\n');

    // SQL to alter the ENUM type in MySQL
    // Note: MySQL ENUM modification requires recreating the column
    const sql = `
      ALTER TABLE content_management 
      MODIFY COLUMN content_type ENUM('text', 'textarea', 'image', 'video', 'json') 
      DEFAULT 'textarea' 
      CHARACTER SET utf8mb4 
      COLLATE utf8mb4_unicode_ci;
    `;

    // Execute the migration
    await sequelize.query(sql);

    console.log('✅ Migration successful!');
    console.log('📝 Updated ENUM values: text, textarea, image, video, json');
    console.log('\n✨ Video content type is now supported in the database!');

    // Verify the change
    const result = await sequelize.query(`
      SELECT COLUMN_TYPE 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_NAME = 'content_management' 
      AND COLUMN_NAME = 'content_type'
      AND TABLE_SCHEMA = ?
    `, { replacements: [dbName], type: sequelize.QueryTypes.SELECT });

    if (result.length > 0) {
      console.log(`\n✅ Verification - Current ENUM: ${result[0].COLUMN_TYPE}`);
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error('\nTroubleshooting:');
    console.error('- Ensure the database connection is working');
    console.error('- Ensure the content_management table exists');
    console.error('- Try running: node backend/server.js (to initialize tables)');
    process.exit(1);
  }
}

// Run the migration
migrateVideoSupport();

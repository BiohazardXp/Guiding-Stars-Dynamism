// backend/test-token.js - Run this to check your token
require('dotenv').config();
const { Mentee } = require('./models');

const testToken = async () => {
  try {
    // Replace with your actual token from the URL
    const token = 'YOUR_TOKEN_HERE';
    
    console.log('Searching for token:', token);
    
    const mentee = await Mentee.findOne({
      where: { verification_token: token }
    });
    
    if (!mentee) {
      console.log('❌ No mentee found with this token');
      
      // Check all mentees
      const allMentees = await Mentee.findAll({
        attributes: ['id', 'email', 'verification_token', 'verification_token_expires', 'email_verified']
      });
      
      console.log('\n📋 All mentees in database:');
      allMentees.forEach(m => {
        console.log({
          id: m.id,
          email: m.email,
          has_token: !!m.verification_token,
          token_preview: m.verification_token ? m.verification_token.substring(0, 20) + '...' : 'none',
          token_expires: m.verification_token_expires,
          email_verified: m.email_verified
        });
      });
      
    } else {
      console.log('✅ Mentee found!');
      console.log({
        id: mentee.id,
        email: mentee.email,
        first_name: mentee.first_name,
        last_name: mentee.last_name,
        verification_token: mentee.verification_token,
        token_expires: mentee.verification_token_expires,
        email_verified: mentee.email_verified,
        application_status: mentee.application_status,
        is_expired: new Date() > new Date(mentee.verification_token_expires)
      });
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

testToken();
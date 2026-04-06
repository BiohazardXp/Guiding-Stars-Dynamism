// backend/seedContent.js
// Run this once to populate default content sections
// Usage: node backend/seedContent.js

require('dotenv').config();
const { Content, sequelize } = require('./models/index');

const defaultContent = [
  // Hero Section
  {
    key: 'hero_title',
    title: 'Hero Title',
    content_type: 'text',
    value: 'Welcome to Guiding Stars',
    section: 'hero',
    description: 'Main headline on the hero section'
  },
  {
    key: 'hero_subtitle',
    title: 'Hero Subtitle',
    content_type: 'textarea',
    value: 'Empowering the next generation of leaders through mentorship',
    section: 'hero',
    description: 'Subheading text below the hero title'
  },
  {
    key: 'hero_cta_button',
    title: 'CTA Button Text',
    content_type: 'text',
    value: 'Get Started',
    section: 'hero',
    description: 'Text for the call-to-action button'
  },

  // About Section
  {
    key: 'about_title',
    title: 'About Title',
    content_type: 'text',
    value: 'About Guiding Stars',
    section: 'about',
    description: 'Title for the about section'
  },
  {
    key: 'about_description',
    title: 'About Description',
    content_type: 'textarea',
    value: 'Guiding Stars is a mentorship program dedicated to fostering personal and professional growth through meaningful mentor-mentee relationships.',
    section: 'about',
    description: 'Main description text for the about section'
  },

  // Features Section
  {
    key: 'features_title',
    title: 'Features Title',
    content_type: 'text',
    value: 'Why Choose Us',
    section: 'features',
    description: 'Title for the features section'
  },

  // Team Section
  {
    key: 'team_title',
    title: 'Team Title',
    content_type: 'text',
    value: 'Meet Our Team',
    section: 'team',
    description: 'Title for the team section'
  },
  {
    key: 'team_description',
    title: 'Team Description',
    content_type: 'textarea',
    value: 'Our experienced team is dedicated to providing the best mentorship experience for all participants.',
    section: 'team',
    description: 'Description text for the team section'
  },

  // Testimonials Section
  {
    key: 'testimonials_title',
    title: 'Testimonials Title',
    content_type: 'text',
    value: 'Success Stories',
    section: 'testimonials',
    description: 'Title for testimonials section'
  },

  // FAQ Section
  {
    key: 'faq_title',
    title: 'FAQ Title',
    content_type: 'text',
    value: 'Frequently Asked Questions',
    section: 'faq',
    description: 'Title for FAQ section'
  },

  // Footer
  {
    key: 'footer_description',
    title: 'Footer Description',
    content_type: 'textarea',
    value: 'Guiding Stars - Empowering leaders through mentorship',
    section: 'footer',
    description: 'Copyright and description text in footer'
  },
  {
    key: 'footer_address',
    title: 'Footer Address',
    content_type: 'text',
    value: '123 Leadership Lane, Innovation City, 12345',
    section: 'footer',
    description: 'Organization address in footer'
  },
  {
    key: 'footer_phone',
    title: 'Footer Phone',
    content_type: 'text',
    value: '+1 (555) 123-4567',
    section: 'footer',
    description: 'Contact phone number in footer'
  },
  {
    key: 'footer_email',
    title: 'Footer Email',
    content_type: 'text',
    value: 'contact@guidingstars.com',
    section: 'footer',
    description: 'Contact email in footer'
  }
];

async function seedContent() {
  try {
    console.log('🌱 Starting content seed...');
    
    // Connect to database
    await sequelize.authenticate();
    console.log('✓ Database connected');

    // Sync tables
    await sequelize.sync({ alter: false });
    console.log('✓ Tables synced');

    // Clear existing content (optional)
    await Content.destroy({ where: {} });
    console.log('✓ Existing content cleared');

    // Seed default content
    await Content.bulkCreate(defaultContent);
    console.log('✓ Default content seeded successfully');

    console.log('\n📋 Seeded content:');
    defaultContent.forEach(item => {
      console.log(`  - ${item.key} (${item.section})`);
    });

    console.log('\n✅ Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
}

// Run seed
seedContent();

// backend/scripts/seedMissingContentFields.js
// Run with: node backend/scripts/seedMissingContentFields.js

const { sequelize, Content } = require('../models/index');

const missingFields = [
  // HOME PAGE - CTA Fields
  {
    key: 'hero_cta_button_text',
    title: 'Hero CTA Button Text',
    content_type: 'text',
    value: 'Apply Now',
    section: 'hero',
    page: 'home',
    description: 'Text label on the hero section call-to-action button'
  },
  {
    key: 'hero_cta_button_link',
    title: 'Hero CTA Button Link',
    content_type: 'text',
    value: '/apply',
    section: 'hero',
    page: 'home',
    description: 'Where the hero CTA button links to (e.g., /apply)'
  },
  {
    key: 'services_cta_text',
    title: 'Services Section CTA',
    content_type: 'textarea',
    value: 'Ready to get started? Apply to our program today.',
    section: 'features',
    page: 'home',
    description: 'Call-to-action text in the services section'
  },
  {
    key: 'about_cta_button_text',
    title: 'About Section CTA Button Text',
    content_type: 'text',
    value: 'Learn More',
    section: 'about',
    page: 'home',
    description: 'Text on the about section button'
  },
  {
    key: 'about_cta_button_link',
    title: 'About Section CTA Button Link',
    content_type: 'text',
    value: '/about',
    section: 'about',
    page: 'home',
    description: 'Where the about button links to'
  },

  // ABOUT PAGE - New Fields
  {
    key: 'about_meta_title',
    title: 'About Page - Meta Title (SEO)',
    content_type: 'text',
    value: 'About Guiding Stars - Mentorship Program',
    section: 'about',
    page: 'about',
    description: 'SEO title for the about page (shows in browser tab)'
  },
  {
    key: 'about_meta_description',
    title: 'About Page - Meta Description (SEO)',
    content_type: 'textarea',
    value: 'Learn about Guiding Stars, our mission, and our commitment to mentorship and career development.',
    section: 'about',
    page: 'about',
    description: 'SEO description for the about page (shows in search results)'
  },
  {
    key: 'about_hero_title',
    title: 'About Page - Hero Title',
    content_type: 'text',
    value: 'About Guiding Stars',
    section: 'about',
    page: 'about',
    description: 'Main headline on the about page hero section'
  },
  {
    key: 'about_hero_subtitle',
    title: 'About Page - Hero Subtitle',
    content_type: 'textarea',
    value: 'Discover our mission, values, and commitment to excellence',
    section: 'about',
    page: 'about',
    description: 'Subheading under the about page hero title'
  },
  {
    key: 'about_hero_image',
    title: 'About Page - Hero Image',
    content_type: 'image',
    value: '/img/about-1.png',
    section: 'about',
    page: 'about',
    description: 'Background image for the about page hero section'
  },

  // TEAM PAGE - New Fields
  {
    key: 'team_meta_title',
    title: 'Team Page - Meta Title (SEO)',
    content_type: 'text',
    value: 'Our Team - Guiding Stars Leadership',
    section: 'team',
    page: 'team',
    description: 'SEO title for the team page'
  },
  {
    key: 'team_meta_description',
    title: 'Team Page - Meta Description (SEO)',
    content_type: 'textarea',
    value: 'Meet the experienced professionals leading Guiding Stars mentorship program.',
    section: 'team',
    page: 'team',
    description: 'SEO description for the team page'
  },
  {
    key: 'team_hero_title',
    title: 'Team Page - Hero Title',
    content_type: 'text',
    value: 'Meet Our Team',
    section: 'team',
    page: 'team',
    description: 'Main headline on the team page hero'
  },
  {
    key: 'team_hero_subtitle',
    title: 'Team Page - Hero Subtitle',
    content_type: 'textarea',
    value: 'Experienced professionals dedicated to your success',
    section: 'team',
    page: 'team',
    description: 'Subtitle on team page hero'
  },
  {
    key: 'team_hero_image',
    title: 'Team Page - Hero Image',
    content_type: 'image',
    value: '/img/guiding\ stars\ team.jpg',
    section: 'team',
    page: 'team',
    description: 'Background image for team page hero'
  },

  // CONTACT PAGE - New Fields
  {
    key: 'contact_meta_title',
    title: 'Contact Page - Meta Title (SEO)',
    content_type: 'text',
    value: 'Contact Guiding Stars - Get in Touch',
    section: 'footer',
    page: 'contact',
    description: 'SEO title for contact page'
  },
  {
    key: 'contact_meta_description',
    title: 'Contact Page - Meta Description (SEO)',
    content_type: 'textarea',
    value: 'Have questions? Get in touch with the Guiding Stars team. We are here to help!',
    section: 'footer',
    page: 'contact',
    description: 'SEO description for contact page'
  },
  {
    key: 'contact_hero_title',
    title: 'Contact Page - Hero Title',
    content_type: 'text',
    value: 'Get In Touch',
    section: 'footer',
    page: 'contact',
    description: 'Main headline on contact page'
  },
  {
    key: 'contact_hero_subtitle',
    title: 'Contact Page - Hero Subtitle',
    content_type: 'textarea',
    value: 'Have questions? We would love to hear from you.',
    section: 'footer',
    page: 'contact',
    description: 'Subtitle on contact page hero'
  },
  {
    key: 'contact_form_description',
    title: 'Contact Form - Description',
    content_type: 'textarea',
    value: 'Fill out the form below and we will get back to you as soon as possible.',
    section: 'footer',
    page: 'contact',
    description: 'Text that appears above the contact form'
  },

  // APPLY PAGE - New Fields
  {
    key: 'apply_meta_title',
    title: 'Apply Page - Meta Title (SEO)',
    content_type: 'text',
    value: 'Apply to Guiding Stars - Mentorship Program',
    section: 'hero',
    page: 'apply',
    description: 'SEO title for apply page'
  },
  {
    key: 'apply_meta_description',
    title: 'Apply Page - Meta Description (SEO)',
    content_type: 'textarea',
    value: 'Ready to start your mentorship journey? Apply to Guiding Stars today!',
    section: 'hero',
    page: 'apply',
    description: 'SEO description for apply page'
  },
  {
    key: 'apply_hero_title',
    title: 'Apply Page - Hero Title',
    content_type: 'text',
    value: 'Apply Today',
    section: 'hero',
    page: 'apply',
    description: 'Main headline on apply page'
  },
  {
    key: 'apply_instructions',
    title: 'Apply Page - Instructions',
    content_type: 'textarea',
    value: 'Thank you for your interest in Guiding Stars. Please fill out the application below.',
    section: 'hero',
    page: 'apply',
    description: 'Instructions text on apply page'
  },
  {
    key: 'apply_requirements',
    title: 'Apply Page - Requirements',
    content_type: 'textarea',
    value: 'To apply, you must be: 1) Passionate about learning, 2) Committed to growth, 3) Ready to give your best effort',
    section: 'hero',
    page: 'apply',
    description: 'Eligibility requirements for the program'
  },
  {
    key: 'apply_deadline',
    title: 'Apply Page - Application Deadline',
    content_type: 'text',
    value: 'Rolling Applications',
    section: 'hero',
    page: 'apply',
    description: 'Application deadline or intake period'
  },

  // TESTIMONIALS PAGE - New Fields
  {
    key: 'testimonials_meta_title',
    title: 'Testimonials Page - Meta Title (SEO)',
    content_type: 'text',
    value: 'Success Stories - Guiding Stars Testimonials',
    section: 'testimonials',
    page: 'testimonials',
    description: 'SEO title for testimonials page'
  },
  {
    key: 'testimonials_meta_description',
    title: 'Testimonials Page - Meta Description (SEO)',
    content_type: 'textarea',
    value: 'Read inspiring success stories from mentors and mentees in the Guiding Stars program.',
    section: 'testimonials',
    page: 'testimonials',
    description: 'SEO description for testimonials page'
  },
  {
    key: 'testimonials_page_title',
    title: 'Testimonials Page - Hero Title',
    content_type: 'text',
    value: 'Success Stories',
    section: 'testimonials',
    page: 'testimonials',
    description: 'Main headline on testimonials page'
  },

  // GLOBAL/FOOTER - New Fields
  {
    key: 'site_meta_keywords',
    title: 'Global - Meta Keywords (SEO)',
    content_type: 'text',
    value: 'mentorship, career development, professional growth, Zambia, leadership',
    section: 'footer',
    page: 'home',
    description: 'SEO keywords for the entire site'
  },
  {
    key: 'site_og_image',
    title: 'Global - Open Graph Image (Social Media)',
    content_type: 'image',
    value: '/img/HORIZONTAL.png',
    section: 'footer',
    page: 'home',
    description: 'Image shown when sharing site on social media'
  },
  {
    key: 'site_og_description',
    title: 'Global - Open Graph Description (Social)',
    content_type: 'textarea',
    value: 'Guiding Stars: Bridging Academia and Practice through mentorship',
    section: 'footer',
    page: 'home',
    description: 'Description shown when sharing site on social media'
  },
  {
    key: 'footer_privacy_url',
    title: 'Footer - Privacy Policy URL',
    content_type: 'text',
    value: '/privacy',
    section: 'footer',
    page: 'home',
    description: 'Link to privacy policy page'
  },
  {
    key: 'footer_terms_url',
    title: 'Footer - Terms of Service URL',
    content_type: 'text',
    value: '/terms',
    section: 'footer',
    page: 'home',
    description: 'Link to terms of service page'
  },

  // GRADUATION PAGE - New Fields
  {
    key: 'graduation_meta_title',
    title: 'Graduation Page - Meta Title (SEO)',
    content_type: 'text',
    value: 'Graduation Ceremony - Guiding Stars',
    section: 'hero',
    page: 'graduation',
    description: 'SEO title for graduation page'
  },
  {
    key: 'graduation_hero_title',
    title: 'Graduation Page - Hero Title',
    content_type: 'text',
    value: 'Graduation Ceremony',
    section: 'hero',
    page: 'graduation',
    description: 'Main headline on graduation page'
  },
  {
    key: 'graduation_hero_subtitle',
    title: 'Graduation Page - Hero Subtitle',
    content_type: 'textarea',
    value: 'Celebrating success and marking new beginnings',
    section: 'hero',
    page: 'graduation',
    description: 'Subtitle on graduation page hero'
  },
  {
    key: 'graduation_event_date',
    title: 'Graduation Page - Event Date',
    content_type: 'text',
    value: 'June 15, 2024',
    section: 'hero',
    page: 'graduation',
    description: 'Date of the graduation ceremony'
  },
  {
    key: 'graduation_event_time',
    title: 'Graduation Page - Event Time',
    content_type: 'text',
    value: '10:00 AM - 2:00 PM',
    section: 'hero',
    page: 'graduation',
    description: 'Time of the graduation ceremony'
  },
  {
    key: 'graduation_event_location',
    title: 'Graduation Page - Event Location',
    content_type: 'text',
    value: 'National Convention Center, Lusaka',
    section: 'hero',
    page: 'graduation',
    description: 'Location of the graduation ceremony'
  }
];

async function seedFields() {
  try {
    console.log('🌱 Starting to seed missing content fields...');
    console.log(`📝 Total fields to add: ${missingFields.length}`);
    
    let created = 0;
    let skipped = 0;

    for (const field of missingFields) {
      const [record, isNew] = await Content.findOrCreate({
        where: { key: field.key },
        defaults: field
      });

      if (isNew) {
        created++;
        console.log(`✅ Created: ${field.key}`);
      } else {
        skipped++;
        console.log(`⏭️  Skipped (already exists): ${field.key}`);
      }
    }

    console.log('\n📊 Seeding Complete!');
    console.log(`✅ Created: ${created} new fields`);
    console.log(`⏭️  Skipped: ${skipped} existing fields`);
    console.log(`📈 Total fields now in database: ${created + skipped}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding fields:', error);
    process.exit(1);
  }
}

// Run the seed
seedFields();

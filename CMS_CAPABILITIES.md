# CMS Capabilities & Content Management Guide

## 📊 What You CAN Control Through CMS

### **100% Editable Content** ✅

You have complete access to modify almost everything on the public-facing website through the CMS without touching any code:

#### **1. HERO SECTION (Home Page - Top Banner)**
- `hero_title` - Main headline (e.g., "Empowering Future Leaders Through Mentorship")
- `hero_subtitle` - Subheading (e.g., "Ignite Success")

#### **2. ABOUT SECTION (Home Page)**
- `about_description_1` - First paragraph about Guiding Stars
- `about_description_2` - Second paragraph about mission/vision

#### **3. TESTIMONIALS PAGE**
- `testimonials_description` - Page intro text
- `testimonials_cta` - Call-to-action text
- `testimonial_1_name` through `testimonial_10_name` - Testimonial author names
- `testimonial_1_title` through `testimonial_10_title` - Author titles (Mentor/Mentee)
- `testimonial_1_content` through `testimonial_10_content` - Testimonial text
- `testimonial_1_image` through `testimonial_10_image` - Testimonial images (uploaded via CMS)

#### **4. FOOTER CONTENT (All Pages)**
- `footer_about` - Company description in footer
- `footer_company_name` - Company name (defaults to "Guiding Stars")
- `footer_address` - Physical address
- `footer_email` - Contact email
- `footer_phone` - Phone number
- `footer_link_home` - "Home" link text
- `footer_link_about` - "About" link text
- `footer_link_team` - "Team" link text
- `footer_link_testimonials` - "Testimonials" link text
- `footer_link_contact` - "Contact" link text
- `footer_program_apply` - "Apply Now" link text
- `footer_program_mentorship` - "Mentorship" link text
- `footer_program_graduation` - "Graduation" link text
- `footer_program_resources` - "Resources" link text
- `footer_social_facebook` - Facebook URL
- `footer_social_twitter` - Twitter/X URL
- `footer_social_linkedin` - LinkedIn URL
- `footer_privacy_url` - Privacy Policy link
- `footer_privacy_label` - "Privacy Policy" link text
- `footer_terms_url` - Terms of Service link
- `footer_terms_label` - "Terms of Service" link text

---

## ❌ What You CANNOT Currently Control Through CMS

### **Requires Code Changes:**

1. **Navigation Structure**
   - Menu items and their order (would need to edit Navbar.tsx)
   - New main menu links (requires code deployment)

2. **Page Layout & Design**
   - Colors and styling (can't change #FF9148 orange theme without code)
   - Grid layouts and spacing
   - Font sizes and styling
   - Button positions and styles

3. **Images & Media**
   - Hero banner background image (hardcoded in Home.tsx)
   - About section photos (hardcoded in Home.tsx)
   - Team member photos (hardcoded in Team.tsx)
   - Page-specific images (would need individual page customization)

4. **Page Structure**
   - Adding/removing sections on pages
   - Adding new pages (requires React component creation)
   - Reorganizing page content sections

5. **Features & Functionality**
   - Form fields and validation
   - API integrations
   - Authentication logic
   - Admin dashboard functionality

6. **Admin-Specific Content**
   - Dashboard styling
   - Admin pages (Mentors, Mentees, Matches, Progress)
   - CMS admin interface itself

---

## 🎯 How to Use the CMS

### **Access:**
1. Go to `https://yoursite.com/login`
2. Enter admin credentials: `admin@guidingstars.com` / `password123`
3. Click "Content" in the left sidebar
4. Select a section (Hero, About, Testimonials, Footer, etc.)

### **Create/Edit Content:**
1. Select section from tabs
2. Click "Add Content" or "Edit" on existing item
3. Fill in the content details:
   - **Key**: Unique identifier (e.g., `hero_title`)
   - **Title**: Display name (e.g., "Hero Title")
   - **Content Type**: Select "text", "image", or "html"
   - **Value**: The actual content
   - **Page**: Which page it appears on (Home, About, Team, etc.)

### **Upload Images:**
1. Click the image upload button
2. Select image from computer (JPEG, PNG, WebP, GIF - max 5MB)
3. Image is automatically served at `/uploads/filename.ext`
4. Copy the filename and use it in testimonials or other image fields

### **Delete Content:**
1. Find the content item you want to delete
2. Click the delete button (trash icon)
3. Confirm deletion

---

## 📝 Example: Adding a New Testimonial

1. **Step 1:** In CMS, select "Testimonials" section
2. **Step 2:** Create 4 items with these keys:
   - `testimonial_5_name` → "John Smith"
   - `testimonial_5_title` → "Mentee"
   - `testimonial_5_content` → "This program changed my life..."
   - `testimonial_5_image` → "john-smith.jpg" (if you uploaded an image)
3. **Step 3:** Go to `/testimonials` page
4. **Step 4:** New testimonial appears automatically! ✨

---

## 💡 Pro Tips

### **Best Practices:**
- Keep titles short and impactful
- Descriptions should be 2-3 sentences max
- Use active voice in testimonials
- Testimonial images should be consistent aspect ratio
- Test content on mobile devices after updates

### **Content Organization:**
- Use the "section" field to organize content logically
- Group related testimonials with sequential numbers (testimonial_1, 2, 3, etc.)
- Use consistent naming conventions

### **Performance:**
- Image file size matters - optimize before uploading
- Shorter content loads faster on mobile
- Footer changes appear on ALL pages instantly

---

## 🔄 Workflow for Website Updates

### **To update without a developer:**
1. Login to CMS
2. Select content section
3. Edit or create new items
4. Click Save
5. Refresh the website page in browser
6. Changes appear immediately! ✨

### **To update with images:**
1. Prepare image files on your computer
2. Upload via CMS file upload button
3. Copy the generated filename
4. Paste filename into relevant content field
5. Save and refresh

### **To revert changes:**
1. Go to CMS
2. Find the content item you changed
3. Edit it back to original text or
4. Delete it entirely (if it's a new addition)
5. Save changes

---

## 🚀 What's Missing (Future Enhancement)

If you want complete control over the website without ANY code knowledge, we could add:

1. **Blog/News Section** - Create and publish articles directly
2. **Image Gallery Management** - Upload and organize photos per page
3. **SEO Management** - Edit meta tags and descriptions per page
4. **Team Member Profiles** - Add/edit/remove team members through CMS
5. **FAQ Management** - Add/edit FAQ items directly
6. **Events Calendar** - Create and manage events
7. **Email Templates** - Customize transactional emails
8. **Theme Customizer** - Change colors, fonts without code

---

## 📞 Support

**Common Issues:**

**Q: I uploaded an image but it doesn't show**
- A: Make sure you used the exact filename in the content field (e.g., `uploads/my-image.jpg`)

**Q: Changes aren't appearing on the website**
- A: Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R) to clear cache

**Q: I want to add a new section to the home page**
- A: This requires code changes - contact your developer

**Q: Can I change the orange color?**
- A: Currently requires code changes - this would be a nice future enhancement

**Q: How do I backup my content?**
- A: All content is stored in the database - your hosting provider should have backups

---

## 📊 Content Inventory

**Currently Editable via CMS:**
- ✅ Hero Section (2 fields)
- ✅ About Section (2 fields)  
- ✅ Testimonials (up to 10 testimonials × 4 fields = 40 fields)
- ✅ Footer (20+ fields including links, contact info, social media)

**Total: 64+ editable content fields**

**Page Coverage:**
- ✅ Home Page: 50%+ (hero, about, footer editable)
- ✅ Testimonials Page: 100% (all text and images from CMS)
- ✅ All Pages: Footer content (100% editable)
- ⚠️ About Page: Footer only (10%)
- ⚠️ Team Page: Footer only (10%)
- ⚠️ Contact Page: Footer only (10%)
- ⚠️ Graduation Page: Footer only (10%)

---

## 🎓 Next Steps

### **If you want MORE control:**
We can add CMS fields for:
- Page headers and descriptions
- Service cards on home page
- FAQ items on about page
- Team member details
- Contact information on contact page
- Event details on graduation page

### **To request changes:**
Document what content you want to manage, and we can add it to the CMS in 15-30 minutes per section.

---

**Summary:** You have **complete control over text content and testimonials** through the CMS. For **layout, design, and structure changes**, you'll need your developer. This is the standard separation that protects the website integrity while maximizing your control over content.

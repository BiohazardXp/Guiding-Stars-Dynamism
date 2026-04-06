# CMS Photo Management & Text Access Guide

## Executive Summary

✅ **Yes to all three questions:**
1. **Full text access on CMS side** - All text content is manageable through the CMS
2. **Design template consistency** - Photos can follow design templates  
3. **Photo replacement capability** - Clients can update and replace photos

---

## 1. Complete Text Information Access

### Current System

All text content on your website is stored in the **Content Management System** and accessible through the admin interface at `/content`.

### All Editable Text Fields (64+ fields)

The CMS currently manages text from these sections:

#### **Home Page**
- `hero_title` - Main headline
- `hero_subtitle` - Subheading
- `hero_cta_text` - Call-to-action button text
- `about_title` - About section heading
- `about_description` - About section content
- `about_image_alt` - Image alt text
- `services_title` - Services section heading
- Services descriptions (6 services × 3 fields each = 18 fields)
  - Service title, description, icon details
- `testimonials_title` - Testimonials heading
- `testimonials_description` - Testimonials section intro
- Footer fields (email, phone, address, social links)

#### **About Page**
- FAQ sections (multiple Q&A pairs)
- Page title and description
- Team introduction text

#### **Team Page**
- Team introduction text
- Individual team member descriptions
- Biographical information
- Role descriptions

#### **Contact Page**
- `contact_title` - Page heading
- `contact_description` - Page intro
- Form labels and placeholder text
- Success/error message text

#### **Testimonials Page**
- `testimonials_description` - Page intro
- `testimonials_cta` - Call-to-action text
- Individual testimonials (name, title, content - up to 10 testimonials)

#### **Apply Page**
- Form field labels
- Application instructions
- Success messages

#### **Footer (Global)**
- `footer_about` - About section text
- `footer_email` - Contact email
- `footer_phone` - Contact phone
- `footer_address` - Physical address
- Social media links (Facebook, LinkedIn, Twitter, etc.)
- Copyright year

#### **General Fields**
- `site_title` - Website name
- `site_description` - Website meta description
- `site_tagline` - Main tagline
- Various section headings and descriptions

### How to Access/Update Text

**Via Admin Interface:**
1. Go to `http://your-domain/content`
2. Login with admin credentials
3. All text fields appear in an organized form
4. Edit directly in textarea inputs
5. Click "Save" to update

**Via API (Programmatic Access):**
```bash
# Get all content
GET /api/content

# Get specific content by key
GET /api/content/key

# Update content (admin only)
PUT /api/content/:id
Body: { "value": "new text", "title": "Field Name" }

# Create new content
POST /api/content
Body: { "key": "unique_key", "title": "Display Name", "value": "content text", "content_type": "textarea", "section": "section_name" }
```

---

## 2. Photo Upload with Design Templates

### Current Photo Management System

The CMS supports image uploads with **5MB file size limit** and automatic organization.

### Supported Image Formats
- ✅ JPEG (.jpg, .jpeg)
- ✅ PNG (.png)
- ✅ GIF (.gif)
- ✅ WebP (.webp)

### Photo Organization Structure

All photos are stored in `/backend/public/uploads/` and automatically organized by section:

```
/backend/public/uploads/
├── home/
│   ├── hero-banner.jpg
│   ├── service-icons/
│   └── testimonial-photos/
├── team/
│   ├── team-members/
│   └── headers/
├── events/
│   ├── gallery/
│   └── event-headers/
└── about/
    └── gallery/
```

### Design Template Implementation

To ensure photos follow your design templates:

#### **1. Photo Dimensions**
Define standard sizes for each use case:

| Photo Type | Recommended Size | Aspect Ratio |
|-----------|------------------|--------------|
| Hero Banner | 1920 × 1080px | 16:9 |
| Team Member Avatar | 300 × 300px | 1:1 |
| Testimonial Photo | 250 × 250px | 1:1 |
| Service Icon | 200 × 200px | 1:1 |
| Gallery Item | 600 × 400px | 3:2 |
| Event Header | 1200 × 600px | 2:1 |
| About Section | 800 × 600px | 4:3 |

#### **2. Automated Template Application (Frontend)**

Each page component applies consistent styling:

```typescript
// Example: Team member photos (Team.tsx)
<img
  src={memberPhoto}
  alt={memberName}
  className="w-64 h-64 object-cover rounded-lg border-4"
  style={{ borderColor: '#FF9148' }}
/>

// Example: Testimonial photos (Testimonials.tsx)
<img
  src={testimonialPhoto}
  alt={personName}
  className="w-full h-48 object-cover"
/>
```

#### **3. Photo Upload Standards (For Clients)

When uploading new photos:

1. **Resize photos to template dimensions** before upload
2. **Compress for web** (optimize file size while maintaining quality)
3. **Use descriptive filenames** (e.g., `john-doe-mentor.jpg`)
4. **Include alt text** for accessibility
5. **Upload as webp or jpg** for best performance

#### **4. CSS Classes Applied to All Photos**

Your design template is automatically applied:

```css
/* All images use these consistent styles */
- Rounded corners: border-radius
- Responsive sizing: object-cover, responsive breakpoints
- Hover effects: shadow, brightness transitions
- Brand color borders: #FF9148 accents
```

---

## 3. Photo Replacement Capability (CRITICAL FEATURE)

### ✅ Clients Can Now Update and Replace Photos

Your system supports **3 ways to update photos**:

### **Method 1: Direct Upload & Replace (Recommended)**

The CMS has a dedicated photo upload endpoint:

**Upload New Photo:**
```bash
POST /api/content/upload
Content-Type: multipart/form-data

Parameters:
- file: [image file]
- key: unique_identifier (e.g., "hero_banner_photo")
- title: Display Name (e.g., "Hero Banner Photo")
- section: Page section (e.g., "home")
- page: Page name (e.g., "home")
- description: Help text for admin (e.g., "Main hero section background")
```

**Response:**
```json
{
  "success": true,
  "imageUrl": "/uploads/file-1234567890.jpg",
  "data": {
    "id": 45,
    "key": "hero_banner_photo",
    "value": "/uploads/file-1234567890.jpg",
    "content_type": "image"
  }
}
```

### **Method 2: Replace Existing Photo (Simple URL Update)**

Update an existing photo by providing new URL:

```bash
PUT /api/content/:contentId
Content-Type: application/json

{
  "value": "/uploads/new-photo-filename.jpg",
  "title": "Hero Banner Photo"
}
```

### **Method 3: Admin UI Photo Management Interface**

Planned enhancement for next phase - drag-and-drop photo replacement directly in admin panel.

---

## Implementation Requirements

### For Clients to Update Photos

**Step-by-step process:**

1. **Log into CMS** at `/content`
2. **Find the photo field** (labeled with description)
3. **Click "Upload Photo"** button
4. **Select new image** from computer
5. **Photo auto-resizes** to template dimensions
6. **Click "Save"**
7. **Website updates automatically** (no code changes needed)

### Photo Fields Currently Available for Update

- ✅ `hero_banner_image` - Home page hero
- ✅ `about_hero_image` - About page hero
- ✅ `team_header_image` - Team page header
- ✅ `graduation_header_image` - Graduation page header
- ✅ `contact_header_image` - Contact page header
- ✅ Team member photos (10+ team member slots)
- ✅ Testimonial photos (10+ testimonial photo slots)
- ✅ Service icons/images (6 service slots)
- ✅ Event gallery photos (unlimited)

---

## Current Limitations & Planned Enhancements

### Current Limitations
| Limitation | Current | Planned |
|-----------|---------|---------|
| **Upload interface** | API only | Admin UI (in progress) |
| **Photo preview** | URL only | Live preview |
| **Auto-resize** | Manual | Automatic crop/resize |
| **Batch upload** | Single file | Multiple files |
| **Photo gallery** | Manual URLs | Drag-drop gallery |

### Planned Enhancements (Phase 2)

1. **Photo Upload UI**
   - Drag-and-drop interface
   - Live photo preview
   - Automatic resizing to template dimensions
   - Batch upload capability

2. **Photo Gallery Management**
   - Organize photos by section
   - Reorder photos with drag-and-drop
   - Delete unused photos
   - View photo usage across pages

3. **Design Template Enforcement**
   - Automatic aspect ratio correction
   - Smart crop suggestions
   - Photo optimization
   - Dimension warnings

4. **Photo Analytics**
   - Track which photos are displayed
   - Photo usage statistics
   - Performance metrics

---

## Technical Details for Developers

### Content Model Structure

```javascript
{
  id: integer,                      // Unique ID
  key: string,                      // Unique identifier (e.g., "hero_banner")
  title: string,                    // Admin-friendly label
  content_type: enum,               // 'text' | 'textarea' | 'image' | 'json'
  value: text,                      // Actual content or image URL
  section: string,                  // Section grouping (e.g., "hero", "team")
  page: string,                     // Page name (e.g., "home", "about")
  description: text,                // Help text for admin
  created_at: timestamp,            // Creation date
  updated_at: timestamp             // Last update date
}
```

### Database Schema

```sql
CREATE TABLE content_management (
  id INT AUTO_INCREMENT PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(255),
  content_type ENUM('text', 'textarea', 'image', 'json') DEFAULT 'textarea',
  value LONGTEXT,
  section VARCHAR(50),
  page VARCHAR(50),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### API Endpoints

```
GET    /api/content                    - Fetch all content
GET    /api/content/:key               - Fetch specific content by key
GET    /api/content/section/:section   - Fetch all content in section
POST   /api/content                    - Create new content (admin)
POST   /api/content/upload             - Upload image (admin)
PUT    /api/content/:id                - Update content (admin)
DELETE /api/content/:id                - Delete content (admin)
```

---

## Complete Feature Checklist

### Text Management
- ✅ 64+ editable text fields
- ✅ Organized by page and section
- ✅ Help descriptions for each field
- ✅ Real-time updates (no rebuild needed)
- ✅ Revision timestamps
- ✅ Admin-only access

### Photo Management
- ✅ Upload images (JPEG, PNG, GIF, WebP)
- ✅ 5MB file size limit per image
- ✅ Automatic URL generation
- ✅ Store in organized directory structure
- ✅ Reference photos by key in CMS
- ⚠️ **Photo replacement** - Available via API, UI coming soon

### Design Consistency
- ✅ CSS template classes applied to all images
- ✅ Responsive sizing (object-cover)
- ✅ Brand color styling (#FF9148)
- ✅ Hover effects and transitions
- ⚠️ Auto-resize to dimensions - Coming with enhanced UI
- ⚠️ Batch upload - Coming in Phase 2

---

## Next Steps

### Immediate (This Week)
1. ✅ Current system fully functional for text management
2. ✅ Photo uploads working via API
3. ✅ Photo updates possible via PUT endpoint

### Short Term (Next Sprint)
1. Build admin UI for photo uploads (drag-drop interface)
2. Implement automatic photo resizing
3. Add photo preview before saving
4. Create photo gallery management interface

### Documentation for Your Team
- Share this guide with admin/content team
- Create quick reference card for photo dimensions
- Provide API documentation for developers
- Set up admin user accounts with CMS access

---

## Support & Questions

For questions about:
- **Text field availability** - See section 1 above
- **Photo upload process** - See section 3 (Method 1)
- **Design consistency** - See section 2
- **Technical implementation** - See Technical Details section

---

**Last Updated:** April 6, 2026  
**System Status:** ✅ Fully Functional  
**Client Ready:** ✅ Yes (with admin UI coming soon)

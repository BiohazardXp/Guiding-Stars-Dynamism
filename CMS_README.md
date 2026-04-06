# Content Management System (CMS)

## Overview
The Guiding Stars application now includes a Content Management System that allows administrators to update website content without touching the source code.

## Features
- ✅ Manage website text, images, and data
- ✅ Organized by sections (hero, about, features, team, testimonials, faq, footer)
- ✅ Support for different content types (text, textarea, image URLs, JSON)
- ✅ Admin-only access with role-based protection
- ✅ Real-time updates

## How to Use

### For Admins

#### 1. **First Time Setup**
Run the seed command to populate default content sections:
```bash
cd backend
node seedContent.js
```

This creates default content items for:
- Hero section (title, subtitle, CTA button)
- About section
- Features section
- Team section
- Testimonials section
- FAQ section
- Footer section

#### 2. **Access the CMS**
1. Log in as admin to the dashboard
2. Click on **"Content"** in the sidebar
3. Select a section from the tabs (Hero, About, Features, etc.)
4. Click **"Edit"** on any item to modify it
5. Or click **"+ Add New Content"** to create a new content item

#### 3. **Content Types**
- **Text**: Single-line text (e.g., titles, short strings)
- **Textarea**: Multi-line text (e.g., descriptions, long content)
- **Image**: URL to an image (will show preview)
- **JSON**: Complex data structures (for advanced use)

#### 4. **Creating New Content Items**
When adding new content, specify:
- **Key**: Unique identifier (used by frontend code)
- **Title**: Display name for admins
- **Type**: Content type (text/textarea/image/json)
- **Section**: Category (hero/about/features/etc.)
- **Content**: The actual value
- **Description**: Help text explaining this field

### For Developers

#### 1. **API Endpoints**

**Get all content (public)**
```bash
GET /api/content
```
Returns: `{ success: true, data: { key1: value1, key2: value2, ... }, items: [...] }`

**Get specific content by key**
```bash
GET /api/content/:key
```
Returns: `{ success: true, data: { id, key, title, value, ... } }`

**Get all content in a section (admin)**
```bash
GET /api/content/section/:section
```
Requires: Admin authentication

**Create content (admin)**
```bash
POST /api/content
Body: { key, title, content_type, value, section, description }
```

**Update content (admin)**
```bash
PUT /api/content/:id
Body: { title, value, description }
```

**Delete content (admin)**
```bash
DELETE /api/content/:id
```

#### 2. **Using Content in React Components**

Example: Fetching content to display on Home page

```tsx
import { useEffect, useState } from 'react';
import api from '../services/api';

function Hero() {
  const [content, setContent] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await api.get('/content');
        setContent(response.data.data); // Returns key-value map
      } catch (error) {
        console.error('Failed to fetch content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <section className="hero">
      <h1>{content.hero_title}</h1>
      <p>{content.hero_subtitle}</p>
      <button>{content.hero_cta_button}</button>
    </section>
  );
}

export default Hero;
```

#### 3. **Default Content Keys**

Here are the default content keys created by `seedContent.js`:

**Hero Section:**
- `hero_title`
- `hero_subtitle`
- `hero_cta_button`

**About Section:**
- `about_title`
- `about_description`

**Features Section:**
- `features_title`

**Team Section:**
- `team_title`
- `team_description`

**Testimonials Section:**
- `testimonials_title`

**FAQ Section:**
- `faq_title`

**Footer Section:**
- `footer_description`
- `footer_address`
- `footer_phone`
- `footer_email`

## Workflow

### Client Updates Content
1. Log in as admin
2. Navigate to `/content` (or click "Content" in sidebar)
3. Click edit on any item
4. Update the value
5. Click "Save"
6. Changes appear immediately on the frontend

### Developer Integrates Content
1. API fetches content from `/api/content`
2. Maps content keys to UI elements
3. Frontend displays dynamic content
4. No redeploy needed for content changes

## Technical Details

### Database Schema
```sql
CREATE TABLE content_management (
  id INT PRIMARY KEY AUTO_INCREMENT,
  key VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(255),
  content_type ENUM('text', 'textarea', 'image', 'json'),
  value LONGTEXT,
  section VARCHAR(50),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Model Location
- Backend: `backend/models/Content.js`
- Routes: `backend/routes/content.js`
- Frontend: `frontend/src/pages/ContentManagement.tsx`

## Best Practices

1. **Use consistent key naming**: Use snake_case (e.g., `hero_title`, `footer_email`)
2. **Document sections**: Keep descriptions clear so clients know what each field does
3. **Test before deploying**: Test content changes on staging before client access
4. **Backup content**: Regularly backup your database
5. **Add new sections**: When adding features, create new content sections in the CMS

## Troubleshooting

**Q: I don't see my content changes on the frontend**
A: Make sure the frontend component is actually fetching from `/api/content` and using the correct content key

**Q: Can I add more sections?**
A: Yes! Just create content items with new section names in the CMS admin panel. The sections will automatically appear as tabs

**Q: How do I reset to default content?**
A: Run `node seedContent.js` again to repopulate default values

**Q: Can mentees access the CMS?**
A: No, only admins (`role: 'admin'`) can access `/content` and modify content

## Support
For questions or issues with the CMS, contact your development team.

# CMS Quick Start Guide

## Setup Steps

### Step 1: Start Your Backend
```bash
cd backend
npm install  # if you haven't already
npm start
```

### Step 2: Seed Default Content
In a new terminal:
```bash
cd backend
node seedContent.js
```

You should see:
```
🌱 Starting content seed...
✓ Database connected
✓ Tables synced
✓ Existing content cleared
✓ Default content seeded successfully

📋 Seeded content:
  - hero_title (hero)
  - hero_subtitle (hero)
  - hero_cta_button (hero)
  ... (more items)

✅ Seeding complete!
```

### Step 3: Start Your Frontend
In another terminal:
```bash
cd frontend
npm run dev
```

### Step 4: Access the CMS

1. Open http://localhost:5173 (or your frontend URL)
2. Click **Login**
3. Log in with admin credentials:
   - Email: `admin@guidingstars.com`
   - Password: `password123`
4. Once logged in, click **Dashboard**
5. In the sidebar, click **Content**

## You're Ready!

Your admin can now:
- ✅ Update website content
- ✅ Manage text, images, and data
- ✅ Organize content by sections
- ✅ Make changes without touching code

## Testing the CMS

### Create a New Content Item
1. Go to Content page
2. Click "+ Add New Content"
3. Fill in the form:
   - Key: `test_message`
   - Title: `Test Message`
   - Type: `textarea`
   - Section: `hero` (or any section)
   - Content: `This is a test message!`
   - Description: `A test content item`
4. Click "Create"

### Edit Existing Content
1. Click "Edit" on any item
2. Modify the content
3. Click "Save"

### Delete Content
1. Click "Delete" on any item
2. Confirm deletion

## Architecture Overview

```
Frontend (React)
    ↓
/api/content (Backend API)
    ↓
Content Model (Database)
    ↓
MySQL Database
```

Content flows:
- Admin creates/edits content in React UI
- Sends to backend API (`/api/content`)
- Backend stores in database
- Frontend fetches content via API
- Display dynamically on pages

## File Structure

```
backend/
  ├── models/Content.js          # Content model definition
  ├── routes/content.js          # API endpoints
  ├── seedContent.js             # Populate default content
  └── server.js                  # Updated with /api/content route

frontend/
  ├── src/pages/ContentManagement.tsx  # CMS admin interface
  ├── src/App.tsx                       # Route added for /content
  └── src/components/Sidebar.tsx        # Sidebar link added
```

## Next Steps

1. **Integrate content into existing pages** - Update Home, About, Team pages to fetch from `/api/content`
2. **Customize sections** - Add more sections as needed (currently: hero, about, features, team, testimonials, faq, footer)
3. **Add image management** - Consider adding a file upload feature in addition to image URLs
4. **Create backup system** - Set up regular database backups

## Need Help?

See `CMS_README.md` for detailed documentation.

# Mentor Application System

## Overview

A complete mentor application workflow where potential mentors can apply, admins can review and approve applications, and approved mentors get access to a mentor portal (similar to the mentee portal).

## Public Mentor Application Page

**URL:** `http://localhost:5173/mentor-apply`

### Features:
- Public form with benefits section
- Collects: name, email, phone, professional info, expertise, background, bio, availability, preferences
- Form submissions sent to backend and stored in `mentor_applications` table
- Success/error feedback to user
- No authentication required

### Form Fields:
- **Name** (First, Last) - Required
- **Contact** (Email, Phone) - Email required
- **Professional Info** (Title, Company) - Title required
- **Expertise Areas** - Required (comma-separated)
- **Professional Background** - Required (work experience)
- **Personal Bio** - Required (why they want to mentor)
- **Availability** - Required (e.g., "5 hours/week")
- **Preferences** - Optional (mentee preferences)

## Admin Mentor Applications Dashboard

**URL:** `http://localhost:5000/mentor-applications` (admin only, protected route)

### Features:
- View all mentor applications
- Filter by status: Pending, Approved, Rejected
- Click to view full application details
- Approve applications (creates mentor account + User account)
- Reject with reason
- Delete applications
- Real-time status badges
- Submission timestamps

### Admin Workflow:

1. **Review Application**
   - Admin goes to "Mentor Applications" in sidebar
   - Sees list of all pending applications
   - Clicks on an application to view details

2. **Approve Application**
   - Admin clicks "✓ Approve" button
   - System automatically:
     - Creates a User account (role: 'mentor')
     - Creates a Mentor profile
     - Sets status to 'approved'
     - Generates temporary password
   - TODO: Sends email with login credentials

3. **Reject Application**
   - Admin enters rejection reason
   - Clicks "✗ Reject" button
   - System:
     - Sets status to 'rejected'
     - Saves rejection reason
     - TODO: Sends rejection email

4. **Delete Application**
   - Admin clicks "🗑️ Delete" button
   - Application is permanently removed

## Database Schema

### MentorApplication Table

```sql
CREATE TABLE mentor_applications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  professional_title VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  expertise_areas TEXT NOT NULL,
  professional_background TEXT NOT NULL,
  bio TEXT NOT NULL,
  availability VARCHAR(100) NOT NULL,
  preferences TEXT,
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  approval_token VARCHAR(255),
  approval_token_expires DATETIME,
  rejection_reason TEXT,
  submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### User Table (updated)
- When application approved, new User record created:
  - `email`: from application
  - `role`: 'mentor'
  - `password_hash`: temporary password (hashed)
  - `status`: 'active'

### Mentor Table (updated)
- When application approved, new Mentor record created:
  - `user_id`: foreign key to new User
  - `phone`: from application
  - `bio`: from application
  - `expertise_areas`: from application
  - `professional_background`: from application
  - `availability`: from application
  - `preferences`: from application
  - `status`: 'active'

## Backend API Endpoints

### Public Endpoints (No Auth Required)

**POST /api/mentor-applications**
- Submit a mentor application
- Body: All application fields
- Response: Success message + application ID

### Admin Endpoints (Auth Required)

**GET /api/mentor-applications**
- Get all applications
- Query params: `?status=pending` (optional)
- Response: Array of applications

**GET /api/mentor-applications/:id**
- Get single application
- Response: Application details

**PUT /api/mentor-applications/:id/approve**
- Approve application
- Creates User and Mentor accounts
- Response: Success + new user credentials

**PUT /api/mentor-applications/:id/reject**
- Reject application
- Body: `{ reason: "..." }`
- Response: Success message

**DELETE /api/mentor-applications/:id**
- Delete application
- Response: Success message

## Frontend Routes

### Public
- `GET /mentor-apply` - Mentor application form

### Admin (Protected)
- `GET /mentor-applications` - Admin dashboard

## Next Steps / Future Enhancements

### Email Notifications
- [ ] Send confirmation email when application submitted
- [ ] Send approval email with login credentials
- [ ] Send rejection email with reason

### Mentor Portal
- [ ] Create MentorPortal component (similar to MenteeDashboard)
- [ ] Mentor login via `/mentor/login`
- [ ] Mentor dashboard at `/mentor/dashboard`
- [ ] View mentees, matches, progress entries
- [ ] Update profile/availability
- [ ] Schedule meetings

### Matching System
- [ ] Algorithm to match mentors with mentees
- [ ] Consider expertise areas and preferences
- [ ] Manual matching by admin

### Additional Features
- [ ] Email verification for applicants
- [ ] Two-factor authentication for mentors
- [ ] Mentor availability calendar
- [ ] Meeting scheduling/calendar integration
- [ ] Mentor ratings and reviews
- [ ] Automated reminders for active matches

## Testing the System

1. **Submit Application:**
   - Navigate to `http://localhost:5173/mentor-apply`
   - Fill out the form
   - Submit
   - Check `mentor_applications` table

2. **Review as Admin:**
   - Log in to admin dashboard
   - Go to "Mentor Applications"
   - View the submitted application
   - Try approve/reject/delete

3. **Verify Mentor Account Creation:**
   - When approved, check `users` table for new mentor user
   - Check `mentors` table for mentor profile
   - Try logging in with new credentials

## File Structure

```
backend/
  models/
    MentorApplication.js    ← New
    index.js                ← Updated
  routes/
    mentorApplications.js   ← New
    server.js               ← Updated

frontend/
  src/
    pages/
      MentorApply.tsx       ← New (public form)
      MentorApplications.tsx ← New (admin dashboard)
    components/
      Sidebar.tsx           ← Updated (added link)
    App.tsx                 ← Updated (added routes)
```

## Configuration

To customize:

1. **Approval Token Expiry** (7 days):
   ```javascript
   // backend/routes/mentorApplications.js, line ~56
   const approval_token_expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
   ```

2. **Temporary Password Length** (12 characters):
   ```javascript
   // backend/routes/mentorApplications.js, line ~122
   const tempPassword = crypto.randomBytes(12).toString('hex');
   ```

3. **Session Timeout for Mentors** (same as admins):
   - Currently 15 minutes (configured in AuthContext.tsx)

## Security Notes

⚠️ **Important:**
- Temporary passwords should ONLY be sent via secure email, not shown in API response (for production)
- Consider rate limiting on application submission
- Validate all email domains
- Add CAPTCHA to prevent spam applications
- Consider manual review workflow for quality control

# Admin Panel Setup Guide

## What's Been Created

Your Algoryme admin panel is now ready! Here's what has been set up:

### 📁 File Structure
```
app/
  admin/
    layout.tsx          # Admin layout with sidebar navigation
    login/
      page.tsx          # Admin login page
    dashboard/
      page.tsx          # Dashboard with statistics
    projects/
      page.tsx          # Projects management page
    contacts/
      page.tsx          # Contact messages viewer

components/
  admin/
    ProjectForm.tsx     # Form to add/edit projects
    ProjectList.tsx     # Projects list table
    MessageList.tsx     # Contact messages display

lib/
  supabase.ts          # Supabase client initialization
  auth.ts              # Simple authentication logic

styles/
  admin.css            # Login page styles
  admin-layout.css     # Layout and sidebar styles
  admin-dashboard.css  # Dashboard styles
  admin-projects.css   # Projects management styles
  admin-contacts.css   # Contact messages styles
  admin-components.css # Form and component styles

.env.local.example     # Environment variables template
supabase_schema.sql    # Database schema
```

## 🚀 Quick Start

### Step 1: Set Up Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Get your Supabase credentials:
   - Go to [Supabase Console](https://app.supabase.com)
   - Select your project
   - Go to Settings → API
   - Copy `Project URL` and `Anon Key`

3. Update `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### Step 2: Create Database Tables

1. Go to Supabase SQL Editor
2. Copy the entire content from `supabase_schema.sql`
3. Paste into SQL Editor and click "Run"

### Step 3: Set Up Storage for Project Images

1. Go to Supabase → Storage
2. Click "Create new bucket"
3. Name it `project-images`
4. Set it to **Private**
5. Click "Create bucket"

### Step 4: Start Development Server

```bash
npm run dev
```

## 🔐 Admin Access

**Admin Emails:**
- ahnaf.asad1413@gmail.com
- talhajubaer3121@gmail.com

### Access Admin Panel

1. Go to `http://localhost:3000/admin/login`
2. Enter one of the admin emails above
3. You're in! No password needed (simple auth for development)

## 📊 Features

### Dashboard
- **Statistics Overview**: Total projects, active projects, total messages, unread messages
- **Quick Links**: Direct navigation to Projects and Messages

### Projects Management
- ✅ Add new projects
- ✅ Edit existing projects
- ✅ Delete projects
- ✅ Upload project images to Supabase Storage
- ✅ Manage technologies/tags
- ✅ Set project status (active/archived)

**Image Upload:**
- Images are automatically uploaded to Supabase Storage
- Public URLs are stored in the database
- Images are private by default

### Contact Messages
- ✅ View all submitted messages
- ✅ Mark messages as read/unread
- ✅ Delete messages
- ✅ Filter by status (all, read, unread)
- ✅ Export to CSV (download all messages as CSV file)

**Message Info:**
- Sender name, email, and message text
- Read/unread status
- Creation timestamp
- Automatic save from website contact form

## 🎨 Design Features

- **Clean, Simple UI**: No heavy animations, focused on functionality
- **Responsive**: Works great on mobile, tablet, and desktop
- **Light/Dark Compatible**: Follows your site's theme
- **User-Friendly**: Intuitive navigation and clear action buttons

## 🔄 How It Works

### Contact Form Integration
When visitors submit the contact form on your website:
1. Message is automatically saved to Supabase `contact_messages` table
2. Admin can view it in the admin panel
3. Mark as read when you respond
4. Delete old messages as needed

### Project Display
Projects added in the admin panel:
1. Are stored in Supabase `projects` table
2. Can be imported and displayed on your website
3. Only "active" projects should display on the website
4. Images are stored in Supabase Storage

## 🛠️ Customization

### Add More Admin Users

Edit `lib/auth.ts`:
```typescript
const ADMIN_EMAILS = [
  'ahnaf.asad1413@gmail.com',
  'talhajubaer3121@gmail.com',
  'new-admin@example.com', // Add more here
];
```

### Change Admin Routes

All admin routes start with `/admin/`:
- `/admin/login` - Login page
- `/admin/dashboard` - Dashboard
- `/admin/projects` - Projects
- `/admin/contacts` - Messages

To change the prefix, update:
- `app/admin/layout.tsx`
- `app/admin/login/page.tsx`
- etc.

## 📝 Next Steps

1. **Connect Projects to Website**: Update your Projects component to fetch from Supabase instead of hardcoded data
2. **Add Email Notifications**: Set up email alerts when new messages arrive
3. **Add User Roles**: Implement different permission levels
4. **Add Analytics**: Track project views and message engagement

## 🆘 Troubleshooting

### "Missing Supabase environment variables"
- Make sure `.env.local` is created and contains the correct values
- Restart your dev server after adding env variables

### "Storage bucket error when uploading"
- Make sure the `project-images` bucket exists and is set to Private
- Check bucket permissions in Supabase Storage settings

### "Messages not saving"
- Verify `contact_messages` table exists in Supabase
- Check browser console for errors
- Make sure `.env.local` has correct Supabase URL and key

### "Admin login not working"
- Check if your email is in `ADMIN_EMAILS` array in `lib/auth.ts`
- Clear localStorage and try again (Ctrl+Shift+Delete → Application → Clear storage)

## 📞 Support

For issues, check:
1. Supabase Console for database errors
2. Browser console (F12) for client-side errors
3. Network tab to see API responses

---

**Happy Admin-ing! 🎉**

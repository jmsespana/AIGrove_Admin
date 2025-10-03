# Quick Start Guide - AIGrove Admin

## 🚀 Current Setup Status

### ✅ Completed Features

1. **Authentication System**

   - Login page with beautiful UI
   - Protected routes (cannot access without login)
   - Auto-redirect to login when accessing protected pages
   - Auto-redirect to dashboard when accessing login while logged in
   - Session management with auto-logout

2. **Dashboard**

   - Real-time user count
   - Real-time species scan count
   - Real-time quiz attempt count
   - Recent activity feed with live updates
   - Beautiful gradient design

3. **User Management**

   - View all users with full details
   - Real-time updates when new users register
   - Search users by email, name, or phone
   - View detailed user profiles
   - Promote/demote user roles
   - Block/unblock users
   - See user activity statistics

4. **Route Protection**
   - All admin routes protected
   - Cannot bypass by pasting URLs
   - Automatic redirects
   - 404 page for invalid routes

---

## 🔧 Next Steps to Get It Running

### 1. Set Up Supabase Database

```bash
# Go to https://supabase.com/dashboard
# Create a new project or select existing one
# Go to SQL Editor
# Copy and paste the entire content of supabase_setup.sql
# Click "Run"
```

### 2. Configure Environment Variables

Edit `.env` file:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Where to find these:**

1. Go to Supabase Dashboard
2. Select your project
3. Click Settings (gear icon)
4. Go to "API" section
5. Copy "Project URL" and "anon public" key

### 3. Create Admin User

```bash
# In Supabase Dashboard:
# 1. Go to Authentication → Users
# 2. Click "Add user" → "Create new user"
# 3. Enter email and password
# 4. Click "Create user"
```

### 4. Start the Dev Server

```bash
# Make sure you've restarted the server after .env changes
npm run dev
```

### 5. Test the Login

```
1. Open http://localhost:5173
2. Should redirect to /login
3. Enter the admin credentials you created
4. Should redirect to dashboard
5. Try pasting http://localhost:5173/users in address bar
6. Should work now! ✅
```

---

## 🧪 Testing Router Protection

### Test Case 1: Logged Out + Protected Route

```
1. Make sure you're logged out
2. Go to: http://localhost:5173/users
3. ✅ Redirects to: /login?redirect=/users
4. Log in
5. ✅ Redirects back to: /users
```

### Test Case 2: Logged In + Login Page

```
1. Log in first
2. Go to: http://localhost:5173/login
3. ✅ Immediately redirects to: / (dashboard)
```

### Test Case 3: Invalid Route

```
1. Go to: http://localhost:5173/invalid-page
2. ✅ Shows 404 page
```

---

## 📊 How to Integrate with AIGrove Mobile App

### When User Signs Up in Mobile App:

```javascript
const { data, error } = await supabase.from("users").insert({
  email: userEmail,
  full_name: userFullName,
  phone: userPhone,
});

// Admin dashboard will automatically:
// - Increase user count
// - Add to activity feed
// - Show in user table
```

### When User Scans Mangrove:

```javascript
const { data, error } = await supabase.from("species_scans").insert({
  user_id: userId,
  species_name: "Rhizophora apiculata",
  scientific_name: "Rhizophora apiculata Blume",
  location: "Manila Bay",
  latitude: 14.5995,
  longitude: 120.9842,
  image_url: imageUrl,
  confidence_score: 95.5,
});

// Admin dashboard will automatically:
// - Increase scan count
// - Add to activity feed with species name
```

### When User Takes Quiz:

```javascript
const { data, error } = await supabase.from("quiz_attempts").insert({
  user_id: userId,
  quiz_id: quizId,
  quiz_name: "Mangrove Species Quiz",
  score: 8,
  total_questions: 10,
  time_taken: 120, // seconds
  answers: {
    q1: "a",
    q2: "c",
    // ... etc
  },
});

// Admin dashboard will automatically:
// - Increase quiz count
// - Add to activity feed with score
```

---

## 🎯 URLs and Navigation

| URL        | Page               | Access                          |
| ---------- | ------------------ | ------------------------------- |
| `/`        | Dashboard          | Protected (requires login)      |
| `/users`   | User Management    | Protected (requires login)      |
| `/species` | Species Management | Protected (requires login)      |
| `/login`   | Login Page         | Public (redirects if logged in) |
| `/*`       | 404 Page           | Public                          |

---

## 🔒 Security Features

✅ Route guards on all admin pages
✅ Automatic session validation
✅ Cannot access by pasting URLs when logged out
✅ Auto-logout on session expiry
✅ Auto-redirect to login when unauthorized
✅ Redirect preservation (remembers intended page)

---

## 📝 Files Created/Modified

### Created:

- `src/pages/NotFound.vue` - 404 page
- `supabase_setup.sql` - Database schema
- `SETUP_GUIDE.md` - Complete setup guide
- `ROUTER_PROTECTION.md` - Router protection details
- `QUICK_START.md` - This file

### Modified:

- `src/router/index.js` - Added route guards
- `src/pages/Login.vue` - Added redirect handling
- `src/App.vue` - Added auth state listener
- `src/pages/Dashboard.vue` - Real-time features
- `src/components/UserTable.vue` - Full user management
- `src/pages/Users.vue` - Improved styling
- `postcss.config.cjs` - Updated for Tailwind v4
- `src/assets/index.css` - Updated to Tailwind v4 syntax

---

## ❓ Troubleshooting

### "supabaseUrl is required" Error

**Solution:** Make sure `.env` file has correct values and restart dev server

### Can't Access Any Page

**Solution:**

1. Check if Supabase credentials are correct
2. Create an admin user in Supabase Auth
3. Clear browser cache and try again

### Routes Not Redirecting

**Solution:** Make sure dev server was restarted after router changes

### Real-time Not Working

**Solution:**

1. Run the SQL setup script in Supabase
2. Make sure Realtime is enabled for tables
3. Check browser console for connection errors

---

## 🎉 You're All Set!

Your admin dashboard now has:

- ✅ Full authentication system
- ✅ Protected routes
- ✅ Real-time updates
- ✅ User management
- ✅ Activity tracking
- ✅ Beautiful UI

Just complete the Supabase setup and you're ready to go! 🚀

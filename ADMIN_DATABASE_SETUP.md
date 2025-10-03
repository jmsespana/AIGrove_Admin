# Admin Database Integration Setup Guide

## Overview

This guide helps you connect your AIGrove Admin Dashboard to your existing mobile application database.

## 📋 Tables Being Added

### 1. **admin_users**

Stores admin user accounts separate from mobile app users

- `id` - Unique admin ID
- `email` - Admin email (linked to Supabase Auth)
- `full_name` - Admin's full name
- `role` - Admin permission level (super_admin, admin, moderator)
- `auth_user_id` - Links to Supabase Auth user
- `is_active` - Account status
- `last_login_at` - Track last login time

### 2. **admin_activity_logs**

Audit trail for all admin actions

- Tracks create/update/delete operations
- Records login/logout events
- Logs user blocking/promotion actions
- Stores IP address and user agent for security

### 3. **dashboard_metrics**

Pre-calculated metrics for fast dashboard loading

- Daily snapshots of user counts, scans, quiz attempts
- Improves performance by avoiding real-time calculations
- Auto-updates via scheduled function

### 4. **species_audit**

Track all changes to species records

- Before/after data for updates
- Admin who made the change
- Timestamp of modification

### 5. **Modifications to existing `profiles` table**

Adds admin control fields:

- `is_blocked` - Whether user is blocked
- `blocked_at` - When user was blocked
- `blocked_by` - Which admin blocked them
- `block_reason` - Reason for blocking

## 🚀 Installation Steps

### Step 1: Run the SQL Script

1. Open your Supabase Dashboard
2. Go to **SQL Editor** (left sidebar)
3. Click **New Query**
4. Copy the entire contents of `admin_integration.sql`
5. Paste and click **Run** (or press Ctrl+Enter)

### Step 2: Create Your First Admin User

#### 2a. Create Auth User

1. In Supabase Dashboard, go to **Authentication** → **Users**
2. Click **Add User** → **Create new user**
3. Enter email and password (e.g., `admin@aigrove.com`)
4. Copy the **User UID** (you'll need it next)

#### 2b. Create Admin Record

Go back to **SQL Editor** and run:

```sql
-- Replace with your actual values
INSERT INTO admin_users (email, full_name, auth_user_id, role)
VALUES (
  'admin@aigrove.com',        -- Your admin email
  'Admin Name',                -- Your name
  'your-auth-user-uuid-here',  -- UUID from step 2a
  'super_admin'                -- super_admin, admin, or moderator
);
```

### Step 3: Initialize Dashboard Metrics

Run this to populate initial metrics:

```sql
SELECT update_dashboard_metrics();
```

### Step 4: Verify Installation

Check that all tables were created:

```sql
-- Should return 4 new tables
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('admin_users', 'admin_activity_logs', 'dashboard_metrics', 'species_audit');
```

### Step 5: Test Admin Login

1. Start your admin dashboard: `npm run dev`
2. Navigate to `http://localhost:5173`
3. Login with the admin credentials you created
4. You should see the dashboard with real-time data!

## 🔗 How It Connects

### Admin Dashboard → Mobile App Database

```
┌─────────────────────┐
│  Admin Dashboard    │
│  (Vue.js Frontend)  │
└──────────┬──────────┘
           │
           │ Supabase Client
           ▼
┌─────────────────────┐
│   Supabase Auth     │ ← Admin login
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   admin_users       │ ← Admin accounts
└──────────┬──────────┘
           │
           │ Queries & Real-time subscriptions
           ▼
┌──────────────────────────────────────┐
│  Mobile App Tables                   │
│  • profiles (users)                  │
│  • scans (species scans)             │
│  • user_quiz_attempts (quiz data)    │
│  • user_activity (activity feed)     │
│  • species (species database)        │
│  • user_stats (user statistics)      │
└──────────────────────────────────────┘
```

## 📊 Views Created

The script creates 3 helpful views for efficient data access:

### 1. `admin_user_stats`

Complete user information with aggregated stats:

- User profile details
- Total scans count
- Total quiz attempts
- User stats (points, trees planted, etc.)

**Usage in Dashboard:**

```javascript
const { data: users } = await supabase
  .from("admin_user_stats")
  .select("*")
  .order("created_at", { ascending: false });
```

### 2. `admin_recent_activity`

Latest 50 activity entries with user details

**Usage in Dashboard:**

```javascript
const { data: activities } = await supabase
  .from("admin_recent_activity")
  .select("*")
  .limit(10);
```

### 3. `admin_species_stats`

Species information with scan counts

**Usage in Dashboard:**

```javascript
const { data: speciesStats } = await supabase
  .from("admin_species_stats")
  .select("*")
  .order("times_scanned", { ascending: false });
```

## 🔐 Security (Row Level Security)

All tables have RLS enabled:

- ✅ Only authenticated admins can view data
- ✅ Admins can only update their own profile
- ✅ Activity logs are read-only (system writes only)
- ✅ Mobile app users cannot access admin tables

## 📡 Real-time Features

All tables are added to `supabase_realtime` publication:

- Dashboard updates automatically when data changes
- User table refreshes when new users sign up
- Activity feed updates in real-time
- Species changes reflect immediately

## 🛠️ Maintenance Functions

### Update Dashboard Metrics

Run daily (or via cron job):

```sql
SELECT update_dashboard_metrics();
```

### View Admin Activity Logs

```sql
SELECT * FROM admin_activity_logs
ORDER BY created_at DESC
LIMIT 20;
```

### Check Blocked Users

```sql
SELECT email, first_name, last_name, blocked_at, block_reason
FROM profiles
WHERE is_blocked = true;
```

## 🎯 Admin Roles

### super_admin

- Full access to all features
- Can promote/demote other admins
- Can delete records

### admin

- Can manage users and content
- Cannot modify other admins
- Can view activity logs

### moderator

- Can block/unblock users
- Can edit species content
- Limited access to sensitive data

## 🐛 Troubleshooting

### Issue: "relation 'admin_users' does not exist"

**Solution:** Run the `admin_integration.sql` script again

### Issue: "permission denied for table profiles"

**Solution:** Check RLS policies are enabled:

```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
```

### Issue: Dashboard shows zero counts

**Solution:** Run metrics update:

```sql
SELECT update_dashboard_metrics();
```

### Issue: Real-time not working

**Solution:** Check publication includes tables:

```sql
SELECT * FROM pg_publication_tables
WHERE pubname = 'supabase_realtime';
```

## 📝 Next Steps

1. ✅ Run `admin_integration.sql`
2. ✅ Create admin user in Supabase Auth
3. ✅ Insert admin record into `admin_users`
4. ✅ Initialize dashboard metrics
5. ✅ Test login and real-time features
6. 🎯 Set up scheduled metrics updates (optional)
7. 🎯 Configure admin roles for team members
8. 🎯 Review and customize RLS policies if needed

## 💡 Pro Tips

1. **Schedule Daily Metrics**: Set up a Supabase Edge Function to run `update_dashboard_metrics()` daily
2. **Monitor Admin Actions**: Regularly review `admin_activity_logs` for security audits
3. **Backup Admin Data**: Export `admin_users` table periodically
4. **Test RLS**: Always test with different role levels to ensure proper access control

---

**Need Help?** Check the Supabase documentation or review the comments in `admin_integration.sql`

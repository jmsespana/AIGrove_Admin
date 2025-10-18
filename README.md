# 🌿 AIGrove Admin Dashboard

A modern, real-time administrative dashboard for managing the AIGrove mobile application. Built with Vue.js 3, Vite, and Supabase for seamless mangrove conservation management.

![Vue.js](https://img.shields.io/badge/Vue.js-3.5.22-4FC08D?style=flat&logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=flat&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.14-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-2.58.0-3ECF8E?style=flat&logo=supabase&logoColor=white)

## 📋 Overview

AIGrove Admin is a comprehensive administrative interface for monitoring and managing the AIGrove mobile application ecosystem. It provides real-time insights into user activities, species scans, quiz attempts, and complete user management capabilities.

## ✨ Features

### 🔐 Authentication & Security
- Secure admin authentication with Supabase Auth
- Protected routes with automatic redirects
- Session management with auto-logout
- Role-based access control (Super Admin, Admin, Moderator)
- Row Level Security (RLS) on all database tables

### 📊 Real-time Dashboard
- Live user count tracking
- Real-time species scan statistics
- Quiz attempt monitoring
- Recent activity feed with instant updates
- Beautiful gradient UI design

### 👥 User Management
- View all registered users with full details
- Real-time user list updates
- Advanced search by email, name, or phone
- Detailed user profile views
- Promote/demote user roles
- Block/unblock users with reason tracking
- User activity statistics and analytics

### 🌱 Species Management
- Species database administration
- Scan count tracking per species
- Audit trail for all species modifications

### 📈 Activity Tracking
- Comprehensive admin activity logs
- Audit trail for all CRUD operations
- Login/logout event tracking
- IP address and user agent logging for security

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jmsespana/AIGrove_Admin.git
   cd AIGrove_Admin
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create or edit the `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

   To find your Supabase credentials:
   - Go to [Supabase Dashboard](https://supabase.com/dashboard)
   - Select your project
   - Navigate to Settings → API
   - Copy "Project URL" and "anon public" key

4. **Set up the database**
   
   See the [Database Setup Guide](ADMIN_DATABASE_SETUP.md) for detailed instructions.

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Access the dashboard**
   
   Open [http://localhost:5173](http://localhost:5173) in your browser

## 📚 Documentation

- **[Quick Start Guide](QUICK_START.md)** - Fast setup and testing instructions
- **[Database Setup Guide](ADMIN_DATABASE_SETUP.md)** - Complete database integration guide

## 🛠️ Tech Stack

### Frontend
- **Vue.js 3.5** - Progressive JavaScript framework
- **Vue Router 4.5** - Official routing solution
- **Pinia 3.0** - State management
- **Vite 7.1** - Next-generation build tool

### Styling
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **PostCSS** - CSS transformations
- **Autoprefixer** - Vendor prefix automation

### Backend & Database
- **Supabase 2.58** - Backend-as-a-Service
  - PostgreSQL database
  - Real-time subscriptions
  - Authentication
  - Row Level Security

## 📁 Project Structure

```
AIGrove_Admin/
├── src/
│   ├── assets/          # Static assets and styles
│   ├── components/      # Reusable Vue components
│   ├── pages/           # Page components (Dashboard, Users, etc.)
│   ├── router/          # Vue Router configuration
│   ├── store/           # Pinia stores
│   ├── supabase/        # Supabase client configuration
│   ├── App.vue          # Root component
│   ├── main.js          # Application entry point
│   └── style.css        # Global styles
├── public/              # Public static files
├── .env                 # Environment variables
├── index.html           # HTML entry point
├── package.json         # Project dependencies
├── vite.config.js       # Vite configuration
└── tailwind.config.cjs  # Tailwind CSS configuration
```

## 🔒 Security Features

- ✅ Route guards on all admin pages
- ✅ Automatic session validation
- ✅ URL-based access prevention when logged out
- ✅ Auto-logout on session expiry
- ✅ Redirect preservation for seamless navigation
- ✅ Admin activity audit logs
- ✅ IP address and user agent tracking

## 📊 Available Routes

| URL        | Page               | Access Level               |
|------------|--------------------|-----------------------------|
| `/`        | Dashboard          | Protected (requires login)  |
| `/users`   | User Management    | Protected (requires login)  |
| `/species` | Species Management | Protected (requires login)  |
| `/login`   | Login Page         | Public (redirects if logged in) |
| `/*`       | 404 Page           | Public                      |

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🐛 Troubleshooting

### Common Issues

**"supabaseUrl is required" Error**
- Ensure `.env` file has correct values
- Restart the development server

**Can't Access Any Page**
- Verify Supabase credentials are correct
- Create an admin user in Supabase Auth
- Clear browser cache

**Routes Not Redirecting**
- Restart dev server after router changes

**Real-time Updates Not Working**
- Run the SQL setup script in Supabase
- Verify Realtime is enabled for tables
- Check browser console for connection errors

See [Quick Start Guide](QUICK_START.md) for more troubleshooting tips.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and proprietary.

## 👨‍💻 Author

**jmsespana**
- GitHub: [@jmsespana](https://github.com/jmsespana)

## 🙏 Acknowledgments

- Built with [Vue.js](https://vuejs.org/)
- Powered by [Supabase](https://supabase.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

---

**For detailed setup instructions, please refer to the [Quick Start Guide](QUICK_START.md) and [Database Setup Guide](ADMIN_DATABASE_SETUP.md).**

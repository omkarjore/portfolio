# 🔐 Admin Portal Setup & User Guide

Complete guide for setting up and using the Portfolio Admin Portal.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Backend Setup](#backend-setup)
4. [Frontend Setup](#frontend-setup)
5. [First-Time Setup](#first-time-setup)
6. [Using the Admin Portal](#using-the-admin-portal)
7. [API Documentation](#api-documentation)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

The Admin Portal is a full-stack content management system for your portfolio, allowing you to:

- ✅ **Manage Projects**: Add, edit, delete project cards with full details
- ✅ **Manage Skills**: Organize technical skills by category
- ✅ **Update Profile**: Edit about section, experience, contact info
- ✅ **Manage Education**: Add degrees, certifications, awards
- ✅ **Secure Authentication**: JWT-based login system
- ✅ **File Uploads**: Support for images, PDFs, and documents

---

## 📦 Prerequisites

Before you begin, ensure you have installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v6 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/)

---

## 🖥️ Backend Setup

### Step 1: Navigate to Server Directory

```bash
cd server
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment Variables

The `.env` file is already created. Review and update if needed:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/portfolio-admin

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d

# Admin Default Credentials
ADMIN_EMAIL=omkarjore731@gmail.com
ADMIN_PASSWORD=admin123

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

⚠️ **IMPORTANT**: Change `JWT_SECRET` and `ADMIN_PASSWORD` before deploying to production!

### Step 4: Start MongoDB

**Windows:**
```bash
mongod
```

**Mac/Linux:**
```bash
sudo systemctl start mongod
```

**Or use MongoDB Atlas** (Cloud): [mongodb.com/atlas](https://www.mongodb.com/atlas)

### Step 5: Seed the Database (Create Admin User)

```bash
node seed.js
```

You should see:
```
✅ MongoDB connected
✅ Admin user created successfully
📧 Email: omkarjore731@gmail.com
🔑 Password: admin123
```

### Step 6: Start the Backend Server

```bash
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on http://localhost:5000
📡 API available at http://localhost:5000/api
```

---

## 🌐 Frontend Setup

### Step 1: Navigate to Project Root

```bash
cd ..
```

### Step 2: Install Dependencies (if not already done)

```bash
npm install
```

### Step 3: Configure Environment Variables

The `.env` file is already created:

```env
# Backend API URL
VITE_API_URL=http://localhost:5000/api
```

### Step 4: Start the Frontend

```bash
npm run dev
```

You should see:
```
VITE v7.1.12  ready in 325 ms
➜  Local:   http://localhost:5173/
```

---

## 🚀 First-Time Setup

### 1. Access the Portfolio

Open your browser and go to: **http://localhost:5173**

### 2. Navigate to Admin Portal

1. Click **"Main Menu"** on the welcome screen
2. Open the hamburger menu (☰) in the top-right
3. Scroll down and click **"🔒 Admin Portal"**

### 3. Login

Use the default credentials:
- **Email**: `omkarjore731@gmail.com`
- **Password**: `admin123`

⚠️ **Security Tip**: Change the password immediately after first login!

---

## 📝 Using the Admin Portal

### Dashboard Overview

After logging in, you'll see the admin dashboard with 4 main sections:

#### 1. 📦 **Projects Manager**

Manage your portfolio project cards:

**Add New Project:**
1. Click "➕ Add New Project"
2. Fill in the required fields:
   - **Project ID**: Unique identifier (e.g., `thermax-smartpid`)
   - **Title**: Project name
   - **Short Description**: Brief summary
   - **Full Description**: Detailed description
   - **Tech Stack**: Click "Add" to add technologies
   - **GitHub URL**: Repository link (optional)
   - **Metrics**: Impact/results (optional)
   - **Hero Project**: Check to make it featured
   - **Order**: Display order (0 = first)

**Edit Project:**
- Click "Edit" on any project card
- Modify fields and click "Save Project"

**Delete Project:**
- Click "Delete" on any project card
- Confirm deletion

#### 2. 🛠️ **Skills Manager**

Manage technical skills organized by category:

**Add New Skill:**
1. Click "➕ Add New Skill"
2. Fill in:
   - **Skill Name**: e.g., "React.js"
   - **Category**: Languages, Frameworks, Tools, Databases, Other
   - **Proficiency Level**: Beginner, Intermediate, Advanced, Expert
   - **Order**: Display order

**Skills are grouped by:**
- Languages (Python, JavaScript, etc.)
- Frameworks & Libraries (React, Express, etc.)
- Tools & Technologies (Git, Docker, etc.)
- Databases (MongoDB, PostgreSQL, etc.)
- Other

#### 3. 👤 **About & Experience Manager**

Update your profile information:

- **Basic Info**: Name, title, years of experience, location
- **Bio**: Professional summary
- **Contact**: Email, phone
- **Social Links**: LinkedIn, GitHub, Twitter

Click "Save Profile" to update.

#### 4. 🎓 **Education Manager**

Manage education, degrees, and certifications:

**Add Education:**
1. Click "➕ Add Education"
2. Fill in:
   - **Degree/Course**: e.g., "B.E Computer Engineering"
   - **Institution**: University/college name
   - **Field of Study**: Optional
   - **Grade/CGPA**: Optional
   - **Start Year**: Required
   - **End Year**: Optional (or check "Currently pursuing")
   - **Description**: Optional details

**Features:**
- Add certifications (coming soon)
- Add awards (coming soon)
- Reorder entries

---

## 📡 API Documentation

### Authentication Endpoints

#### POST `/api/auth/login`
Login with email and password.

**Request:**
```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "...",
      "name": "Omkar Jore",
      "email": "admin@example.com",
      "role": "admin"
    },
    "token": "eyJhbGc..."
  }
}
```

#### GET `/api/auth/me`
Get current user info (requires authentication).

**Headers:**
```
Authorization: Bearer {token}
```

### Projects Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/projects` | Get all projects | No |
| GET | `/api/projects/:id` | Get single project | No |
| POST | `/api/projects` | Create project | Yes (Admin) |
| PUT | `/api/projects/:id` | Update project | Yes (Admin) |
| DELETE | `/api/projects/:id` | Delete project | Yes (Admin) |

### Skills Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/skills` | Get all skills | No |
| POST | `/api/skills` | Create skill | Yes (Admin) |
| PUT | `/api/skills/:id` | Update skill | Yes (Admin) |
| DELETE | `/api/skills/:id` | Delete skill | Yes (Admin) |

### About Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/about` | Get profile info | No |
| PUT | `/api/about` | Update profile | Yes (Admin) |

### Education Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/education` | Get all education | No |
| POST | `/api/education` | Create education | Yes (Admin) |
| PUT | `/api/education/:id` | Update education | Yes (Admin) |
| DELETE | `/api/education/:id` | Delete education | Yes (Admin) |

### File Upload Endpoint

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/upload` | Upload file | Yes (Admin) |

---

## 🐛 Troubleshooting

### Backend Issues

**Problem**: MongoDB connection failed
```
Solution:
1. Ensure MongoDB is running: mongod
2. Check MONGODB_URI in server/.env
3. Try: mongodb://127.0.0.1:27017/portfolio-admin
```

**Problem**: Port 5000 already in use
```
Solution:
1. Change PORT in server/.env to 5001
2. Update VITE_API_URL in .env to http://localhost:5001/api
3. Restart both servers
```

**Problem**: Admin user doesn't exist
```
Solution:
cd server && node seed.js
```

### Frontend Issues

**Problem**: API request fails with CORS error
```
Solution:
1. Check CORS_ORIGIN in server/.env matches frontend URL
2. Restart backend server
```

**Problem**: Login fails with "Invalid credentials"
```
Solution:
1. Check email/password match server/.env
2. Re-run: cd server && node seed.js
3. Try default: omkarjore731@gmail.com / admin123
```

**Problem**: .env changes not reflected
```
Solution:
1. Restart dev server (Ctrl+C, then npm run dev)
2. Clear browser cache
```

### Common Errors

**TypeError: Cannot read property 'map'**
- Backend is not running
- API URL is incorrect in .env
- Check browser console for network errors

**401 Unauthorized**
- Token expired (login again)
- No token provided
- Invalid token

**403 Forbidden**
- User role doesn't have permission
- Ensure user is admin role

---

## 🔒 Security Best Practices

### Production Deployment

1. **Change JWT Secret**:
   ```env
   JWT_SECRET=use-a-long-random-secure-string-here
   ```

2. **Change Admin Password**:
   - Login to admin portal
   - (Password change feature coming soon)

3. **Use HTTPS**:
   - Deploy with SSL certificate
   - Update VITE_API_URL to https://

4. **Use Environment Variables**:
   - Never commit .env files
   - Use deployment platform's env variables

5. **Use MongoDB Atlas**:
   - Secure cloud database
   - Automatic backups
   - Better security

---

## 📞 Support

If you encounter any issues:

1. Check this guide first
2. Check GitHub Issues: [github.com/omkarjore/portfolio/issues](https://github.com/omkarjore/portfolio/issues)
3. Contact: omkarjore731@gmail.com

---

## 🎉 You're All Set!

Your admin portal is now ready to use. Start managing your portfolio content and keep it updated easily!

**Happy Managing! 🚀**

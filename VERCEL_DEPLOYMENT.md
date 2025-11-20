# Vercel Deployment Guide

This guide will help you deploy your portfolio with admin portal to Vercel with MongoDB Atlas.

## Prerequisites

✅ MongoDB Atlas cluster created (portfolio-cluster)
✅ Admin user created in database
✅ Vercel account connected to your GitHub repository

## Step 1: Configure Environment Variables in Vercel

You need to add these environment variables in your Vercel project settings:

### Option A: Via Vercel Dashboard (Recommended)

1. Go to your project on Vercel dashboard
2. Click **Settings** → **Environment Variables**
3. Add the following variables:

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `MONGODB_URI` | `mongodb+srv://omkarjore731_db_user:4uV1Jzqg6V7ErM1Y@portfolio-cluster.nnxrmrb.mongodb.net/?appName=portfolio-cluster` | Production, Preview, Development |
| `JWT_SECRET` | `your-secure-random-string-here` | Production, Preview, Development |
| `JWT_EXPIRE` | `7d` | Production, Preview, Development |

**Important:** For `JWT_SECRET`, generate a secure random string:
```bash
# Generate a secure JWT secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Option B: Via Vercel CLI

If you have Vercel CLI installed:

```bash
# Install Vercel CLI if you haven't
npm install -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link

# Add environment variables
vercel env add MONGODB_URI
# Paste: mongodb+srv://omkarjore731_db_user:4uV1Jzqg6V7ErM1Y@portfolio-cluster.nnxrmrb.mongodb.net/?appName=portfolio-cluster
# Select: Production, Preview, Development

vercel env add JWT_SECRET
# Paste your generated JWT secret
# Select: Production, Preview, Development

vercel env add JWT_EXPIRE
# Paste: 7d
# Select: Production, Preview, Development
```

## Step 2: Deploy to Vercel

### Method 1: Automatic Deployment (GitHub)

If your repository is connected to Vercel:

1. Commit all changes:
```bash
git add .
git commit -m "Add Vercel serverless API with MongoDB Atlas"
git push origin master
```

2. Vercel will automatically detect the push and deploy
3. Check deployment status in Vercel dashboard

### Method 2: Manual Deployment (Vercel CLI)

```bash
# Deploy to production
vercel --prod
```

## Step 3: Verify Deployment

After deployment:

1. **Check API Health**
   - Visit: `https://your-domain.vercel.app/api/projects`
   - Should return: `{"success":true,"count":0,"data":[]}`

2. **Test Admin Login**
   - Visit: `https://your-domain.vercel.app`
   - Click "Admin Portal" in the menu
   - Login with:
     - Email: `omkarjore731@gmail.com`
     - Password: `admin123`

3. **Add Your First Project**
   - After login, go to "Projects" tab
   - Click "Add New Project"
   - Fill in the details and save

## API Endpoints

Your API will be available at these endpoints:

### Authentication
- `POST /api/auth/register` - Register new admin (for initial setup)
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user (protected)

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project (admin only)
- `GET /api/projects/[id]` - Get single project
- `PUT /api/projects/[id]` - Update project (admin only)
- `DELETE /api/projects/[id]` - Delete project (admin only)

### Skills
- `GET /api/skills` - Get all skills
- `POST /api/skills` - Create skill (admin only)
- `GET /api/skills/[id]` - Get single skill
- `PUT /api/skills/[id]` - Update skill (admin only)
- `DELETE /api/skills/[id]` - Delete skill (admin only)

### About
- `GET /api/about` - Get about info
- `PUT /api/about` - Update about info (admin only)

### Education
- `GET /api/education` - Get all education entries
- `POST /api/education` - Create education (admin only)
- `GET /api/education/[id]` - Get single education
- `PUT /api/education/[id]` - Update education (admin only)
- `DELETE /api/education/[id]` - Delete education (admin only)

## Troubleshooting

### Build Failed
- Check build logs in Vercel dashboard
- Ensure all TypeScript errors are fixed
- Run `npm run build` locally first

### API Returns 500 Error
- Check Function Logs in Vercel dashboard
- Verify MongoDB connection string is correct
- Ensure JWT_SECRET is set

### Cannot Login
- Check that admin user was created (run seed script)
- Verify credentials: `omkarjore731@gmail.com` / `admin123`
- Check browser console for errors

### CORS Issues
- All API endpoints have CORS headers configured
- If issues persist, check Vercel function logs

## Security Notes

⚠️ **Important Security Steps:**

1. **Change Default Password**
   - Login to admin portal
   - Change password from `admin123` to something secure

2. **Disable Register Endpoint** (Optional)
   - After creating all admin users, you can disable the register endpoint
   - Edit `api/auth/register.js` and add authentication check

3. **MongoDB Atlas Security**
   - Your cluster is configured to accept connections from anywhere (0.0.0.0/0)
   - This is fine for serverless functions
   - Password is already complex and secure

4. **JWT Secret**
   - Use a strong, random JWT secret (64+ characters)
   - Never commit JWT secret to git
   - Rotate JWT secret periodically

## Admin Login Credentials

**Default credentials (change after first login):**
- Email: `omkarjore731@gmail.com`
- Password: `admin123`

## Next Steps

After successful deployment:

1. Login to admin portal
2. Change default password
3. Update "About" section with your information
4. Add your skills
5. Add your education and certifications
6. Add your projects from the 3D experience

## Support

If you encounter any issues:
1. Check Vercel function logs
2. Check MongoDB Atlas metrics
3. Review browser console errors
4. Check network tab for failed requests

---

✅ **Deployment Complete!** Your portfolio with admin portal is now live on Vercel with MongoDB Atlas!

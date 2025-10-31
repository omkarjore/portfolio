# How to Customize Your Portfolio

This guide explains how to customize your portfolio content, add your photo, and understand the technologies used.

---

## 🛠️ Technologies Used

### Frontend Framework
- **React 18.2.0** - JavaScript library for building user interfaces
- **TypeScript 5.0+** - Typed superset of JavaScript for better code quality
- **Vite 7.1.12** - Fast build tool and development server

### 3D Graphics
- **Three.js** - 3D graphics library
- **React Three Fiber (R3F)** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for React Three Fiber

### Styling & Animation
- **Tailwind CSS v4** - Utility-first CSS framework
- **Framer Motion** - Animation library for React
- **Lucide React** - Icon library

### Deployment
- **Vercel** - Cloud platform for hosting (FREE tier)
- **GitHub** - Version control and automatic deployments

---

## 📷 How to Add Your Photo

Your photo is displayed in the **About** section. Here's how to add it:

### Step 1: Prepare Your Photo
- Use a professional headshot photo
- Recommended size: **400x400 pixels** (square)
- Format: **JPG** or **PNG**
- Keep file size under 500KB for fast loading

### Step 2: Add Photo to Project
```bash
# Place your photo in the public folder
# Name it: profile-photo.jpg (or .png)
# Location: public/profile-photo.jpg
```

### Step 3: Update the About Component
Open: **`src/components/ui/About.tsx`**

Find this section (around line 24):
```typescript
{/* Headshot Photo Placeholder */}
<div className="w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center mb-6 md:mb-0 md:mr-8 flex-shrink-0">
  {/* Placeholder icon */}
  <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
</div>
```

**Replace with:**
```typescript
{/* Your Photo */}
<img
  src="/profile-photo.jpg"
  alt="Omkar Jore"
  className="w-48 h-48 rounded-full object-cover mb-6 md:mb-0 md:mr-8 flex-shrink-0 shadow-lg"
/>
```

### Step 4: Deploy Changes
```bash
git add public/profile-photo.jpg
git add src/components/ui/About.tsx
git commit -m "Add profile photo"
git push
```
Vercel will auto-deploy in ~2 minutes!

---

## ✏️ How to Change Content

### 1. Change Skills

**File:** `src/components/ui/Skills.tsx`

**Find this section (line 6):**
```typescript
const skillsData = {
  primary: {
    title: 'Primary Expertise',
    skills: ['C# .NET 8', '.NET Framework', 'Autodesk APIs (Navisworks, AutoCAD)', 'Object-Oriented Programming'],
  },
  languages: {
    title: 'Languages',
    skills: ['C#', 'Java', 'HTML', 'CSS'],
  },
  tools: {
    title: 'Tools & Platforms',
    skills: ['Visual Studio 2022', 'Cursor IDE', 'ETL AB-INITIO', 'Git/GitHub'],
  },
  specializations: {
    title: 'Specializations',
    skills: ['CAD Plugin Development', 'API Integration', 'Automation Solutions'],
  },
};
```

**To add/remove skills:** Just edit the arrays!

**Example - Add Python:**
```typescript
languages: {
  title: 'Languages',
  skills: ['C#', 'Java', 'Python', 'HTML', 'CSS'], // Added Python
},
```

### 2. Change About/Bio

**File:** `src/components/ui/About.tsx`

**Find the bio paragraphs (around line 35):**
```typescript
<p className="text-lg text-gray-700 mb-4">
  I'm a passionate software developer specializing in...
</p>
```

**Edit the text directly!**

### 3. Change Education

**File:** `src/components/ui/Education.tsx`

**Find education entries (around line 24):**
```typescript
<h3 className="text-2xl font-bold text-gray-900">
  Bachelor of Engineering in Computer Engineering
</h3>
```

**Edit degree names, universities, grades, etc.**

### 4. Change Awards

**File:** `src/components/ui/Awards.tsx`

**Find award entries (around line 22):**
```typescript
<div>
  <h3 className="text-xl font-bold text-gray-900 mb-2">NSS Team Leader</h3>
  <p className="text-gray-600">...</p>
</div>
```

**Add more awards or edit existing ones.**

### 5. Change Contact Information

**File:** `src/components/ui/Contact.tsx`

**Find contact links (around line 37):**
```typescript
<a href="mailto:omkarjore731@gmail.com" className="...">
  omkarjore731@gmail.com
</a>

<a href="https://www.linkedin.com/in/omkar-jore" target="_blank" rel="noopener noreferrer">
  linkedin.com/in/omkar-jore
</a>

<a href="https://github.com/omkarjore" target="_blank" rel="noopener noreferrer">
  github.com/omkarjore
</a>
```

**Update with your URLs and email.**

### 6. Change Projects (3D Cards)

**File:** `src/data/projects.ts`

**Find project data (around line 5):**
```typescript
export const projects: Project[] = [
  {
    id: 'thermax',
    title: 'Thermax',
    company: 'Thermax Ltd.',
    shortDescription: 'Smart PID Automation System',
    // ... more fields
  },
  // Add more projects here
];
```

**To add a new project:**
```typescript
{
  id: 'my-new-project',
  title: 'My Project Name',
  company: 'Company Name',
  shortDescription: 'Brief description',
  fullDescription: 'Detailed description of what you built...',
  technologies: ['React', 'Node.js', 'MongoDB'],
  featured: false, // Set true for visual prominence
  githubUrl: 'https://github.com/yourusername/project',
  demoUrl: 'https://your-project-demo.com', // Optional
},
```

---

## 🔄 How to Deploy Changes

After making any changes:

```bash
# 1. Save your files in VS Code

# 2. Test locally (optional)
npm run dev
# Open http://localhost:5173 to preview

# 3. Commit changes
git add .
git commit -m "Update skills and bio"

# 4. Push to GitHub
git push

# 5. Wait ~2 minutes
# Vercel automatically deploys your changes!
# Check: https://portfolio-gray-beta-31.vercel.app
```

---

## 🔒 Is Vercel Safe? (Security Information)

### YES, Vercel is 100% SAFE! ✅

**Vercel is a trusted platform used by:**
- **Netflix** - Streaming service
- **Nike** - Global brand
- **Hulu** - Entertainment platform
- **Uber** - Transportation company
- **TikTok** - Social media platform
- Thousands of developers worldwide

### Why Vercel is Secure:

1. **🏢 Legitimate Company**
   - Founded in 2015 (formerly ZEIT)
   - Based in San Francisco, USA
   - Owned by Vercel Inc.
   - Backed by major investors (Accel, GV)

2. **🔐 Security Features:**
   - **Automatic HTTPS** - Your site is encrypted
   - **DDoS Protection** - Protected from attacks
   - **CDN (Content Delivery Network)** - Fast and secure
   - **No Credit Card Required** - Free tier is truly free
   - **Read-only GitHub Access** - Can only read your code, cannot modify

3. **🆓 Free Tier (What You're Using):**
   - No cost
   - No credit card needed
   - No hidden fees
   - 100GB bandwidth per month (plenty for portfolio)
   - Automatic SSL certificates
   - Custom domain support

4. **🔍 What Vercel CAN Access:**
   - Your GitHub repository (read-only)
   - Deploy your code to their servers
   - Serve your website to visitors

5. **🚫 What Vercel CANNOT Access:**
   - Your personal files on computer
   - Your email or passwords
   - Other GitHub repositories
   - Your bank account or payment info (unless you upgrade to paid)

### Will It Harm You?

**No, Vercel will NOT harm you.** Here's why:

✅ **It only hosts your portfolio** (HTML, CSS, JavaScript)
✅ **No access to your computer** - Only reads your GitHub repo
✅ **No personal data collected** - Just basic analytics (page views)
✅ **Can delete anytime** - You own your code, can move elsewhere
✅ **Industry standard** - Used by professional developers globally

### Alternative Hosting (If You Prefer):

If you're still concerned, you can deploy to:
- **Netlify** - Similar to Vercel (also free and safe)
- **GitHub Pages** - Hosted by GitHub directly
- **Firebase Hosting** - Hosted by Google

---

## 📂 Project Structure

```
portfolio/
├── public/                  # Static files (accessible via /)
│   ├── resume.pdf          # Your resume (ADD THIS!)
│   └── profile-photo.jpg   # Your photo (ADD THIS!)
│
├── src/
│   ├── components/
│   │   ├── ui/             # Content components (EDIT THESE!)
│   │   │   ├── About.tsx          # About section - Change bio here
│   │   │   ├── Skills.tsx         # Skills section - Change skills here
│   │   │   ├── Education.tsx      # Education section - Change education here
│   │   │   ├── Awards.tsx         # Awards section - Change awards here
│   │   │   └── Contact.tsx        # Contact section - Change contact info here
│   │   │
│   │   ├── 3d/             # 3D scene components (NO NEED TO EDIT)
│   │   └── layout/         # Navigation, etc. (NO NEED TO EDIT)
│   │
│   ├── data/
│   │   └── projects.ts     # Project data - Change projects here
│   │
│   ├── context/            # App state (NO NEED TO EDIT)
│   ├── App.tsx            # Main app (NO NEED TO EDIT)
│   └── main.tsx           # Entry point (NO NEED TO EDIT)
│
├── docs/                   # Project documentation
└── index.html             # HTML template (page title already set)
```

---

## 🎨 Quick Customization Checklist

- [ ] Add your profile photo (`public/profile-photo.jpg`)
- [ ] Add your resume PDF (`public/resume.pdf`)
- [ ] Update About.tsx with your photo img tag
- [ ] Update bio in About.tsx
- [ ] Update skills in Skills.tsx
- [ ] Update education in Education.tsx
- [ ] Update awards in Awards.tsx
- [ ] Update contact info in Contact.tsx
- [ ] Update projects in src/data/projects.ts
- [ ] Commit and push to GitHub
- [ ] Wait for Vercel to auto-deploy (~2 minutes)
- [ ] Test: https://portfolio-gray-beta-31.vercel.app

---

## 🆘 Need Help?

If you get stuck or have questions:

1. **Check your local site first:**
   ```bash
   npm run dev
   ```
   Open: http://localhost:5173

2. **Check for errors:**
   ```bash
   npm run build
   ```
   If it fails, there's a syntax error in your code

3. **Common Issues:**
   - **Photo not showing?** Check file path is `/profile-photo.jpg`
   - **Changes not live?** Wait 2-3 minutes after pushing to GitHub
   - **Build failed?** Check for TypeScript errors (missing commas, quotes, etc.)

---

## 📞 Support

- **GitHub Repository:** https://github.com/omkarjore/portfolio
- **Production URL:** https://portfolio-gray-beta-31.vercel.app
- **Vercel Dashboard:** https://vercel.com/dashboard

---

**Remember:** Your code is safe, your data is secure, and you can make unlimited changes! 🚀

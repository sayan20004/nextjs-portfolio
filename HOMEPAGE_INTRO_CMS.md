# Homepage Intro CMS - Complete Setup

## ✨ What's Been Created

Your portfolio now has a **complete Homepage Introduction CMS** where you can edit every part of your intro section directly from the admin dashboard.

### Database Collection: `homepage_intro`
```
name: "Sayan Maity"
title: "Full Stack Developer & UI/UX Enthusiast"
tagline: "A full stack engineer from India, learning User experience"
photo: "/sayanmaity.jpg"
cvLink: "/SayanMaity_Resume.pdf"
bio: [
  "A full stack engineer from India, learning User experience",
  "Currently working as Jr. Dev at Techinnovator",
  "Building SwiftKit (Ready to use Components for your iOS Apps)",
  "Reach out if you want to find a way to work together!"
]
updatedAt: Date
```

## 📁 Files Created

### 1. Database Model
- **File**: [src/lib/models.ts](src/lib/models.ts)
- **What**: Added `IHomepageIntro` interface and `HomepageIntroSchema`
- **Purpose**: Defines the structure of homepage intro data in MongoDB

### 2. Server Actions
- **File**: [src/lib/cms-actions.ts](src/lib/cms-actions.ts)
- **Functions**:
  - `getOrCreateHomepageIntro()` - Fetch intro data (creates default if none exists)
  - `updateHomepageIntro(data)` - Update intro (protected, requires auth)

### 3. API Routes
- **File**: [src/app/api/homepage-intro/route.ts](src/app/api/homepage-intro/route.ts)
- **GET** `/api/homepage-intro` - Fetch intro data (public)
- **PUT** `/api/homepage-intro` - Update intro (protected with NextAuth)

### 4. Editor Component
- **File**: [src/components/dashboard/HomepageIntroEditor.tsx](src/components/dashboard/HomepageIntroEditor.tsx)
- **Features**:
  - Edit name, title, tagline
  - Upload photo URL
  - Add/remove bio bullet points
  - Add CV download link
  - Live preview of intro section
  - Form validation and error messages

### 5. Dashboard Page
- **File**: [src/app/dashboard/(admin)/homepage-intro/page.tsx](src/app/dashboard/(admin)/homepage-intro/page.tsx)
- **Purpose**: Admin page to edit homepage intro

### 6. Navigation Update
- **File**: [src/components/dashboard/DashboardNav.tsx](src/components/dashboard/DashboardNav.tsx)
- **Change**: Added "Homepage Intro" link in sidebar navigation

### 7. Migration Script
- **File**: [scripts/migrate-data.ts](scripts/migrate-data.ts)
- **Updated**: Added `migrateHomepageIntro()` function to load initial data

## 🎯 How to Use

### Access the Editor
1. Go to `/dashboard/login` and authenticate
2. You'll see the sidebar with these options:
   - **Dashboard** - Overview
   - **Homepage Intro** ⭐ (NEW)
   - **Projects**
   - **Experience**
   - **Socials**
3. Click **"Homepage Intro"** to edit

### Edit Your Introduction

The form has these sections:

**1. Basic Info**
- Full Name (required)
- Title/Headline (required)

**2. Media**
- Tagline - Short description (optional)
- Profile Photo URL (required) - Can be `/filename.jpg` or full URL

**3. Links**
- CV Download Link (optional) - URL to your resume PDF

**4. Bio Bullet Points**
- Add multiple bullet points about yourself
- Each point is displayed as a separate bullet
- Click "Add Bullet Point" to add more
- Click "Remove" to delete a bullet point

**5. Live Preview**
- Shows how your intro will look
- Updates as you type

### Save Changes
- Click "Save Changes"
- Changes are instantly applied to the homepage
- Cache is automatically cleared for the site

## 💻 API Usage

### Get Homepage Intro (Public)
```bash
curl http://localhost:3000/api/homepage-intro
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Sayan Maity",
    "title": "Full Stack Developer",
    "tagline": "...",
    "photo": "/sayanmaity.jpg",
    "cvLink": "/cv.pdf",
    "bio": ["...", "..."]
  }
}
```

### Update Homepage Intro (Protected)
```bash
curl -X PUT http://localhost:3000/api/homepage-intro \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sayan Maity",
    "title": "Senior Developer",
    "photo": "/new-photo.jpg",
    "bio": ["New bio point 1", "New bio point 2"]
  }'
```

**Note**: Requires NextAuth authentication

## 🔄 Using in Your Homepage

### Option 1: Server-Side Fetch (Recommended for Pages)
```typescript
import { HomepageIntro } from "@/lib/models";
import dbConnect from "@/lib/db";

export default async function HomePage() {
  await dbConnect();
  const intro = await HomepageIntro.findOne({}).lean();
  
  return (
    <section>
      <h1>{intro?.name}</h1>
      <p>{intro?.title}</p>
      {intro?.bio.map((point, idx) => (
        <li key={idx}>• {point}</li>
      ))}
    </section>
  );
}
```

### Option 2: Client-Side Fetch
```typescript
"use client";

import { useEffect, useState } from "react";

export default function Intro() {
  const [intro, setIntro] = useState(null);
  
  useEffect(() => {
    fetch("/api/homepage-intro")
      .then(res => res.json())
      .then(data => setIntro(data.data));
  }, []);
  
  if (!intro) return <div>Loading...</div>;
  
  return <h1>{intro.name}</h1>;
}
```

### Option 3: Using Server Actions
```typescript
import { getOrCreateHomepageIntro } from "@/lib/cms-actions";

export default async function Page() {
  const intro = await getOrCreateHomepageIntro();
  return <h1>{intro.name}</h1>;
}
```

## 📊 Current Data Stored

Your intro has been migrated with this information:

```json
{
  "name": "Sayan Maity",
  "title": "Full Stack Developer & UI/UX Enthusiast",
  "tagline": "A full stack engineer from India, learning User experience",
  "photo": "/sayanmaity.jpg",
  "cvLink": "/SayanMaity_Resume.pdf",
  "bio": [
    "A full stack engineer from India, learning User experience",
    "Currently working as Jr. Dev at Techinnovator",
    "Building SwiftKit (Ready to use Components for your iOS Apps)",
    "Reach out if you want to find a way to work together!"
  ]
}
```

You can now edit any of these fields from the dashboard!

## 🔒 Security

- ✅ All updates are **protected by NextAuth**
- ✅ Only authenticated users can edit
- ✅ Database validation ensures data integrity
- ✅ Automatic cache revalidation after updates

## 🚀 Next Steps

1. **Test It Out**:
   ```bash
   npm run dev
   ```
   Then go to `/dashboard/login` → `/dashboard/homepage-intro`

2. **Update Main Page** (optional):
   - Replace hardcoded intro with dynamic content using:
   ```typescript
   const intro = await HomepageIntro.findOne({}).lean();
   ```

3. **Change Photo**:
   - Upload your new photo to `/public/`
   - Update the URL in the admin panel

4. **Add More Bio Points**:
   - Click "Add Bullet Point" for each thing you want to highlight

## ❓ Troubleshooting

**Problem**: Changes not showing up
- Hard refresh browser: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
- Wait a moment for cache revalidation

**Problem**: Can't access admin panel
- Make sure you're logged in at `/dashboard/login`
- Check that NEXTAUTH_URL is correct in `.env.local`

**Problem**: Photo not loading
- Make sure the URL is correct and accessible
- For local images, put them in `/public/` folder
- Use path like `/filename.jpg`

## 📝 Summary

You now have a **complete CMS system** for your portfolio:

✅ Database-driven content  
✅ Homepage intro editor in admin panel  
✅ Live preview while editing  
✅ REST API endpoints  
✅ Server actions for Next.js  
✅ Automatic cache management  
✅ Authentication-protected edits  

Everything is editable from the dashboard - your name, title, photo, bio, CV link, and more!

# Portfolio CMS - Database Setup & Usage Guide

## Overview

Your portfolio is now fully configured as a **Content Management System (CMS)** with:
- ✅ MongoDB database integration
- ✅ REST API endpoints for all content types
- ✅ Server actions for dashboard operations
- ✅ Admin dashboard for editing content
- ✅ Authentication via NextAuth
- ✅ Automatic cache revalidation

## Initial Setup

### 1. Environment Variables

Ensure your `.env.local` file has:
```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_URL=http://localhost:3000 (or your production URL)
NEXTAUTH_SECRET=your_secret_key
```

### 2. Migrate Data from JSON to Database

Run the migration script to load all your portfolio data from JSON files to MongoDB:

```bash
npm run migrate
```

This will:
- Connect to MongoDB
- Clear existing data in each collection
- Load data from:
  - `src/data/projects.json` → Projects collection
  - `src/data/career.json` → Experience collection (work)
  - `src/data/education.json` → Experience collection (education)
  - `src/data/socials.json` → Social collection

**Output example:**
```
🚀 Starting data migration...

✅ Connected to MongoDB
📦 Migrating Projects...
  Cleared 0 existing projects
  ✅ Created 3 projects
💼 Migrating Experience & Education...
  Cleared 0 existing experience records
  ✅ Created 4 experience records
🔗 Migrating Socials...
  Cleared 0 existing socials
  ✅ Created 4 socials

✨ Migration completed successfully!
```

## Database Models

### Experience (Work & Education)
Located in MongoDB, can be edited via `/dashboard/(admin)/experience`

**Fields:**
- `name` - Company/School name
- `title` - Job title or degree
- `href` - Company/school website
- `logo` - Logo image URL
- `type` - Either "work" or "education"
- `start` - Start date (e.g., "Jan 2020")
- `end` - End date (optional, e.g., "Present")
- `description` - Array of bullet points
- `links` - Array of related links with name, href, and icon

### Project
Located in MongoDB, can be edited via `/dashboard/(admin)/projects`

**Fields:**
- `name` - Project name
- `description` - Project description
- `href` - Project website/demo URL (optional)
- `image` - Project image URL (optional)
- `tags` - Array of technology tags
- `links` - Array of links (GitHub, Live, etc.)

### Social
Located in MongoDB, can be edited via `/dashboard/(admin)/socials`

**Fields:**
- `name` - Social media platform name
- `href` - Profile URL
- `icon` - Icon identifier (lucide-react icon name)
- `order` - Display order (1, 2, 3, etc.)

## CMS Dashboard

### Access Dashboard
1. Navigate to `/dashboard/login`
2. Authenticate with NextAuth
3. Access admin panel at `/dashboard/(admin)`

### Features

#### Experience Management `/dashboard/(admin)/experience`
- View all work experience and education records
- **Add New**: Click "Add New" to create experience
- **Edit**: Click "Edit" on any card to modify details
- **Delete**: Click "Delete" to remove (requires confirmation)
- **Details**: View company/school, title, dates, and type

#### Project Management `/dashboard/(admin)/projects`
- View all projects
- **Add New**: Create new project with name, description, image, tags, links
- **Edit**: Update project details
- **Delete**: Remove projects

#### Social Links Management `/dashboard/(admin)/socials`
- View all social media links
- **Add New**: Add new social profile
- **Edit**: Update social links
- **Delete**: Remove social profiles
- **Reorder**: Edit the `order` field to change display order

## API Endpoints

### Experience API

**GET all experiences**
```bash
GET /api/experience
```

**GET single experience**
```bash
GET /api/experience/:id
```

**CREATE experience** (Protected)
```bash
POST /api/experience
Content-Type: application/json

{
  "name": "Google",
  "title": "Senior Software Engineer",
  "href": "https://google.com",
  "logo": "/google.png",
  "type": "work",
  "start": "Jan 2020",
  "end": "Present",
  "description": ["Built features", "Led team"],
  "links": []
}
```

**UPDATE experience** (Protected)
```bash
PUT /api/experience/:id
Content-Type: application/json

{
  "name": "Google",
  ...
}
```

**DELETE experience** (Protected)
```bash
DELETE /api/experience/:id
```

### Projects API

**GET all projects**
```bash
GET /api/projects
```

**GET single project**
```bash
GET /api/projects/:id
```

**CREATE project** (Protected)
```bash
POST /api/projects
Content-Type: application/json

{
  "name": "AI Quiz Generator",
  "description": "Full-stack MERN app using Gemini API",
  "image": "/ai-quiz.png",
  "tags": ["React", "Node.js", "MongoDB"],
  "links": [
    {
      "name": "GitHub",
      "href": "https://github.com/...",
      "icon": "github"
    }
  ]
}
```

**UPDATE project** (Protected)
```bash
PUT /api/projects/:id
```

**DELETE project** (Protected)
```bash
DELETE /api/projects/:id
```

### Socials API

**GET all socials**
```bash
GET /api/socials
```

**GET single social**
```bash
GET /api/socials/:id
```

**CREATE social** (Protected)
```bash
POST /api/socials
Content-Type: application/json

{
  "name": "LinkedIn",
  "href": "https://linkedin.com/in/...",
  "icon": "linkedin",
  "order": 1
}
```

**UPDATE social** (Protected)
```bash
PUT /api/socials/:id
```

**DELETE social** (Protected)
```bash
DELETE /api/socials/:id
```

## Using the Dashboard

### Creating New Content

1. **Experience/Education:**
   - Go to `/dashboard/(admin)/experience`
   - Click "Add New"
   - Fill in all required fields
   - Set type to "work" or "education"
   - Add bullet points (one per line)
   - Add relevant links if needed
   - Click "Create Experience"

2. **Projects:**
   - Go to `/dashboard/(admin)/projects`
   - Click "Add New"
   - Fill in project details
   - Add technology tags
   - Add links (GitHub, Live demo, etc.)
   - Click "Create Project"

3. **Social Links:**
   - Go to `/dashboard/(admin)/socials`
   - Click "Add New"
   - Enter social platform name and URL
   - Select icon from lucide-react icons
   - Set display order
   - Click "Create Social"

### Editing Content

1. Click "Edit" on any content card
2. Modify the fields you need to change
3. Click "Update [Content Type]"
4. Changes are automatically cached and reflected on your site

### Deleting Content

1. Click "Delete" button
2. Confirm deletion
3. Content is immediately removed from database and site

## How It Works

### Data Flow

```
┌─────────────────┐
│  Database       │ (MongoDB)
│  - Experience   │
│  - Projects     │
│  - Socials      │
└────────┬────────┘
         │
    ┌────▼─────┐
    │  API     │ (Next.js API Routes)
    │  Routes  │
    └────┬─────┘
         │
    ┌────▼──────────────────┐
    │  Dashboard UI &        │ (Server Actions + UI Components)
    │  Public Pages          │
    └───────────────────────┘
```

### Server Actions vs API Routes

- **Server Actions** (`lib/cms-actions.ts`): Used by dashboard UI, included in the bundle
- **API Routes** (`/api/*`): REST endpoints, useful for external integrations

Both do the same thing - both are secured with NextAuth authentication.

## Caching & Revalidation

After any create/update/delete operation:
- Cache is automatically cleared for:
  - Dashboard pages
  - Public pages (/, /projects, /blog, etc.)
- Data is refetched on next request
- No manual cache clearing needed

## Backup & Future Migrations

### Exporting Data from MongoDB

To backup or migrate data to new JSON files:

```typescript
// In scripts/export-data.ts
const projects = await Project.find({});
fs.writeFileSync('./exports/projects.json', JSON.stringify(projects));
```

### Reverting to JSON

Keep your JSON files in `src/data/` as backups. To revert:
1. Stop using the API/dashboard
2. Update components to read from JSON files directly
3. Run `npm run migrate` in reverse (export script)

## Troubleshooting

### Migration Failed
- Check `MONGODB_URI` in `.env.local`
- Ensure MongoDB connection is working
- Check JSON files format is correct
- Run: `npm run migrate` again

### Dashboard Shows "No records found"
- Run `npm run migrate` to load initial data
- Check database connection in MongoDB Atlas
- Verify you're authenticated (login required)

### Changes not showing up
- Wait a moment for cache revalidation
- Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
- Check browser console for errors
- Check server logs for API errors

## Next Steps

1. ✅ Run `npm run migrate` to load data
2. ✅ Visit `/dashboard/login` to authenticate
3. ✅ Edit content via the dashboard
4. ✅ Changes appear automatically on your site

## Summary of Created Files

- `scripts/migrate-data.ts` - Migration script
- `src/app/api/experience/route.ts` - Experience API (GET, POST)
- `src/app/api/experience/[id]/route.ts` - Experience API (GET, PUT, DELETE)
- `src/app/api/projects/route.ts` - Projects API (GET, POST)
- `src/app/api/projects/[id]/route.ts` - Projects API (GET, PUT, DELETE)
- `src/app/api/socials/route.ts` - Socials API (GET, POST)
- `src/app/api/socials/[id]/route.ts` - Socials API (GET, PUT, DELETE)

All existing components and server actions remain unchanged - this is fully backward compatible!

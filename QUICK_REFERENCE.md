# SpaceGen Aviation - Quick Command Reference

## 🚀 Start Here (5 Minutes)

```bash
# 1. Install dependencies
npm install

# 2. Setup environment file
cp .env.example .env.local
# Edit .env.local and add MongoDB URI

# 3. Initialize admin user
npm run db:init

# 4. Start development
npm run dev

# 5. Open browser
# Home: http://localhost:3000
# Admin: http://localhost:3000/admin (username: admin, password: spacegen@2026)
```

---

## 📁 Key Files to Know

| File | Purpose |
|------|---------|
| `app/page.tsx` | Homepage (hero, about, programs, features, CTA) |
| `app/contact/page.tsx` | Contact form page |
| `app/programs/page.tsx` | Programs details page |
| `app/admin/page.tsx` | Admin login page |
| `app/admin/dashboard/page.tsx` | Admin dashboard |
| `app/globals.css` | Design tokens & colors |
| `app/api/enquiries/route.ts` | Submit enquiry (public API) |
| `app/api/admin/login/route.ts` | Admin login API |
| `app/api/admin/enquiries/route.ts` | Get/manage enquiries API |
| `lib/db.ts` | MongoDB models & connection |
| `lib/auth.ts` | JWT & password utilities |
| `.env.example` | Environment variables template |

---

## 🎨 Design (Colors & Styling)

### Current Color Scheme
```
Primary (Indigo):     #6366f1   → Buttons, highlights
Secondary (Pink):     #ec4899   → Accents, gradients  
Accent (Amber):       #f59e0b   → Tertiary buttons
Background (Light):   #f8f9fa   → Main background
Background (Dark):    #0f172a   → Dark mode
Text Color:           #1a1a2e   → Primary text
```

### Edit Colors in `app/globals.css`
Lines 7-31: Root theme colors
Lines 44-76: Dark theme colors

---

## 🔧 Common Commands

```bash
# Development
npm run dev              # Start dev server with hot reload

# Production
npm run build            # Build for production
npm start                # Run production build
npm run lint             # Check code quality

# Database
npm run db:init          # Initialize admin user (run once)

# MongoDB (if local)
mongosh                  # Connect to local MongoDB
show dbs                 # List all databases
use spacegen             # Switch to spacegen database
db.enquiries.find()      # View all enquiries
```

---

## 🌐 Website Pages

| Page | URL | Auth | Purpose |
|------|-----|------|---------|
| Home | `/` | No | Main landing page |
| Programs | `/programs` | No | Program details & enrollment |
| Contact | `/contact` | No | Student enquiry form |
| Admin Login | `/admin` | No | Admin authentication |
| Admin Dashboard | `/admin/dashboard` | Yes | Manage enquiries |

---

## 🔗 API Quick Reference

### Submit Enquiry (Public - No Auth)
```bash
POST /api/enquiries
{
  "firstName": "John",
  "lastName": "Doe", 
  "email": "john@example.com",
  "phone": "+919842158350",
  "school": "School Name",
  "grade": "10th",
  "programLevel": "Level 1",
  "message": "Optional message"
}
```

### Admin Login
```bash
POST /api/admin/login
{
  "username": "admin",
  "password": "spacegen@2026"
}
```

### Get All Enquiries (Admin Only)
```bash
GET /api/admin/enquiries
Headers: Cookie: adminToken=<jwt-token>
```

### Update Enquiry Status
```bash
PATCH /api/admin/enquiries/:id
{
  "status": "contacted"  # Options: new, reviewed, contacted, enrolled
}
```

### Delete Enquiry
```bash
DELETE /api/admin/enquiries/:id
```

---

## 📝 Environment Variables (.env.local)

```properties
# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/spacegen?retryWrites=true&w=majority

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Admin User
ADMIN_USERNAME=admin
ADMIN_PASSWORD=spacegen@2026

# Server
NODE_ENV=development
```

---

## 🗂️ Customize Sections

### Edit Homepage Sections
```
components/sections/
├── hero-modern.tsx       → Hero section with CTAs
├── about-modern.tsx      → About SpaceGen info
├── programs-modern.tsx   → Program cards & pricing
├── features-modern.tsx   → Features & benefits
└── cta-modern.tsx        → Final call-to-action
```

### Edit Contact Info
```
components/footer.tsx     → Phone, email, location
components/sections/cta-modern.tsx → Contact details in CTA
```

---

## ⚙️ Setup MongoDB

### Option 1: MongoDB Atlas (Cloud - Recommended)
1. Go to https://mongodb.com/cloud/atlas
2. Create free account
3. Create M0 (free) cluster
4. Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/spacegen`
5. Add IP whitelist (allow all: 0.0.0.0/0)
6. Add to `.env.local`

### Option 2: Local MongoDB
```bash
# Install (macOS with Homebrew)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Connection string: mongodb://localhost:27017/spacegen
```

---

## 🚢 Deploy to Vercel

```bash
# 1. Push to GitHub
git add .
git commit -m "Deploy SpaceGen Aviation"
git push origin main

# 2. Go to vercel.com
# → Import project from GitHub
# → Add environment variables:
#    MONGODB_URI: your-mongodb-connection-string
#    JWT_SECRET: generate-new-secret
#    ADMIN_USERNAME: admin
#    ADMIN_PASSWORD: change-from-default
#    NODE_ENV: production

# 3. Click Deploy - Done! 🎉
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Cannot find module 'mongoose'" | Run `npm install` |
| "ECONNREFUSED" MongoDB | Start MongoDB or check URI in `.env.local` |
| "Invalid credentials" on login | Run `npm run db:init` |
| "Port 3000 in use" | Kill process: `lsof -ti:3000 \| xargs kill -9` |
| Form not submitting | Check MongoDB is running, API logs in terminal |

---

## 📊 Admin Dashboard

- View all student enquiries
- Filter by status (new, reviewed, contacted, enrolled)
- See full student details
- Update enquiry status
- Delete enquiries
- Statistics overview

---

## 🔐 Security Checklist

Before going to production:
- [ ] Change admin password from default
- [ ] Generate new JWT_SECRET (`openssl rand -base64 32`)
- [ ] Use strong MongoDB password
- [ ] Enable HTTPS (Vercel auto)
- [ ] Set NODE_ENV=production
- [ ] Whitelist MongoDB IPs
- [ ] Clear browser cache

---

## 📚 Documentation Files

- **`SERVER_SETUP.md`** - Detailed backend setup guide
- **`DEPLOYMENT_GUIDE.md`** - Production deployment steps
- **`PROJECT_SUMMARY.md`** - Complete project overview
- **`QUICK_REFERENCE.md`** - This file

---

## 💰 Pricing for Your Client

| Component | Cost (INR) |
|-----------|-----------|
| Frontend Development | ₹25,000-35,000 |
| Backend API | ₹20,000-28,000 |
| Admin Panel | ₹12,000-18,000 |
| UI/UX Design | ₹8,000-12,000 |
| Testing & Deploy | ₹8,000-12,000 |
| Maintenance (3 mo) | ₹5,000-8,000 |
| **TOTAL** | **₹78,000-1,13,000** |

---

## 📞 Support Contacts

**For Your Client:**
- Phone: +91 9842 158350
- Email: spacegensouthindia@gmail.com
- Website: www.spacegensaviation.com
- Location: Coimbatore, Tamil Nadu, India

---

## ⚡ Performance Tips

- Images: Auto-optimized by Next.js
- CSS: Minified by Tailwind v4
- JS: Tree-shaken and bundled
- Database: Indexes on email, username
- Hosting: Vercel handles caching

---

## 🎯 Ready to Launch!

You have everything needed:
✅ Modern, beautiful frontend
✅ Complete backend API
✅ MongoDB database integration
✅ Admin panel for management
✅ Full documentation
✅ Ready to deploy

**Next Step:** Deploy to Vercel and go live! 🚀

---

**Last Updated:** Feb 26, 2026 | **Version:** 1.0.0

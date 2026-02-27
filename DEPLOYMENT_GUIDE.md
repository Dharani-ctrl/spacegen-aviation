# SpaceGen Aviation - Complete Deployment & Server Setup Guide

## Project Overview
Modern, responsive aviation education website with:
- **Frontend**: Next.js 16, React 19, Tailwind CSS, TypeScript
- **Backend**: Node.js, Express, MongoDB, JWT Authentication
- **Database**: MongoDB Atlas (cloud) or Local MongoDB
- **Hosting**: Vercel (Frontend), Render/Railway (Backend)

---

## Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
```bash
cp .env.example .env.local
```

Edit `.env.local` and add:
```
MONGODB_URI=mongodb://localhost:27017/spacegen
JWT_SECRET=dev-secret-key-12345
ADMIN_USERNAME=admin
ADMIN_PASSWORD=spacegen@2024
```

### 3. Initialize Admin User
```bash
npm run db:init
```

### 4. Start Development Server
```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### 5. Access Admin Panel
- URL: http://localhost:3000/admin
- Username: `admin`
- Password: `spacegen@2024`

---

## Production Deployment

### Option A: Deploy to Vercel (Recommended)

#### Step 1: Prepare GitHub Repository
```bash
git init
git add .
git commit -m "Initial SpaceGen Aviation commit"
git branch -M main
git remote add origin https://github.com/your-username/spacegen-aviation.git
git push -u origin main
```

#### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Connect your GitHub repository
4. Configure environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Generate with `openssl rand -base64 32`
   - `ADMIN_USERNAME`: admin
   - `ADMIN_PASSWORD`: (change from default)
   - `NODE_ENV`: production

#### Step 3: Deploy
Click "Deploy" - Vercel will automatically build and deploy!

---

### Option B: Deploy to Other Platforms

#### Deploy to Render
1. Push code to GitHub
2. Go to [render.com](https://render.com)
3. Create new "Web Service"
4. Connect GitHub repository
5. Set environment variables same as above
6. Deploy

#### Deploy to Railway
1. Go to [railway.app](https://railway.app)
2. Create new project
3. Connect GitHub
4. Add environment variables
5. Deploy

---

## MongoDB Setup

### Option 1: MongoDB Atlas (Cloud - Recommended)

1. **Create Account**
   - Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
   - Sign up for free account

2. **Create Cluster**
   - Click "Create Deployment"
   - Choose "Free" tier
   - Select region (closest to your location)
   - Create cluster (takes ~5 minutes)

3. **Get Connection String**
   - Go to "Databases" → Your Cluster
   - Click "Connect"
   - Choose "Drivers"
   - Copy connection string
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/spacegen?retryWrites=true&w=majority`

4. **Create Database User**
   - Go to "Database Access"
   - Create new user with strong password
   - Use username/password in connection string

5. **Whitelist IP Address**
   - Go to "Network Access"
   - Click "Add IP Address"
   - For development: add your IP
   - For production: add "0.0.0.0/0" (allow all) or use VPN

---

### Option 2: Local MongoDB

**Install MongoDB Community Edition:**

**On Windows:**
```bash
# Download from https://www.mongodb.com/try/download/community
# Run installer and follow setup
```

**On macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**On Linux:**
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongod
```

**Connection String:**
```
MONGODB_URI=mongodb://localhost:27017/spacegen
```

---

## Backend API Documentation

### Authentication

#### Admin Login
```bash
curl -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"spacegen@2024"}'
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "admin": {
    "id": "...",
    "username": "admin",
    "email": "admin@spacegen-aviation.com"
  }
}
```

---

### Enquiries API

#### Submit Enquiry (Public)
```bash
curl -X POST http://localhost:3000/api/enquiries \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+919842158350",
    "school": "St. Mary School",
    "grade": "10th",
    "programLevel": "Level 1",
    "message": "Interested in aviation"
  }'
```

#### Get All Enquiries (Admin Only)
```bash
curl -X GET http://localhost:3000/api/admin/enquiries \
  -H "Cookie: adminToken=<jwt-token>"
```

#### Update Enquiry Status (Admin Only)
```bash
curl -X PATCH http://localhost:3000/api/admin/enquiries/[id] \
  -H "Content-Type: application/json" \
  -H "Cookie: adminToken=<jwt-token>" \
  -d '{"status":"contacted"}'
```

Valid statuses: `new`, `reviewed`, `contacted`, `enrolled`

#### Delete Enquiry (Admin Only)
```bash
curl -X DELETE http://localhost:3000/api/admin/enquiries/[id] \
  -H "Cookie: adminToken=<jwt-token>"
```

---

## Database Schema

### Enquiry Collection
```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  school: String,
  grade: String,
  programLevel: "Level 1" | "Level 2",
  message: String,
  status: "new" | "reviewed" | "contacted" | "enrolled",
  createdAt: Date,
  updatedAt: Date
}
```

### Admin Collection
```javascript
{
  _id: ObjectId,
  username: String,
  passwordHash: String (bcrypt),
  email: String,
  createdAt: Date
}
```

---

## Project Structure

```
spacegen-aviation/
├── app/
│   ├── api/
│   │   ├── admin/
│   │   │   ├── login/route.ts
│   │   │   └── enquiries/
│   │   │       ├── route.ts
│   │   │       └── [id]/route.ts
│   │   └── enquiries/route.ts
│   ├── admin/
│   │   ├── page.tsx (login)
│   │   └── dashboard/page.tsx
│   ├── contact/page.tsx
│   ├── programs/page.tsx
│   ├── layout.tsx
│   ├── page.tsx (home)
│   └── globals.css
├── components/
│   ├── header.tsx
│   ├── footer.tsx
│   ├── contact-form.tsx
│   └── sections/
│       ├── hero-modern.tsx
│       ├── about-modern.tsx
│       ├── programs-modern.tsx
│       ├── features-modern.tsx
│       └── cta-modern.tsx
├── lib/
│   ├── db.ts (MongoDB models)
│   └── auth.ts (JWT & bcrypt)
├── scripts/
│   └── init-admin.js
├── .env.example
├── package.json
├── SERVER_SETUP.md
└── DEPLOYMENT_GUIDE.md
```

---

## Important Security Checklist

### Before Production Deployment
- [ ] Change default admin password
- [ ] Generate new strong JWT_SECRET (min 32 characters)
- [ ] Enable HTTPS only
- [ ] Set NODE_ENV=production
- [ ] Configure CORS properly
- [ ] Enable MongoDB authentication
- [ ] Whitelist MongoDB IP addresses
- [ ] Set secure cookie flags (httpOnly, secure, sameSite)
- [ ] Enable rate limiting
- [ ] Setup error logging
- [ ] Configure database backups

### Password Requirements
```
Minimum 12 characters
Include uppercase, lowercase, numbers, symbols
Examples: P@ssw0rd!2024, SpaceGen#Aviation123
```

---

## Testing the Website

### Frontend Testing
1. **Homepage**: Check all sections load correctly
2. **Hero Section**: Verify animations and CTAs
3. **Programs Page**: Test program cards and enrollment buttons
4. **Contact Form**: Submit a test enquiry
5. **Admin Login**: Login with credentials
6. **Admin Dashboard**: Verify enquiries appear

### API Testing
Use Postman or curl to test:
1. `POST /api/enquiries` - Submit enquiry
2. `POST /api/admin/login` - Login
3. `GET /api/admin/enquiries` - Get all enquiries
4. `PATCH /api/admin/enquiries/[id]` - Update status

---

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:**
- Verify MONGODB_URI is correct
- Check MongoDB is running: `mongosh` or `mongo`
- Verify IP whitelist in MongoDB Atlas

### Admin Login Fails
```
Error: Invalid credentials
```
**Solution:**
- Re-initialize admin: `npm run db:init`
- Verify credentials in .env.local
- Check admin record in MongoDB

### JWT Token Invalid
```
Error: Unauthorized
```
**Solution:**
- Verify JWT_SECRET matches between requests
- Check token hasn't expired
- Clear cookies: `document.cookie = "adminToken="`

---

## Cost Breakdown (Monthly)

| Service | Free Tier | Paid |
|---------|-----------|------|
| Vercel (Frontend) | ✅ Free | $20+/month |
| MongoDB Atlas | ✅ Free (512MB) | $57+/month |
| Render/Railway (Backend) | ✅ Free | $7+/month |
| Custom Domain | - | ₹500-1000/year |
| **Total** | **₹0/month** | **₹2000-3000/month** |

---

## Support & Updates

### Get Help
- Documentation: Read `SERVER_SETUP.md`
- Issues: Check GitHub Issues
- Email: spacegensouthindia@gmail.com
- Phone: +91 9842 158350

### Keep Updated
- Monitor MongoDB Atlas dashboard
- Check Vercel deployment logs
- Review error logs regularly
- Update dependencies: `npm update`

---

## Next Steps

1. ✅ Setup environment variables
2. ✅ Initialize MongoDB
3. ✅ Create admin user
4. ✅ Test locally (`npm run dev`)
5. ✅ Push to GitHub
6. ✅ Deploy to Vercel
7. ✅ Test production
8. ✅ Setup domain (optional)
9. ✅ Launch website!

---

## Version & Contact
- **Version**: 1.0.0
- **Created**: Feb 26, 2026
- **Company**: SpaceGen Aviation
- **Location**: Coimbatore, Tamil Nadu, India
- **Website**: www.spacegensaviation.com
- **Email**: spacegensouthindia@gmail.com

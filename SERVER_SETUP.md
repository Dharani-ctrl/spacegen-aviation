# SpaceGen Aviation - Server & Backend Setup Guide

## Overview
This document provides complete instructions for setting up and deploying the SpaceGen Aviation backend server with MongoDB integration.

---

## Prerequisites
- Node.js 18+
- MongoDB Atlas account (cloud) OR local MongoDB
- npm or yarn package manager
- Git

---

## 1. Environment Setup

### Step 1: Clone/Setup Repository
```bash
cd your-spacegen-project
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Create Environment File
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### Step 4: Configure MongoDB
Edit `.env.local` and add your MongoDB connection string:

**Option A: MongoDB Atlas (Cloud - Recommended)**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/spacegen?retryWrites=true&w=majority
```

**Option B: Local MongoDB**
```
MONGODB_URI=mongodb://localhost:27017/spacegen
```

### Step 5: Set JWT Secret
Generate a secure JWT secret:
```bash
openssl rand -base64 32
```

Add to `.env.local`:
```
JWT_SECRET=your-generated-secret-key
```

---

## 2. Database Setup

### Initialize Admin User
Run the initialization script to create the first admin user:
```bash
npm run db:init
```

This will create:
- **Username**: admin (or your ADMIN_USERNAME env var)
- **Password**: spacegen@2024 (or your ADMIN_PASSWORD env var)

### Manual Admin Creation (Alternative)
```bash
node scripts/init-admin.js
```

---

## 3. API Endpoints Reference

### Authentication

#### Admin Login
```http
POST /api/admin/login
Content-Type: application/json

{
  "username": "admin",
  "password": "spacegen@2024"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "admin": {
    "id": "admin-id",
    "username": "admin",
    "email": "admin@spacegen-aviation.com"
  }
}
```

---

### Enquiries Management

#### Submit New Enquiry (Public)
```http
POST /api/enquiries
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+919842158350",
  "school": "St. Mary's School",
  "grade": "10th",
  "programLevel": "Level 1",
  "message": "Interested in aviation program"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Enquiry submitted successfully",
  "enquiry": {
    "_id": "enquiry-id",
    "firstName": "John",
    "status": "new",
    "createdAt": "2026-02-26T10:30:00Z"
  }
}
```

#### Get All Enquiries (Admin Only)
```http
GET /api/admin/enquiries
Authorization: Cookie adminToken=<jwt-token>
```

**Response:**
```json
{
  "success": true,
  "enquiries": [
    {
      "_id": "enquiry-id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "+919842158350",
      "school": "St. Mary's School",
      "grade": "10th",
      "programLevel": "Level 1",
      "status": "new",
      "message": "Message text",
      "createdAt": "2026-02-26T10:30:00Z",
      "updatedAt": "2026-02-26T10:30:00Z"
    }
  ]
}
```

#### Get Single Enquiry (Admin Only)
```http
GET /api/admin/enquiries/:id
Authorization: Cookie adminToken=<jwt-token>
```

#### Update Enquiry Status (Admin Only)
```http
PATCH /api/admin/enquiries/:id
Authorization: Cookie adminToken=<jwt-token>
Content-Type: application/json

{
  "status": "contacted"
}
```

Valid statuses: `new`, `reviewed`, `contacted`, `enrolled`

#### Delete Enquiry (Admin Only)
```http
DELETE /api/admin/enquiries/:id
Authorization: Cookie adminToken=<jwt-token>
```

---

## 4. Database Schema

### Enquiry Collection
```typescript
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
```typescript
{
  _id: ObjectId,
  username: String (unique, lowercase),
  passwordHash: String (bcrypt hashed),
  email: String (unique, lowercase),
  createdAt: Date
}
```

---

## 5. Deployment

### Deploy to Vercel

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Vercel**
   - Go to vercel.com
   - Import your GitHub repository
   - Add environment variables:
     - MONGODB_URI
     - JWT_SECRET
     - NODE_ENV=production

3. **Deploy**
   - Vercel will automatically build and deploy

### Deploy to Other Platforms

**Using Docker (example):**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 6. Security Best Practices

### Production Checklist
- [ ] Change default admin password
- [ ] Use strong JWT_SECRET (minimum 32 characters)
- [ ] Enable HTTPS only (enforced by Vercel)
- [ ] Use environment variables for all secrets
- [ ] Enable MongoDB authentication
- [ ] Set MongoDB IP whitelist
- [ ] Implement rate limiting
- [ ] Add CORS configuration
- [ ] Enable request logging
- [ ] Regular backup of MongoDB

### Password Policy
- Minimum 8 characters
- Mix of uppercase, lowercase, numbers, symbols
- Change default password after first login

---

## 7. Monitoring & Maintenance

### Monitor MongoDB
```bash
# Check database stats
db.stats()

# Monitor connections
db.currentOp()
```

### Monitor API
- Check Vercel Analytics Dashboard
- Monitor error logs
- Track response times

### Backup MongoDB
**Atlas Automatic Backups:**
- Atlas handles automated backups daily
- Retention: 35 days
- Restore from Atlas dashboard

---

## 8. Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED
```
**Solution:**
- Verify MONGODB_URI is correct
- Check IP whitelist in MongoDB Atlas
- Ensure MongoDB is running (if local)

### Authentication Failed
```
Error: Invalid credentials
```
**Solution:**
- Verify username and password
- Check if admin user exists (run db:init)
- Check password hash in database

### JWT Token Invalid
```
Error: Unauthorized
```
**Solution:**
- Verify JWT_SECRET matches production value
- Check token expiration
- Clear browser cookies and login again

---

## 9. Adding Email Notifications (Optional)

Create `/app/api/email/send.ts`:
```typescript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendEnquiryConfirmation(email: string, name: string) {
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'SpaceGen Aviation - Enquiry Received',
    html: `<h1>Welcome ${name}!</h1><p>Thank you for your enquiry...</p>`,
  });
}
```

---

## 10. Support & Contact

For issues or questions:
- Email: spacegensouthindia@gmail.com
- Phone: +91 9842 158350
- Website: www.spacegensaviation.com
- Location: Coimbatore, Tamil Nadu, India

---

## Version History
- **v1.0.0** (Feb 26, 2026): Initial release with authentication and enquiry management

# SpaceGen Aviation - Complete Deployment Guide

## Overview
This guide covers deployment for both frontend and backend of the SpaceGen Aviation website.

---

## Frontend Deployment (Next.js on Vercel)

### Step 1: Prepare for Deployment
```bash
# Build the project locally to test
npm run build

# Check for any errors
npm run lint
```

### Step 2: Push to GitHub
```bash
git add .
git commit -m "Initial SpaceGen Aviation website"
git branch -M main
git remote add origin https://github.com/yourusername/spacegen-website.git
git push -u origin main
```

### Step 3: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New..." → "Project"
4. Select your GitHub repository
5. Configure project:
   - Framework: Next.js
   - Root Directory: ./
6. Set Environment Variables:
   ```
   NEXT_PUBLIC_API_URL=https://spacegen-backend.onrender.com/api/v1
   ```
7. Click "Deploy"

Your frontend will be live at: `https://spacegen-website.vercel.app`

---

## Backend Deployment (Node.js on Render)

### Step 1: Prepare Backend Repository

Create a new GitHub repository for backend:
```bash
mkdir spacegen-backend
cd spacegen-backend
git init

# Copy all backend files from BACKEND_SETUP.md
# Commit everything
git add .
git commit -m "Initial SpaceGen backend"
git push origin main
```

### Step 2: Set up MongoDB Atlas

1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create Free Account
3. Create a Cluster:
   - Choose M0 (Free tier)
   - Select AWS region closest to India
4. Create Database User:
   - Username: spacegen_admin
   - Password: (generate secure password)
5. Get Connection String:
   - Click "Connect" → "Drivers"
   - Copy MongoDB URI
   - Replace `<password>` and `<dbname>` with your values
   - Example: `mongodb+srv://spacegen_admin:password@cluster.mongodb.net/spacegen`

### Step 3: Deploy on Render

1. Go to [render.com](https://render.com)
2. Sign up and connect GitHub
3. Create New → "Web Service"
4. Select your backend repository
5. Configure:
   - Name: spacegen-backend
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Instance Type: Free
6. Add Environment Variables:
   ```
   PORT=5000
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://spacegen_admin:password@cluster.mongodb.net/spacegen
   JWT_SECRET=your_super_secret_key_min_32_chars
   JWT_EXPIRE=7d
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_gmail@gmail.com
   EMAIL_PASS=your_app_specific_password
   EMAIL_FROM=noreply@spacegen.com
   ADMIN_EMAIL=admin@spacegen.com
   ADMIN_PASSWORD=spacegen@2024
   ```
7. Click "Create Web Service"

Your backend will be live at: `https://spacegen-backend.onrender.com`

---

## Email Configuration (Gmail)

### Generate Gmail App Password

1. Go to [myaccount.google.com/security](https://myaccount.google.com/security)
2. Enable 2-Factor Authentication
3. Go to "App passwords"
4. Select "Mail" and "Windows Computer"
5. Copy the 16-character password
6. Use this in `EMAIL_PASS` environment variable

---

## DNS & Domain Setup

### Using Custom Domain

1. Buy domain from GoDaddy, Namecheap, or similar
2. Update Vercel DNS:
   - Go to Vercel project settings
   - Go to "Domains"
   - Add your domain
   - Copy DNS records
   - Update in your domain provider's DNS settings
3. Verify domain after DNS propagation (24-48 hours)

---

## Environment Variables Summary

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=https://spacegen-backend.onrender.com/api/v1
```

### Backend (.env)
```
PORT=5000
NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=noreply@spacegen.com
ADMIN_EMAIL=admin@spacegen.com
ADMIN_PASSWORD=spacegen@2024
```

---

## Post-Deployment Checklist

### Frontend
- [ ] Check responsive design on mobile
- [ ] Test all navigation links
- [ ] Verify contact form submission
- [ ] Test on different browsers
- [ ] Check page load speed

### Backend
- [ ] Test API endpoints with Postman
- [ ] Verify database connections
- [ ] Test email notifications
- [ ] Check error handling
- [ ] Monitor logs for issues

---

## Monitoring & Maintenance

### Vercel Dashboard
- Monitor build logs
- Check performance metrics
- Set up error notifications
- Configure analytics

### Render Dashboard
- Monitor server logs
- Check CPU/Memory usage
- Set up restart policies
- Configure error emails

### MongoDB Atlas
- Monitor database performance
- Check storage usage
- Set up alerts
- Regular backups

---

## Cost Summary (Monthly)

| Service | Free Tier | Notes |
|---------|-----------|-------|
| Vercel Frontend | ✓ Included | 100GB bandwidth |
| Render Backend | $7/month | Free tier has 15 min inactivity |
| MongoDB | ✓ Included | 512MB storage |
| Email (Gmail) | ✓ Included | 500 emails/day |
| Domain | $12/year | GoDaddy/Namecheap |
| **TOTAL** | **~$7/month** | Scalable as growth |

---

## Troubleshooting

### Contact Form Not Submitting
1. Check API URL in frontend env variables
2. Verify backend is running
3. Check browser console for errors
4. Verify CORS settings in backend

### Emails Not Sending
1. Check Gmail app password is correct
2. Verify email address is correct
3. Check MongoDB for failed enquiries
4. Check backend logs for errors

### Database Connection Issues
1. Verify MongoDB Atlas connection string
2. Check IP whitelist in MongoDB Atlas
3. Verify credentials are correct
4. Check network connectivity

### Slow Performance
1. Enable Vercel Analytics
2. Check database query performance
3. Optimize images
4. Enable caching headers
5. Consider upgrading database tier

---

## Security Best Practices

1. ✓ Keep environment variables secure
2. ✓ Use HTTPS everywhere
3. ✓ Enable CORS only for your domain
4. ✓ Hash passwords with bcryptjs
5. ✓ Use JWT for authentication
6. ✓ Validate all user inputs
7. ✓ Rate limit API endpoints
8. ✓ Regular security updates
9. ✓ Monitor error logs
10. ✓ Backup database regularly

---

## Scaling for Growth

As traffic grows, consider:

### Frontend
- Enable ISR (Incremental Static Regeneration)
- Use CDN for static assets
- Implement analytics
- A/B testing setup

### Backend
- Upgrade Render to paid plan
- Add caching layer (Redis)
- Database indexing optimization
- API rate limiting

### Database
- Move to MongoDB Atlas M10+ cluster
- Enable automatic backups
- Implement sharding if needed

---

## Support & Contact

For issues or questions:
- Email: support@spacegen.com
- Phone: +91 9842 158350
- Website: www.spacegensaviation.com

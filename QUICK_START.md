# Quick Start Guide - SpaceGen Aviation

Get your space-themed aviation website running in 15 minutes!

## Step 1: Clone & Install (3 minutes)

```bash
# Frontend dependencies
npm install

# Backend dependencies
cd server
npm install
cd ..
```

## Step 2: Setup MongoDB (5 minutes)

1. Go to https://mongodb.com/cloud/atlas
2. Create free account → Create M0 cluster
3. Create database user (save username & password)
4. Add IP: 0.0.0.0/0 (or just your IP)
5. Get connection string from "Connect" button
   
   Format: `mongodb+srv://username:password@cluster.mongodb.net/spacegen?retryWrites=true&w=majority`

## Step 3: Configure Environment Files (2 minutes)

### Frontend - Create `.env.local`:
```properties
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Backend - Create `server/.env`:
```bash
# Copy template
cp server/.env.example server/.env
```

Edit `server/.env`:
```properties
NODE_ENV=development
PORT=5000
MONGODB_URI=YOUR_MONGODB_ATLAS_CONNECTION_STRING
JWT_SECRET=your-secret-key-min-32-characters-here
ADMIN_USERNAME=admin
ADMIN_PASSWORD=spacegen@2024
CORS_ORIGIN=http://localhost:3000
```

## Step 4: Run Locally (2 minutes)

### Terminal 1 - Frontend:
```bash
npm run dev
```
→ Visit http://localhost:3000

### Terminal 2 - Backend:
```bash
cd server
npm run dev
```
→ Backend runs on http://localhost:5000

## Step 5: Test Everything (3 minutes)

1. **Visit website:** http://localhost:3000
2. **Test animations:** See stars, planets, glowing buttons
3. **Submit enquiry:** Fill form and submit
4. **Check backend:** Data saved to MongoDB
5. **Test admin login:**
   - URL: http://localhost:5000/api/health (should return 200)
   - Admin creds: admin / spacegen@2024

## What You'll See

### Homepage
- Space background with animated stars & planets
- Glowing neon buttons with hover effects
- Smooth text reveal animations
- Parallax scrolling sections
- Responsive mobile design

### Backend
- REST API with 6+ endpoints
- Student enquiry management
- Admin authentication
- Database integration

---

## Common Issues & Quick Fixes

### "MongoDB connection failed"
```
❌ Problem: MONGODB_URI is wrong
✅ Fix: Copy exact connection string from Atlas
```

### "Port 5000 already in use"
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or change PORT in server/.env
PORT=5001
```

### "Module not found: framer-motion"
```bash
# Reinstall dependencies
npm install
cd server && npm install
```

### "Animations not showing"
```
❌ Problem: CSS not loaded
✅ Fix: Clear browser cache (Ctrl+Shift+Delete)
✅ Fix: Check console for errors (F12)
```

### "CORS error when submitting form"
```
❌ Problem: Backend CORS not configured
✅ Fix: Update CORS_ORIGIN in server/.env
✅ Fix: Make sure backend is running
```

---

## File Structure Reference

```
spacegen/
├── app/
│   ├── page.tsx              ← Main homepage
│   ├── layout.tsx            ← Root layout
│   └── globals.css           ← Space theme colors
├── components/
│   ├── animations/           ← 6 animation components
│   │   ├── animated-stars.tsx
│   │   ├── space-background.tsx
│   │   ├── floating-planets.tsx
│   │   ├── glowing-button.tsx
│   │   ├── text-reveal.tsx
│   │   └── parallax-section.tsx
│   └── sections/             ← Page sections
│       └── hero-space.tsx    ← New space hero!
├── server/                   ← Backend folder
│   ├── server.js             ← Main entry
│   ├── config/               ← Database config
│   ├── models/               ← Enquiry & Admin
│   ├── controllers/          ← Business logic
│   ├── routes/               ← API endpoints
│   ├── middleware/           ← Auth & errors
│   ├── utils/                ← Validators
│   ├── package.json
│   ├── .env.example
│   └── README.md
├── DOCUMENTATION_INDEX.md    ← Start here!
├── BUILD_SUMMARY.txt         ← Visual overview
└── SPACE_THEME_GUIDE.md      ← Animations guide
```

---

## Next: Deploy to Production

### Deploy Frontend (Vercel) - 5 minutes
1. Push to GitHub
2. Connect to Vercel
3. Set `NEXT_PUBLIC_API_URL` to your backend URL
4. Deploy!

### Deploy Backend (Render) - 10 minutes
1. Push `/server` to GitHub
2. Create new Web Service on Render
3. Set environment variables
4. Deploy!

See `server/DEPLOYMENT.md` for detailed steps.

---

## Customization Quick Tips

### Change Colors
Edit `app/globals.css` (lines 7-31):
```css
--primary: #00d9ff;      /* Change from cyan */
--secondary: #ff006e;    /* Change from pink */
```

### Speed Up Animations
Edit any animation component:
```tsx
transition={{ duration: 0.5 }}  /* Faster (was 0.8) */
```

### Add More Stars
In `components/sections/hero-space.tsx`:
```tsx
<AnimatedStars count={150} />  /* More stars (was 80) */
```

---

## API Testing

### Test Enquiry Submission
```bash
curl -X POST http://localhost:5000/api/enquiries \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+919842158350",
    "school": "Test School",
    "grade": "10th",
    "programLevel": "Level 1"
  }'
```

### Test Admin Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "spacegen@2024"
  }'
```

### Health Check
```bash
curl http://localhost:5000/api/health
```

---

## Package Versions

| Package | Version | Purpose |
|---------|---------|---------|
| next | 16.1.6 | Framework |
| react | 19.2.4 | UI library |
| framer-motion | 11.0.3 | Animations |
| tailwindcss | 4.2.0 | Styling |
| express | 4.18.2 | Backend |
| mongoose | 8.1.0 | Database |
| jsonwebtoken | 9.1.2 | Auth |
| bcryptjs | 2.4.3 | Security |

---

## Documentation

Start with these (in order):

1. **DOCUMENTATION_INDEX.md** - Navigation guide (5 min read)
2. **BUILD_SUMMARY.txt** - Visual overview (5 min read)
3. **SPACE_THEME_GUIDE.md** - Animation details (7 min read)
4. **server/README.md** - Backend documentation (5 min read)
5. **server/DEPLOYMENT.md** - Deployment guide (6 min read)

**Total: 28 minutes of documentation!**

---

## Success Checklist

- [ ] npm install completed
- [ ] MongoDB cluster created
- [ ] .env files configured
- [ ] Frontend running on localhost:3000
- [ ] Backend running on localhost:5000
- [ ] Homepage loads with animations
- [ ] Enquiry form submits successfully
- [ ] Admin login works
- [ ] No console errors

Once all checked → Ready to deploy! 🚀

---

## Need Help?

1. **Check documentation** - Most issues covered in guides
2. **Check console errors** - Press F12 in browser
3. **Check backend logs** - Look at terminal where backend runs
4. **Check MongoDB** - Login to Atlas and verify data

---

## Performance Tips

### Frontend
- Animations are GPU-accelerated (smooth)
- Images lazy-loaded (faster page load)
- CSS compiled & minified (smaller bundle)

### Backend
- Database queries are indexed (fast)
- JWT tokens cached (less computation)
- Error handling prevents crashes
- CORS configured (faster requests)

---

## Security Reminders

✅ DO:
- Change admin password after first login
- Use strong JWT_SECRET (32+ chars)
- Enable HTTPS in production
- Keep .env files private

❌ DON'T:
- Commit .env files to Git
- Use weak passwords
- Enable CORS for all origins
- Log sensitive information

---

## What's Included

**Frontend:**
- 6 animation components
- 5 page sections
- Space theme color system
- Responsive design
- Mobile optimized

**Backend:**
- Express.js server
- MongoDB integration
- 6+ API endpoints
- JWT authentication
- Input validation
- Error handling

**Docs:**
- 2000+ lines of guides
- Deployment steps
- API documentation
- Customization guide
- Troubleshooting tips

---

## Total Startup Time

| Step | Time |
|------|------|
| Install deps | 3 min |
| Setup MongoDB | 5 min |
| Configure .env | 2 min |
| Run locally | 2 min |
| Test | 3 min |
| **TOTAL** | **15 min** |

**Then deploy (20 more minutes) and you're live!**

---

## Next Commands

```bash
# For frontend development
npm run dev

# For frontend production
npm run build
npm run start

# For backend development
cd server && npm run dev

# For backend production
cd server && npm start
```

---

**Ready? Start with:** `npm install` then read [DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md)

Happy coding! 🚀

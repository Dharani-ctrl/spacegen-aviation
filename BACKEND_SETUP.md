# SpaceGen Aviation - Backend Setup Guide

## Technology Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Email**: Nodemailer
- **Deployment**: Render or Railway

## Installation & Setup

### 1. Prerequisites
```bash
Node.js v18+ and npm/yarn installed
MongoDB account (MongoDB Atlas recommended)
```

### 2. Initialize Backend Project
```bash
mkdir spacegen-backend
cd spacegen-backend
npm init -y
```

### 3. Install Dependencies
```bash
npm install express cors dotenv mongoose bcryptjs jsonwebtoken nodemailer multer
npm install --save-dev nodemon
```

### 4. Create .env File
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/spacegen
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# Email Configuration (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=noreply@spacegen.com

# Admin Credentials
ADMIN_EMAIL=admin@spacegen.com
ADMIN_PASSWORD=spacegen@2026
```

## Project Structure
```
spacegen-backend/
├── config/
│   └── database.js
├── models/
│   ├── User.js
│   ├── Enquiry.js
│   └── Admin.js
├── routes/
│   ├── enquiries.js
│   ├── admin.js
│   └── auth.js
├── middleware/
│   ├── auth.js
│   └── errorHandler.js
├── controllers/
│   ├── enquiryController.js
│   ├── adminController.js
│   └── authController.js
├── utils/
│   ├── sendEmail.js
│   └── validators.js
├── server.js
└── package.json
```

---

## Backend Code Files

### 1. server.js (Main Entry Point)
```javascript
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://yourdomain.com' 
    : 'http://localhost:3000'
}));
app.use(express.json());
app.use(express.urlencoded({ limit: '10kb', extended: true }));

// Routes
app.use('/api/v1/enquiries', require('./routes/enquiries'));
app.use('/api/v1/admin', require('./routes/admin'));
app.use('/api/v1/auth', require('./routes/auth'));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Error Handling Middleware
app.use(require('./middleware/errorHandler'));

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 2. config/database.js (Database Connection)
```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
```

### 3. models/Enquiry.js (Enquiry Schema)
```javascript
const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true,
    },
    parentName: {
      type: String,
      required: [true, 'Parent name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^[0-9]{10}$/, 'Phone must be 10 digits'],
    },
    schoolName: {
      type: String,
      required: [true, 'School name is required'],
    },
    currentClass: {
      type: String,
      required: [true, 'Current class is required'],
      enum: ['4', '5', '6', '7', '8', '9', '10', '11', '12'],
    },
    programInterest: {
      type: String,
      required: [true, 'Program interest is required'],
      enum: ['Level 1', 'Level 2', 'Both'],
    },
    message: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Interested', 'Enrolled', 'Rejected'],
      default: 'New',
    },
    followUpDate: Date,
    notes: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Enquiry', enquirySchema);
```

### 4. models/Admin.js (Admin Schema)
```javascript
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    name: String,
    role: {
      type: String,
      enum: ['admin', 'moderator'],
      default: 'admin',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Hash password before saving
adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
adminSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Admin', adminSchema);
```

### 5. middleware/auth.js (JWT Authentication)
```javascript
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = verifyToken;
```

### 6. routes/enquiries.js (Enquiry Routes)
```javascript
const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');
const sendEmail = require('../utils/sendEmail');
const verifyToken = require('../middleware/auth');

// Public: Submit Enquiry
router.post('/', async (req, res) => {
  try {
    const { studentName, parentName, email, phone, schoolName, currentClass, programInterest, message } = req.body;

    // Validation
    if (!studentName || !email || !phone) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if email already exists
    const existingEnquiry = await Enquiry.findOne({ email });
    if (existingEnquiry) {
      return res.status(400).json({ message: 'Enquiry already exists for this email' });
    }

    const enquiry = new Enquiry({
      studentName,
      parentName,
      email,
      phone,
      schoolName,
      currentClass,
      programInterest,
      message,
    });

    await enquiry.save();

    // Send confirmation email
    await sendEmail({
      to: email,
      subject: 'SpaceGen Aviation - Enquiry Received',
      html: `
        <h2>Thank you for your interest in SpaceGen Aviation!</h2>
        <p>Dear ${studentName},</p>
        <p>We have received your enquiry for our aviation program.</p>
        <p>Our team will contact you shortly at ${phone}.</p>
        <p>Best regards,<br>SpaceGen Aviation Team</p>
      `,
    });

    res.status(201).json({
      message: 'Enquiry submitted successfully',
      enquiry,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Protected: Get all enquiries (Admin only)
router.get('/', verifyToken, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    let filter = {};
    if (status) filter.status = status;

    const enquiries = await Enquiry.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Enquiry.countDocuments(filter);

    res.json({
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      enquiries,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Protected: Get single enquiry
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }
    res.json(enquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Protected: Update enquiry status
router.patch('/:id', verifyToken, async (req, res) => {
  try {
    const { status, notes, followUpDate } = req.body;
    
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status, notes, followUpDate },
      { new: true, runValidators: true }
    );

    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    res.json({
      message: 'Enquiry updated successfully',
      enquiry,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Protected: Delete enquiry
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }
    res.json({ message: 'Enquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
```

### 7. routes/auth.js (Authentication Routes)
```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const router = express.Router();

// Admin Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    // Find admin by email and include password field
    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isPasswordValid = await admin.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
```

### 8. utils/sendEmail.js (Email Utility)
```javascript
const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${options.to}`);
  } catch (error) {
    console.error('Email error:', error.message);
    throw new Error('Failed to send email');
  }
};

module.exports = sendEmail;
```

### 9. package.json
```json
{
  "name": "spacegen-backend",
  "version": "1.0.0",
  "description": "SpaceGen Aviation Backend API",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "mongoose": "^7.0.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.0",
    "nodemailer": "^6.9.1",
    "multer": "^1.4.5-lts.1"
  },
  "devDependencies": {
    "nodemon": "^2.0.20"
  }
}
```

---

## Running the Backend

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

---

## API Endpoints

### Enquiry Routes
- `POST /api/v1/enquiries` - Submit new enquiry (Public)
- `GET /api/v1/enquiries` - Get all enquiries (Protected)
- `GET /api/v1/enquiries/:id` - Get single enquiry (Protected)
- `PATCH /api/v1/enquiries/:id` - Update enquiry (Protected)
- `DELETE /api/v1/enquiries/:id` - Delete enquiry (Protected)

### Auth Routes
- `POST /api/v1/auth/login` - Admin login

---

## Database Initialization (Optional)

Run this to create initial admin user:

```javascript
// scripts/createAdmin.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const adminExists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    
    if (adminExists) {
      console.log('Admin already exists');
      process.exit(0);
    }

    const admin = new Admin({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      name: 'SpaceGen Admin',
      role: 'admin',
    });

    await admin.save();
    console.log('Admin user created successfully');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();
```

Run with: `node scripts/createAdmin.js`

---

## Environment Variables Summary

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string | mongodb+srv://... |
| JWT_SECRET | JWT signing secret | your_secret_key |
| EMAIL_USER | Gmail address | admin@gmail.com |
| EMAIL_PASS | Gmail app password | xxxx xxxx xxxx xxxx |
| ADMIN_EMAIL | Admin login email | admin@spacegen.com |
| ADMIN_PASSWORD | Admin login password | spacegen@2026 |

---

## Deployment on Render

1. Create account at render.com
2. Connect GitHub repository
3. Create new Web Service
4. Set environment variables in Render dashboard
5. Deploy!

Backend URL will be: `https://spacegen-backend.onrender.com`

Update frontend `.env.local` with this URL.

# AI-Powered Interview Preparation Platform

An intelligent interview preparation tool that analyzes resumes, generates personalized interview questions, identifies skill gaps, and creates tailored preparation plans using Google Gemini AI.

> 🚀 Full-stack application built with React, Node.js, Express, MongoDB, and Google Gemini AI

## Overview

This application helps job seekers prepare for interviews by:
- Analyzing resumes against job descriptions
- Generating technical and behavioral interview questions
- Identifying skill gaps with severity assessment
- Creating day-wise preparation plans
- Generating ATS-optimized resumes tailored to specific job descriptions

## Features

- **Resume Analysis**: Upload your resume (PDF) and get AI-powered analysis
- **Interview Question Generation**: Get relevant technical and behavioral questions with suggested answers
- **Skill Gap Analysis**: Identify missing skills and their impact on your application
- **Preparation Planning**: Receive a structured day-by-day preparation plan
- **Resume Tailoring**: Generate ATS-friendly resumes optimized for specific job descriptions
- **User Authentication**: Secure JWT-based authentication with session management
- **Interview History**: Track all your interview preparation sessions

## Tech Stack

### Frontend
- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.3.1
- **Routing**: React Router 7
- **Styling**: Sass (SCSS)
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js 20+
- **Framework**: Express 5.2.1
- **Database**: MongoDB (Mongoose 9.2.1)
- **AI Provider**: Google Gemini AI (gemini-3-flash-preview)
- **Authentication**: JWT with bcryptjs
- **PDF Processing**: 
  - pdf-parse (reading PDFs)
  - Puppeteer (generating PDFs)
- **File Upload**: Multer
- **Validation**: Zod

## Architecture

```
interview-ai-yt-main/
├── Backend/              # Node.js/Express API
│   ├── src/
│   │   ├── config/       # Database configuration
│   │   ├── controllers/  # Request handlers
│   │   ├── middlewares/  # Auth & file upload middleware
│   │   ├── models/       # MongoDB schemas
│   │   ├── routes/       # API routes
│   │   └── services/     # AI service logic
│   ├── Dockerfile
│   ├── .env.example
│   └── server.js         # Entry point
├── Frontend/             # React/Vite SPA
│   ├── src/
│   │   └── features/     # Feature-based modules
│   │       ├── auth/     # Authentication
│   │       └── interview/# Interview functionality
│   ├── Dockerfile
│   ├── nginx.conf
│   └── .env.example
├── docker-compose.yml    # Full stack deployment
└── render.yaml          # Render.com deployment config
```

## Prerequisites

- Node.js 20+ and npm
- MongoDB (local or Atlas)
- Google Gemini API key ([Get one here](https://ai.google.dev/))

For Docker deployment:
- Docker 20+
- Docker Compose 2+

## Setup

### 1. Clone and Install

```bash
# Install backend dependencies
cd Backend
npm install

# Install frontend dependencies
cd ../Frontend
npm install
```

### 2. Environment Variables

**Backend** (`Backend/.env`):
```env
# MongoDB connection string
MONGO_URI=mongodb://localhost:27017/interview-ai
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/database

# JWT secret (generate a strong random string)
JWT_SECRET=your-super-secret-jwt-key-change-this

# Google Gemini AI API key
GOOGLE_GENAI_API_KEY=your-google-genai-api-key

# Server configuration
PORT=3000
NODE_ENV=development

# CORS allowed origins (comma-separated)
ALLOWED_ORIGINS=http://localhost:5173
```

**Frontend** (`Frontend/.env`):
```env
# Backend API URL
VITE_API_URL=http://localhost:3000
```

Copy the example files and update them:
```bash
cp Backend/.env.example Backend/.env
cp Frontend/.env.example Frontend/.env
# Edit both files with your actual values
```

### 3. Database Setup

**Option A: Local MongoDB**
```bash
# Install and start MongoDB locally
# On macOS: brew services start mongodb-community
# On Ubuntu: sudo systemctl start mongod
# On Windows: net start MongoDB
```

**Option B: MongoDB Atlas (Recommended for production)**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string and update `MONGO_URI` in `.env`
4. Whitelist your IP address

## Running Locally

### Development Mode

**Terminal 1 - Backend:**
```bash
cd Backend
npm run dev
# Server runs on http://localhost:3000
```

**Terminal 2 - Frontend:**
```bash
cd Frontend
npm run dev
# Frontend runs on http://localhost:5173
```

Visit `http://localhost:5173` in your browser.

### Production Build Test

**Backend:**
```bash
cd Backend
npm start
```

**Frontend:**
```bash
cd Frontend
npm run build
npm run preview
```

## Production Deployment

### Deployment Options

#### Option 1: Render.com (Recommended - Free Tier Available)

**Why Render?**
- Supports Puppeteer out of the box
- Free tier for web services and static sites
- Easy MongoDB integration
- Zero configuration required

**Steps:**
1. Push code to GitHub
2. Connect GitHub to [Render.com](https://render.com)
3. Create new "Blueprint" deployment
4. Select your repository
5. Render will automatically detect `render.yaml`
6. Set environment variables in Render dashboard:
   - `MONGO_URI`
   - `GOOGLE_GENAI_API_KEY`
   - `ALLOWED_ORIGINS` (set to your frontend URL)
   - `VITE_API_URL` (set to your backend URL)

#### Option 2: Docker Deployment

**Full stack with Docker Compose:**
```bash
# Create .env file in root directory with all variables
docker-compose up -d
```

**Individual services:**
```bash
# Backend only
cd Backend
docker build -t interview-ai-backend .
docker run -p 3000:3000 --env-file .env interview-ai-backend

# Frontend only
cd Frontend
docker build -t interview-ai-frontend .
docker run -p 80:80 interview-ai-frontend
```

#### Option 3: Railway.app

1. Install Railway CLI: `npm i -g @railway/cli`
2. Login: `railway login`
3. Create project: `railway init`
4. Deploy backend: `cd Backend && railway up`
5. Deploy frontend: `cd Frontend && railway up`
6. Set environment variables in Railway dashboard

### Environment Variables for Production

**Backend:**
```env
NODE_ENV=production
PORT=10000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/interview-ai
JWT_SECRET=<strong-random-secret>
GOOGLE_GENAI_API_KEY=<your-api-key>
ALLOWED_ORIGINS=https://your-frontend-domain.com
```

**Frontend:**
```env
VITE_API_URL=https://your-backend-domain.com
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/logout` - Logout
- `GET /api/auth/get-me` - Get current user

### Interview
- `POST /api/interview/` - Generate interview report (with resume upload)
- `GET /api/interview/` - Get all user's interview reports
- `GET /api/interview/report/:interviewId` - Get specific interview report
- `POST /api/interview/resume/pdf/:interviewReportId` - Generate tailored resume PDF

## Known Limitations

1. **Puppeteer Requirements**: Backend requires Chrome/Chromium dependencies (automatically handled in Docker/Render)
2. **File Upload Size**: Resume PDFs limited to default Multer limits (adjust in production if needed)
3. **AI API Costs**: Google Gemini API usage is subject to their pricing/quotas
4. **Free Tier Limitations**:
   - Render.com free tier: Services sleep after 15 minutes of inactivity
   - MongoDB Atlas free tier: 512MB storage
5. **CORS Configuration**: Must update `ALLOWED_ORIGINS` when deploying to new domains
6. **Session Management**: JWT tokens expire after 24 hours

## Security Features

- ✅ JWT-based authentication with httpOnly cookies
- ✅ Password hashing with bcryptjs
- ✅ Token blacklisting on logout
- ✅ Secure cookie flags in production (secure, sameSite)
- ✅ CORS configuration
- ✅ Environment-based configuration (no hardcoded secrets)
- ✅ Input validation with Zod schemas
- ⚠️ **Recommended additions**: Rate limiting, request size limits, helmet.js

## Troubleshooting

### "Connection refused" errors
- Ensure MongoDB is running
- Check `MONGO_URI` in `.env`
- Verify backend is running on correct port

### Puppeteer errors in Docker
- The provided Dockerfile includes all necessary dependencies
- If issues persist, ensure you're using the provided `Backend/Dockerfile`

### CORS errors
- Verify `ALLOWED_ORIGINS` includes your frontend URL
- Check `VITE_API_URL` points to correct backend
- Ensure `withCredentials: true` in API clients

### Build failures
- Clear `node_modules`: `rm -rf node_modules package-lock.json && npm install`
- Ensure Node.js version is 20+
- Check for port conflicts

## Development Notes

This project was originally created as part of a tutorial and has been modified for production deployment with:
- Environment-based configuration
- Docker support
- Enhanced security (cookie flags, CORS configuration)
- Production deployment configurations
- Comprehensive documentation

**Original functionality preserved:**
- AI-powered interview report generation
- Resume analysis and tailoring
- User authentication system
- PDF processing capabilities

## Contributing

When contributing, please:
1. Follow existing code structure and conventions
2. Test both frontend and backend changes
3. Update documentation for new features
4. Ensure environment variables are properly documented
5. Do not commit `.env` files or secrets

## License

This project does not currently have a specified license. The original tutorial code has been adapted and extended for production use.

## Support

For issues related to:
- **Google Gemini API**: Check [Google AI documentation](https://ai.google.dev/docs)
- **MongoDB**: See [MongoDB documentation](https://docs.mongodb.com/)
- **Deployment**: Refer to platform-specific docs (Render, Railway, etc.)

---

**Note**: This application uses AI to generate interview preparation content. Results should be used as guidance and supplemented with your own research and preparation.

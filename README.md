# 🎯 AI-Powered Interview Preparation Platform

> An intelligent full-stack web application that leverages Google Gemini AI to analyze resumes, generate personalized interview questions, identify skill gaps, and create tailored preparation plans for job seekers.

[![Tech Stack](https://img.shields.io/badge/Stack-MERN-green)](https://github.com)
[![AI](https://img.shields.io/badge/AI-Google%20Gemini-blue)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Overview

This application helps job seekers prepare effectively for interviews by:
- **Analyzing resumes** against specific job descriptions using AI
- **Generating relevant questions** (technical & behavioral) with suggested answers
- **Identifying skill gaps** with severity assessment
- **Creating day-by-day preparation plans** tailored to the candidate's profile
- **Generating ATS-optimized resumes** customized for specific job postings

**Perfect for:** Job seekers, career counselors, HR professionals, and interview coaches.

---

## ✨ Features

### 🔐 **Authentication System**
- Secure user registration and login
- JWT-based session management
- Password encryption with bcryptjs
- Token blacklisting for logout
- Protected routes and API endpoints

### 🤖 **AI-Powered Analysis**
- **Resume Parsing**: Extracts text from PDF resumes
- **Match Scoring**: AI calculates compatibility between resume and job description
- **Question Generation**: Creates relevant technical and behavioral interview questions
- **Answer Guidance**: Provides strategic approach for answering each question
- **Skill Gap Analysis**: Identifies missing skills with severity ratings (low/medium/high)

### 📅 **Preparation Planning**
- **Day-wise Plans**: Structured preparation schedule
- **Task Breakdown**: Specific daily tasks and goals
- **Focus Areas**: Targeted topics for each day

### 📄 **Resume Tailoring**
- **ATS Optimization**: Generates resumes optimized for Applicant Tracking Systems
- **Job-Specific**: Tailors content to match job description
- **PDF Export**: Professional PDF download
- **AI-Enhanced**: Natural language generation for human-like content

### 📊 **Interview History**
- Save multiple interview preparation sessions
- Track preparation progress over time
- Quick access to past analyses

---

## 🛠️ Tech Stack

### **Frontend**
- **React 19.2** - Modern UI library with hooks and context
- **Vite 7.3** - Fast build tool and dev server
- **React Router 7** - Client-side routing
- **Sass/SCSS** - Styled components
- **Axios** - HTTP client for API calls

### **Backend**
- **Node.js 20+** - JavaScript runtime
- **Express 5.2** - Web application framework
- **MongoDB** - NoSQL database (Mongoose ODM)
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling

### **AI & Document Processing**
- **Google Gemini AI** - AI model for content generation (gemini-3-flash-preview)
- **Puppeteer** - Headless browser for PDF generation
- **pdf-parse** - PDF text extraction
- **Zod** - Schema validation for AI responses

### **DevOps & Deployment**
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Render.com** - Cloud deployment platform
- **Nginx** - Production web server for frontend

---

## 🏗️ Architecture

```
interview-ai-platform/
│
├── Backend/                          # Node.js/Express API
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js          # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── auth.controller.js   # Authentication logic
│   │   │   └── interview.controller.js # Interview features
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js   # JWT verification
│   │   │   └── file.middleware.js   # File upload handling
│   │   ├── models/
│   │   │   ├── user.model.js        # User schema
│   │   │   ├── interviewReport.model.js # Report schema
│   │   │   └── blacklist.model.js   # Token blacklist
│   │   ├── routes/
│   │   │   ├── auth.routes.js       # Auth endpoints
│   │   │   └── interview.routes.js  # Interview endpoints
│   │   ├── services/
│   │   │   └── ai.service.js        # Gemini AI integration
│   │   └── app.js                   # Express configuration
│   ├── .env.example                 # Environment template
│   ├── Dockerfile                   # Backend container
│   └── server.js                    # Application entry point
│
├── Frontend/                         # React SPA
│   ├── src/
│   │   ├── features/
│   │   │   ├── auth/                # Authentication module
│   │   │   │   ├── pages/           # Login, Register
│   │   │   │   ├── services/        # Auth API calls
│   │   │   │   ├── hooks/           # useAuth hook
│   │   │   │   └── components/      # Protected route wrapper
│   │   │   └── interview/           # Interview module
│   │   │       ├── pages/           # Home, Interview
│   │   │       ├── services/        # Interview API calls
│   │   │       ├── hooks/           # useInterview hook
│   │   │       └── style/           # SCSS modules
│   │   ├── App.jsx                  # Root component
│   │   ├── app.routes.jsx           # Route configuration
│   │   └── main.jsx                 # React entry point
│   ├── .env.example                 # Environment template
│   ├── Dockerfile                   # Frontend container
│   ├── nginx.conf                   # Nginx configuration
│   └── vite.config.js               # Vite configuration
│
├── docker-compose.yml               # Full-stack deployment
├── render.yaml                      # Render.com config
└── README.md                        # This file
```

### **Data Flow**
1. User uploads resume PDF + job description
2. Frontend sends multipart form data to backend
3. Backend extracts text from PDF
4. AI service sends structured prompt to Gemini
5. Gemini returns JSON with questions, gaps, plan
6. Data saved to MongoDB
7. Frontend displays comprehensive report
8. User can generate tailored resume PDF

---

## 📸 Screenshots

### Landing Page
*Clean, professional interface for interview preparation*

### Dashboard
*View all your interview preparation sessions*

### Analysis Report
*Detailed breakdown with questions, gaps, and preparation plan*

### Resume Generator
*AI-generated, ATS-optimized resume for specific job applications*

---

## 🚀 Installation

### Prerequisites
- **Node.js** 20+ and npm
- **MongoDB** (local or MongoDB Atlas)
- **Google Gemini API Key** ([Get one here](https://ai.google.dev/))

### 1. Clone Repository
```bash
git clone https://github.com/YOUR-USERNAME/interview-ai-platform.git
cd interview-ai-platform
```

### 2. Install Dependencies

**Backend:**
```bash
cd Backend
npm install
```

**Frontend:**
```bash
cd Frontend
npm install
```

### 3. Configure Environment Variables

**Backend - Create `Backend/.env`:**
```env
# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/interview-ai
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/interview-ai

# JWT Secret (generate with: openssl rand -base64 32)
JWT_SECRET=your-super-secret-jwt-key-change-this

# Google Gemini AI API Key
GOOGLE_GENAI_API_KEY=your-google-gemini-api-key

# Server Configuration
PORT=3000
NODE_ENV=development

# CORS Origins (comma-separated)
ALLOWED_ORIGINS=http://localhost:5173
```

**Frontend - Create `Frontend/.env`:**
```env
# Backend API URL
VITE_API_URL=http://localhost:3000
```

### 4. Start Development Servers

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

### 5. Open Application
Visit **http://localhost:5173** in your browser

---

## 🔑 Environment Variables

### Backend Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/interview-ai` |
| `JWT_SECRET` | Secret key for JWT signing | `abc123xyz456` |
| `GOOGLE_GENAI_API_KEY` | Google Gemini API key | `AIzaSyXXXXXXXXXXXX` |
| `PORT` | Backend server port | `3000` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `ALLOWED_ORIGINS` | CORS allowed origins | `http://localhost:5173` |

### Frontend Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:3000` |

---

## 📖 Usage

### 1. **Register Account**
- Navigate to registration page
- Provide username, email, and password
- Account created with secure password hashing

### 2. **Login**
- Use registered email and password
- Receive JWT token stored in HTTP-only cookie
- Access protected routes

### 3. **Generate Interview Report**
- Upload your resume (PDF format)
- Paste the job description
- Provide self-description (optional but recommended)
- Click "Generate Report"
- Wait 10-30 seconds for AI processing

### 4. **Review Analysis**
- **Match Score**: See compatibility percentage
- **Technical Questions**: Review technical interview questions with answer strategies
- **Behavioral Questions**: Practice behavioral questions with STAR method guidance
- **Skill Gaps**: Identify missing skills and their importance
- **Preparation Plan**: Follow day-by-day schedule

### 5. **Generate Tailored Resume**
- Click "Generate Resume" on any report
- AI creates ATS-optimized resume
- Download as professional PDF

### 6. **Track History**
- View all past interview preparations
- Quick access to previous reports
- Track improvement over time

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/logout` | Logout user | Yes |
| GET | `/api/auth/get-me` | Get current user | Yes |

### Interview Preparation

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/interview/` | Generate interview report | Yes |
| GET | `/api/interview/` | Get all user reports | Yes |
| GET | `/api/interview/report/:id` | Get specific report | Yes |
| POST | `/api/interview/resume/pdf/:id` | Generate resume PDF | Yes |

---

## 🌐 Deployment

### Option 1: Docker (Recommended)

**Full Stack:**
```bash
docker-compose up -d
```

**Backend Only:**
```bash
cd Backend
docker build -t interview-ai-backend .
docker run -p 3000:3000 --env-file .env interview-ai-backend
```

**Frontend Only:**
```bash
cd Frontend
docker build -t interview-ai-frontend .
docker run -p 80:80 interview-ai-frontend
```

### Option 2: Render.com (Free Tier)

1. Push code to GitHub
2. Connect repository to [Render.com](https://render.com)
3. Create "Blueprint" deployment
4. Render auto-detects `render.yaml`
5. Set environment variables in dashboard
6. Deploy with one click

### Option 3: Manual Deployment

**Backend (Node.js server):**
```bash
cd Backend
npm install --production
npm start
```

**Frontend (Build + Serve):**
```bash
cd Frontend
npm install
npm run build
# Serve dist/ folder with Nginx/Apache
```

---

## 🧪 Testing

### Run Frontend Build
```bash
cd Frontend
npm run build
npm run preview
```

### Test Backend
```bash
cd Backend
npm start
```

### Verify Health
- Backend: `http://localhost:3000`
- Frontend: `http://localhost:5173`

---

## 🔒 Security Features

- ✅ **Password Hashing** - bcryptjs with salt rounds
- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **HTTP-only Cookies** - Prevents XSS attacks
- ✅ **Secure Cookie Flags** - sameSite, secure in production
- ✅ **Token Blacklisting** - Invalidates tokens on logout
- ✅ **CORS Protection** - Configurable origins
- ✅ **Input Validation** - Zod schema validation
- ✅ **Environment Variables** - No hardcoded secrets

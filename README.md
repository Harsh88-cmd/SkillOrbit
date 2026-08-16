<div align="center">

# 🌐 SkillOrbit

### Connect • Learn • Share Skills 🚀

**A peer-to-peer skill exchange platform that helps students connect with others, discover skills, and learn from each other.**

<br />

[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/Harsh88-cmd/SkillOrbit)
[![MERN](https://img.shields.io/badge/MERN-Stack-47A248?style=for-the-badge)](#-tech-stack)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](#-tech-stack)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=nodedotjs)](#-tech-stack)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb)](#-tech-stack)

</div>

---

## 📌 Overview

**SkillOrbit** is a full-stack peer-to-peer skill exchange platform built to make learning more collaborative.

The idea is simple:

> **Everyone has a skill they can teach and something new they want to learn.**

SkillOrbit allows students to create profiles, showcase their skills, discover other students, connect with people who have relevant skills, and manage skill-learning requests and sessions.

The project was built to gain practical experience in **MERN full-stack development, REST APIs, authentication, database design, file uploads, state management, and responsive UI development.**

---

## 🎯 Problem

Students often want to learn practical skills from other people but don't have an easy platform to find someone with the exact skill they are looking for.

For example:

```text
Student A
Can teach → React.js
Wants to learn → UI/UX

Student B
Can teach → UI/UX
Wants to learn → React.js
```

Instead of learning separately, both students can connect and exchange knowledge.

### 💡 SkillOrbit solves this by creating a platform where users can:

```text
Create Profile
      ↓
Add Skills
      ↓
Discover Students
      ↓
View Profiles
      ↓
Send Skill Request
      ↓
Connect & Learn
      ↓
Manage Sessions
```

---

# ✨ Features

## 🔐 Authentication

- User registration
- User login
- Secure authentication
- Protected routes
- Persistent authentication state
- Logout functionality
- Cookie-based authentication

---

## 👤 User Profiles

Users can create and manage their own profile.

Profile information includes relevant user information such as:

- Name
- Bio
- Profile picture
- Skills
- Learning interests

Users can also view other students' profiles.

---

## 🛠️ Skill Management

Users can manage the skills they want to share with others.

Example:

```text
Skills I Can Teach

• Java
• React.js
• Node.js
• MongoDB
• JavaScript
```

This makes it easier for other students to discover people based on their skills.

---

## 🔎 Student Discovery

SkillOrbit provides a student discovery experience where users can search and find other students.

```text
Search
  ↓
Find Student
  ↓
Open Profile
  ↓
View Skills
  ↓
Send Request
```

This creates a simple way to discover potential learning partners.

---

## 👥 Other User Profiles

Users can view other students' profiles and explore:

- Profile information
- Skills
- Learning interests
- Profile picture
- Available user information

This helps users decide who they want to connect with.

---

## 🤝 Skill Requests

Users can send requests to other students to initiate a skill-learning interaction.

### Request Flow

```text
User A
  │
  │ Send Skill Request
  ▼
User B
  │
  ├──── Accept
  │
  └──── Reject
```

The request status is maintained by the backend.

---

## 📅 Learning Sessions

SkillOrbit provides a session-based workflow for users who connect with each other.

```text
Request
   ↓
Accepted
   ↓
Session
   ↓
Learning / Skill Exchange
```

This provides a structured foundation for peer-to-peer learning.

---

## 🖼️ Profile Image Upload

Users can upload profile pictures.

The application uses **Multer** for handling file uploads and **Cloudinary** for cloud-based image storage.

```text
User selects image
       ↓
Frontend FormData
       ↓
Backend
       ↓
Multer
       ↓
Cloudinary
       ↓
Image URL
       ↓
MongoDB
       ↓
Profile
```

---

## 🎨 Theme Support

The application supports theme customization using **DaisyUI**.

The theme state is managed through React context and persisted locally so the user's selected theme can remain after refreshing the application.

---

# 🏗️ Architecture

```text
                         ┌──────────────────────┐
                         │      User / Client   │
                         └───────────┬──────────┘
                                     │
                                     ▼
                         ┌──────────────────────┐
                         │   React Frontend     │
                         │                      │
                         │ Pages                │
                         │ Components           │
                         │ Context API          │
                         │ React Router         │
                         └───────────┬──────────┘
                                     │
                              Axios / REST API
                                     │
                                     ▼
                         ┌──────────────────────┐
                         │   Node.js + Express  │
                         │                      │
                         │ Routes               │
                         │ Controllers          │
                         │ Middleware           │
                         └───────────┬──────────┘
                                     │
                         ┌───────────┼───────────┐
                         │           │           │
                         ▼           ▼           ▼
                    ┌─────────┐ ┌─────────┐ ┌───────────┐
                    │ MongoDB │ │Cloudinary│ │   Auth    │
                    │         │ │          │ │Middleware │
                    └─────────┘ └─────────┘ └───────────┘
```

---

# 🛠️ Tech Stack

## Frontend

- **React.js**
- **Vite**
- **React Router**
- **Tailwind CSS**
- **DaisyUI**
- **Axios**
- **Context API**
- JavaScript

---

## Backend

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- REST APIs

---

## Authentication & File Upload

- Cookie-based authentication
- Authentication middleware
- Multer
- Cloudinary
- CORS
- dotenv

---

# 📂 Project Structure

The repository is organized into separate frontend and backend applications.

```text
SkillOrbit/
│
├── backend/
│   │
│   ├── controllers/
│   │
│   ├── lib/
│   │
│   ├── middleware/
│   │
│   ├── models/
│   │
│   ├── routes/
│   │
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── eslint.config.js
│
└── README.md
```

The top-level repository and these frontend/backend directories are present in the current GitHub repository. :contentReference[oaicite:1]{index=1}

---

# 🔄 Application Flow

## 1. Authentication

```text
User
 ↓
Signup / Login
 ↓
Backend
 ↓
Authentication
 ↓
Cookie
 ↓
Protected Application
```

---

## 2. Profile Creation

```text
User
 ↓
Create Profile
 ↓
Add Bio
 ↓
Upload Profile Picture
 ↓
Add Skills
 ↓
Save Profile
```

---

## 3. Find Students

```text
Search Student
       ↓
Student Results
       ↓
Open Profile
       ↓
View Skills
       ↓
Choose Learning Partner
```

---

## 4. Skill Request

```text
Student A
    ↓
Select Student B
    ↓
Select / Request Skill
    ↓
Send Request
    ↓
Request Stored
    ↓
Student B
    ↓
Accept / Reject
```

---

## 5. Learning Session

```text
Request Accepted
       ↓
Session
       ↓
Students Connect
       ↓
Skill Exchange
```

---

# 🗄️ Database Architecture

MongoDB is used as the primary database.

The application uses separate models for the major entities involved in the platform.

Conceptually:

```text
                    ┌──────────────┐
                    │     User     │
                    └──────┬───────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
              ▼            ▼            ▼
          ┌────────┐  ┌──────────┐  ┌─────────┐
          │ Skills │  │ Requests │  │Sessions │
          └────────┘  └──────────┘  └─────────┘
```

---

# 🔐 Authentication Flow

Protected resources are handled through backend authentication middleware.

```text
Client Request
      ↓
Authentication Cookie
      ↓
Backend Middleware
      ↓
Verify User
      ↓
Authorized Request
      ↓
Controller
      ↓
Database
```

This prevents unauthenticated users from accessing protected functionality.

---

# 🌐 API Architecture

The backend follows a REST-style architecture.

```text
Frontend
   │
   ├── Authentication APIs
   │
   ├── Skill APIs
   │
   ├── Student APIs
   │
   ├── Request APIs
   │
   └── Session APIs
          │
          ▼
      Express Router
          │
          ▼
      Controllers
          │
          ▼
       Models
          │
          ▼
       MongoDB
```

---

# ⚡ Frontend State Management

SkillOrbit uses the **React Context API** to manage application-wide state.

The project includes context-based state management for areas such as:

### 🔐 Authentication

Responsible for:

- Current user
- Authentication state
- Login
- Logout
- User session

### 🛠️ Skills

Responsible for:

- Skill-related state
- Skill operations
- Sharing skill information between components

### 🎨 Theme

Responsible for:

- Current theme
- Theme switching
- Persisting the user's theme preference

---

# 📱 Responsive UI

The frontend is designed using:

- Tailwind CSS
- DaisyUI
- Responsive layouts
- Reusable React components

The goal is to provide a consistent experience across:

```text
Desktop
Tablet
Mobile
```

---

# ⚙️ Installation & Setup

## Prerequisites

Make sure you have installed:

```text
Node.js
npm
MongoDB
Git
```

You will also need a Cloudinary account if you want to use profile image uploads.

---

## 1. Clone the Repository

```bash
git clone https://github.com/Harsh88-cmd/SkillOrbit.git

cd SkillOrbit
```

---

# 2. Setup Backend

```bash
cd backend

npm install
```

Create a `.env` file inside the backend directory.

Example:

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

> Use the exact environment variable names used by your current backend configuration.

---

## 3. Start Backend

```bash
npm run dev
```

The backend will run on your configured port.

Example:

```text
http://localhost:3000
```

---

# 4. Setup Frontend

Open another terminal:

```bash
cd frontend

npm install
```

Create the frontend environment file if your current setup requires one:

```text
frontend/.env
```

Example:

```env
VITE_API_URL=http://localhost:3000/api
```

---

## 5. Start Frontend

```bash
npm run dev
```

Vite will provide the local development URL, typically:

```text
http://localhost:5173
```

---

# 🔑 Environment Variables

Never commit private credentials to GitHub.

Add environment files to `.gitignore`:

```gitignore
.env
.env.local
node_modules/
dist/
```

For sharing configuration with other developers, create an `.env.example` file:

```env
PORT=
MONGO_URI=
JWT_SECRET=
CLIENT_URL=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

VITE_API_URL=
```

---

# 📸 Screenshots

Add screenshots of the actual application here.

### 🏠 Landing Page

```markdown
![Landing Page](./screenshots/landing-page.png)
```

### 📊 Dashboard

```markdown
![Dashboard](./screenshots/dashboard.png)
```

### 🔎 Search Students

```markdown
![Search Students](./screenshots/search-students.png)
```

### 👤 Profile

```markdown
![Profile](./screenshots/profile.png)
```

### 🤝 Requests

```markdown
![Requests](./screenshots/requests.png)
```

### 📅 Sessions

```markdown
![Sessions](./screenshots/sessions.png)
```

> Add the screenshots to a `screenshots/` folder before enabling these images.

---

# 🌐 Project Links

### GitHub Repository

[**SkillOrbit — GitHub**](https://github.com/Harsh88-cmd/SkillOrbit)

### Live Demo

Add your deployed frontend URL here:

```text
YOUR_LIVE_FRONTEND_URL
```

### Backend

Add your deployed backend URL here if applicable:

```text
YOUR_BACKEND_URL
```

---

# 🧠 Key Learning Outcomes

Building SkillOrbit helped me gain practical experience with:

### Frontend Development

- React.js
- Component-based architecture
- React Router
- Context API
- Tailwind CSS
- DaisyUI
- Responsive UI
- Form handling
- API integration

### Backend Development

- Node.js
- Express.js
- REST API design
- Controllers
- Middleware
- Authentication
- Error handling

### Database

- MongoDB
- Mongoose
- Schema design
- Relationships between application entities
- CRUD operations

### Authentication

- Cookie-based authentication
- Protected routes
- Authentication middleware
- User-specific resources

### Cloud Services

- Cloudinary
- Profile image uploads
- Environment configuration

---

# 🚀 Future Improvements

Planned improvements for SkillOrbit include:

- 💬 Real-time chat between students
- 🔔 Real-time notifications
- ⭐ Student ratings and reviews
- 📅 Improved session scheduling
- 🤖 AI-powered skill recommendations
- 🔎 Advanced skill filtering
- 🏆 Student reputation system
- 📊 Learning progress tracking
- 👥 Community section
- 🏷️ Skill categories and tags
- 📈 User activity analytics
- 🎥 Integrated video learning sessions

---

# 🤝 Contributing

Contributions and suggestions are welcome.

### 1. Fork the repository

### 2. Clone your fork

```bash
git clone YOUR_FORK_URL
cd SkillOrbit
```

### 3. Create a feature branch

```bash
git checkout -b feature/new-feature
```

### 4. Make your changes

### 5. Commit

```bash
git add .
git commit -m "Add new feature"
```

### 6. Push

```bash
git push origin feature/new-feature
```

### 7. Open a Pull Request

---

# 👨‍💻 Author

<div align="center">

## Harsh Maurya

**B.Tech — Information Technology**

Full-Stack Developer | MERN | AI Integration

<br />

[![GitHub](https://img.shields.io/badge/GitHub-Harsh88--cmd-181717?style=for-the-badge&logo=github)](https://github.com/Harsh88-cmd)

</div>

---

<div align="center">

### ⭐ If you like SkillOrbit, consider starring the repository!

<br />

**Connect • Learn • Share • Grow 🚀**

</div>

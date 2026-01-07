# GoCodeMobile

**A comprehensive full-stack mobile learning platform** that empowers instructors to create and manage courses while enabling students to learn, track progress, and assess knowledge through interactive quizzes.

> Built as a college capstone project combining modern backend (Django) and mobile-first frontend (Expo (React Native)) technologies.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Running the Project](#-running-the-project)
- [Screenshots](#-screenshots)
- [Testing & Linting](#-testing--linting)
- [Troubleshooting](#-troubleshooting)
- [Project Team](#-project-team)
- [License](#-license)

---

## 🚀 Overview

**GoCodeMobile** is an educational platform designed for seamless mobile learning. It features:
- **Instructor Dashboard:** Course management, student monitoring, and progress analytics
- **Student Portal:** Course browsing, enrollment, lesson streaming, and quiz completion
- **Real-time Progress Tracking:** Monitor learning milestones and quiz performance
- **Responsive Design:** Works on Android, iOS, and web browsers

The backend is built with Django REST Framework and MySQL, while the frontend uses Expo (React Native + TypeScript) for cross-platform mobile support.

---

## ✨ Key Features

### For Students
- 📚 Browse and enroll in courses
- ▶️ Stream video lessons with progress tracking
- ✅ Complete interactive quizzes and assessments
- 📊 Track personal learning progress

### For Instructors
- 🎓 Create and manage courses
- 👥 Monitor student enrollment and progress
- 📈 View detailed analytics and performance metrics
- ✏️ Create and manage course content and quizzes

### Technical Features
- 🔐 Secure JWT-based authentication
- 📱 Cross-platform mobile support (iOS, Android, Web)
- ⚡ RESTful API architecture
- 🎨 Modern, responsive UI with TypeScript

---

## 📦 Tech Stack

### Backend
- **Framework:** Django 5.x with Django REST Framework
- **Database:** MySQL
- **Authentication:** JWT (djangorestframework-simplejwt)
- **Additional:** Pillow (image handling), django-cors-headers, django-environ

### Frontend
- **Framework:** Expo (React Native 0.81.5)
- **Language:** TypeScript
- **State Management:** AsyncStorage for mobile
- **Navigation:** React Navigation with Expo Router

---

## 🔧 Prerequisites

**System Requirements:**
- Python 3.10 or higher
- Node.js 18+ and npm (or yarn)
- MySQL Server (local or remote)
- Git

**Optional:**
- Android Emulator or iOS Simulator (for mobile testing)
- Expo Go app (for quick mobile preview)

---

## 🗂️ Project Structure

```
GoCodeMobile/
├── backend/
│   ├── backend/          # Django project configuration
│   ├── course/           # Course management app
│   ├── users/            # User authentication & profiles
│   ├── manage.py         # Django command runner
│   ├── DBCreate.py       # Database initialization script
│   ├── requirements.txt  # Python dependencies
│   └── setup.py          # Automated setup script
│
├── frontend/
│   ├── app/              # Expo router app navigation
│   ├── api/              # API client configuration
│   ├── components/       # Reusable React components
│   ├── constants/        # Styles and theme constants
│   ├── hooks/            # Custom React hooks
│   ├── package.json      # Node.js dependencies
│   └── tsconfig.json     # TypeScript configuration
│
└── README.md             # Project documentation
```

---

## ⚙️ Installation & Setup

### Backend Setup

**Step 1: Navigate to backend and create virtual environment**

```powershell
cd backend
python -m venv venv
venv\Scripts\activate
```

**Step 2: Install dependencies**

```powershell
pip install -r requirements.txt
```

**Step 3: Configure environment variables**

Create a `.env` file in the `backend/` directory:

```ini
SECRET_KEY=your-secret-key-here
DB_USER=root
DB_PASSWORD=your-mysql-password
DB_HOST=localhost
DB_PORT=3306
DB_NAME=gocode_db
```

**Step 4: Initialize the database**

```powershell
# Option A: Use the automated script (recommended)
python DBCreate.py

# Option B: Create manually via MySQL
# CREATE DATABASE gocode_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

**Step 5: Run migrations and create superuser**

```powershell
python manage.py migrate
python manage.py createsuperuser
```

### Frontend Setup

**Step 1: Install dependencies**

```bash
cd frontend
npm install
```

**Step 2: Configure API endpoint**

Edit `frontend/api/index.ts` and set the `IP_ADDRESS` variable:

```typescript
// For local development on same machine
const IP_ADDRESS = 'localhost';

// For device on same network (replace with your PC's IP)
const IP_ADDRESS = '192.168.1.42';

// For Android Emulator
const IP_ADDRESS = '10.0.2.2';
```

---

## 🏁 Running the Project

### Start Backend Server

From the `backend/` folder (with virtual environment activated):

```powershell
python manage.py runserver
```

✅ Backend running at: **http://127.0.0.1:8000/**  
✅ Admin panel at: **http://127.0.0.1:8000/admin/**

### Start Frontend App

From the `frontend/` folder (in a new terminal):

```bash
npm run start
```

Then choose a platform:
- `a` for Android
- `i` for iOS
- `w` for web

Or run directly:

```bash
npm run android    # Android emulator
npm run ios        # iOS simulator
npm run web        # Web browser
```

### Running Both Simultaneously (Recommended)

Open **two terminal panes** in VS Code:

**Terminal 1 (Backend):**
```powershell
cd backend
venv\Scripts\activate
python manage.py runserver
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run start
```

Both will run concurrently, allowing you to develop and test the full stack.

---

## 📸 Screenshots

Add screenshots here to showcase:


- **Sign up Screen** – User authentication
 
  <img width="225" height="487" alt="register" src="https://github.com/user-attachments/assets/af75c8cd-9248-4a1b-8ffe-67bce2a04b6a" />
  
- **home page** 

  <img width="225" height="488" alt="acceuil" src="https://github.com/user-attachments/assets/78e3ddd6-cf79-4eb8-94c5-3fcb41d2f1d4" />

- **Quiz Assessment** – Interactive quiz interface
  
   <img width="226" height="486" alt="quiz" src="https://github.com/user-attachments/assets/03c54fed-1f2e-4e1b-94cd-575fcbc1147b" />

- **Contact Us** – contact info

  <img width="222" height="492" alt="contact" src="https://github.com/user-attachments/assets/6873c55d-91b8-4147-b315-7883eccf47d4" />


## 🧪 Testing & Linting

### Frontend Linting

```bash
cd frontend
npm run lint
```

Runs ESLint to check code quality and style violations.

### Backend Testing

Currently, no automated test suite is configured. To add tests:

```bash
python manage.py test
```

---

## 🛠️ Troubleshooting

**MySQL Connection Error**
```
Error: Access Denied (1045)
```
Verify `.env` credentials match your MySQL configuration.

**Database Already Exists**
```
Drop the database first: DROP DATABASE gocode_db;
Then run: python DBCreate.py
```

**Mobile App Can't Reach Backend**
- Verify `IP_ADDRESS` in `frontend/api/index.ts` matches your computer's IP
- Ensure backend is running: `python manage.py runserver`
- Check firewall isn't blocking port 8000
- Test connectivity: `ping <your-pc-ip>` from the device

**Port 8000 Already in Use**
```powershell
python manage.py runserver 8001
```

**Expo Issues**
- Clear cache: `npm run reset-project`
- Reinstall dependencies: `rm -rf node_modules && npm install`

---

## 👥 Project Team

This is a college capstone project developed by a dedicated team combining full-stack development expertise. For questions or collaboration, please reach out to the development team.

---

## 📄 License

This project is a **private repository**. All rights reserved.

### Usage Rights
This software and all associated documentation are proprietary and confidential. Unauthorized copying, modification, or distribution of this project is strictly prohibited. Only authorized team members have permission to view, use, or contribute to this codebase.

For access or usage inquiries, please contact the project maintainers.

---

## 🎓 Acknowledgments

Built with:
- **Backend:** Django, Django REST Framework, MySQL
- **Frontend:** React Native, Expo, TypeScript
- **Community:** Thank you to all open-source contributors

---

**Last Updated:** January 2026  
**Status:** Active Development  
**Questions or Issues?** Open an issue on GitHub

---

Thank you for using **GoCodeMobile**! 💡

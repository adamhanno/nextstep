# 📱 NextStep Habit Tracker

NextStep is a full-stack web application that helps students track habits, manage academic tasks, and monitor progress. It includes features for both students and admins, such as calendar integration, secure login with 2FA, habit analysis, and task scheduling.

---

## 🚀 Features

- ✅ Habit Tracking & Daily Progress (auto-saved at midnight)
- ✅ Calendar Integration for Events & Academic Tasks
- ✅ Admin Dashboard (task creation, user deletion, message inbox)
- ✅ Secure Login with JWT + Two-Factor Authentication (OTP)
- ✅ Mobile-Responsive Frontend
- ✅ AI-Ready Habit Logging for Future Insights

---

## 🧱 Tech Stack

- **Frontend:** React, HTML, CSS, Axios
- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas
- **Authentication:** JWT, bcrypt, 2FA (Nodemailer)
- **Deployment:** AWS EC2, Nginx, PM2, Let’s Encrypt SSL

---

## 📂 Project Structure

```
nextstep-main/
├── nextstep-tracker/         # Frontend
│   └── src/components, pages, services
├── nextstep-backend/         # Backend
│   └── controllers, models, routes, middleware
```

---

## ⚙️ Installation

### 1. Clone Repository

```bash
git clone https://github.com/your-org/nextstep-main.git
cd nextstep-main
```

### 2. Setup Backend

```bash
cd nextstep-backend
npm install
# Create .env with MONGO_URI, JWT_SECRET, EMAIL_USER, EMAIL_PASS
node server.js
```

### 3. Setup Frontend

```bash
cd nextstep-tracker
npm install
npm start
```

---

## 🧪 Testing Instructions

### ✅ Backend Tests (Mocha & Chai)

```bash
cd nextstep-backend
npm test
```

Includes:
- Unit tests for API routes
- Auth (JWT & OTP) validation
- Database model testing

### ✅ Frontend Tests (Jest & React Testing Library)

```bash
cd nextstep-tracker
npm test
```

Includes:
- Component rendering
- Button clicks and form handling
- API call mocks

---

## 🌐 Deployment Notes

1. Host frontend via **Nginx** on AWS EC2 Ubuntu 22.04
2. Host backend separately with **PM2** and reverse proxy
3. Secure with **Let’s Encrypt SSL**
4. Set up `.env` and CI/CD pipeline for automated deployment

---

## 📧 Contact

For questions or feedback, contact: **ahano@ymail.com**

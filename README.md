# EduWorld 🌍

> ⚠️ **Disclaimer:** This project is not affiliated with any real educational institution or company. EduWorld is a portfolio project created solely to showcase full-stack development skills. All names, features, and content are for demonstration purposes only.

**🌐 Live Demo:** [https://eduworld-phi.vercel.app/](https://eduworld-phi.vercel.app/)  
**☁️ Hosted Infrastructure:** This application is hosted online using Vercel. The database relies on MongoDB Atlas (Free Tier) which is connected online for demonstration purposes.

<p align="center">
  <a href="https://drive.google.com/drive/folders/1hGJpzq83Luf3ZU3eaJoWdDkaDJ_uAF5h?usp=drive_link">
    <img src="https://img.shields.io/badge/Watch%20Demo-Click%20Here-blue?style=for-the-badge&logo=google-drive" alt="Watch the Demo" />
  </a>
</p>

---

## 📸 Screenshots

<h3>Landing Page</h3>
<img width="1916" height="928" alt="image" src="https://github.com/user-attachments/assets/413e0c7a-3806-4e26-8928-db4b89bb2fad" />

<h3>Footer</h3>
<img width="1918" height="931" alt="image" src="https://github.com/user-attachments/assets/03424c2f-fd0f-48d7-bdc7-ddeecc717248" />

<h3>UI Sneak Peek 👀</h3>
<img width="1301" height="910" alt="image" src="https://github.com/user-attachments/assets/acfc557b-0ab4-46be-9723-28b2ae9b9047" />


<h3>ChatBot in Action</h3>
<p>
<img  height="400" alt="image" src="https://github.com/user-attachments/assets/d9b3d33d-c0c2-41eb-8e2c-cb05183b2086" />
<img  height="400" alt="image" src="https://github.com/user-attachments/assets/25aaa2ba-5074-42be-ba41-f13230b87cef" />

</p>

<h3>Login & Register Pages</h3>
<p>
<img width="48%" alt="image" src="https://github.com/user-attachments/assets/87ded1ed-3855-477a-8533-dcd9c87dff04" />
<img width="48%" alt="image" src="https://github.com/user-attachments/assets/ff4c825f-9815-4510-a840-928b6bb023f4" />
</p>

<h3>Dashboards & Forms</h3>
<img width="1919" height="937" alt="image" src="https://github.com/user-attachments/assets/f98a8559-fa0e-4f10-a198-6151499a902d" />
<img width="1917" height="942" alt="image" src="https://github.com/user-attachments/assets/3f4eaac8-d130-48ab-b3cf-434a958d2f13" />

<img width="1919" height="831" alt="Form 2" src="https://github.com/user-attachments/assets/f63a3da4-706c-4b02-96b3-8ebce5f15a3c" />
<img width="1919" height="912" alt="Form 3" src="https://github.com/user-attachments/assets/55f6c2ab-c7b8-4d28-a38c-f41aeefb1121" />
<img width="1609" height="936" alt="image" src="https://github.com/user-attachments/assets/e0d535e4-28bc-4b62-8377-55957d9702ed" />


---

## 🎥 Demo Videos

All feature demonstrations are available in the [Google Drive Demo Folder](https://drive.google.com/drive/folders/1hGJpzq83Luf3ZU3eaJoWdDkaDJ_uAF5h?usp=drive_link).

---

## 🚀 Overview

**EduWorld** is a modern, full-stack educational platform designed to connect students, faculty, and administrators in a seamless, interactive environment. With a focus on global recognition, career success, and innovative learning, EduWorld offers a comprehensive suite of features for admissions, course management, enquiries, and more.

---

## ✨ Key Features

- 🤖 **AI-Powered ChatBot** — 24/7 support covering admissions, fees, scholarships, campus life, and more. Includes smart keyword detection, typing indicators, message rating (thumbs up/down), quick reply suggestions, and minimise/close controls.
- 📞 **Floating Call Button** — Instantly connect with support via phone, WhatsApp, or email from any page.
- 🎨 **Modern UI/UX** — Smooth Framer Motion page transitions, animated hero sections, interactive spotlight cursor effect, welcome popup with newsletter subscription, and a dark/light theme toggle via `next-themes`.
- 📝 **Applications & Enquiries** — Students can submit multi-step applications (personal info → academic details → course selection) with per-step validation. Enquiry form available on the Contact page.
- 🎓 **Role-Based Dashboards** — Separate dashboards for **students** (apply, track status) and **faculty** (view all applications & enquiries, see platform stats).
- 📊 **Analytics Dashboard** — Real-time counts for applications, enquiries, students, and faculty shown on the faculty dashboard.
- 🛡️ **Robust Security** — Passwords are securely hashed using `bcryptjs`. We use `jsonwebtoken` (JWT) for stateless authentication and authorization with role-based access control (`student` / `faculty`). API routes are protected by HTTP header security via `helmet`, cross-origin resource sharing governance via `cors`, and basic protection against brute-force/DDoS attacks using `express-rate-limit`.
- 🛒 **Course Catalogue** — Browse UG and PG programs with search, category filters, sort options, favouriting, and animated cards.
- 🌐 **Multi-Channel Contact** — Phone, email, WhatsApp, and the full contact form with subject, priority level, and preferred contact method.
- ☁️ **Vercel-Ready** — Configured for serverless deployment with `vercel.json` routing API requests to Express and serving the React SPA for all other routes.

---

## 🛠️ Tech Stack

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Vite-7.0-646CFF?style=for-the-badge&logo=vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss" />
  <img src="https://img.shields.io/badge/React%20Router-7-CA4245?style=for-the-badge&logo=reactrouter" />
  <img src="https://img.shields.io/badge/Framer%20Motion-12-FF0055?style=for-the-badge&logo=framer" />
  <img src="https://img.shields.io/badge/Lucide%20React-Icons-8B5CF6?style=for-the-badge&logo=lucide" />
  <img src="https://img.shields.io/badge/React%20Hook%20Form-7-EC5990?style=for-the-badge&logo=reacthookform" />
  <img src="https://img.shields.io/badge/Sonner-Toasts-FF8800?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Base%20UI-Components-000000?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=nodedotjs" />
  <img src="https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express" />
  <img src="https://img.shields.io/badge/MongoDB-8-47A248?style=for-the-badge&logo=mongodb" />
  <img src="https://img.shields.io/badge/Mongoose-8-880000?style=for-the-badge&logo=mongoose" />
  <img src="https://img.shields.io/badge/JWT-Auth-FFB300?style=for-the-badge&logo=jsonwebtokens" />
  <img src="https://img.shields.io/badge/BcryptJS-3.0.2-4B32C3?style=for-the-badge&logo=javascript" />
  <img src="https://img.shields.io/badge/Dotenv-16.6.0-8DD6F9?style=for-the-badge&logo=dotenv" />
  <img src="https://img.shields.io/badge/CORS-2.8.5-4B9CD3?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Nodemon-3.1.0-76D04B?style=for-the-badge&logo=nodemon" />
  <img src="https://img.shields.io/badge/Concurrently-8.2.2-FFCB05?style=for-the-badge" />
</p>

---

## 📦 Folder Structure

```text
eduworld-fullstack/
├── api/
│   └── index.js                     # Vercel serverless entry — re-exports Express app
│
├── backend/
│   ├── config/
│   │   └── db.js                    # MongoDB connection (serverless-safe)
│   ├── controllers/
│   │   ├── applicationsController.js
│   │   ├── authController.js
│   │   ├── dashboardController.js
│   │   └── enquiriesController.js
│   ├── middleware/
│   │   └── middleware.js            # JWT auth middleware
│   ├── models/
│   │   ├── Application.js           # { userId, personalInfo, academicInfo, courseSelected, intake, documents }
│   │   ├── Enquiry.js               # { name, email, phone, course, message, preferredContact, urgency }
│   │   └── User.js                  # { name, email, password, role: "student"|"faculty" }
│   ├── routes/
│   │   ├── applicationsRoutes.js
│   │   ├── authRoutes.js
│   │   ├── dashboardRoutes.js
│   │   └── enquiriesRoutes.js
│   ├── server.js                    # Express app — exported for Vercel, started locally
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── chat/
│   │   │   │   ├── ChatBot.jsx      # Full chatbot UI (open/minimise/close, typing, ratings)
│   │   │   │   └── chatbotData.js   # Keyword map, responses, quick replies
│   │   │   ├── common/
│   │   │   │   ├── CallButton.jsx   # Floating contact button (phone/WhatsApp/email)
│   │   │   │   ├── CallToAction.jsx # Reusable CTA section
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Header.jsx       # Responsive nav with user dropdown
│   │   │   │   ├── HeroSection.jsx  # Parallax + cursor spotlight hero
│   │   │   │   └── WelcomePopup.jsx # Newsletter popup (shown once via localStorage)
│   │   │   ├── forms/
│   │   │   │   ├── ApplicationForm.jsx  # 3-step multi-stage form
│   │   │   │   ├── AuthForm.jsx         # Shared login/register form
│   │   │   │   ├── EnquiryForm.jsx
│   │   │   │   └── UserTypePopup.jsx    # Student / Faculty selector modal
│   │   │   ├── theme-provider.jsx   # next-themes wrapper
│   │   │   └── ui/
│   │   │       ├── Toast.jsx        # Sonner toast utility + container
│   │   │       ├── button.jsx       # Base UI + CVA button
│   │   │       ├── card.jsx
│   │   │       └── input.jsx
│   │   ├── pages/
│   │   │   ├── About.jsx            # Timeline, values, testimonials, leadership
│   │   │   ├── Contact.jsx          # Contact cards, form, FAQ accordion
│   │   │   ├── Courses.jsx          # Filter, sort, favourites, course cards
│   │   │   ├── Enquiry.jsx          # Standalone enquiry page
│   │   │   ├── Home.jsx             # Hero, stats, bento grid features, CTA
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── faculty/
│   │   │   │   ├── Applications.jsx # Table with review modal (+ mock data fallback)
│   │   │   │   ├── Dashboard.jsx    # Stats + quick links
│   │   │   │   └── Enquiries.jsx    # Table with detail modal
│   │   │   └── student/
│   │   │       ├── Apply.jsx        # Wraps ApplicationForm
│   │   │       ├── Dashboard.jsx    # Action cards
│   │   │       └── Status.jsx       # Application status display
│   │   ├── utils/
│   │   │   └── api.js               # Axios instance with JWT interceptor
│   │   ├── App.jsx                  # Router, AnimatePresence page transitions
│   │   ├── index.css                # Tailwind v4 + CSS variables (light/dark)
│   │   └── main.jsx
│   ├── index.html
│   ├── jsconfig.json                # @ alias → ./src
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js               # SWC + Tailwind plugin + @ alias + chunk splitting
│
├── package.json                     # Monorepo scripts
└── vercel.json                      # Vercel deployment config
```

---

## ⚡ Getting Started

### Prerequisites

- Node.js **v20+**
- A MongoDB Atlas cluster (or local MongoDB instance)

### 1. Clone the Repository

```bash
git clone https://github.com/darshan-gowdaa/eduworld-fullstack.git
cd eduworld-fullstack
```

### 2. Install All Dependencies

```bash
npm run setup
```

This runs `npm install` concurrently in the root, `frontend/`, and `backend/` directories.

### 3. Configure Environment Variables

Create a `.env` file inside the `backend/` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
PORT=5000
NODE_ENV=development
```

### 4. Run in Development Mode

**Backend only:**
```bash
npm run dev:backend
# Starts Express with nodemon on http://localhost:5000
```

**Frontend only:**
```bash
npm run dev:frontend
# Starts Vite dev server on http://localhost:5173
```

**Both together:**
```bash
# In two separate terminals, run the commands above
```

### 5. Production Build

```bash
npm run build   # builds the React app into frontend/dist
npm start       # starts the Express server
```

---

## 🔗 API Reference

Base URL (local): `http://localhost:5000/api`

### Auth

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/auth/register` | — | Register a new user |
| `POST` | `/auth/login` | — | Login and receive JWT |
| `GET` | `/auth/me` | ✅ JWT | Get current user profile |

**Register / Login payload:**
```json
{
  "name": "Mindri Mahesh",
  "email": "mindri.mahesh@example.com",
  "password": "$tR0ngp@$$word67",
  "role": "student"
}
```

**Response:**
```json
{
  "token": "<jwt>",
  "user": { "id": "...", "name": "Mindri Mahesh", "email": "...", "role": "student" }
}
```

### Applications

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| `POST` | `/applications/` | ✅ | student | Submit a new application |
| `GET` | `/applications/` | ✅ | faculty | Get all applications |
| `GET` | `/applications/mine` | ✅ | student | Get own application |

### Enquiries

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| `POST` | `/enquiries/` | — | public | Submit an enquiry |
| `GET` | `/enquiries/` | ✅ | faculty | Get all enquiries |

### Dashboard

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| `GET` | `/dashboard/stats` | ✅ | faculty | Get platform statistics |

---

## 🗂️ Data Models

### User
```js
{ name, email, password /* bcrypt hashed */, role: "student"|"faculty", createdAt }
```

### Application
```js
{
  userId,          // ref → User
  personalInfo,    // { fullName, email, phone, dob }
  academicInfo,    // { qualification, institution, year, score }
  courseSelected,
  intake,
  documents,       // array
  createdAt
}
```

### Enquiry
```js
{ name, email, phone, course, message, preferredContact, urgency, createdAt }
```

---

## 🧠 ChatBot Details

The chatbot (`ChatBot.jsx` + `chatbotData.js`) works entirely client-side with no external AI API. It uses a **keyword map** to match user input against synonyms and return pre-written responses with follow-up suggestions.

**Supported topics:** courses, admissions, fees, contact, scholarships, campus, faculty, deadlines, housing, internships, job placement, B.Tech, MBA, required documents, payment plans, virtual tours, English proficiency, and international students.

**UI Features:**
- Typing indicator animation
- Thumbs up / thumbs down message rating
- Quick reply suggestion chips (scroll horizontally on mobile)
- Minimise to a headphone icon bubble
- Clear chat button
- Timestamps on every message

---

## ☁️ Deploying to Vercel

1. Push the repo to GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. Set the following **Environment Variables** in the Vercel dashboard:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
4. Vercel will use `vercel.json` to route `/api/*` to the serverless Express function and serve the React SPA for everything else.

> **Note:** The `api/index.js` file re-exports the Express app from `backend/server.js` so Vercel treats it as a serverless function.

---

## 🗺️ Roadmap

- [x] Student application & multi-step form
- [x] Faculty/admin dashboards with live stats
- [x] Role-based authentication (JWT)
- [x] Interactive AI-style chatbot
- [x] Enquiry submission & management
- [x] Dark / Light theme toggle
- [x] Smooth page transitions with Framer Motion
- [x] Vercel serverless deployment support
- [ ] Email notifications on application status change
- [ ] Admin panel for approving/rejecting applications
- [ ] File upload for application documents
- [ ] Real-time notifications with WebSockets

---

## 📬 Contact

- [Open an Issue](https://github.com/darshan-gowdaa/eduworld-fullstack/issues)
- [GitHub Profile](https://github.com/darshan-gowdaa)

---

## 🏅 Badges

![GitHub last commit](https://img.shields.io/github/last-commit/darshan-gowdaa/eduworld-fullstack)
![GitHub issues](https://img.shields.io/github/issues/darshan-gowdaa/eduworld-fullstack)
![GitHub stars](https://img.shields.io/github/stars/darshan-gowdaa/eduworld-fullstack?style=social)

---

> _EduWorld: Transforming education, empowering futures._

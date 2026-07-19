# CARD Technocrats & Engineers LLP

> Professional Consultancy for Government Registrations, Tender Filing, Project Reports, BOQ Preparation, GST, MSME, GeM Registration, Digital Signature, Contractor Registration.

A full-stack MERN application built with **React (Vite)**, **TailwindCSS**, **Framer Motion**, **Node.js**, **Express**, and **MongoDB**.

---

## 🏗️ Architecture

```
Card_Techno/
├── client/              # React + Vite frontend
│   ├── src/
│   │   ├── api/         # Axios instance
│   │   ├── components/  # Reusable UI components
│   │   ├── context/     # Auth & Theme contexts
│   │   ├── hooks/       # React Query hooks
│   │   ├── layouts/     # Main & Admin layouts
│   │   └── pages/       # All route pages
│   └── ...
├── server/              # Express.js backend
│   ├── src/
│   │   ├── config/      # DB, Cloudinary, Email
│   │   ├── controllers/ # Route handlers
│   │   ├── middleware/   # Auth, upload, errors
│   │   ├── models/      # Mongoose schemas
│   │   ├── routes/      # API routes
│   │   └── utils/       # Helpers & seed script
│   └── ...
├── docker-compose.yml   # Multi-container setup
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ ([download](https://nodejs.org))
- **MongoDB** 6+ (local or [MongoDB Atlas](https://cloud.mongodb.com))
- **Git** ([download](https://git-scm.com))

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/card-technocrats.git
cd card-technocrats
```

### 2. Setup Backend

```bash
cd server
cp .env.example .env    # Edit .env with your credentials
npm install
npm run seed            # Seed admin user & services
npm run dev             # Start dev server on :5000
```

### 3. Setup Frontend

```bash
cd client
cp .env.example .env    # Edit if needed
npm install
npm run dev             # Start dev server on :5173
```

### 4. Open in Browser

- **Frontend**: http://localhost:5173
- **API**: http://localhost:5000/api/v1
- **Admin**: http://localhost:5173/admin/login

### Default Admin Credentials

```
Email:    admin@cardtechno.com
Password: Admin@123
```

> ⚠️ **Change these immediately in production!**

---

## 🔧 Environment Variables

### Server (`server/.env`)

| Variable | Description | Example |
|---|---|---|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/card-technocrats` |
| `JWT_SECRET` | JWT signing secret | `your-super-secret-key` |
| `JWT_EXPIRE` | JWT expiry duration | `7d` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | `your-cloud-name` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `123456789` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | `your-api-secret` |
| `SMTP_HOST` | Email SMTP host | `smtp.gmail.com` |
| `SMTP_PORT` | Email SMTP port | `587` |
| `SMTP_USER` | Email username | `your-email@gmail.com` |
| `SMTP_PASS` | Email app password | `your-app-password` |
| `CONTACT_EMAIL` | Receive contact form emails | `info@cardtechnocrats.com` |
| `CLIENT_URL` | Frontend URL (CORS) | `http://localhost:5173` |
| `ADMIN_EMAIL` | Default admin email | `admin@cardtechno.com` |
| `ADMIN_PASSWORD` | Default admin password | `Admin@123` |

### Client (`client/.env`)

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | API base URL | `/api/v1` |

---

## 🌐 Deployment

### Option 1: Docker (Recommended)

```bash
# Build and start all services
docker-compose up -d --build

# Seed the database
docker-compose exec server node src/utils/seedAdmin.js

# View logs
docker-compose logs -f
```

### Option 2: Vercel (Frontend) + Render (Backend)

#### Deploy Frontend to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Set **Root Directory** to `client`
4. Set **Build Command** to `npm run build`
5. Set **Output Directory** to `dist`
6. Add environment variable: `VITE_API_URL` = `https://your-backend.onrender.com/api/v1`
7. Deploy!

#### Deploy Backend to Render

1. Go to [render.com](https://render.com) and create a **Web Service**
2. Connect your GitHub repository
3. Set **Root Directory** to `server`
4. Set **Build Command** to `npm install`
5. Set **Start Command** to `node src/index.js`
6. Add all environment variables from the table above
7. Deploy!

### Option 3: VPS with Nginx

```bash
# Clone on server
git clone https://github.com/your-username/card-technocrats.git
cd card-technocrats

# Build frontend
cd client && npm install && npm run build

# Start backend
cd ../server && npm install
NODE_ENV=production node src/index.js

# Configure Nginx (see server/nginx/default.conf)
```

---

## ☁️ Third-Party Setup

### MongoDB Atlas

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a free cluster
3. Create a database user
4. Whitelist your IP (or `0.0.0.0/0` for all)
5. Get connection string → put in `MONGODB_URI`

### Cloudinary

1. Go to [cloudinary.com](https://cloudinary.com) and sign up (free)
2. Dashboard → copy Cloud Name, API Key, API Secret
3. Set in `.env`

### Email (Gmail SMTP)

1. Enable 2-Factor Authentication on your Google account
2. Go to Google Account → Security → App Passwords
3. Generate an app password for "Mail"
4. Use your Gmail as `SMTP_USER` and the app password as `SMTP_PASS`

---

## 📡 API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/v1/auth/register` | — | Register user |
| `POST` | `/api/v1/auth/login` | — | Login |
| `GET` | `/api/v1/auth/me` | ✅ | Get current user |
| `GET` | `/api/v1/services` | — | List services (paginated, searchable) |
| `GET` | `/api/v1/services/:slug` | — | Get service by slug |
| `POST` | `/api/v1/services` | 🔒 Admin | Create service |
| `PUT` | `/api/v1/services/:id` | 🔒 Admin | Update service |
| `DELETE` | `/api/v1/services/:id` | 🔒 Admin | Delete service |
| `GET` | `/api/v1/pricing` | — | List pricing |
| `POST` | `/api/v1/pricing` | 🔒 Admin | Create pricing |
| `PUT` | `/api/v1/pricing/:id` | 🔒 Admin | Update pricing |
| `DELETE` | `/api/v1/pricing/:id` | 🔒 Admin | Delete pricing |
| `GET` | `/api/v1/blogs` | — | List blogs (paginated) |
| `GET` | `/api/v1/blogs/:slug` | — | Get blog post |
| `POST` | `/api/v1/blogs` | 🔒 Admin | Create blog |
| `PUT` | `/api/v1/blogs/:id` | 🔒 Admin | Update blog |
| `DELETE` | `/api/v1/blogs/:id` | 🔒 Admin | Delete blog |
| `POST` | `/api/v1/contacts` | — | Submit contact form |
| `GET` | `/api/v1/contacts` | 🔒 Admin | List contacts |
| `PATCH` | `/api/v1/contacts/:id/read` | 🔒 Admin | Mark as read |
| `DELETE` | `/api/v1/contacts/:id` | 🔒 Admin | Delete contact |
| `GET` | `/api/v1/downloads` | — | List downloads |
| `POST` | `/api/v1/downloads` | 🔒 Admin | Upload file |
| `PATCH` | `/api/v1/downloads/:id/download` | — | Increment counter |
| `DELETE` | `/api/v1/downloads/:id` | 🔒 Admin | Delete file |
| `GET` | `/api/v1/gallery` | — | List gallery |
| `POST` | `/api/v1/gallery` | 🔒 Admin | Add project |
| `DELETE` | `/api/v1/gallery/:id` | 🔒 Admin | Delete project |
| `POST` | `/api/v1/newsletter/subscribe` | — | Subscribe |
| `GET` | `/api/v1/newsletter` | 🔒 Admin | List subscribers |
| `GET` | `/api/v1/testimonials` | — | List testimonials |
| `POST` | `/api/v1/testimonials` | 🔒 Admin | Add testimonial |
| `PUT` | `/api/v1/testimonials/:id` | 🔒 Admin | Update testimonial |
| `DELETE` | `/api/v1/testimonials/:id` | 🔒 Admin | Delete testimonial |
| `GET` | `/api/v1/analytics/stats` | 🔒 Admin | Dashboard analytics |

---

## 🎨 Features

- **Premium UI** — Apple/Stripe-inspired glassmorphism design
- **Dark Mode** — Default dark theme with light mode toggle
- **Animations** — Framer Motion page transitions, scroll reveals, hover effects
- **Responsive** — Mobile-first, works on all devices
- **Admin Dashboard** — Full CRUD for all resources
- **JWT Authentication** — Secure admin panel
- **SEO Optimized** — React Helmet for meta tags
- **30+ Services** — Pre-seeded with full details
- **Contact Form** — Stored in DB + email notification
- **Blog System** — Rich content with categories and tags
- **File Downloads** — Upload and manage downloadable files
- **Project Gallery** — Showcase completed projects
- **WhatsApp Integration** — Floating chat button
- **Newsletter** — Email subscription system

---

## 📄 License

© 2024 CARD Technocrats & Engineers LLP. All rights reserved.

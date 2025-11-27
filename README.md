# Kilometros de Vida 🚗🍽️

> Connecting food surplus with those in need through volunteer-driven logistics

A full-stack MERN application that reduces food waste by connecting restaurants, markets, and food donors with volunteer drivers who distribute surplus food to communities in need.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![React](https://img.shields.io/badge/React-19-blue)
![Node](https://img.shields.io/badge/Node-25-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Team](#team)

## ✨ Features

### For Donors
- 📝 Register food donations with pickup details
- 🗺️ See donation locations on interactive map
- ✏️ Edit or delete donations from profile
- 🔐 Secure Google OAuth authentication

### For Volunteers
- 🙋 Sign up as volunteer driver
- 📅 Specify availability preferences
- 👤 Manage volunteer profile

### For Everyone
- 📊 View real-time impact statistics
- 🌍 Interactive map showing donation locations
- 📱 Fully responsive mobile design
- ♿ Accessible interface (WCAG AA)

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Animations
- **React Leaflet** - Map visualization
- **Axios** - HTTP client

### Backend
- **Node.js 25** - Runtime environment
- **Express.js 5** - Web framework
- **MongoDB Atlas** - Database
- **Google OAuth 2.0** - Authentication
- **Nominatim API** - Geocoding

## 📦 Prerequisites

Before you begin, ensure you have:
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **MongoDB Atlas account** (free tier works)
- **Google Cloud Console account** (for OAuth)

## 🚀 Installation

### 1. Clone the repository
```bash
git clone https://github.com/alvarogalloc/km-de-vida.git
cd km-de-vida
```

### 2. Install backend dependencies
```bash
npm install
```

### 3. Install frontend dependencies
```bash
cd client
npm install
cd ..
```

## 🔐 Environment Variables

### Backend (.env in root directory)

Create a `.env` file in the root directory:

```env
# MongoDB Atlas Connection String
ATLAS_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority

# Database Name
DB_NAME=km-de-vida

# Server Port
PORT=5050

# Google OAuth Client ID
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

**How to get MongoDB Atlas URI:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user (Database Access)
4. Whitelist your IP (Network Access)
5. Click "Connect" → "Connect your application"
6. Copy the connection string and replace `<password>`

**How to get Google Client ID:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable "Google+ API"
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Add authorized JavaScript origins: `http://localhost:5173`
6. Copy the Client ID

### Frontend (client/.env)

Create a `.env` file in the `client` directory:

```env
# Google OAuth Client ID (same as backend)
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

## 🏃 Running the Application

### Development Mode

You need **two terminal windows**:

**Terminal 1 - Backend Server:**
```bash
npm run dev
```
Server runs on `http://localhost:5050`

**Terminal 2 - Frontend Dev Server:**
```bash
cd client
npm run dev
```
Frontend runs on `http://localhost:5173`

### Seeding Sample Data

To populate the database with sample donations:

```bash
node seed.js
```

This adds 4 sample donors with addresses in Guadalajara, Mexico.

### Production Build

```bash
cd client
npm run build
```

Build output will be in `client/dist/`

## 📁 Project Structure

```
km-de-vida/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React Context
│   │   ├── pages/         # Page components
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles
│   ├── public/            # Static assets
│   └── vite.config.js     # Vite configuration
├── middleware/            # Express middleware
├── server.js             # Express server
├── seed.js               # Database seeding script
├── ARCHITECTURE.md       # System architecture docs
├── WORKFLOW.md           # User workflow diagrams
├── DESIGN_DOC.md         # Design documentation
├── Dev Log.md            # Development log
└── README.md             # This file
```

## 📚 API Documentation

### Authentication
- `POST /api/auth/google` - Verify Google OAuth token

### Donations
- `GET /api/data` - Get all donations (public)
- `GET /api/my-donations?email=<email>` - Get user's donations
- `POST /join/giver` - Create new donation
- `PUT /api/donations/:id` - Update donation
- `DELETE /api/donations/:id` - Delete donation

### Volunteers
- `POST /join/driver` - Register as volunteer
- `GET /api/my-volunteer-shifts?email=<email>` - Get user's shifts

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed API documentation.

## 👥 Team

**Regina Beltrán López** - Frontend Design & UX  
**Daniela Terán Martija** - Full-Stack Integration & Deployment  
**Álvaro Gallo Cruz** - Backend Architecture & Database

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- **OpenStreetMap** for free geocoding via Nominatim
- **Google** for OAuth authentication
- **MongoDB** for database hosting
- **Vite** for amazing developer experience

---

**Built with ❤️ to reduce food waste and fight hunger**

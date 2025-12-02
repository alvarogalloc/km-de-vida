# 🚀 Km de Vida - Setup Guide

This guide will help you set up and run the **Km de Vida** project in your local environment.

---

## 📋 Prerequisites

Before you begin, make sure you have installed:

- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)
- A **MongoDB Atlas** account (free)
- A **Google Cloud Console** account (for OAuth)

---

## ⚙️ Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone https://github.com/alvarogalloc/km-de-vida.git
cd km-de-vida
```

### 2. Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account if you don't have one
3. Create a new **Cluster** (select the free tier option)
4. Go to **Database Access** and create a database user:
   - Username: `your-username`
   - Password: `your-secure-password`
   - Permissions: **Read and write to any database**
5. Go to **Network Access** and add your IP:
   - Click **Add IP Address**
   - Select **Allow Access from Anywhere** (0.0.0.0/0) for development
6. Go to your cluster and click **Connect**
7. Select **Connect your application**
8. Copy the **connection string** (it will look like this):
   ```
   mongodb+srv://your-username:<password>@cluster.mongodb.net/?retryWrites=true&w=majority
   ```
9. Replace `<password>` with your actual password

### 3. Set Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google+ API**:
   - Go to **APIs & Services** > **Library**
   - Search for "Google+ API" and enable it
4. Create OAuth 2.0 credentials:
   - Go to **APIs & Services** > **Credentials**
   - Click **Create Credentials** > **OAuth client ID**
   - Application type: **Web application**
   - Name: `Km de Vida Local`
   - **Authorized JavaScript origins**:
     - `http://localhost:5173`
     - `http://localhost:5050`
   - **Authorized redirect URIs**:
     - `http://localhost:5173`
   - Click **Create**
5. Copy the **Client ID** and **Client Secret**

### 4. Configure Environment Variables

#### Backend (project root):

1. Copy the template file:
   ```bash
   cp .env.template .env
   ```

2. Edit `.env` and add your credentials:
   ```env
   ATLAS_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/?appName=kmdevida
   PORT=5050
   DB_NAME=kmdevida
   GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your-client-secret
   ```

#### Frontend (`client` folder):

1. Copy the template file:
   ```bash
   cd client
   cp .env.template .env
   ```

2. Edit `client/.env` and add your Google Client ID:
   ```env
   VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
   ```

   ⚠️ **IMPORTANT**: This must be the **same Client ID** used in the backend.

### 5. Install Dependencies

#### Backend:
```bash
npm install
```

#### Frontend:
```bash
cd client
npm install
cd ..
```

### 6. (Optional) Seed the Database with Sample Data

If you want to start with sample data:

```bash
node seed.js
```

This will add 4 sample donations to your database.

---

## 🏃 Run the Application

You need **TWO terminals** open:

### Terminal 1 - Backend:
```bash
npm run dev
```
The backend server will be running at **http://localhost:5050**

### Terminal 2 - Frontend:
```bash
cd client
npm run dev
```
The frontend will be running at **http://localhost:5173**

---

## 🌐 Access the Application

Open your browser and go to: **http://localhost:5173**

You're ready! Now you can:
- 🏠 Explore the home page
- 🍞 Register food donations
- 👥 Join as a volunteer
- 📍 View the donations map
- 👤 Sign in with Google

---

## 🐛 Troubleshooting

### Error: "Invalid scheme, expected connection string to start with mongodb://"
- Verify that your `ATLAS_URI` in `.env` is correctly formatted
- Make sure to replace `<password>` with your actual password
- There should be no spaces in the connection string

### Error: "ECONNREFUSED" in the frontend
- Make sure the backend is running on port 5050
- Verify that both servers are running

### Google authentication error
- Verify that `GOOGLE_CLIENT_ID` is the same in both `.env` files
- Make sure you've added `http://localhost:5173` as an authorized origin in Google Cloud Console

### Cannot connect to MongoDB
- Verify that your IP is in the Network Access list in MongoDB Atlas
- Confirm that your username and password are correct

---
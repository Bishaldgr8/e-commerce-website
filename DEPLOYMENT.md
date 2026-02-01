# Deployment Guide - The Secret Shop

This guide will help you deploy your e-commerce application to Vercel.

## Architecture Overview

Your project has two parts:
- **Frontend** (React + Vite) → Deploy to Vercel
- **Backend** (Node.js + Express + MongoDB) → Deploy to Vercel (serverless functions) or Railway/Render

## Option 1: Deploy Both to Vercel (Recommended)

### Step 1: Deploy Frontend to Vercel

1. **Go to [Vercel](https://vercel.com)**
   - Sign in with your GitHub account

2. **Import Your Repository**
   - Click "Add New..." → "Project"
   - Select your repository: `Bishaldgr8/e-commerce-website`

3. **Configure Frontend Build Settings**
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Add Environment Variables**
   Click "Environment Variables" and add:
   ```
   VITE_API_URL=https://your-backend-url.vercel.app/api/v1
   ```
   (You'll update this after deploying the backend)

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete

### Step 2: Deploy Backend to Vercel

1. **Create a New Project**
   - Click "Add New..." → "Project"
   - Select the same repository again

2. **Configure Backend Build Settings**
   - **Framework Preset**: Other
   - **Root Directory**: `backend`
   - **Build Command**: Leave empty (or `npm install`)
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

3. **Add Environment Variables**
   Add all your backend environment variables:
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret
   NODE_ENV=production
   PORT=3000
   ```

4. **Deploy**
   - Click "Deploy"
   - Copy the deployment URL

### Step 3: Update Frontend Environment Variable

1. Go back to your **Frontend project** in Vercel
2. Settings → Environment Variables
3. Update `VITE_API_URL` with your backend URL:
   ```
   VITE_API_URL=https://your-backend-url.vercel.app/api/v1
   ```
4. Redeploy the frontend

---

## Option 2: Backend on Railway/Render (Alternative)

If you prefer a traditional backend deployment:

### Deploy Backend to Railway

1. **Go to [Railway.app](https://railway.app)**
2. **New Project** → **Deploy from GitHub repo**
3. Select `Bishaldgr8/e-commerce-website`
4. **Settings**:
   - Root Directory: `backend`
   - Start Command: `npm start`
5. **Add Environment Variables** (same as above)
6. **Deploy**

### Deploy Backend to Render

1. **Go to [Render.com](https://render.com)**
2. **New** → **Web Service**
3. Connect your GitHub repository
4. **Settings**:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. **Add Environment Variables**
6. **Create Web Service**

---

## Post-Deployment Checklist

### ✅ Frontend Deployed
- [ ] Frontend is accessible at your Vercel URL
- [ ] Environment variable `VITE_API_URL` is set correctly
- [ ] Products are loading from the API

### ✅ Backend Deployed
- [ ] Backend API is accessible
- [ ] MongoDB Atlas connection is working
- [ ] Environment variables are set
- [ ] CORS is configured for your frontend domain

### ✅ Database Setup
- [ ] MongoDB Atlas cluster is running
- [ ] Database is seeded with products
- [ ] Network access allows connections from anywhere (0.0.0.0/0)

### ✅ Testing
- [ ] Can view products on homepage
- [ ] Can register/login
- [ ] Can add items to cart
- [ ] Can place orders
- [ ] Admin dashboard works

---

## Troubleshooting

### Frontend can't connect to backend
- Check `VITE_API_URL` environment variable
- Ensure backend CORS allows your frontend domain
- Check browser console for errors

### Backend deployment fails
- Check build logs in Vercel/Railway/Render
- Verify all environment variables are set
- Ensure MongoDB connection string is correct

### Products not showing
- Run the seed script on your deployed backend
- Check MongoDB Atlas network access settings
- Verify API endpoint is accessible

---

## Custom Domain (Optional)

### Add Custom Domain to Vercel

1. Go to your project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update `VITE_API_URL` if using custom backend domain

---

## Continuous Deployment

Both Vercel and Railway/Render automatically redeploy when you push to GitHub:

1. Make changes locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   ```
3. Vercel/Railway automatically rebuilds and deploys

---

## Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **Render Docs**: https://render.com/docs

---

**Made with precision by BishalB**
- 📧 Email: bishalboro10062003@gmail.com
- 🔗 GitHub: [@Bishaldgr8](https://github.com/Bishaldgr8)

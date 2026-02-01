# Pre-Deployment Checklist

Before deploying to Vercel, make sure you've completed these steps:

## ✅ Code Preparation

- [ ] All changes committed to GitHub
- [ ] `.env` files are in `.gitignore` (they should NOT be pushed)
- [ ] `vercel.json` files are present in both `frontend/` and `backend/`
- [ ] `.env.example` files are created for documentation

## ✅ MongoDB Atlas Setup

- [ ] MongoDB Atlas cluster is created and running
- [ ] Database is seeded with products (run `node seed_full.js` in backend)
- [ ] Network Access allows connections from anywhere (0.0.0.0/0)
- [ ] Database user has read/write permissions
- [ ] Connection string is ready to copy

## ✅ Environment Variables Ready

### Frontend (.env)
```
VITE_API_URL=https://your-backend-url.vercel.app/api/v1
```

### Backend (.env)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=production
PORT=3000
```

## ✅ GitHub Repository

- [ ] Repository is public or Vercel has access
- [ ] Latest code is pushed to `main` branch
- [ ] Repository URL: https://github.com/Bishaldgr8/e-commerce-website

## 🚀 Deployment Steps

### Step 1: Deploy Backend First
1. Go to https://vercel.com
2. Click "Add New..." → "Project"
3. Import `Bishaldgr8/e-commerce-website`
4. Configure:
   - Root Directory: `backend`
   - Framework: Other
5. Add all backend environment variables
6. Click "Deploy"
7. **Copy the deployment URL** (e.g., `https://your-backend.vercel.app`)

### Step 2: Deploy Frontend
1. Click "Add New..." → "Project" again
2. Import the same repository
3. Configure:
   - Root Directory: `frontend`
   - Framework: Vite
4. Add environment variable:
   - `VITE_API_URL` = `https://your-backend.vercel.app/api/v1`
5. Click "Deploy"

### Step 3: Update Backend CORS (if needed)
If you get CORS errors:
1. Go to backend project on Vercel
2. Add environment variable:
   - `FRONTEND_URL` = `https://your-frontend.vercel.app`
3. Redeploy backend

## ✅ Post-Deployment Testing

- [ ] Frontend loads successfully
- [ ] Products appear on homepage
- [ ] Can register a new account
- [ ] Can login with test account
- [ ] Can add items to cart
- [ ] Can view product details
- [ ] Admin dashboard accessible
- [ ] Fish animation works

## 🐛 Troubleshooting

### Products not loading?
- Check browser console for API errors
- Verify `VITE_API_URL` is correct
- Check backend logs in Vercel

### Backend errors?
- Check MongoDB connection string
- Verify all environment variables are set
- Check Vercel function logs

### CORS errors?
- Add frontend URL to backend CORS config
- Redeploy backend after changes

## 📝 Notes

- Vercel automatically redeploys on git push
- Free tier has usage limits
- Backend runs as serverless functions
- Database should be on MongoDB Atlas (not local)

---

**Ready to deploy?** Follow the steps in [DEPLOYMENT.md](./DEPLOYMENT.md)!

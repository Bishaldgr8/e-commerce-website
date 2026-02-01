# The Secret Shop 🛍️

A full-stack e-commerce platform built with React, TypeScript, Express, and MongoDB Atlas.

## Project Structure

```
├── frontend/          # React + TypeScript + Vite
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/           # Express + MongoDB
│   ├── src/
│   ├── .env
│   └── package.json
└── README.md
```

## Quick Start

### Backend
```bash
cd backend
npm install
npm run dev
```
Server runs on `http://localhost:5000`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`

## Features

- 🔐 JWT Authentication & Role-Based Access Control (Customer, Seller, Admin)
- 🛒 Product Catalog with Search & Filtering
- 💳 Checkout & Order Management
- 👨‍💼 Admin Dashboard (User & Order Management)
- 🏪 Seller Dashboard (Product Management)
- 🌙 Dark Mode Support
- 🐠 Interactive Fish Animation Effect
- 📱 Fully Responsive Design

## Admin Login

- **Email**: `admin@secretshop.com`
- **Password**: `bishal123`

## Tech Stack

**Frontend:**
- React 18
- TypeScript
- Vite
- React Router
- Axios
- Lucide Icons

**Backend:**
- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs

## Environment Variables

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_here
MONGODB_URI=your_mongodb_connection_string
```

## Deployment

This project is ready to deploy to Vercel! See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

### Quick Deploy to Vercel

**Frontend:**
1. Import repository to Vercel
2. Set Root Directory: `frontend`
3. Add environment variable: `VITE_API_URL`
4. Deploy

**Backend:**
1. Import repository to Vercel (new project)
2. Set Root Directory: `backend`
3. Add environment variables (MongoDB URI, JWT Secret, etc.)
4. Deploy

For complete step-by-step instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## Developer

**Made with precision by BishalB**

- 📧 Email: [bishalboro10062003@gmail.com](mailto:bishalboro10062003@gmail.com)
- 🔗 GitHub: [@Bishaldgr8](https://github.com/Bishaldgr8)

## License

MIT

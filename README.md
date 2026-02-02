# 🛍️ The Secret Shop - Full-Stack E-Commerce Platform

A modern, feature-rich e-commerce platform built with React, TypeScript, Express, and MongoDB Atlas.

## 🌐 Live Demo

**Frontend (Live):** [https://e-commerce-website-zntj-3ikanb5ta-bishal-boros-projects.vercel.app](https://e-commerce-website-zntj-3ikanb5ta-bishal-boros-projects.vercel.app)

> **Note:** Backend is deployed at [https://e-commerce-website-iota-beige.vercel.app](https://e-commerce-website-iota-beige.vercel.app). Full functionality is available.

---

## ✨ Features

### 🎨 **Beautiful UI/UX**
- Modern, responsive design with dark mode support
- Smooth animations and transitions
- Interactive fish animation effect that follows your cursor
- Glassmorphism and floating card effects
- Professional typography with Google Fonts (Inter, Outfit)

![Homepage](website_images/Screenshot%202026-02-02%20033634.png)

### 🛒 **Shopping Experience**
- **Product Catalog**: Browse 123+ products across multiple categories
- **Advanced Filtering**: Filter by category, price range, and search
- **Product Details**: Detailed product pages with images and descriptions
- **Shopping Cart**: Add, remove, and manage cart items
- **Wishlist**: Save products for later

![Product Catalog](website_images/Screenshot%202026-02-02%20033759.png)

### 🔐 **Authentication & User Management**
- Secure JWT-based authentication
- Role-based access control (Customer, Seller, Admin)
- User registration and login
- Password encryption with bcrypt
- Protected routes and API endpoints

![Login Page](website_images/Screenshot%202026-02-02%20033903.png)

### 📦 **Order Management**
- Complete checkout process
- Order history and tracking
- Order status updates
- Detailed order information

![Checkout](website_images/Screenshot%202026-02-02%20033946.png)

### 👨‍💼 **Admin Dashboard**
- User management (view, edit, delete users)
- Order management and tracking
- Product management
- Analytics and statistics
- Role assignment and permissions

![Admin Dashboard](website_images/Screenshot%202026-02-02%20034052.png)

### 🏪 **Seller Dashboard**
- Product creation and management
- Inventory tracking
- Sales analytics
- Order fulfillment

![Seller Dashboard](website_images/Screenshot%202026-02-02%20034214.png)

### 🎯 **Additional Features**
- **Real-time Notifications**: Toast notifications for user actions
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Performance**: Optimized images and lazy loading
- **Accessibility**: ARIA labels and keyboard navigation

---

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Sonner** - Toast notifications
- **Lucide React** - Icon library
- **React Hook Form** - Form management
- **Zod** - Schema validation

### **Backend**
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

---

## 📁 Project Structure

```
├── frontend/          # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── features/      # Feature-based modules
│   │   ├── pages/         # Page components
│   │   ├── api/           # API client
│   │   └── styles/        # Global styles
│   ├── public/
│   └── package.json
│
├── backend/           # Express + MongoDB
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Custom middleware
│   │   └── config/        # Configuration files
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v16 or higher)
- MongoDB Atlas account
- Git

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/Bishaldgr8/e-commerce-website.git
   cd e-commerce-website
   ```

2. **Install dependencies**
   ```bash
   # Install all dependencies (frontend + backend)
   npm install

   # Or install separately
   cd frontend && npm install
   cd ../backend && npm install
   ```

3. **Environment Variables**

   Create a `.env` file in the `backend/` directory:
   ```env
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=your_jwt_secret_here
   MONGODB_URI=your_mongodb_connection_string
   ```

   Create a `.env` file in the `frontend/` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api/v1
   ```

4. **Seed the Database**
   ```bash
   cd backend
   node seed_full.js
   node create_admin.js
   ```

5. **Run the Application**
   ```bash
   # From root directory - runs both frontend and backend
   npm run dev

   # Or run separately
   cd frontend && npm run dev  # Frontend on http://localhost:5173
   cd backend && npm run dev   # Backend on http://localhost:5000
   ```

---

## 👤 Default Admin Credentials

- **Email**: `admin@secretshop.com`
- **Password**: `bishal123`

---

## 📸 Screenshots

### Homepage
![Homepage](website_images/Screenshot%202026-02-02%20033634.png)

### Product Catalog
![Catalog](website_images/Screenshot%202026-02-02%20033759.png)

### Authentication
![Login](website_images/Screenshot%202026-02-02%20033903.png)

### Checkout
![Checkout](website_images/Screenshot%202026-02-02%20033946.png)

### Admin Dashboard
![Admin](website_images/Screenshot%202026-02-02%20034052.png)

### Seller Dashboard
![Seller](website_images/Screenshot%202026-02-02%20034214.png)

---

## 🎨 Design Highlights

- **Modern Aesthetics**: Vibrant gradients, smooth animations, and glassmorphism effects
- **Dark Mode**: Full dark mode support with proper contrast
- **Interactive Elements**: Hover effects, micro-animations, and cursor-following fish effect
- **Premium Feel**: Professional color palette and typography
- **Responsive**: Mobile-first design that works on all devices

---

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control (RBAC)
- Protected API routes
- Input validation and sanitization
- CORS configuration
- Environment variable protection

---

## 📦 Database

The application uses **MongoDB Atlas** with the following collections:
- **Users**: Customer, seller, and admin accounts
- **Products**: 123+ products across multiple categories
- **Orders**: Order history and tracking
- **Cart**: Shopping cart items

---

## 🌟 Key Features Breakdown

### For Customers:
✅ Browse and search products  
✅ Add items to cart and wishlist  
✅ Secure checkout process  
✅ Order history and tracking  
✅ User profile management  

### For Sellers:
✅ Product management (CRUD operations)  
✅ Inventory tracking  
✅ Sales analytics  
✅ Order fulfillment  

### For Admins:
✅ Complete user management  
✅ Order oversight  
✅ Product moderation  
✅ System analytics  
✅ Role management  

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

---

## 👨‍💻 Developer

**Made with precision by BishalB**

- 📧 Email: [bishalboro10062003@gmail.com](mailto:bishalboro10062003@gmail.com)
- 🔗 GitHub: [@Bishaldgr8](https://github.com/Bishaldgr8)
- 🌐 Live Demo: [The Secret Shop](https://e-commerce-website-zntj-3ikanb5ta-bishal-boros-projects.vercel.app)

---

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev)
- Fonts by [Google Fonts](https://fonts.google.com)
- Images from [Unsplash](https://unsplash.com)
- Deployed on [Vercel](https://vercel.com)

---

**⭐ If you like this project, please give it a star on GitHub!**

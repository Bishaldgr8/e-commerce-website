# Backend - The Secret Shop

Express + MongoDB backend API for The Secret Shop e-commerce platform.

## Development

```bash
npm install
npm run dev
```

## Environment Variables

Create a `.env` file:

```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_here
MONGODB_URI=your_mongodb_connection_string
```

## Seeding Data

### Create Admin User
```bash
node seed_admin.js
```

### Seed Products (Optional)
```bash
node seed_backend.js
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login
- `GET /api/v1/auth/me` - Get current user
- `GET /api/v1/auth/users` - Get all users (Admin only)

### Products
- `GET /api/v1/products` - Get all products
- `GET /api/v1/products/:id` - Get single product
- `POST /api/v1/products` - Create product (Seller/Admin)
- `PATCH /api/v1/products/:id` - Update product (Seller/Admin)
- `DELETE /api/v1/products/:id` - Delete product (Seller/Admin)

### Orders
- `POST /api/v1/orders` - Create order
- `GET /api/v1/orders/my` - Get user's orders
- `GET /api/v1/orders/all` - Get all orders (Admin only)
- `GET /api/v1/orders/:id` - Get single order

## Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs
- CORS
- Morgan (Logging)
- Nodemon (Dev)

## Developer

Made with precision by **BishalB**
- 📧 [bishalboro10062003@gmail.com](mailto:bishalboro10062003@gmail.com)
- 🔗 [@Bishaldgr8](https://github.com/Bishaldgr8)

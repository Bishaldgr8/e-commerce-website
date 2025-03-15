import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AccountPage } from './pages/AccountPage';
import { NewArrivalsPage } from './pages/NewArrivalsPage';
import { BrandsPage } from './pages/BrandsPage';
import { SellerDashboard } from './pages/seller/SellerDashboard';
import { MainLayout } from './components/common/MainLayout';
import { AdminLayout } from './features/admin/components/AdminLayout';
import { DashboardPage } from './pages/admin/DashboardPage';
import { AdminProductsPage } from './pages/admin/AdminProductsPage';
import { AdminCustomersPage } from './pages/admin/AdminCustomersPage';
import { OrdersPage as AdminOrdersPage } from './pages/admin/OrdersPage';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/new-arrivals" element={<NewArrivalsPage />} />
        <Route path="/brands" element={<BrandsPage />} />
        <Route path="/seller" element={<SellerDashboard />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="products" element={<AdminProductsPage />} />
        <Route path="orders" element={<AdminOrdersPage />} />
        <Route path="customers" element={<AdminCustomersPage />} />
        <Route path="settings" element={<div>Settings Component</div>} />
      </Route>
    </Routes>
  );
}

export default App;

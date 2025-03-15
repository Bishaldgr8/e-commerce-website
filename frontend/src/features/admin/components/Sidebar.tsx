import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut } from 'lucide-react';
import { clsx } from 'clsx';
import styles from './Sidebar.module.css';
import { Button } from '../../../components/ui/Button';
import { useAuth } from '../../auth/context/AuthContext';

export const AdminSidebar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };
    return (
        <aside className={styles.sidebar}>
            <div className={styles.header}>
                Secret Shop Admin
            </div>

            <div className={styles.content}>
                <nav className={styles.nav}>
                    <NavLink
                        to="/admin"
                        end
                        className={({ isActive }) => clsx(styles.navItem, isActive && styles.active)}
                    >
                        <LayoutDashboard size={20} />
                        Dashboard
                    </NavLink>
                    <NavLink
                        to="/admin/products"
                        className={({ isActive }) => clsx(styles.navItem, isActive && styles.active)}
                    >
                        <Package size={20} />
                        Products
                    </NavLink>
                    <NavLink
                        to="/admin/orders"
                        className={({ isActive }) => clsx(styles.navItem, isActive && styles.active)}
                    >
                        <ShoppingCart size={20} />
                        Orders
                    </NavLink>
                    <NavLink
                        to="/admin/customers"
                        className={({ isActive }) => clsx(styles.navItem, isActive && styles.active)}
                    >
                        <Users size={20} />
                        Customers
                    </NavLink>
                    <NavLink
                        to="/admin/settings"
                        className={({ isActive }) => clsx(styles.navItem, isActive && styles.active)}
                    >
                        <Settings size={20} />
                        Settings
                    </NavLink>
                </nav>
            </div>

            <div className={styles.footer}>
                <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50" style={{ width: '100%', justifyContent: 'flex-start', color: '#ef4444' }} onClick={handleLogout}>
                    <LogOut size={20} style={{ marginRight: '0.75rem' }} />
                    Logout
                </Button>
            </div>
        </aside>
    );
};

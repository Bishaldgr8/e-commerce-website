import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Search, LogOut, Sun, Moon } from 'lucide-react';
import { Button } from '../ui/Button';
import styles from './Header.module.css';
import { clsx } from 'clsx';
import { useCart } from '../../features/cart/context/CartContext';
import { useAuth } from '../../features/auth/context/AuthContext';
import { useTheme } from '../../features/theme/context/ThemeContext';

export const Header = () => {
    const { totalItems } = useCart();
    const { user, isAuthenticated, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link to="/" className={styles.logo}>
                    <div style={{ width: 24, height: 24, background: 'black', borderRadius: '50%' }} />
                    THE SECRET SHOP
                </Link>

                <nav className={styles.nav}>
                    <NavLink to="/" className={({ isActive }) => clsx(styles.navLink, isActive && styles.active)}>
                        Shop
                    </NavLink>
                    <NavLink to="/new-arrivals" className={({ isActive }) => clsx(styles.navLink, isActive && styles.active)}>
                        New Arrivals
                    </NavLink>
                    <NavLink to="/brands" className={({ isActive }) => clsx(styles.navLink, isActive && styles.active)}>
                        Brands
                    </NavLink>

                    {isAuthenticated && user?.role === 'admin' && (
                        <NavLink to="/admin" className={({ isActive }) => clsx(styles.navLink, isActive && styles.active)} style={{ color: 'var(--color-primary)' }}>
                            Admin
                        </NavLink>
                    )}

                    {isAuthenticated && user?.role === 'seller' && (
                        <NavLink to="/seller" className={({ isActive }) => clsx(styles.navLink, isActive && styles.active)} style={{ color: 'var(--color-primary)' }}>
                            Seller
                        </NavLink>
                    )}
                </nav>

                <div className={styles.actions}>
                    <Button variant="ghost" size="sm" onClick={toggleTheme} title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}>
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </Button>
                    <Button variant="ghost" size="sm">
                        <Search size={20} />
                    </Button>
                    <Link to="/cart">
                        <Button variant="ghost" size="sm" style={{ position: 'relative' }}>
                            <ShoppingBag size={20} />
                            {totalItems > 0 && (
                                <span style={{
                                    position: 'absolute', top: -2, right: -2, backgroundColor: 'var(--color-primary)', color: 'white',
                                    fontSize: '0.625rem', fontWeight: 700, minWidth: '16px', height: '16px', borderRadius: '9999px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 2px'
                                }}>
                                    {totalItems}
                                </span>
                            )}
                        </Button>
                    </Link>

                    {isAuthenticated ? (
                        <>
                            <Link to="/account" title="Account">
                                <Button variant="ghost" size="sm">
                                    <User size={20} />
                                </Button>
                            </Link>
                            <Button variant="ghost" size="sm" onClick={handleLogout} title="Logout">
                                <LogOut size={20} />
                            </Button>
                        </>
                    ) : (
                        <Link to="/login">
                            <Button variant="ghost" size="sm">
                                <User size={20} />
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

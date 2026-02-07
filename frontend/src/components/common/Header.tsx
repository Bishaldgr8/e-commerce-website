import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Search, LogOut, Sun, Moon, Menu, X } from 'lucide-react';
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
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const NavLinks = () => (
        <>
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
        </>
    );

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link to="/" className={styles.logo}>
                    <div style={{ width: 24, height: 24, background: 'black', borderRadius: '50%' }} />
                    THE SECRET SHOP
                </Link>

                {/* Desktop Navigation */}
                <nav className={styles.nav}>
                    <NavLinks />
                </nav>

                <div className={styles.actions}>
                    <Button variant="ghost" size="sm" onClick={toggleTheme} title={theme === 'light' ? 'Dark Mode' : 'Light Mode'} className="hidden-mobile">
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </Button>
                    <Button variant="ghost" size="sm" className="hidden-mobile">
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
                            <Link to="/account" title="Account" className="hidden-mobile">
                                <Button variant="ghost" size="sm">
                                    <User size={20} />
                                </Button>
                            </Link>
                            <Button variant="ghost" size="sm" onClick={handleLogout} title="Logout" className="hidden-mobile">
                                <LogOut size={20} />
                            </Button>
                        </>
                    ) : (
                        <Link to="/login" className="hidden-mobile">
                            <Button variant="ghost" size="sm">
                                <User size={20} />
                            </Button>
                        </Link>
                    )}

                    {/* Mobile Menu Button */}
                    <div className={styles.mobileMenuBtn}>
                        <Button variant="ghost" size="sm" onClick={toggleMenu}>
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <div className={clsx(styles.mobileMenu, isMenuOpen && styles.open)}>
                    <NavLinks />

                    <div className={styles.mobileActions}>
                        <Button variant="outline" onClick={toggleTheme} style={{ justifyContent: 'flex-start' }}>
                            {theme === 'light' ? <Moon size={20} className="mr-2" /> : <Sun size={20} className="mr-2" />}
                            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                        </Button>

                        {isAuthenticated ? (
                            <>
                                <Link to="/account" style={{ width: '100%' }}>
                                    <Button variant="outline" style={{ width: '100%', justifyContent: 'flex-start' }}>
                                        <User size={20} style={{ marginRight: '0.5rem' }} /> Account
                                    </Button>
                                </Link>
                                <Button variant="outline" onClick={handleLogout} style={{ width: '100%', justifyContent: 'flex-start', color: '#ef4444', borderColor: '#ef4444' }}>
                                    <LogOut size={20} style={{ marginRight: '0.5rem' }} /> Logout
                                </Button>
                            </>
                        ) : (
                            <Link to="/login" style={{ width: '100%' }}>
                                <Button variant="primary" style={{ width: '100%' }}>
                                    Sign In
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

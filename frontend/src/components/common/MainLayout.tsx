import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Header } from './Header';
import styles from './MainLayout.module.css';

export const MainLayout = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            {/* Floating Background Blobs */}
            <div className="bg-blob" style={{ top: '-10%', left: '-10%', background: 'rgba(14, 165, 233, 0.2)' }} />
            <div className="bg-blob" style={{ bottom: '10%', right: '-10%', background: 'rgba(99, 102, 241, 0.2)', animationDelay: '-5s' }} />

            <Toaster position="top-center" richColors />
            <Header />
            <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
                <Outlet />
            </main>
            <footer className={styles.footer}>
                <div className={styles.footerContainer}>
                    <p className={styles.footerTitle}>THE SECRET SHOP</p>
                    <p style={{ marginBottom: '0.5rem' }}>© {new Date().getFullYear()} The Secret Shop. Curated with precision.</p>
                    <p style={{ fontSize: '0.8rem', marginTop: '1rem', opacity: 0.8 }}>
                        Made with precision by <strong>BishalB</strong>
                    </p>
                    <div className={styles.footerLinks}>
                        <a href="mailto:bishalboro10062003@gmail.com" className={styles.footerLink}>
                            📧 bishalboro10062003@gmail.com
                        </a>
                        <a href="https://github.com/Bishaldgr8" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
                            🔗 GitHub: Bishaldgr8
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

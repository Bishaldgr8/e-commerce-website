import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Header } from './Header';

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
            <footer style={{
                padding: '4rem 2rem',
                textAlign: 'center',
                marginTop: '4rem',
                fontSize: '0.875rem',
                color: 'var(--color-slate-400)',
                background: 'rgba(15, 23, 42, 0.03)',
                backdropFilter: 'blur(8px)',
                borderTop: '1px solid rgba(0,0,0,0.05)',
                position: 'relative',
                zIndex: 1
            }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                    <p style={{ fontWeight: 600, color: 'var(--color-slate-900)', marginBottom: '1rem', fontSize: '1.25rem' }}>THE SECRET SHOP</p>
                    <p style={{ marginBottom: '0.5rem' }}>© {new Date().getFullYear()} The Secret Shop. Curated with precision.</p>
                    <p style={{ fontSize: '0.8rem', marginTop: '1rem', opacity: 0.8 }}>
                        Made with precision by <strong>BishalB</strong>
                    </p>
                    <div style={{ marginTop: '0.75rem', display: 'flex', gap: '1.5rem', justifyContent: 'center', alignItems: 'center', fontSize: '0.8rem' }}>
                        <a href="mailto:bishalboro10062003@gmail.com" style={{ color: 'var(--color-slate-600)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-slate-900)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-slate-600)'}>
                            📧 bishalboro10062003@gmail.com
                        </a>
                        <a href="https://github.com/Bishaldgr8" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-slate-600)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-slate-900)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-slate-600)'}>
                            🔗 GitHub: Bishaldgr8
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

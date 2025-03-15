import { Outlet } from 'react-router-dom';
import { AdminSidebar } from './Sidebar';

export const AdminLayout = () => {
    return (
        <div style={{ paddingLeft: '280px', minHeight: '100vh', backgroundColor: 'var(--color-slate-50)' }}>
            <AdminSidebar />
            <main style={{ padding: '2rem' }}>
                <Outlet />
            </main>
        </div>
    );
};

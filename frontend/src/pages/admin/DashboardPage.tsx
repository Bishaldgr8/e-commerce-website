

export const DashboardPage = () => {
    return (
        <div>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 600, marginBottom: '2rem' }}>Dashboard</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <div style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: 'var(--radius)', border: '1px solid var(--color-border)' }}>
                    <h3 style={{ color: 'var(--color-slate-500)', fontSize: '0.875rem', fontWeight: 500 }}>Total Revenue</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 700, marginTop: '0.5rem' }}>$45,231.89</p>
                </div>
                <div style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: 'var(--radius)', border: '1px solid var(--color-border)' }}>
                    <h3 style={{ color: 'var(--color-slate-500)', fontSize: '0.875rem', fontWeight: 500 }}>Orders</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 700, marginTop: '0.5rem' }}>+2350</p>
                </div>
                <div style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: 'var(--radius)', border: '1px solid var(--color-border)' }}>
                    <h3 style={{ color: 'var(--color-slate-500)', fontSize: '0.875rem', fontWeight: 500 }}>Active Now</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 700, marginTop: '0.5rem' }}>+573</p>
                </div>
            </div>
        </div>
    );
};

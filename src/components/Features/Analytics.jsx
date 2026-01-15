
const Analytics = ({ tasks }) => {
    const total = tasks.length || 0;
    const completed = tasks.filter(t => t.is_completed).length || 0;
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    // Fake data for visualizer
    const bars = [40, 65, 30, 80, 55, percentage, 20];

    return (
        <div style={{ height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                    <div style={{ fontSize: '2.5rem', fontFamily: 'Teko', color: 'var(--c-secondary)', lineHeight: 0.8 }}>
                        {percentage}%
                    </div>
                    <p style={{ fontSize: '0.8rem', color: '#888', margin: 0 }}>EFFICIENCY_RATE</p>
                </div>
                <div style={{
                    background: 'rgba(0,0,0,0.5)',
                    border: '1px solid var(--c-purple)',
                    color: 'var(--c-purple)',
                    padding: '2px 8px',
                    fontFamily: 'Teko',
                    fontSize: '1rem'
                }}>
                    ▲ FLOW
                </div>
            </div>

            {/* Bar Chart Visualizer */}
            <div style={{
                display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
                height: '80px', gap: '5px',
                borderBottom: '1px solid #333', paddingBottom: '5px'
            }}>
                {bars.map((h, i) => (
                    <div key={i} style={{
                        width: '100%',
                        height: `${Math.max(10, h)}%`,
                        background: i === 5 ? 'var(--c-secondary)' : 'rgba(255,255,255,0.1)',
                        borderTop: i === 5 ? '2px solid white' : 'none',
                        transition: 'height 0.5s'
                    }}></div>
                ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px', color: '#444', fontFamily: 'Teko', fontSize: '1rem' }}>
                <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
            </div>
        </div>
    )
}

export default Analytics

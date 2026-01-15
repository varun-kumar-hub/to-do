
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const { user, signOut } = useAuth()
    const { theme, setTheme, themes } = useTheme()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await signOut()
        navigate('/login')
    }

    if (!user) return null;

    return (
        <nav style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '1rem 2rem', background: 'rgba(0,0,0,0.8)', borderBottom: '1px solid var(--primary)',
            backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100
        }}>
            {/* Brand */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <h1 style={{ fontFamily: 'Teko', fontSize: '2rem', color: 'var(--primary)', lineHeight: 1 }}>
                    SLAYER_OS
                </h1>
            </div>

            {/* Character Selector */}
            <div style={{ display: 'flex', gap: '0.8rem' }}>
                {themes.map(t => (
                    <button
                        key={t.id}
                        className={`char-select-btn ${theme === t.id ? 'active' : ''}`}
                        style={{ '--color': t.color }}
                        onClick={() => setTheme(t.id)}
                        title={t.name}
                    >
                        {t.icon}
                    </button>
                ))}
            </div>

            {/* User / Logout */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <span style={{ fontFamily: 'Noto Serif JP', fontSize: '0.9rem', color: 'var(--text-c)' }}>
                    Rank: <span style={{ color: 'var(--accent)' }}>Hashira</span>
                </span>
                <button className="game-btn" style={{ padding: '0.3rem 1rem', fontSize: '1rem' }} onClick={handleLogout}>
                    EXIT
                </button>
            </div>
        </nav>
    )
}

export default Navbar

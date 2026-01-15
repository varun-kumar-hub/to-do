
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const { user, signOut } = useAuth()
    const { theme, setTheme, themes } = useTheme()
    const navigate = useNavigate()
    const [showThemes, setShowThemes] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const handleLogoutClick = () => {
        setShowConfirm(true)
    }

    const confirmLogout = async () => {
        await signOut()
        navigate('/login')
    }

    if (!user) return null;

    return (
        <nav style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '0.8rem 2rem', background: 'rgba(0,0,0,0.9)', borderBottom: '1px solid var(--primary)',
            backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100, height: '70px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                {/* Brand Section */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <img src="/logo.png" alt="Logo" style={{ height: '40px', filter: 'drop-shadow(0 0 5px var(--primary))' }} />
                    <h1 style={{
                        fontFamily: 'Teko', fontSize: '1.8rem', color: 'var(--primary)',
                        lineHeight: 1, margin: 0, letterSpacing: '1px', textTransform: 'uppercase'
                    }}>
                        DEMON CORPS
                    </h1>
                </div>

                {/* Vertical Divider */}
                <div style={{ width: '1px', height: '30px', background: 'rgba(255,255,255,0.2)' }}></div>

                {/* Navigation Links */}
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="game-btn" style={{ fontSize: '0.85rem', padding: '0.3rem 0.8rem', minWidth: '80px' }} onClick={() => navigate('/')}>
                        ⚔️ MISSIONS
                    </button>
                    <button className="game-btn" style={{ fontSize: '0.85rem', padding: '0.3rem 0.8rem', minWidth: '80px' }} onClick={() => navigate('/notes')}>
                        📜 NOTES
                    </button>
                    <button className="game-btn" style={{ fontSize: '0.85rem', padding: '0.3rem 0.8rem', minWidth: '80px' }} onClick={() => navigate('/images')}>
                        📷 VISUALS
                    </button>
                </div>
            </div>

            {/* Right Side: Themes & User */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>

                {/* Theme Dropdown */}
                <div style={{ position: 'relative' }}>
                    <button
                        className="game-btn"
                        onClick={() => setShowThemes(!showThemes)}
                        style={{ padding: '0.3rem 0.8rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        <span>🎨 BREATHING STYLES</span>
                        <span style={{ fontSize: '0.8rem' }}>▼</span>
                    </button>

                    {showThemes && (
                        <div style={{
                            position: 'absolute', top: '130%', left: '50%', transform: 'translateX(-50%)',
                            background: 'rgba(15,15,15,0.98)', border: '1px solid var(--primary)',
                            padding: '1.2rem', borderRadius: '8px',
                            display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.8rem',
                            width: '320px', boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
                            zIndex: 200
                        }}>
                            {themes.map(t => (
                                <button
                                    key={t.id}
                                    className={`char-select-btn ${theme === t.id ? 'active' : ''}`}
                                    style={{
                                        '--color': t.color,
                                        width: '45px', height: '45px',
                                        padding: 0,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        borderRadius: '50%',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onClick={() => { setTheme(t.id); setShowThemes(false); }}
                                    title={t.name}
                                >
                                    {t.icon}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* User Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontFamily: 'Noto Serif JP', fontSize: '0.9rem', color: 'var(--text-c)' }}>
                        Rank: <span style={{ color: 'var(--accent)' }}>Hashira</span>
                    </span>
                    <button className="game-btn" style={{ padding: '0.3rem 1rem', fontSize: '1rem' }} onClick={handleLogoutClick}>
                        EXIT
                    </button>
                </div>
            </div>

            {/* Logout Confirmation Modal */}
            {showConfirm && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(5px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 1000
                }} onClick={() => setShowConfirm(false)}>
                    <div style={{
                        background: 'rgba(20,20,20,0.95)', border: '1px solid var(--primary)',
                        padding: '2rem', borderRadius: '8px', maxWidth: '400px', width: '90%',
                        textAlign: 'center', boxShadow: '0 0 30px rgba(0,0,0,0.8)',
                        transform: 'scale(1.1)', position: 'relative'
                    }} onClick={e => e.stopPropagation()}>
                        <h3 style={{
                            fontFamily: 'Teko', fontSize: '2rem', margin: '0 0 1rem 0',
                            color: 'var(--primary)', textTransform: 'uppercase'
                        }}>
                            RETIRE FROM CORPS?
                        </h3>
                        <p style={{ fontFamily: 'Noto Serif JP', color: 'rgba(255,255,255,0.8)', marginBottom: '2rem' }}>
                            Are you sure you want to exit? Your mission is not yet complete.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <button
                                className="game-btn"
                                style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.3)' }}
                                onClick={() => setShowConfirm(false)}
                            >
                                CANCEL
                            </button>
                            <button
                                className="game-btn"
                                style={{ background: 'rgba(255,0,0,0.2)', border: '1px solid #ff4444', color: '#ff4444' }}
                                onClick={confirmLogout}
                            >
                                CONFIRM EXIT
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar

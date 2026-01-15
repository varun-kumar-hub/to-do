
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { useNavigate } from 'react-router-dom'

import './Navbar.css'

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
        <nav className="navbar">
            <div className="nav-brand">
                {/* Brand Section */}
                <img src="/logo.png" alt="Logo" className="nav-logo" />
                <h1 className="nav-title">
                    DEMON CORPS
                </h1>

                {/* Vertical Divider */}
                <div className="nav-divider"></div>

                {/* Navigation Links */}
                <div className="nav-links">
                    <button className="game-btn nav-link-btn" onClick={() => navigate('/')}>
                        ⚔️ MISSIONS
                    </button>
                    <button className="game-btn nav-link-btn" onClick={() => navigate('/notes')}>
                        📜 NOTES
                    </button>
                    <button className="game-btn nav-link-btn" onClick={() => navigate('/images')}>
                        📷 VISUALS
                    </button>
                </div>
            </div>

            {/* Right Side: Themes & User */}
            <div className="nav-right">

                {/* Theme Dropdown */}
                <div className="theme-wrapper">
                    <button
                        className="game-btn theme-toggle-btn"
                        onClick={() => setShowThemes(!showThemes)}
                    >
                        <span>🎨 BREATHING STYLES</span>
                        <span className="dropdown-arrow">▼</span>
                    </button>

                    {showThemes && (
                        <div className="theme-menu">
                            {themes.map(t => (
                                <button
                                    key={t.id}
                                    className={`char-select-btn ${theme === t.id ? 'active' : ''}`}
                                    style={{
                                        '--color': t.color
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
                <div className="user-section">
                    <span className="user-rank">
                        Rank: <span className="rank-title">Hashira</span>
                    </span>
                    <button className="game-btn btn-exit" onClick={handleLogoutClick}>
                        EXIT
                    </button>
                </div>
            </div>

            {/* Logout Confirmation Modal */}
            {showConfirm && (
                <div className="modal-overlay" onClick={() => setShowConfirm(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h3 className="modal-title">
                            RETIRE FROM CORPS?
                        </h3>
                        <p className="modal-text">
                            Are you sure you want to exit? Your mission is not yet complete.
                        </p>
                        <div className="modal-actions">
                            <button
                                className="game-btn btn-cancel"
                                onClick={() => setShowConfirm(false)}
                            >
                                CANCEL
                            </button>
                            <button
                                className="game-btn btn-confirm"
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

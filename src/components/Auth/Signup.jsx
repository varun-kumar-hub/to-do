import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { signUp } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            const { data, error: signUpError } = await signUp({ email, password })
            if (signUpError) throw signUpError
            if (data.user && data.session) {
                navigate('/')
            } else if (data.user && !data.session) {
                // User created but needs email verification
                alert('Signup successful! Please check your email to confirm your account before logging in.')
                navigate('/login')
            }
        } catch (e) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            minHeight: '100vh', padding: '1rem',
            background: 'url(/gyomei_bg_1768482424920.png) no-repeat center center fixed',
            backgroundSize: 'cover'
        }}>
            {/* Dark Overlay */}
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 0 }}></div>

            <div className="game-panel" style={{
                width: '100%', maxWidth: '420px', padding: '2.5rem',
                position: 'relative', zIndex: 1,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem',
                boxShadow: '0 0 50px rgba(0,0,0,0.8)'
            }}>

                {/* Logo & Header */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src="/logo.png" alt="Demon Corps" style={{ height: '80px', filter: 'drop-shadow(0 0 10px var(--primary))', marginBottom: '1rem' }} />
                    <h2 style={{
                        fontFamily: 'Teko', fontSize: '3rem', margin: 0, lineHeight: 0.8,
                        color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '2px'
                    }}>
                        JOIN THE CORPS
                    </h2>
                    <span style={{
                        fontFamily: 'Noto Serif JP', fontSize: '1rem',
                        color: 'rgba(255,255,255,0.7)', letterSpacing: '5px', marginTop: '0.5rem'
                    }}>
                        鬼殺隊入隊
                    </span>
                </div>

                {error && <div style={{
                    width: '100%', padding: '0.8rem', background: 'rgba(255,0,0,0.1)',
                    border: '1px solid #ff4444', color: '#ff4444', fontSize: '0.9rem', textAlign: 'center'
                }}>{error}</div>}

                <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontFamily: 'Teko', fontSize: '1.2rem', color: 'var(--accent)' }}>EMAIL</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                background: 'rgba(0,0,0,0.3)', border: '1px solid var(--primary)',
                                padding: '0.8rem', color: 'white', fontSize: '1rem',
                                outline: 'none', transition: 'all 0.3s ease'
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontFamily: 'Teko', fontSize: '1.2rem', color: 'var(--accent)' }}>PASSWORD</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            style={{
                                background: 'rgba(0,0,0,0.3)', border: '1px solid var(--primary)',
                                padding: '0.8rem', color: 'white', fontSize: '1rem',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontFamily: 'Teko', fontSize: '1.2rem', color: 'var(--accent)' }}>CONFIRM PASSWORD</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            minLength={6}
                            style={{
                                background: 'rgba(0,0,0,0.3)', border: '1px solid var(--primary)',
                                padding: '0.8rem', color: 'white', fontSize: '1rem',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="game-btn"
                        style={{ marginTop: '1rem', padding: '1rem', fontSize: '1.2rem' }}
                    >
                        {loading ? 'FORGING KATANA...' : 'BECOME A SLAYER'}
                    </button>
                </form>

                <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', marginTop: '1rem' }}>
                    Already a member? <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', borderBottom: '1px solid var(--primary)' }}>Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Signup

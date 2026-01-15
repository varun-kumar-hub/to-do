
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import './Auth.css'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { signUp } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
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
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Sign Up</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                        />
                    </div>
                    <button disabled={loading} className="auth-button" type="submit">
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>
                <div className="auth-link">
                    Already have an account? <Link to="/login">Log In</Link>
                </div>
            </div>
        </div>
    )
}

export default Signup

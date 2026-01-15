
import { useState, useEffect } from 'react'

const FocusTimer = () => {
    const [minutes, setMinutes] = useState(25)
    const [seconds, setSeconds] = useState(0)
    const [isActive, setIsActive] = useState(false)
    const [mode, setMode] = useState('focus')

    useEffect(() => {
        let interval = null
        if (isActive) {
            interval = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        setIsActive(false)
                        setMode(mode === 'focus' ? 'break' : 'focus')
                        setMinutes(mode === 'focus' ? 5 : 25)
                    } else {
                        setMinutes(minutes - 1)
                        setSeconds(59)
                    }
                } else {
                    setSeconds(seconds - 1)
                }
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [isActive, minutes, seconds, mode])

    const toggleTimer = () => setIsActive(!isActive)
    const resetTimer = () => {
        setIsActive(false)
        setMinutes(25)
        setSeconds(0)
        setMode('focus')
    }

    return (
        <div style={{ textAlign: 'center', position: 'relative' }}>
            <h3 style={{
                color: 'var(--c-secondary)',
                fontFamily: 'Teko',
                fontSize: '1.5rem',
                marginBottom: '0',
                letterSpacing: '2px'
            }}>
                {mode === 'focus' ? 'SYNC_TIMER' : 'COOLDOWN'}
            </h3>

            <div style={{
                position: 'relative',
                display: 'inline-block',
                margin: '1rem 0'
            }}>
                {/* Animated Rings */}
                <div style={{
                    position: 'absolute', top: '-10px', left: '-10px', right: '-10px', bottom: '-10px',
                    border: '2px dashed var(--c-primary)', borderRadius: '50%',
                    animation: isActive ? 'spin 10s infinite linear' : 'none',
                    opacity: 0.5
                }}></div>

                <div style={{
                    fontSize: '4rem',
                    fontFamily: 'Teko',
                    fontWeight: 500,
                    color: isActive ? 'white' : 'var(--text-dim)',
                    lineHeight: 1,
                    textShadow: isActive ? '0 0 20px var(--c-primary)' : 'none'
                }}>
                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button
                    onClick={toggleTimer}
                    className="btn-anime"
                    style={{ fontSize: '1.2rem', padding: '0.2rem 1.5rem', background: isActive ? 'var(--c-primary)' : 'transparent', border: '1px solid var(--c-primary)' }}
                >
                    {isActive ? 'HALT' : 'INIT'}
                </button>

                <button
                    onClick={resetTimer}
                    style={{
                        background: 'transparent', border: '1px solid #555', color: '#555',
                        fontFamily: 'Teko', fontSize: '1.2rem', cursor: 'pointer'
                    }}
                >
                    RST
                </button>
            </div>
        </div>
    )
}

export default FocusTimer

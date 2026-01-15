
import { useState } from 'react'
import { smartParse } from '../../utils/smartParser'

const TaskForm = ({ onAddTask }) => {
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)

    // Real-time preview of smart parsing
    const preview = input ? smartParse(input) : null

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!input.trim()) return

        setLoading(true)
        const result = await onAddTask(input, '') // Description handled in smart input later if needed, for now just title
        if (result.success) {
            setInput('')
        }
        setLoading(false)
    }

    return (
        <form onSubmit={handleSubmit} style={{ position: 'relative', marginBottom: '2rem' }}>
            <input
                type="text"
                placeholder="Add task... (Try 'Meeting tomorrow !p1 #work')"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    fontSize: '1.2rem',
                    color: 'var(--text-main)',
                    padding: '1rem 0',
                    borderBottom: '1px solid var(--border-subtle)'
                }}
                autoFocus
            />

            {/* Smart Preview Hints */}
            {preview && input && (
                <div style={{
                    position: 'absolute',
                    right: 0,
                    top: '1rem',
                    display: 'flex',
                    gap: '0.5rem',
                    pointerEvents: 'none'
                }}>
                    {preview.priority !== 'p4' && (
                        <span style={{ fontSize: '0.75rem', background: 'var(--bg-panel)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                            Priority: {preview.priority.toUpperCase()}
                        </span>
                    )}
                    {preview.dueDate && (
                        <span style={{ fontSize: '0.75rem', background: 'var(--bg-panel)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--border-subtle)', color: 'var(--accent)' }}>
                            📅 {preview.dueDate.toLocaleDateString()}
                        </span>
                    )}
                </div>
            )}
        </form>
    )
}
export default TaskForm

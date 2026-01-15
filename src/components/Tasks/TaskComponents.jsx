
// -- TaskForm --
import { useState } from 'react'
import { smartParse } from '../../utils/smartParser'
import { useTheme } from '../../context/ThemeContext'

export const TaskForm = ({ onAddTask }) => {
    const [input, setInput] = useState('')
    const { theme } = useTheme()
    const preview = input ? smartParse(input) : null

    const handleSubmit = async (e) => {
        e.preventDefault(); if (!input.trim()) return;
        if ((await onAddTask(input, '')).success) setInput('');
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ position: 'relative' }}>
                <textarea
                    placeholder="Describe mission objective..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    rows={3}
                    style={{
                        width: '100%', padding: '0.8rem', fontSize: '1rem',
                        border: '1px solid var(--primary)', borderRadius: '4px',
                        background: 'rgba(0,0,0,0.3)', color: 'white',
                        resize: 'none', fontFamily: 'Sawarabi Mincho'
                    }}
                />
                {preview && input && (
                    <div style={{
                        marginTop: '0.5rem',
                        fontSize: '0.8rem', color: 'var(--accent)', fontFamily: 'Teko'
                    }}>
                        DETECTED: {preview.priority.toUpperCase()} {preview.dueDate ? ' | ' + preview.dueDate.toLocaleDateString() : ''}
                    </div>
                )}
            </div>
            <button type="submit" className="game-btn" style={{ width: '100%' }}>SUMMON CROW</button>
        </form>
    )
}

// -- TaskItem (Horizontal Card) --
export const TaskItem = ({ task, onToggle, onDelete }) => {
    const tags = task.title.match(/#\w+/g) || []
    const displayTitle = task.title.replace(/#\w+/g, '').trim()

    return (
        <div className="task-card" style={{ opacity: task.is_completed ? 0.6 : 1 }}>
            <div
                onClick={() => onToggle(task.id, task.is_completed)}
                style={{
                    width: '24px', height: '24px',
                    border: '2px solid var(--primary)',
                    background: task.is_completed ? 'var(--primary)' : 'transparent',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transform: 'rotate(45deg)', margin: '0 0.5rem'
                }}
            >
                {task.is_completed && <div style={{ width: '10px', height: '10px', background: 'white' }}></div>}
            </div>

            <div style={{ flex: 1 }}>
                <div style={{
                    fontSize: '1.1rem', fontFamily: 'Noto Serif JP',
                    textDecoration: task.is_completed ? 'line-through' : 'none',
                    textShadow: '0 0 5px rgba(0,0,0,0.8)'
                }}>
                    {displayTitle}
                </div>
                <div style={{ display: 'flex', gap: '5px', marginTop: '2px' }}>
                    {tags.map((t, i) => <span key={i} style={{ fontSize: '0.7rem', border: '1px solid var(--accent)', padding: '0 4px', color: 'var(--accent)', borderRadius: '2px' }}>{t}</span>)}
                    {task.priority !== 'p4' && <span style={{ fontSize: '0.7rem', color: '#ff5555' }}>✦ {task.priority.toUpperCase()}</span>}
                </div>
            </div>

            <button onClick={() => onDelete(task.id)} style={{
                background: 'transparent', border: 'none', color: '#ff5555',
                fontSize: '1.2rem', cursor: 'pointer', fontFamily: 'Teko',
                opacity: 0.5
            }} title="Eliminate">
                ✕
            </button>
        </div>
    )
}

// -- TaskList --
export const TaskList = ({ tasks, onToggle, onDelete }) => {
    if (tasks.length === 0) return <div style={{ textAlign: 'center', marginTop: '2rem', opacity: 0.5, fontFamily: 'Teko', fontSize: '1.5rem' }}>NO ACTIVE DEMONS</div>;
    return <div>{tasks.map(t => <TaskItem key={t.id} task={t} onToggle={onToggle} onDelete={onDelete} />)}</div>
}

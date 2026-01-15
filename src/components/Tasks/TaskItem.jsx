
const TaskItem = ({ task, onToggle, onDelete }) => {
    // Parsing #tags manually for display
    const tags = task.title.match(/#\w+/g) || []
    const displayTitle = task.title.replace(/#\w+/g, '').trim()

    const priorityColor = {
        'p1': 'var(--p1)',
        'p2': 'var(--p2)',
        'p3': 'var(--p3)',
        'p4': 'var(--text-muted)'
    }[task.priority || 'p4']

    return (
        <div className="panel" style={{
            padding: '0.75rem 1rem',
            marginBottom: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid transparent',
            transition: 'all 0.2s'
        }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--border-active)'}
            onMouseOut={(e) => e.currentTarget.style.borderColor = 'transparent'}
        >
            <input
                type="checkbox"
                checked={task.is_completed}
                onChange={() => onToggle(task.id, task.is_completed)}
                style={{
                    width: '18px',
                    height: '18px',
                    accentColor: 'var(--text-main)',
                    cursor: 'pointer'
                }}
            />

            <div style={{ flex: 1, opacity: task.is_completed ? 0.5 : 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{
                        fontSize: '0.95rem',
                        textDecoration: task.is_completed ? 'line-through' : 'none',
                        color: 'var(--text-main)'
                    }}>
                        {displayTitle}
                    </span>

                    {/* Priority Dot */}
                    {task.priority !== 'p4' && (
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: priorityColor }} title={`Priority: ${task.priority}`}></div>
                    )}

                    {/* Tags */}
                    {tags.map((tag, i) => (
                        <span key={i} style={{
                            fontSize: '0.75rem',
                            color: 'var(--text-muted)',
                            background: 'rgba(255,255,255,0.05)',
                            padding: '2px 6px',
                            borderRadius: '4px'
                        }}>
                            {tag}
                        </span>
                    ))}
                </div>
                {(task.description || task.due_date) && (
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-faint)', marginTop: '2px', display: 'flex', gap: '1rem' }}>
                        {task.description && <span>{task.description}</span>}
                        {task.due_date && (
                            <span style={{ color: 'var(--accent)' }}>
                                📅 {new Date(task.due_date).toLocaleDateString()}
                            </span>
                        )}
                    </div>
                )}
            </div>

            <button className="btn-reset" onClick={() => onDelete(task.id)} style={{ color: 'var(--text-faint)', opacity: 0.5, fontSize: '1.2rem' }}>×</button>
        </div>
    )
}
export default TaskItem

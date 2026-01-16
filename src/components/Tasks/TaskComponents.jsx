
// -- TaskForm --
import { useState } from 'react'
import { smartParse } from '../../utils/smartParser'
import { useTheme } from '../../context/ThemeContext'

export const TaskForm = ({ onAddTask, defaultType }) => {
    const [input, setInput] = useState('')
    const [description, setDescription] = useState('')
    const [dueTime, setDueTime] = useState('')
    const [imageFile, setImageFile] = useState(null)
    const [type, setType] = useState(defaultType || 'task')
    const { theme } = useTheme()
    const preview = input ? smartParse(input) : null

    // Determine visibility based on type
    const showTitle = type === 'task';
    const showNotes = type === 'note';
    const showTime = type === 'task';
    const showImage = type === 'image';

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Derive Title if hidden
        let finalTitle = input;
        if (type === 'note') {
            if (!description.trim()) return;
            // Use first few words of note as title
            finalTitle = description.split(' ').slice(0, 5).join(' ') + '...';
        } else if (type === 'image') {
            if (!imageFile) return;
            finalTitle = imageFile.name || 'Visual Log';
        } else {
            // Task type
            if (!input.trim()) return;
        }

        const result = await onAddTask(finalTitle, description, dueTime, imageFile, type);
        if (result.success) {
            setInput('');
            setDescription('');
            setDueTime('');
            setImageFile(null);
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ position: 'relative' }}>

                {/* Title Input - ONLY FOR TASKS */}
                {showTitle && (
                    <textarea
                        placeholder="Describe mission objective..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        rows={2}
                        style={{
                            width: '100%', padding: '0.8rem', fontSize: '1rem',
                            border: '1px solid var(--primary)', borderRadius: '4px',
                            background: 'rgba(0,0,0,0.3)', color: 'white',
                            resize: 'none', fontFamily: 'Sawarabi Mincho'
                        }}
                    />
                )}

                {/* Notes Field - ONLY FOR NOTES */}
                {showNotes && (
                    <textarea
                        placeholder="Mission Details (Notes)..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        style={{
                            width: '100%', padding: '0.8rem', fontSize: '1rem',
                            border: '1px solid var(--primary)', borderRadius: '4px',
                            background: 'rgba(0,0,0,0.3)', color: 'rgba(255,255,255,0.9)',
                            resize: 'vertical', fontFamily: 'Sawarabi Mincho'
                        }}
                    />
                )}

                {/* Smart Parse Preview - ONLY FOR TASKS */}
                {showTitle && preview && input && (
                    <div style={{
                        marginTop: '0.5rem',
                        fontSize: '0.8rem', color: 'var(--accent)', fontFamily: 'Teko'
                    }}>
                        DETECTED: {preview.priority.toUpperCase()} {preview.dueDate ? ' | ' + preview.dueDate.toLocaleDateString() : ''}
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>

                {/* Time Input - ONLY FOR TASKS */}
                {showTime && (
                    <input
                        type="time"
                        value={dueTime}
                        onChange={(e) => setDueTime(e.target.value)}
                        style={{
                            background: 'rgba(0,0,0,0.3)', border: '1px solid var(--primary)',
                            color: 'white', padding: '0.5rem', borderRadius: '4px',
                            fontFamily: 'Teko', flex: '1 1 100px'
                        }}
                    />
                )}

                {/* Image Input - ONLY FOR IMAGES */}
                {showImage && (
                    <div style={{ position: 'relative', overflow: 'hidden', flex: '1 1 100px' }}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImageFile(e.target.files[0])}
                            style={{
                                position: 'absolute', opacity: 0, width: '100%', height: '100%', cursor: 'pointer'
                            }}
                        />
                        <div style={{
                            background: 'rgba(0,0,0,0.3)', border: '1px solid var(--primary)',
                            color: imageFile ? 'var(--accent)' : 'white', padding: '0.5rem', borderRadius: '4px',
                            fontFamily: 'Teko', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                        }}>
                            {imageFile ? '📷 ' + imageFile.name : '📷 ATTACH IMAGE'}
                        </div>
                    </div>
                )}

                <button type="submit" className="game-btn" style={{ flex: '2 1 150px' }}>SUMMON CROW</button>
            </div>
        </form>
    )
}

// -- TaskItem (Horizontal Card) --
export const TaskItem = ({ task, onToggle, onDelete }) => {
    const tags = task.title.match(/#\w+/g) || []
    const displayTitle = task.title.replace(/#\w+/g, '').trim()

    // Format Date/Time
    const dateObj = task.due_date ? new Date(task.due_date) : null;
    const timeString = dateObj ? dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
    const dateString = dateObj ? dateObj.toLocaleDateString() : '';

    const [expanded, setExpanded] = useState(false);

    return (
        <div className="task-card" style={{ opacity: task.is_completed ? 0.6 : 1, flexDirection: 'column', alignItems: 'stretch' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                    onClick={() => onToggle(task.id, task.is_completed)}
                    style={{
                        width: '24px', height: '24px',
                        border: '2px solid var(--primary)',
                        background: task.is_completed ? 'var(--primary)' : 'transparent',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transform: 'rotate(45deg)', margin: '0 0.5rem 0 0', flexShrink: 0
                    }}
                >
                    {task.is_completed && <div style={{ width: '10px', height: '10px', background: 'white' }}></div>}
                </div>

                <div style={{ flex: 1, cursor: 'pointer' }} onClick={() => setExpanded(!expanded)}>
                    <div style={{
                        fontSize: '1.1rem', fontFamily: 'Noto Serif JP',
                        textDecoration: task.is_completed ? 'line-through' : 'none',
                        textShadow: '0 0 5px rgba(0,0,0,0.8)'
                    }}>
                        {displayTitle}
                    </div>
                    <div style={{ display: 'flex', gap: '5px', marginTop: '2px', alignItems: 'center', flexWrap: 'wrap' }}>
                        {tags.map((t, i) => <span key={i} style={{ fontSize: '0.7rem', border: '1px solid var(--accent)', padding: '0 4px', color: 'var(--accent)', borderRadius: '2px' }}>{t}</span>)}
                        {task.priority !== 'p4' && <span style={{ fontSize: '0.7rem', color: '#ff5555' }}>✦ {task.priority.toUpperCase()}</span>}
                        {dateObj && (
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-c)', opacity: 0.8, marginLeft: '0.5rem' }}>
                                ⏳ {dateString} {timeString}
                            </span>
                        )}
                        {(task.description || task.image_url) && (
                            <span style={{ fontSize: '0.7rem', color: 'var(--accent)' }}>
                                {expanded ? '▲ LESS' : '▼ MORE'}
                            </span>
                        )}
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

            {/* EXPANDED CONTENT: Description & Image */}
            {expanded && (
                <div style={{ marginTop: '0.5rem', paddingLeft: '2rem', borderLeft: '2px solid var(--accent)', marginLeft: '1rem' }}>
                    {task.description && (
                        <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', whiteSpace: 'pre-wrap', marginBottom: '0.5rem' }}>
                            {task.description}
                        </div>
                    )}
                    {task.image_url && (
                        <img
                            src={task.image_url}
                            alt="Mission Intel"
                            style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '4px', border: '1px solid var(--border-c)' }}
                        />
                    )}
                </div>
            )}
        </div>
    )
}

// -- TaskList --
export const TaskList = ({ tasks, onToggle, onDelete }) => {
    if (tasks.length === 0) return <div style={{ textAlign: 'center', marginTop: '2rem', opacity: 0.5, fontFamily: 'Teko', fontSize: '1.5rem' }}>NO ACTIVE DEMONS</div>;
    return <div>{tasks.map(t => <TaskItem key={t.id} task={t} onToggle={onToggle} onDelete={onDelete} />)}</div>
}

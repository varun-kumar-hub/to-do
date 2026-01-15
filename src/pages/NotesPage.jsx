import { useTasks } from '../hooks/useTasks'
import { TaskForm, TaskList } from '../components/Tasks/TaskComponents'
import { useTheme } from '../context/ThemeContext'

const NotesPage = () => {
    const { tasks, loading, error, addTask, toggleTaskCompletion, deleteTask } = useTasks()
    const { theme } = useTheme()

    if (loading && tasks.length === 0) {
        return <div style={{ height: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: 'Teko', fontSize: '2rem' }}>LOADING ARCHIVES...</div>
    }

    // Filter only Notes
    const notes = tasks.filter(t => t.type === 'note');

    return (
        <div style={{
            padding: '2rem',
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 2fr', /* Split Layout */
            gap: '2rem',
            alignItems: 'start'
        }}>

            {/* LEFT COLUMN: INPUT */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div className="game-panel">
                    <h3 style={{ fontFamily: 'Teko', fontSize: '1.5rem', color: 'var(--accent)', margin: 0 }}>
                        STATUS
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                        <div style={{ fontSize: '2.5rem' }}>📜</div>
                        <div>
                            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Scribe</div>
                            <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Style: {theme.toUpperCase()}</div>
                        </div>
                    </div>
                </div>

                <div className="game-panel" style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontFamily: 'Teko', fontSize: '1.5rem', margin: '0 0 1rem 0' }}>
                        NEW ENTRY
                    </h3>
                    <TaskForm onAddTask={addTask} defaultType="note" />
                </div>
            </div>

            {/* RIGHT COLUMN: LIST */}
            <div className="game-panel" style={{ minHeight: '600px' }}>
                <div style={{
                    borderBottom: '1px solid rgba(255,255,255,0.2)', marginBottom: '1rem',
                    paddingBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                    <h2 style={{ fontSize: '2rem', fontFamily: 'Noto Serif JP', margin: 0, textShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
                        FIELD NOTES
                    </h2>
                    <span style={{ fontFamily: 'Teko', fontSize: '1.2rem', color: 'var(--primary)' }}>
                        COUNT: {notes.length}
                    </span>
                </div>

                {error && <div style={{ color: '#ff5555', background: 'rgba(0,0,0,0.8)', padding: '1rem', border: '1px solid #ff5555', marginBottom: '1rem' }}>ERROR: {error}</div>}

                <div style={{ maxHeight: '600px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                    <TaskList
                        tasks={notes}
                        onToggle={toggleTaskCompletion} // Notes might not need completion, but keeping for consistency or deletion
                        onDelete={deleteTask}
                    />
                </div>
            </div>

        </div>
    )
}
export default NotesPage

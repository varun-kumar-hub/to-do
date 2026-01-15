import { useTasks } from '../hooks/useTasks'
import { TaskForm, TaskList } from '../components/Tasks/TaskComponents'
import { useTheme } from '../context/ThemeContext'

import './Dashboard.css'

const NotesPage = () => {
    const { tasks, loading, error, addTask, toggleTaskCompletion, deleteTask } = useTasks()
    const { theme } = useTheme()

    if (loading && tasks.length === 0) {
        return <div className="loading-state">LOADING ARCHIVES...</div>
    }

    // Filter only Notes
    const notes = tasks.filter(t => t.type === 'note');

    return (
        <div className="dashboard-container">

            {/* LEFT COLUMN: INPUT */}
            <div className="dashboard-left">
                <div className="game-panel">
                    <h3 style={{ fontFamily: 'Teko', fontSize: '1.5rem', color: 'var(--accent)', margin: 0 }}>
                        STATUS
                    </h3>
                    <div className="status-content">
                        <div className="status-icon">📜</div>
                        <div>
                            <div className="status-details">Scribe</div>
                            <div className="status-sub">Style: {theme.toUpperCase()}</div>
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
            <div className="game-panel dashboard-right">
                <div className="section-header">
                    <h2 className="section-title">
                        FIELD NOTES
                    </h2>
                    <span className="item-count">
                        COUNT: {notes.length}
                    </span>
                </div>

                {error && <div className="error-box">ERROR: {error}</div>}

                <div className="scrollable-list">
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

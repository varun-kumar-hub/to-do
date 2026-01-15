
import { useState } from 'react'
import { useTasks } from '../hooks/useTasks'
import { TaskForm, TaskList } from '../components/Tasks/TaskComponents'
import { useTheme } from '../context/ThemeContext'

import './Dashboard.css'

const Dashboard = () => {
    const { tasks, loading, error, addTask, toggleTaskCompletion, deleteTask, refreshTasks } = useTasks()
    const { theme } = useTheme()
    const [activeTab, setActiveTab] = useState('missions') // 'missions' | 'notes'

    if (loading && tasks.length === 0) {
        return <div className="loading-state">LOADING WORLD...</div>
    }

    // Filter Tasks vs Notes
    // Assume if 'type' is missing, it's a task
    const filteredItems = tasks.filter(t => {
        const itemType = t.type || 'task';
        return activeTab === 'missions' ? itemType === 'task' : itemType === 'note';
    });

    return (
        <div className="dashboard-container">

            {/* LEFT COLUMN: COMMAND POST (Input) */}
            <div className="dashboard-left">

                {/* Status Card */}
                <div className="game-panel">
                    <h3 style={{ fontFamily: 'Teko', fontSize: '1.5rem', color: 'var(--accent)', margin: 0 }}>
                        STATUS
                    </h3>
                    <div className="status-content">
                        <div className="status-icon">{theme === 'gyomei' ? '🪨' : '⚔️'}</div>
                        <div>
                            <div className="status-details">Hashira</div>
                            <div className="status-sub">Style: {theme.toUpperCase()}</div>
                        </div>
                    </div>
                </div>

                {/* Input Form Panel */}
                <div className="game-panel" style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontFamily: 'Teko', fontSize: '1.5rem', margin: '0 0 1rem 0' }}>
                        NEW ORDER
                    </h3>
                    <TaskForm onAddTask={addTask} />
                </div>

            </div>

            {/* RIGHT COLUMN: MISSION LOG (List) */}
            <div className="game-panel dashboard-right">
                <div className="section-header">
                    <h2 className="section-title">
                        ACTIVE MISSIONS
                    </h2>
                    <span className="item-count">
                        COUNT: {filteredItems.length}
                    </span>
                </div>

                {error && <div className="error-box">ERROR: {error}</div>}

                <div className="scrollable-list">
                    <TaskList
                        tasks={filteredItems}
                        onToggle={toggleTaskCompletion}
                        onDelete={deleteTask}
                    />
                </div>
            </div>

        </div>
    )
}
export default Dashboard

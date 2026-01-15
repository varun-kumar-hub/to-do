
import { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'
import { useAuth } from '../context/AuthContext'
import { smartParse } from '../utils/smartParser'

export const useTasks = () => {
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { user } = useAuth()

    const fetchTasks = async () => {
        if (!user) return
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('tasks')
                .select('*')
                .order('is_completed', { ascending: true }) // Active first
                .order('priority', { ascending: true })     // High priority first (string sort: p1 < p2)
                .order('created_at', { ascending: false })

            if (error) throw error
            setTasks(data || [])
        } catch (e) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTasks()
    }, [user])

    const addTask = async (rawTitle, description) => {
        // Apply Smart Parsing
        const { title, priority, dueDate } = smartParse(rawTitle)

        try {
            const { data, error } = await supabase
                .from('tasks')
                .insert([{
                    title,
                    description,
                    priority,
                    due_date: dueDate,
                    user_id: user.id,
                    is_completed: false
                }])
                .select()

            if (error) throw error

            // Optimistic update
            const newTask = data[0]
            setTasks([newTask, ...tasks].sort((a, b) => a.priority.localeCompare(b.priority)))
            return { success: true }
        } catch (e) {
            console.error(e)
            return { success: false, error: e.message }
        }
    }

    const toggleTaskCompletion = async (id, is_completed) => {
        // Optimistic UI update immediately
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, is_completed: !is_completed } : task
        ))

        try {
            const { error } = await supabase
                .from('tasks')
                .update({ is_completed: !is_completed })
                .eq('id', id)

            if (error) throw error
        } catch (e) {
            console.error(e)
            // Revert on failure
            fetchTasks()
            return { success: false, error: e.message }
        }
    }

    const deleteTask = async (id) => {
        setTasks(tasks.filter(task => task.id !== id))
        try {
            const { error } = await supabase
                .from('tasks')
                .delete()
                .eq('id', id)
            if (error) throw error
        } catch (e) {
            console.error(e)
            fetchTasks()
            return { success: false, error: e.message }
        }
    }

    return {
        tasks,
        loading,
        error,
        addTask,
        toggleTaskCompletion,
        deleteTask,
        refreshTasks: fetchTasks
    }
}

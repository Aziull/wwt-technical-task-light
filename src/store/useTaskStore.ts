import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { Task } from '../types/Task'

interface TaskState {
	tasks: Task[]
	addTask: (task: Task) => void
	deleteTask: (taskId: number) => void
	updateTask: (updatedTask: Task) => void
	toggleTaskCompletion: (taskId: number) => void
}

export const useTaskStore = create<TaskState>()(
	persist<TaskState>(
		set => ({
			tasks: [],
			addTask: task => set(state => ({ tasks: [...state.tasks, task] })),
			deleteTask: taskId =>
				set(state => ({
					tasks: state.tasks.filter(task => task.id !== taskId)
				})),
			updateTask: updatedTask =>
				set(state => ({
					tasks: state.tasks.map(task =>
						task.id === updatedTask.id ? updatedTask : task
					)
				})),
			toggleTaskCompletion: taskId =>
				set(state => ({
					tasks: state.tasks.map(task =>
						task.id === taskId
							? { ...task, isCompleted: !task.isCompleted }
							: task
					)
				}))
		}),
		{
			name: 'task-storage'
		}
	)
)

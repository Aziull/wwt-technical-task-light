import React from 'react'

import { Box, Show } from '@chakra-ui/react'

import { TaskForm } from '@components/forms/TaskForm'
import { TaskGrid } from '@components/layout/TaskGrid'
import { TaskTabs } from '@components/layout/TaskTabs'
import { Task } from '@store/types'
import { useTaskStore } from '@store/useTaskStore'

export const App: React.FC = () => {
	const { tasks, addTask } = useTaskStore()

	const handleSaveTask = (task: Task) => {
		addTask(task)
	}

	return (
		<Box
			maxW="80vw"
			mx="auto"
			minH="100vh"
			pt="60px"
		>
			<Box
				w={{ base: '100%', md: '66%' }}
				mx="auto"
			>
				<TaskForm
					task={null}
					onSave={handleSaveTask}
				/>
			</Box>
			<Show below="md">
				<TaskTabs tasks={tasks} />
			</Show>
			<Show above="md">
				<TaskGrid tasks={tasks} />
			</Show>
		</Box>
	)
}

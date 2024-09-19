import { List, ListItem } from '@chakra-ui/react'

import { TaskItem } from '@components/TaskItem'
import { Task } from '@store/types'

interface TaskListProps {
	tasks: Task[]
}

export const TaskList = ({ tasks }: TaskListProps) => {
	return (
		<List spacing={4}>
			{tasks.map(task => (
				<ListItem key={task.id}>
					<TaskItem task={task} />
				</ListItem>
			))}
		</List>
	)
}

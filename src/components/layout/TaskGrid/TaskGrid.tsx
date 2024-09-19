import { useTranslation } from 'react-i18next'

import { Grid, GridItem, Heading } from '@chakra-ui/react'

import { TaskList } from '@components/TaskList'
import { Task } from '@store/types'

interface TaskGridProps {
	tasks: Task[]
}

export const TaskGrid = ({ tasks }: TaskGridProps) => {
	const { t } = useTranslation('translation')
	const activeTasks = tasks.filter(task => !task.isCompleted)
	const completedTasks = tasks.filter(task => task.isCompleted)

	return (
		<Grid
			templateColumns="repeat(2, 1fr)"
			gap={12}
		>
			<GridItem w="100%">
				<Heading
					textAlign={'center'}
					as="h2"
					size="lg"
					mb={8}
				>
					{t('active')}
				</Heading>
				<TaskList tasks={activeTasks} />
			</GridItem>
			<GridItem w="100%">
				<Heading
					textAlign={'center'}
					as="h2"
					size="lg"
					mb={8}
				>
					{t('completed')}
				</Heading>
				<TaskList tasks={completedTasks} />
			</GridItem>
		</Grid>
	)
}

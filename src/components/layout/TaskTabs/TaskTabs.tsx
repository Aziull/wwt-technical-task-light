import { useTranslation } from 'react-i18next'

import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'

import { TaskList } from '@components/TaskList'
import { Task } from '@store/types'

interface TaskTabsProps {
	tasks: Task[]
}

export const TaskTabs = ({ tasks }: TaskTabsProps) => {
	const { t } = useTranslation('translation')
	const activeTasks = tasks.filter(task => !task.isCompleted)
	const completedTasks = tasks.filter(task => task.isCompleted)

	return (
		<Tabs variant="enclosed">
			<TabList>
				<Tab>{t('active')}</Tab>
				<Tab>{t('completed')}</Tab>
			</TabList>
			<TabPanels>
				<TabPanel>
					<TaskList tasks={activeTasks} />
				</TabPanel>
				<TabPanel>
					<TaskList tasks={completedTasks} />
				</TabPanel>
			</TabPanels>
		</Tabs>
	)
}

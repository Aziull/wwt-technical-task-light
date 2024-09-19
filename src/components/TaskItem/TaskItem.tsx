import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import {
	Box,
	Center,
	Divider,
	Flex,
	IconButton,
	Text,
	Tooltip,
	useBoolean,
	useOutsideClick
} from '@chakra-ui/react'
import { Check, Pencil, X } from 'lucide-react'

import { TaskForm } from '@components/forms/TaskForm'
import { Task } from '@store/types'
import { useTaskStore } from '@store/useTaskStore'

import DeleteAlert from './DeleteAlert'

interface TaskItemProps {
	task: Task
}

export const TaskItem = ({ task }: TaskItemProps) => {
	const { t } = useTranslation('translation')

	const { updateTask } = useTaskStore()
	const toggleTaskCompletion = useTaskStore(state => state.toggleTaskCompletion)
	const [editMode, setEditMode] = useBoolean(false)
	const ref = useRef(null)

	useOutsideClick({
		ref: ref,
		handler: setEditMode.off
	})

	return !editMode ? (
		<>
			<Flex
				columnGap={4}
				mb={4}
			>
				<Center>
					<Tooltip
						label={
							task.isCompleted ? t('mark_as_incomplete') : t('mark_as_done')
						}
					>
						<IconButton
							colorScheme="gray"
							aria-label={task.isCompleted ? 'Remove' : 'Done'}
							aspectRatio="1/1"
							variant="outline"
							icon={task.isCompleted ? <X /> : <Check />}
							isRound={true}
							size="sm"
							onClick={() => toggleTaskCompletion(task.id)}
						/>
					</Tooltip>
				</Center>
				<Flex
					alignItems={'center'}
					flex="1"
					onClick={setEditMode.on}
					cursor="pointer"
				>
					<Text fontSize="md">{task.name}</Text>
				</Flex>
				<Center>
					<Tooltip label={t('edit_task')}>
						<IconButton
							colorScheme="gray"
							color="gray.200"
							borderWidth={0}
							aria-label="Edit"
							aspectRatio="1/1"
							icon={<Pencil />}
							variant="ghost"
							size="sm"
							onClick={setEditMode.on}
						/>
					</Tooltip>
					<DeleteAlert taskId={task.id} />
				</Center>
			</Flex>
			<Divider />
		</>
	) : (
		<Box ref={ref}>
			<TaskForm
				task={task}
				onSave={task => {
					updateTask(task)
					setEditMode.off()
				}}
				onCancel={setEditMode.off}
			/>
		</Box>
	)
}

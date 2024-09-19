import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	IconButton,
	Tooltip,
	useDisclosure
} from '@chakra-ui/react'
import { Trash } from 'lucide-react'

import { useTaskStore } from '@store/useTaskStore'

type Props = {
	taskId: number
}

const DeleteAlert = ({ taskId }: Props) => {
	const { t } = useTranslation('translation')

	const { deleteTask } = useTaskStore()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const cancelRef = useRef(null)

	const handleConfirmDelete = () => {
		deleteTask(taskId)
		onClose()
	}
	return (
		<>
			<Tooltip label={t('delete_task')}>
				<IconButton
					colorScheme="red"
					color="red.200"
					borderWidth={0}
					aria-label="Edit"
					aspectRatio="1/1"
					icon={<Trash />}
					variant="ghost"
					size="sm"
					onClick={onOpen}
				/>
			</Tooltip>
			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader
							fontSize="lg"
							fontWeight="bold"
						>
							{t('delete_task')}
						</AlertDialogHeader>

						<AlertDialogBody>{t('Are you sure_delete')}</AlertDialogBody>

						<AlertDialogFooter>
							<Button
								ref={cancelRef}
								onClick={onClose}
							>
								{t('cancel')}
							</Button>
							<Button
								colorScheme="red"
								onClick={handleConfirmDelete}
								ml={3}
							>
								{t('delete')}
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	)
}

export default DeleteAlert

import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
	Box,
	Button,
	ButtonGroup,
	Card,
	CardBody,
	CardFooter,
	Divider,
	FormControl,
	Input
} from '@chakra-ui/react'

import { MIN_NAME_LENGTH } from '@constants/taskForm'
import { Task } from '@store/types'

interface TaskFormProps {
	task: Task | null
	onSave: (task: Task) => void
	onCancel?: () => void
}

export const TaskForm = ({ task, onSave, onCancel }: TaskFormProps) => {
	const { t } = useTranslation('translation')
	const nameInputRef = useRef<HTMLInputElement>(null)

	const [formValues, setFormValues] = useState({
		id: task?.id || Date.now(),
		name: task?.name || '',
		isCompleted: task?.isCompleted || false
	})

	const [isSubmitting, setIsSubmitting] = useState(false)
	const [errors, setErrors] = useState({ name: '' })
	const resetErrors = () => {
		setErrors({ name: '' })
	}

	const validateForm = () => {
		let isValid = true
		if (formValues.name.trim().length < MIN_NAME_LENGTH) {
			setErrors({
				name: t('this_field_is_required_and_min', {
					minLength: MIN_NAME_LENGTH
				})
			})
			isValid = false
		} else {
			resetErrors()
		}
		return isValid
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (validateForm()) {
			setIsSubmitting(true)
			onSave(formValues)
			setIsSubmitting(false)
			resetErrors()
		}
	}

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = event.target
		if (errors.name.length && value.length >= MIN_NAME_LENGTH) {
			resetErrors()
		}
		setFormValues({
			...formValues,
			[id]: value
		})
	}

	const cancel = () => {
		onCancel?.()
		resetErrors()
		setFormValues({
			id: task?.id || Date.now(),
			name: task?.name || '',
			isCompleted: task?.isCompleted || false
		})
	}

	useEffect(() => {
		if (nameInputRef.current) {
			nameInputRef.current.focus()
		}
	}, [task])

	return (
		<Box
			as="form"
			onSubmit={handleSubmit}
			maxW="100%"
			mb={8}
		>
			<Card variant="outline">
				<CardBody>
					<FormControl
						w={'100%'}
						isInvalid={Boolean(errors.name)}
					>
						<Input
							ref={nameInputRef}
							borderRadius={0}
							id="name"
							value={formValues.name}
							onChange={handleInputChange}
							placeholder={t('enter_task_name')}
							_placeholder={{ opacity: 0.5 }}
							variant="unstyled"
						/>
						{errors.name && (
							<Box
								color="red.500"
								fontSize="sm"
							>
								{errors.name}
							</Box>
						)}
					</FormControl>
				</CardBody>
				<Divider />
				<CardFooter>
					<ButtonGroup>
						<Button
							size="sm"
							colorScheme="blue"
							isLoading={isSubmitting}
							type="submit"
						>
							{task ? t('save_changes') : t('add_task')}
						</Button>
						<Button
							size="sm"
							variant="ghost"
							onClick={cancel}
						>
							{t('cancel')}
						</Button>
					</ButtonGroup>
				</CardFooter>
			</Card>
		</Box>
	)
}

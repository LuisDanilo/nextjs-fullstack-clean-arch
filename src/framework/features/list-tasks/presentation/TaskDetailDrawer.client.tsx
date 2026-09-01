'use client'

import { useCallback, useLayoutEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import useMediaQuery from '@mui/material/useMediaQuery'
import CloseIcon from '@mui/icons-material/Close'
import { UpdateTaskStatusForm } from '@/framework/features/update-task-status/presentation/UpdateTaskStatusForm.client'
import { DeleteTaskForm } from '@/framework/features/delete-tasks/presentation/DeleteTaskForm.client'
import { type TaskDto } from '@/framework/features/list-tasks/presentation/taskdto'

interface TaskDetailDrawerProps {
  task: TaskDto | null
  onClose: () => void
}

export function TaskDetailDrawer({ task, onClose }: TaskDetailDrawerProps) {
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('lg'))
  const [displayedTask, setDisplayedTask] = useState<TaskDto | null>(task)

  useLayoutEffect(() => {
    if (task) setDisplayedTask(task)
  }, [task])

  const handleClose = useCallback(() => onClose(), [onClose])
  const handleExited = useCallback(() => setDisplayedTask(null), [])

  return (
    <Drawer
      anchor={isDesktop ? 'right' : 'bottom'}
      open={task !== null}
      onClose={handleClose}
      slotProps={{
        transition: { onExited: handleExited },
        paper: {
          sx: {
            width: isDesktop ? 480 : '100%',
            maxHeight: isDesktop ? '100%' : '90dvh',
            borderTopLeftRadius: isDesktop ? 0 : 16,
            borderTopRightRadius: isDesktop ? 0 : 16,
          },
        },
      }}
    >
      {displayedTask && (
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
          <Stack direction='row' sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant='h6' sx={{ fontWeight: 600 }}>{displayedTask.title}</Typography>
            <IconButton aria-label='Cerrar' onClick={handleClose} size='small'>
              <CloseIcon />
            </IconButton>
          </Stack>

          <Typography variant='body2' color='text.secondary'>{displayedTask.description}</Typography>

          <Stack direction='row' spacing={1} sx={{ flexWrap: 'wrap' }}>
            <UpdateTaskStatusForm id={displayedTask.id} status={displayedTask.status} />
            <DeleteTaskForm id={displayedTask.id} />
          </Stack>

          <Divider />

          <Box component='dl'>
            <Stack direction='row' sx={{ justifyContent: 'space-between', py: 0.5 }}>
              <Typography component='dt' variant='body2' color='text.secondary'>Creada</Typography>
              <Typography component='dd' variant='body2'>
                {new Date(displayedTask.createdAt).toLocaleDateString('es')}
              </Typography>
            </Stack>
            <Stack direction='row' sx={{ justifyContent: 'space-between', py: 0.5 }}>
              <Typography component='dt' variant='body2' color='text.secondary'>Subtareas</Typography>
              <Typography component='dd' variant='body2'>{displayedTask.subtasks.length}</Typography>
            </Stack>
          </Box>

          {displayedTask.subtasks.length > 0 && (
            <Box>
              <Typography variant='subtitle2' sx={{ mb: 1 }}>Subtareas</Typography>
              <Stack sx={{ gap: 1 }}>
                {displayedTask.subtasks.map((subtask) => (
                  <Paper key={subtask.id} variant='outlined' sx={{ p: 1.5 }}>
                    <Typography variant='body2' sx={{ fontWeight: 600 }}>{subtask.title}</Typography>
                    <Typography variant='body2' color='text.secondary'>{subtask.description}</Typography>
                  </Paper>
                ))}
              </Stack>
            </Box>
          )}
        </Box>
      )}
    </Drawer>
  )
}

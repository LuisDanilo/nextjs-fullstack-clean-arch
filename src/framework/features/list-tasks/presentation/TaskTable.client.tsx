'use client'

import { useState } from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Stack from '@mui/material/Stack'
import { UpdateTaskStatusForm } from '@/framework/features/update-task-status/presentation/UpdateTaskStatusForm.client'
import { TaskDetailDrawer } from '@/framework/features/list-tasks/presentation/TaskDetailDrawer.client'
import { type TaskDto } from '@/framework/features/list-tasks/presentation/taskdto'

export interface TaskTableProps {
  tasks: Array<TaskDto>
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es')
}

export function TaskTable({ tasks }: TaskTableProps) {
  const [selectedTask, setSelectedTask] = useState<TaskDto | null>(null)

  const closeDrawer = () => setSelectedTask(null)

  return (
    <>
      {tasks.length === 0 && <Typography sx={{ p: 2 }}>Sin tareas</Typography>}

      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Creada</TableCell>
              <TableCell align='right'>Subtareas</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow
                key={task.id}
                hover
                sx={{ cursor: 'pointer' }}
                onClick={() => setSelectedTask(task)}
              >
                <TableCell>
                  <Typography sx={{ fontWeight: 600 }}>{task.title}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant='body2' color='text.secondary' noWrap sx={{ maxWidth: 300 }}>
                    {task.description}
                  </Typography>
                </TableCell>
                <TableCell>
                  <UpdateTaskStatusForm id={task.id} status={task.status} />
                </TableCell>
                <TableCell>
                  <Typography variant='body2'>{formatDate(task.createdAt)}</Typography>
                </TableCell>
                <TableCell align='right'>
                  <Typography variant='body2'>{task.subtasks.length}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <Stack sx={{ display: { xs: 'flex', md: 'none' }, p: 1, gap: 1 }}>
        {tasks.map((task) => (
          <Card key={task.id} variant='outlined' sx={{ cursor: 'pointer' }} onClick={() => setSelectedTask(task)}>
              <CardContent sx={{ pb: 1 }}>
              <Typography sx={{ fontWeight: 600 }}>{task.title}</Typography>
              <Typography variant='body2' color='text.secondary' noWrap>
                {task.description}
              </Typography>
              <Typography variant='caption' color='text.secondary'>
                {formatDate(task.createdAt)} · {task.subtasks.length} subtareas
              </Typography>
            </CardContent>
            <CardActions sx={{ pt: 0 }}>
              <UpdateTaskStatusForm id={task.id} status={task.status} />
            </CardActions>
          </Card>
        ))}
      </Stack>

      <TaskDetailDrawer task={selectedTask} onClose={closeDrawer} />
    </>
  )
}

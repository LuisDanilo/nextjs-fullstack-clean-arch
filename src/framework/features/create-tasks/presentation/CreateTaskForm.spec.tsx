// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CreateTaskForm } from '@/framework/features/create-tasks/presentation/CreateTaskForm'

const createTaskMock = vi.hoisted(() => vi.fn())
const toastMock = vi.hoisted(() => ({ success: vi.fn(), error: vi.fn() }))

vi.mock('@/framework/features/create-tasks/presentation/createTask.action', () => ({ createTask: createTaskMock }))
vi.mock('sonner', () => ({ toast: toastMock }))

describe('CreateTaskForm', () => {
  it('renders the title and description fields and the submit button', () => {
    render(<CreateTaskForm />)

    expect(screen.getByLabelText('Título')).toBeInTheDocument()
    expect(screen.getByLabelText('Descripción')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Crear' })).toBeInTheDocument()
  })

  it('submits the action with the form values', async () => {
    createTaskMock.mockResolvedValue({ ok: true, message: 'Tarea creada' })
    const user = userEvent.setup()
    render(<CreateTaskForm />)

    await user.type(screen.getByLabelText('Título'), 'Comprar leche')
    await user.type(screen.getByLabelText('Descripción'), 'Ir al supermercado y comprar leche')
    await user.click(screen.getByRole('button', { name: 'Crear' }))

    await waitFor(() => expect(createTaskMock).toHaveBeenCalledTimes(1))
    const formData = createTaskMock.mock.calls[0][1] as FormData
    expect(formData.get('title')).toBe('Comprar leche')
    expect(formData.get('description')).toBe('Ir al supermercado y comprar leche')
  })

  it('calls onCreated and shows a success toast when the action succeeds', async () => {
    createTaskMock.mockResolvedValue({ ok: true, message: 'Tarea creada' })
    const user = userEvent.setup()
    const onCreated = vi.fn()
    render(<CreateTaskForm onCreated={onCreated} />)

    await user.type(screen.getByLabelText('Título'), 'Comprar leche')
    await user.type(screen.getByLabelText('Descripción'), 'Ir al supermercado y comprar leche')
    await user.click(screen.getByRole('button', { name: 'Crear' }))

    await waitFor(() => expect(onCreated).toHaveBeenCalledTimes(1))
    expect(toastMock.success).toHaveBeenCalledWith('Tarea creada')
  })

  it('shows an error toast when the action fails', async () => {
    createTaskMock.mockResolvedValue({ ok: false, message: 'El título no puede estar vacío' })
    const user = userEvent.setup()
    render(<CreateTaskForm />)

    await user.type(screen.getByLabelText('Título'), 'x')
    await user.type(screen.getByLabelText('Descripción'), 'Descripción válida larga')
    await user.click(screen.getByRole('button', { name: 'Crear' }))

    await waitFor(() => expect(toastMock.error).toHaveBeenCalledWith('El título no puede estar vacío'))
  })
})

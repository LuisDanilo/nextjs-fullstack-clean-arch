import { revalidatePath } from 'next/cache'

export async function runTodoAction(fn: () => Promise<unknown>) {
  try {
    await fn()
  } catch (error) {
    console.error(error)
  } finally {
    revalidatePath('/')
  }
}

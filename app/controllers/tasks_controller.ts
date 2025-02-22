import type { HttpContext } from '@adonisjs/core/http'
import { createTaskValidator, updateTaskValidator } from '#validators/task'
import { DateTime } from 'luxon'

export default class TasksController {
  async index({ auth, request, response }: HttpContext) {
    const user = auth.user!
    const taskList = await user
      .related('taskLists')
      .query()
      .where('id', request.param('task_list_id'))
      .where('user_id', user.id) // Garante que a TaskList pertence ao usuário autenticado
      .preload('tasks')
      .first()

    if (!taskList) {
      return response.status(404).json({ error: 'Task list not found' })
    }

    return taskList.tasks // Retorna as tarefas da lista
  }

  async store({ auth, request, response }: HttpContext) {
    const user = auth.user!
    const tasklist = await user
      .related('taskLists')
      .query()
      .where('id', request.param('task_list_id'))
      .where('user_id', user.id) // Garante que a TaskList pertence ao usuário autenticado
      .first()

    if (!tasklist) {
      return response.status(404).json({ error: 'Task not found' })
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { task_name, description } = await request.validateUsing(createTaskValidator)
    const task = await tasklist.related('tasks').create({ task_name, description })
    return task
  }

  async show({ auth, request, response }: HttpContext) {
    const user = auth.user!
    const tasklist = await user
      .related('taskLists')
      .query()
      .where('id', request.param('task_list_id'))
      .where('user_id', user.id) // Garante que a TaskList pertence ao usuário autenticado
      .first()

    if (!tasklist) {
      return response.status(404).json({ error: 'Task list not found' })
    }
    const task = await tasklist.related('tasks').query().where('id', request.param('id')).first()

    return task
  }

  async update({ auth, request, response }: HttpContext) {
    const user = auth.user!
    const tasklist = await user
      .related('taskLists')
      .query()
      .where('id', request.param('task_list_id'))
      .where('user_id', user.id) // Garante que a TaskList pertence ao usuário autenticado
      .first()

    if (!tasklist) {
      return response.status(404).json({ error: 'Task list not found' })
    }

    const task = await tasklist?.related('tasks').query().where('id', request.param('id')).first()

    if (!task) {
      return response.status(404).json({ error: 'Task not found' })
    }

    if (task.done) {
      return response.status(400).json({ error: 'Task already done' })
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { task_name, description, done } = await request.validateUsing(updateTaskValidator)
    if (done) {
      task.merge({ task_name, description, done, done_at: DateTime.now() })
    } else {
      task.merge({ task_name, description, done })
    }
    await task.save()
    return task
  }

  async destroy({ auth, request, response }: HttpContext) {
    const user = auth.user!
    const tasklist = await user
      .related('taskLists')
      .query()
      .where('id', request.param('task_list_id'))
      .where('user_id', user.id) // Garante que a TaskList pertence ao usuário autenticado
      .first()

    if (!tasklist) {
      return response.status(404).json({ error: 'Task list not found' })
    }

    const task = await tasklist?.related('tasks').query().where('id', request.param('id')).first()

    if (!task) {
      return response.status(404).json({ error: 'Task not found' })
    }

    await task.delete()
    return response.status(203).json({ message: 'Task deleted' })
  }
}

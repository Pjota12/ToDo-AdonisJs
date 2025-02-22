import type { HttpContext } from '@adonisjs/core/http'
import { createTaskListValidator } from '#validators/task_list'

export default class TaskListsController {
  async index({ auth }: HttpContext) {
    const user = auth.user!
    await user.preload('taskLists')
    return user.taskLists
  }

  async store({ auth, request }: HttpContext) {
    const user = auth.user!
    const { title } = await request.validateUsing(createTaskListValidator)
    const taskList = await user.related('taskLists').create({ title })
    return taskList
  }

  async show({ auth, request, response }: HttpContext) {
    const user = auth.user!
    const taskList = await user
      .related('taskLists')
      .query()
      .where('id', request.param('id'))
      .first()
    if (!taskList) {
      return response.status(404).json({ error: 'Task list not found' })
    }
    return taskList
  }

  async update({ auth, request, response }: HttpContext) {
    const user = auth.user!
    const tasklist = await user
      .related('taskLists')
      .query()
      .where('id', request.param('id'))
      .first()
    if (!tasklist) {
      return response.status(404).json({ error: 'Task list not found' })
    }
    const { title } = await request.validateUsing(createTaskListValidator)
    tasklist.merge({ title })
    await tasklist.save()
    return tasklist
  }

  async destroy({ auth, request, response }: HttpContext) {
    const user = auth.user!
    const tasklist = await user
      .related('taskLists')
      .query()
      .where('id', request.param('id'))
      .first()
    if (!tasklist) {
      return response.status(404).json({ error: 'Task list not foud' })
    }
    await tasklist.delete()
    return response.status(203).json({ message: 'Task list deleted' })
  }
}

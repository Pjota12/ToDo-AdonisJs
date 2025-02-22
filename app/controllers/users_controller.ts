import type { HttpContext } from '@adonisjs/core/http'
import User from '../models/user.js'
import { createUserValidator } from '#validators/user'
import { updateUserValidator } from '#validators/user'

export default class UsersController {
  async index() {
    const users = await User.all()
    return users
  }

  async store({ request }: HttpContext) {
    const { name, email, password } = await request.validateUsing(createUserValidator)
    const user = await User.create({ name, email, password })
    return user
  }

  async show({ params, response }: HttpContext) {
    try {
      const user = await User.findBy('id', params.id)
      return user
    } catch (error) {
      return response.status(404).json({ error: 'User not found' })
    }
  }

  async update({ params, request, response }: HttpContext) {
    const user = await User.findBy('id', params.id)
    const { name, password } = await request.validateUsing(updateUserValidator)
    if (!user) {
      return response.status(400).json({ error: 'User not found' })
    }
    user.merge({ name, password })
    await user.save()
    return user
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const user = await User.findByOrFail('id', params.id)
      await user.delete()
      return response.status(203).json({ message: 'User deleted' })
    } catch (error) {
      return response.status(400).json({ error: 'User not found' })
    }
  }
}

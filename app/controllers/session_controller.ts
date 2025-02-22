import type { HttpContext } from '@adonisjs/core/http'
import User from '../models/user.js'
import { createSessionValidator } from '#validators/session'

export default class SessionController {
  async store({ request }: HttpContext) {
    const { email, password } = await request.validateUsing(createSessionValidator)
    const user = await User.verifyCredentials(email, password)
    return User.accessTokens.create(user)
  }

  async show({ auth }: HttpContext) {
    await auth.check()
    return auth.user
  }

  async destroy({ auth, response }: HttpContext) {
    const user = auth.user
    if (user) {
      await User.accessTokens.delete(user, user.currentAccessToken.identifier)
    } else {
      return response.status(401).json({ message: 'Unauthorized' })
    }
    return response.status(203).json({ message: 'User logged out' })
  }
}

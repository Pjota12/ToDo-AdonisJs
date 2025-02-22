import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '../../app/models/user.js'
export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        name: 'John Doe',
        email: 'jonh@gmail.com',
        password: 'password',
      },
      {
        name: 'Jane Doe',
        email: 'as@gmail.com',
        password: 'password',
      },
    ])
  }
}

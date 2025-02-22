import TaskList from '#models/task_list'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await TaskList.createMany([
      {
        title: 'Personal',
        userId: 1,
      },
      {
        title: 'Work',
        userId: 1,
      },
      {
        title: 'Personal',
        userId: 2,
      },
    ])
  }
}

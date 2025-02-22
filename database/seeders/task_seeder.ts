import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Task from '../../app/models/task.js'
export default class extends BaseSeeder {
  async run() {
    await Task.createMany([
      {
        task_name: 'estudar nodejs',
        description: 'estudar nodejs com adonisjs',
        task_list_id: 1,
      },
      {
        task_name: 'estudar adonisjs',
        description: 'estudar adonisjs com nodejs',
        task_list_id: 1,
      },
      {
        task_name: 'fazer exelente café',
        description: 'fazer café com leite',
        task_list_id: 2,
      },
      {
        task_name: 'fazer exelente cama',
        description: 'fazer cama com lençol',
        task_list_id: 3,
      },
    ])
  }
}

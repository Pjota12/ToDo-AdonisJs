const UsersController = () => import('#controllers/users_controller')
const TaskListsController = () => import('#controllers/task_lists_controller')
const TasksController = () => import('#controllers/tasks_controller')
const SessionController = () => import('#controllers/session_controller')

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('session', [SessionController, 'store'])
router.get('session', [SessionController, 'show'])
router.delete('session', [SessionController, 'destroy'])

router.resource('user', UsersController).apiOnly()
router
  .group(() => {
    router.resource('tasklist', TaskListsController)
    router.get('tasklist/:task_list_id/tasks', [TasksController, 'index'])
    router.post('tasklist/:task_list_id/tasks', [TasksController, 'store'])
    router.get('tasklist/:task_list_id/tasks/:id', [TasksController, 'show'])
    router.put('tasklist/:task_list_id/tasks/:id', [TasksController, 'update'])
    router.delete('tasklist/:task_list_id/tasks/:id', [TasksController, 'destroy'])
  })
  .use(middleware.auth())

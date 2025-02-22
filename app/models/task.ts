import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { type BelongsTo } from '@adonisjs/lucid/types/relations'
import TaskList from './task_list.js'

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'task_list_id' }) // Define explicitamente o nome correto no banco de dados
  declare taskListId: number

  @column()
  declare task_name: string

  @column()
  declare description: string

  @column()
  declare done: boolean

  @column.dateTime()
  declare done_at: DateTime | null

  @belongsTo(() => TaskList)
  declare tasklist: BelongsTo<typeof TaskList>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

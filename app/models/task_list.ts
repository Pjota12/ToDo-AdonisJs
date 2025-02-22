import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import { type BelongsTo, type HasMany } from '@adonisjs/lucid/types/relations'
import Task from './task.js'
import User from './user.js'

export default class TaskList extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare userId: number

  @hasMany(() => Task)
  declare tasks: HasMany<typeof Task> // Plural

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

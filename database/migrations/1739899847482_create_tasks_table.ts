import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tasks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('task_list_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('task_lists')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('task_name').notNullable()
      table.text('description').nullable()
      table.boolean('done').notNullable().defaultTo(false)
      table.timestamp('done_at').nullable() // mostrar a data e hora que a tarefa foi concluída
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

import vine from '@vinejs/vine'

export const createTaskValidator = vine.compile(
  vine.object({
    task_name: vine.string().trim(),
    description: vine.string().trim().optional(),
  })
)

export const updateTaskValidator = vine.compile(
  vine.object({
    task_name: vine.string().trim().optional(),
    description: vine.string().trim().optional(),
    done: vine.boolean().optional(),
  })
)

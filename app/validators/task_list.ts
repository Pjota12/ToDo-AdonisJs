import vine from '@vinejs/vine'

export const createTaskListValidator = vine.compile(
  vine.object({
    title: vine.string().trim(),
  })
)

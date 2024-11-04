import { z } from 'zod'

export const itemSchema = z.object({
    __typename: z.literal('Item').default('Item'),
    id: z.string(),
    groupId: z.string(),
    listId: z.string()
})
export type Item = z.infer<typeof itemSchema>


export const itemSubject = z.tuple([
    z.union([
        z.literal('manage'),
        z.literal('check'),
        z.literal('uncheck'),
        z.literal('view'),
    ]),
    z.union([z.literal('Item'), itemSchema])
])
export type ItemSubject = z.infer<typeof itemSubject>
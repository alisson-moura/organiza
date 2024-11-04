import { z } from 'zod'

export const listSchema = z.object({
    __typename: z.literal('List').default('List'),
    id: z.string(),
    groupId: z.string()
})
export type List = z.infer<typeof listSchema>

export const listSubject = z.tuple([
    z.union([
        z.literal('manage'),
        z.literal('view'),
    ]),
    z.union([z.literal('List'), listSchema])
])
export type ListSubject = z.infer<typeof listSubject>
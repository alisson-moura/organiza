import {z} from 'zod'

export const inviteSchema = z.object({
    __typename: z.literal('Invite').default('Invite'),
    id: z.string(),
    groupId: z.string()
})
export type Invite = z.infer<typeof inviteSchema>

export const inviteSubject = z.tuple([
    z.union([
        z.literal('create'),
        z.literal('view'),
        z.literal('accept'),
        z.literal('reject'),
        z.literal('revoke')
    ]),
    z.union([z.literal('Invite'), inviteSchema])
]);
export type InviteSubject = z.infer<typeof inviteSubject>
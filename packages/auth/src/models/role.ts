import { z } from 'zod'

export const rolesSchema = z.union([
    z.literal('Lider'),
    z.literal('Organizador'),
    z.literal('Participante'),
    z.literal('Observador'),
])


export type Role = z.infer<typeof rolesSchema>
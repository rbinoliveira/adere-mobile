import { z } from 'zod'

export const recoverpasswordFormSchema = z.object({
  email: z.email('E-mail inválido'),
})

export type RecoverPasswordFormSchema = z.infer<
  typeof recoverpasswordFormSchema
>

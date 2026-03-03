import { z } from 'zod'

export const loginFormSchema = z.object({
  email: z.email('E-mail inválido'),
  password: z.string('Digite sua senha'),
})

export type LoginFormSchema = z.infer<typeof loginFormSchema>

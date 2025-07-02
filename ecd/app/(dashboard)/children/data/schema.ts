import { z } from "zod"

export const childSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  school: z.string(),
  guardianName: z.string(),
})

export type Child = z.infer<typeof childSchema>
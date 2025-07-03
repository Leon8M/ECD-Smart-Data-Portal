// lib/auth.ts
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import  prisma  from "./prisma"

// For getting session in server components
export async function getAuthSession() {
  return await getServerSession(authOptions)
}

// For getting current user object from DB (optional)
// You can use this in dashboard pages
export async function getCurrentUser() {
  const session = await getAuthSession()

  if (!session?.user?.id) return null

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  })

  return user
}

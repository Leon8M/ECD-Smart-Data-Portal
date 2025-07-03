"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  const routes = [
    { href: "/", label: "Dashboard", active: pathname === "/" },
    { href: "/dashboard/children", label: "Children", active: pathname.startsWith("/dashboard/children") },
    { href: "/dashboard/schools", label: "Schools", active: pathname.startsWith("/dashboard/schools") },
    { href: "/dashboard/staff", label: "Staff", active: pathname.startsWith("/dashboard/staff") },
    { href: "/dashboard/reports", label: "Reports", active: pathname.startsWith("/dashboard/reports") },
  ]

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active ? "text-black dark:text-white" : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
}

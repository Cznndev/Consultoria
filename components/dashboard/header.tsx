import type React from "react"
interface DashboardHeaderProps {
  heading: string
  subheading?: string
  children?: React.ReactNode
}

export function DashboardHeader({ heading, subheading, children }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        <h1 className="font-bold text-3xl md:text-4xl">{heading}</h1>
        {subheading && <p className="text-muted-foreground">{subheading}</p>}
      </div>
      {children}
    </div>
  )
}

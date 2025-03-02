"use client"

import type React from "react"

import { useAuth } from "@/context/auth-context"
import { redirect } from "next/navigation"
import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { useEffect } from "react"
import { PropagateLoader } from "react-spinners"

export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !user) {
      redirect("/login")
    }
  }, [user, isLoading])

  if (isLoading) {
    return (
        <div className="flex items-center justify-center h-screen">
          <PropagateLoader size={50} color={"#3B82F6"} loading={isLoading} />
        </div>
    )
  }

  if (!user) {
    return null
  }

  return <DashboardLayout>{children}</DashboardLayout>
}


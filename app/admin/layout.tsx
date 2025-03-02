"use client"

import type React from "react"

import { useAuth } from "@/context/auth-context"
import { redirect } from "next/navigation"
import { AdminDashboardLayout } from "@/components/layouts/admin-dashboard-layout"
import { useEffect } from "react"

export default function AdminDashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      redirect("/login")
    }
  }, [user, isLoading])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user || user.role !== "admin") {
    return null
  }

  return <AdminDashboardLayout>{children}</AdminDashboardLayout>
}


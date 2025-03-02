"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"

export type Notification = {
  id: string
  title: string
  message: string
  date: Date
  read: boolean
  type: "info" | "success" | "warning" | "error"
}

type NotificationContextType = {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, "id" | "date" | "read">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const { toast } = useToast()

  useEffect(() => {
    // Load notifications from localStorage
    const storedNotifications = localStorage.getItem("notifications")
    if (storedNotifications) {
      const parsedNotifications = JSON.parse(storedNotifications)
      // Convert date strings back to Date objects
      const notificationsWithDates = parsedNotifications.map((n: any) => ({
        ...n,
        date: new Date(n.date),
      }))
      setNotifications(notificationsWithDates)
    } else {
      // Add some mock notifications
      const mockNotifications: Notification[] = [
        {
          id: "1",
          title: "Contribution Received",
          message: "Your monthly contribution has been received and processed.",
          date: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
          read: false,
          type: "success",
        },
        {
          id: "2",
          title: "Statement Available",
          message: "Your quarterly statement is now available for review.",
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
          read: true,
          type: "info",
        },
      ]
      setNotifications(mockNotifications)
      localStorage.setItem("notifications", JSON.stringify(mockNotifications))
    }
  }, [])

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications))
  }, [notifications])

  const unreadCount = notifications.filter((n) => !n.read).length

  const addNotification = (notification: Omit<Notification, "id" | "date" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      date: new Date(),
      read: false,
    }
    setNotifications((prev) => [newNotification, ...prev])

    // Show toast for new notification
    toast({
      title: notification.title,
      description: notification.message,
      variant: notification.type === "error" ? "destructive" : "default",
    })
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotification must be used within a NotificationProvider")
  }
  return context
}


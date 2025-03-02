"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

type Contribution = {
  id: string
  date: Date
  amount: number
  type: "mandatory" | "voluntary"
  status: "pending" | "processed" | "failed"
}

export function RecentContributions() {
  const [contributions, setContributions] = useState<Contribution[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContributions = async () => {
      setLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data for the last 5 contributions
        const mockContributions: Contribution[] = Array.from({ length: 5 }).map((_, i) => {
          const date = new Date()
          date.setDate(date.getDate() - i * 15)

          return {
            id: `recent-${i + 1}`,
            date,
            amount: Math.floor(Math.random() * 50000) + 10000,
            type: i % 3 === 0 ? "voluntary" : "mandatory",
            status: ["pending", "processed", "processed", "processed", "failed"][Math.floor(Math.random() * 5)],
          }
        })

        setContributions(mockContributions)
      } catch (error) {
        console.error("Failed to fetch recent contributions:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchContributions()
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {contributions.map((contribution) => (
        <div key={contribution.id} className="flex items-start gap-4">
          <div
            className={`rounded-full p-2 ${
              contribution.type === "mandatory"
                ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                : "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
            }`}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">
                {contribution.type === "mandatory" ? "Mandatory" : "Voluntary"} Contribution
              </p>
              <Badge
                variant={
                  contribution.status === "processed"
                    ? "default"
                    : contribution.status === "pending"
                      ? "outline"
                      : "destructive"
                }
                className="ml-2"
              >
                {contribution.status.charAt(0).toUpperCase() + contribution.status.slice(1)}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">{format(contribution.date, "PPP")}</p>
            <p className="mt-1 text-sm font-semibold">₦{contribution.amount.toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  )
}


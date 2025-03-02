"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"

type ContributionData = {
  month: string
  mandatory: number
  voluntary: number
}

export function ContributionChart() {
  const [data, setData] = useState<ContributionData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Generate mock data for the last 12 months
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

        const currentMonth = new Date().getMonth()
        const mockData: ContributionData[] = []

        for (let i = 0; i < 12; i++) {
          const monthIndex = (currentMonth - 11 + i + 12) % 12
          mockData.push({
            month: months[monthIndex],
            mandatory: Math.floor(Math.random() * 30000) + 20000,
            voluntary: Math.random() > 0.4 ? Math.floor(Math.random() * 20000) : 0,
          })
        }

        setData(mockData)
      } catch (error) {
        console.error("Failed to fetch chart data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="w-full h-[300px] flex items-center justify-center">
        <Skeleton className="w-full h-full" />
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis tickFormatter={(value) => `₦${(value / 1000).toFixed(0)}k`} />
        <Tooltip
          formatter={(value: number) => [`₦${value.toLocaleString()}`, undefined]}
          labelFormatter={(label) => `Month: ${label}`}
        />
        <Legend />
        <Bar dataKey="mandatory" name="Mandatory" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        <Bar dataKey="voluntary" name="Voluntary" fill="#10b981" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}


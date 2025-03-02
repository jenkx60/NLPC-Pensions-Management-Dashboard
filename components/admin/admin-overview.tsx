"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ContributionChart } from "@/components/contributions/contribution-chart"
import { RecentContributions } from "@/components/contributions/recent-contributions"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Line, LineChart } from "recharts"

const memberGrowthData = [
  { month: "Jan", members: 9800 },
  { month: "Feb", members: 10100 },
  { month: "Mar", members: 10400 },
  { month: "Apr", members: 10700 },
  { month: "May", members: 11000 },
  { month: "Jun", members: 11400 },
  { month: "Jul", members: 11800 },
  { month: "Aug", members: 12100 },
  { month: "Sep", members: 12345 },
]

const fundPerformanceData = [
  { month: "Jan", return: 7.2 },
  { month: "Feb", return: 7.5 },
  { month: "Mar", return: 7.8 },
  { month: "Apr", return: 8.0 },
  { month: "May", return: 8.2 },
  { month: "Jun", return: 8.3 },
  { month: "Jul", return: 8.4 },
  { month: "Aug", return: 8.5 },
  { month: "Sep", return: 8.5 },
]

export function AdminOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Contribution Trend</CardTitle>
          <CardDescription>Monthly contribution trend over the past year</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <ContributionChart />
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Recent Contributions</CardTitle>
          <CardDescription>Last 5 contribution transactions across all members</CardDescription>
        </CardHeader>
        <CardContent>
          <RecentContributions />
        </CardContent>
      </Card>
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Member Growth</CardTitle>
          <CardDescription>Total members over the past 9 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={memberGrowthData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="members" fill="#3b82f6" name="Total Members" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Key Performance Indicators</CardTitle>
          <CardDescription>Important metrics for the pension system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">Average Contribution per Member</p>
              <p className="text-2xl font-bold">₦100,000</p>
            </div>
            <div>
              <p className="text-sm font-medium">Member Retention Rate</p>
              <p className="text-2xl font-bold">98.5%</p>
            </div>
            <div>
              <p className="text-sm font-medium">Average Member Age</p>
              <p className="text-2xl font-bold">42 years</p>
            </div>
            <div>
              <p className="text-sm font-medium">Fund Solvency Ratio</p>
              <p className="text-2xl font-bold">1.15</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-7">
        <CardHeader>
          <CardTitle>Fund Performance</CardTitle>
          <CardDescription>Average return rate over the past 9 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={fundPerformanceData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="return" stroke="#10b981" name="Return Rate (%)" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}


"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ContributionForm } from "@/components/contributions/contribution-form"
import { ContributionHistory } from "@/components/contributions/contribution-history"
import { ContributionChart } from "@/components/contributions/contribution-chart"

export function ContributionManagement() {
  const [activeTab, setActiveTab] = useState("history")
  const [refreshHistory, setRefreshHistory] = useState(0)

  const handleContributionSuccess = () => {
    setActiveTab("history")
    setRefreshHistory((prev) => prev + 1)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Contributions</h1>
        <p className="text-muted-foreground">Manage your pension contributions and view your contribution history.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="history">Contribution History</TabsTrigger>
          <TabsTrigger value="add">Add Contribution</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contribution History</CardTitle>
              <CardDescription>View and filter your contribution history</CardDescription>
            </CardHeader>
            <CardContent>
              <ContributionHistory key={refreshHistory} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="add" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add Contribution</CardTitle>
              <CardDescription>Submit a new contribution to your pension account</CardDescription>
            </CardHeader>
            <CardContent>
              <ContributionForm onSuccess={handleContributionSuccess} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contribution Analytics</CardTitle>
              <CardDescription>Visualize your contribution patterns and growth</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ContributionChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatementGenerator } from "@/components/statements/statement-generator"
import { BenefitProjection } from "@/components/statements/benefit-projection"

export function StatementReporting() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Statements & Reports</h1>
        <p className="text-muted-foreground">
          Generate statements, view reports, and project your retirement benefits.
        </p>
      </div>

      <Tabs defaultValue="statements" className="space-y-4">
        <TabsList>
          <TabsTrigger value="statements">Statements</TabsTrigger>
          <TabsTrigger value="projections">Benefit Projections</TabsTrigger>
        </TabsList>
        <TabsContent value="statements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Statement Generator</CardTitle>
              <CardDescription>Generate custom statements for any date range</CardDescription>
            </CardHeader>
            <CardContent>
              <StatementGenerator />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="projections" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Benefit Projection Calculator</CardTitle>
              <CardDescription>Estimate your retirement benefits based on your current contributions</CardDescription>
            </CardHeader>
            <CardContent>
              <BenefitProjection />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


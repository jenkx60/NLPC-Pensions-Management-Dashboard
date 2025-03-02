"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import type { DateRange } from "react-day-picker"
import { addDays } from "date-fns"
import { Download, FileText, Loader2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function AdminReports() {
  const [reportType, setReportType] = useState<string>("")
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)

  const handleGenerateReport = () => {
    setIsGenerating(true)
    setGenerationProgress(0)

    // Simulate report generation
    const interval = setInterval(() => {
      setGenerationProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          setIsGenerating(false)
          return 100
        }
        return prevProgress + 10
      })
    }, 500)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Generate Reports</CardTitle>
          <CardDescription>Create custom reports for the pension system</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="report-type" className="text-sm font-medium">
              Report Type
            </label>
            <Select onValueChange={setReportType}>
              <SelectTrigger id="report-type">
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="contributions">Contributions Report</SelectItem>
                <SelectItem value="members">Members Report</SelectItem>
                <SelectItem value="performance">Fund Performance Report</SelectItem>
                <SelectItem value="compliance">Compliance Report</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="date-range" className="text-sm font-medium">
              Date Range
            </label>
            <DatePickerWithRange date={dateRange} setDate={setDateRange} />
          </div>
          <Button onClick={handleGenerateReport} disabled={!reportType || !dateRange || isGenerating}>
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Generate Report
              </>
            )}
          </Button>
          {isGenerating && (
            <div className="space-y-2">
              <Progress value={generationProgress} className="w-full" />
              <p className="text-sm text-muted-foreground">Generating report... {generationProgress}% complete</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
          <CardDescription>Download previously generated reports</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex justify-between items-center">
              <span>Contributions Report - September 2023</span>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </li>
            <li className="flex justify-between items-center">
              <span>Members Report - Q3 2023</span>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </li>
            <li className="flex justify-between items-center">
              <span>Fund Performance Report - 2023 YTD</span>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </li>
            <li className="flex justify-between items-center">
              <span>Compliance Report - August 2023</span>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}


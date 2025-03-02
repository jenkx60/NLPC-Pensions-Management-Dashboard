"use client"
import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpDown, Search, Download, Plus } from "lucide-react"
import { ContributionChart } from "@/components/contributions/contribution-chart"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { DatePicker } from "@/components/ui/date-picker"
import { date } from "zod"

type Contribution = {
  id: string
  memberName: string
  amount: number
  date: string
  type: "Mandatory" | "Voluntary"
  status: "Processed" | "Pending" | "Failed"
}

const mockContributions: Contribution[] = [
  { id: "1", memberName: "John Doe", amount: 50000, date: "2023-09-01", type: "Mandatory", status: "Processed" },
  { id: "2", memberName: "Jane Smith", amount: 75000, date: "2023-09-02", type: "Voluntary", status: "Processed" },
  { id: "3", memberName: "Bob Johnson", amount: 30000, date: "2023-09-03", type: "Mandatory", status: "Pending" },
  { id: "4", memberName: "Alice Brown", amount: 100000, date: "2023-09-04", type: "Voluntary", status: "Processed" },
  { id: "5", memberName: "Charlie Wilson", amount: 60000, date: "2023-09-05", type: "Mandatory", status: "Failed" },
]

export function AdminContributions() {
  const [contributions, setContributions] = useState<Contribution[]>(mockContributions)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<Contribution["status"] | "All">("All")

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    filterContributions(event.target.value, statusFilter)
  }

  const handleStatusFilter = (status: Contribution["status"] | "All") => {
    setStatusFilter(status)
    filterContributions(searchTerm, status)
  }

  const filterContributions = (search: string, status: Contribution["status"] | "All") => {
    const filtered = mockContributions.filter(
      (contribution) =>
        (contribution.memberName.toLowerCase().includes(search.toLowerCase()) ||
          contribution.id.toLowerCase().includes(search.toLowerCase())) &&
        (status === "All" || contribution.status === status),
    )
    setContributions(filtered)
  }

  const sortContributions = (field: keyof Contribution) => {
    const sortedContributions = [...contributions].sort((a, b) => {
      if (a[field] < b[field]) return -1
      if (a[field] > b[field]) return 1
      return 0
    })
    setContributions(sortedContributions)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contribution Overview</CardTitle>
          <CardDescription>Monthly contribution trend over the past year</CardDescription>
        </CardHeader>
        <CardContent>
          <ContributionChart />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Contributions</CardTitle>
          <CardDescription>View and manage recent pension contributions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search contributions..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="max-w-sm"
                />
              </div>
              <Select onValueChange={(value) => handleStatusFilter(value as Contribution["status"] | "All")}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Processed">Processed</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Contribution
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Contribution</DialogTitle>
                    <DialogDescription>
                      Enter the details of the new contribution here. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="member" className="text-right">
                        Member
                      </Label>
                      <Input id="member" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="amount" className="text-right">
                        Amount
                      </Label>
                      <Input id="amount" type="number" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="date" className="text-right">
                        Date
                      </Label>
                      <DatePicker className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="type" className="text-right">
                        Type
                      </Label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Mandatory">Mandatory</SelectItem>
                          <SelectItem value="Voluntary">Voluntary</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save Contribution</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">
                  <Button variant="ghost" onClick={() => sortContributions("memberName")}>
                    Member Name <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => sortContributions("amount")}>
                    Amount <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => sortContributions("date")}>
                    Date <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contributions.map((contribution) => (
                <TableRow key={contribution.id}>
                  <TableCell className="font-medium">{contribution.memberName}</TableCell>
                  <TableCell>₦{contribution.amount.toLocaleString()}</TableCell>
                  <TableCell>{contribution.date}</TableCell>
                  <TableCell>{contribution.type}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        contribution.status === "Processed"
                          ? "default"
                          : contribution.status === "Pending"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {contribution.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}


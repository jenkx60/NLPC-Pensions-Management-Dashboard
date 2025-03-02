"use client"
import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, ArrowUpDown, Search, UserPlus, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

type Member = {
  id: string
  name: string
  email: string
  status: "Active" | "Inactive" | "Pending"
  joinDate: string
  contributions: number
  employerName: string
  age: number
}

const mockMembers: Member[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    status: "Active",
    joinDate: "2022-01-15",
    contributions: 50000,
    employerName: "Tech Corp",
    age: 35,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    status: "Active",
    joinDate: "2022-03-22",
    contributions: 75000,
    employerName: "Finance Inc",
    age: 42,
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    status: "Inactive",
    joinDate: "2021-11-05",
    contributions: 30000,
    employerName: "Retail Ltd",
    age: 28,
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice@example.com",
    status: "Pending",
    joinDate: "2022-05-10",
    contributions: 0,
    employerName: "Education Org",
    age: 31,
  },
  {
    id: "5",
    name: "Charlie Wilson",
    email: "charlie@example.com",
    status: "Active",
    joinDate: "2022-02-28",
    contributions: 60000,
    employerName: "Construction Co",
    age: 45,
  },
]

export function MemberManagement() {
  const [members, setMembers] = useState<Member[]>(mockMembers)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<Member["status"] | "All">("All")

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    filterMembers(event.target.value, statusFilter)
  }

  const handleStatusFilter = (status: Member["status"] | "All") => {
    setStatusFilter(status)
    filterMembers(searchTerm, status)
  }

  const filterMembers = (search: string, status: Member["status"] | "All") => {
    const filtered = mockMembers.filter(
      (member) =>
        (member.name.toLowerCase().includes(search.toLowerCase()) ||
          member.email.toLowerCase().includes(search.toLowerCase()) ||
          member.employerName.toLowerCase().includes(search.toLowerCase())) &&
        (status === "All" || member.status === status),
    )
    setMembers(filtered)
  }

  const sortMembers = (field: keyof Member) => {
    const sortedMembers = [...members].sort((a, b) => {
      if (a[field] < b[field]) return -1
      if (a[field] > b[field]) return 1
      return 0
    })
    setMembers(sortedMembers)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Member Management</CardTitle>
        <CardDescription>View and manage pension system members</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <Search className="mr-2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search members..." value={searchTerm} onChange={handleSearch} className="max-w-sm" />
            </div>
            <Select onValueChange={(value) => handleStatusFilter(value as Member["status"] | "All")}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add New Member
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Member</DialogTitle>
                  <DialogDescription>
                    Enter the details of the new member here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input id="email" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="employer" className="text-right">
                      Employer
                    </Label>
                    <Input id="employer" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save Member</Button>
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
                <Button variant="ghost" onClick={() => sortMembers("name")}>
                  Name <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => sortMembers("joinDate")}>
                  Join Date <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => sortMembers("contributions")}>
                  Total Contributions <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Employer</TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => sortMembers("age")}>
                  Age <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="font-medium">{member.name}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      member.status === "Active" ? "default" : member.status === "Inactive" ? "secondary" : "outline"
                    }
                  >
                    {member.status}
                  </Badge>
                </TableCell>
                <TableCell>{member.joinDate}</TableCell>
                <TableCell>₦{member.contributions.toLocaleString()}</TableCell>
                <TableCell>{member.employerName}</TableCell>
                <TableCell>{member.age}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Member</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Delete Member</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}


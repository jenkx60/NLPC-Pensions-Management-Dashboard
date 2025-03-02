"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Building2, ExternalLink } from "lucide-react"

export function EmployerInfo() {
  const { toast } = useToast()

  // Mock employer data
  const [employerData] = useState({
    name: "Acme Corporation",
    employerId: "EMP-98765",
    industry: "Technology",
    address: "456 Tech Avenue, Lekki, Lagos",
    contactPerson: "HR Manager",
    contactEmail: "hr@acmecorp.com",
    contactPhone: "+234 803 456 7890",
    startDate: "2018-06-01",
  })

  const handleContactEmployer = () => {
    toast({
      title: "Contact request sent",
      description: "A message has been sent to your employer's HR department.",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Building2 className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-lg font-medium">{employerData.name}</h3>
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Employer ID</Label>
          <p className="text-sm font-medium">{employerData.employerId}</p>
        </div>

        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Industry</Label>
          <p className="text-sm font-medium">{employerData.industry}</p>
        </div>

        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Address</Label>
          <p className="text-sm font-medium">{employerData.address}</p>
        </div>

        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Contact Person</Label>
          <p className="text-sm font-medium">{employerData.contactPerson}</p>
        </div>

        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Contact Email</Label>
          <p className="text-sm font-medium">{employerData.contactEmail}</p>
        </div>

        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Contact Phone</Label>
          <p className="text-sm font-medium">{employerData.contactPhone}</p>
        </div>

        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Employment Start Date</Label>
          <p className="text-sm font-medium">{new Date(employerData.startDate).toLocaleDateString()}</p>
        </div>

        <Button variant="outline" size="sm" className="w-full mt-2" onClick={handleContactEmployer}>
          <ExternalLink className="h-4 w-4 mr-2" />
          Contact Employer
        </Button>
      </div>
    </div>
  )
}


"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Pencil, Save } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function NextOfKin() {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)

  // Mock next of kin data
  const [kinData, setKinData] = useState({
    fullName: "Jane Doe",
    relationship: "Spouse",
    phoneNumber: "+234 802 345 6789",
    email: "jane.doe@example.com",
    address: "123 Lagos Street, Victoria Island, Lagos",
  })

  const handleSave = () => {
    // Simulate API call to save next of kin information
    setTimeout(() => {
      setIsEditing(false)
      toast({
        title: "Next of kin updated",
        description: "Your next of kin information has been updated successfully.",
      })
    }, 1000)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Next of Kin Details</h3>
        <Button variant="ghost" size="sm" onClick={() => (isEditing ? handleSave() : setIsEditing(true))}>
          {isEditing ? (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save
            </>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="kinFullName">Full Name</Label>
          <Input
            id="kinFullName"
            value={kinData.fullName}
            onChange={(e) => setKinData({ ...kinData, fullName: e.target.value })}
            disabled={!isEditing}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="kinRelationship">Relationship</Label>
          {isEditing ? (
            <Select
              value={kinData.relationship}
              onValueChange={(value) => setKinData({ ...kinData, relationship: value })}
            >
              <SelectTrigger id="kinRelationship">
                <SelectValue placeholder="Select relationship" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Spouse">Spouse</SelectItem>
                <SelectItem value="Child">Child</SelectItem>
                <SelectItem value="Parent">Parent</SelectItem>
                <SelectItem value="Sibling">Sibling</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <Input id="kinRelationship" value={kinData.relationship} disabled={true} />
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="kinPhoneNumber">Phone Number</Label>
          <Input
            id="kinPhoneNumber"
            value={kinData.phoneNumber}
            onChange={(e) => setKinData({ ...kinData, phoneNumber: e.target.value })}
            disabled={!isEditing}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="kinEmail">Email</Label>
          <Input
            id="kinEmail"
            value={kinData.email}
            onChange={(e) => setKinData({ ...kinData, email: e.target.value })}
            disabled={!isEditing}
            type="email"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="kinAddress">Address</Label>
          <Input
            id="kinAddress"
            value={kinData.address}
            onChange={(e) => setKinData({ ...kinData, address: e.target.value })}
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  )
}


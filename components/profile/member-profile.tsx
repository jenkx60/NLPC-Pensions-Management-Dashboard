"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Pencil, Save } from "lucide-react"

export function MemberProfile() {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)

  // Mock user data
  const [userData, setUserData] = useState({
    fullName: "John Doe",
    dateOfBirth: "1985-05-15",
    gender: "Male",
    nationalId: "NG12345678",
    phoneNumber: "+234 801 234 5678",
    address: "123 Lagos Street, Victoria Island, Lagos",
    email: "john.doe@example.com",
    membershipNumber: "PEN-12345678",
    registrationDate: "2015-03-10",
  })

  const handleSave = () => {
    // Simulate API call to save profile
    setTimeout(() => {
      setIsEditing(false)
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      })
    }, 1000)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Personal Information</h3>
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

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={userData.fullName}
            onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
            disabled={!isEditing}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            value={userData.dateOfBirth}
            onChange={(e) => setUserData({ ...userData, dateOfBirth: e.target.value })}
            disabled={!isEditing}
            type="date"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Input
            id="gender"
            value={userData.gender}
            onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
            disabled={!isEditing}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nationalId">National ID</Label>
          <Input
            id="nationalId"
            value={userData.nationalId}
            onChange={(e) => setUserData({ ...userData, nationalId: e.target.value })}
            disabled={!isEditing}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            value={userData.phoneNumber}
            onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })}
            disabled={!isEditing}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            disabled={!isEditing}
            type="email"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            value={userData.address}
            onChange={(e) => setUserData({ ...userData, address: e.target.value })}
            disabled={!isEditing}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="membershipNumber">Membership Number</Label>
          <Input
            id="membershipNumber"
            value={userData.membershipNumber}
            onChange={(e) => setUserData({ ...userData, membershipNumber: e.target.value })}
            disabled={true} // Always disabled as membership number shouldn't be editable
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="registrationDate">Registration Date</Label>
          <Input
            id="registrationDate"
            value={userData.registrationDate}
            disabled={true} // Always disabled as registration date shouldn't be editable
          />
        </div>
      </div>
    </div>
  )
}


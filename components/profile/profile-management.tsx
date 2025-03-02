"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MemberProfile } from "@/components/profile/member-profile"
import { NextOfKin } from "@/components/profile/next-of-kin"
import { EmployerInfo } from "@/components/profile/employer-info"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"
import { Upload } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function ProfileManagement() {
  const { user } = useAuth()
  const { toast } = useToast()

  const handleUploadPhoto = () => {
    toast({
      title: "Photo upload",
      description: "This feature would allow you to upload a new profile photo.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile Management</h1>
        <p className="text-muted-foreground">
          Manage your personal information, next of kin, and view employer details.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <Card className="md:w-1/3">
          <CardHeader>
            <CardTitle>Profile Photo</CardTitle>
            <CardDescription>Update your profile picture</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Avatar className="h-32 w-32 mb-4">
              <AvatarImage src={user?.profileImage} alt={user?.name} />
              <AvatarFallback className="text-4xl">{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-center mb-4">
              <h3 className="text-lg font-medium">{user?.name}</h3>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
            <Button onClick={handleUploadPhoto} className="w-full">
              <Upload className="mr-2 h-4 w-4" />
              Upload New Photo
            </Button>
          </CardContent>
        </Card>

        <div className="flex-1">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="nextofkin">Next of Kin</TabsTrigger>
              <TabsTrigger value="employer">Employer</TabsTrigger>
            </TabsList>
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Manage your personal details and contact information</CardDescription>
                </CardHeader>
                <CardContent>
                  <MemberProfile />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="nextofkin">
              <Card>
                <CardHeader>
                  <CardTitle>Next of Kin</CardTitle>
                  <CardDescription>Manage your beneficiary information</CardDescription>
                </CardHeader>
                <CardContent>
                  <NextOfKin />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="employer">
              <Card>
                <CardHeader>
                  <CardTitle>Employer Information</CardTitle>
                  <CardDescription>View your current employer details</CardDescription>
                </CardHeader>
                <CardContent>
                  <EmployerInfo />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}


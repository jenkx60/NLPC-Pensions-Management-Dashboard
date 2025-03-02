"use client"
import { useAuth } from "@/context/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ContributionChart } from "@/components/contributions/contribution-chart"
import { RecentContributions } from "@/components/contributions/recent-contributions"
import { MemberProfile } from "@/components/profile/member-profile"
import { NextOfKin } from "@/components/profile/next-of-kin"
import { EmployerInfo } from "@/components/profile/employer-info"
import { BenefitProjection } from "@/components/statements/benefit-projection"

export function MemberDashboard() {
  const { user } = useAuth()

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name}. Here's an overview of your pension account.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦4,567,890.00</div>
            <p className="text-xs text-muted-foreground">+₦120,000.00 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">YTD Contributions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦480,000.00</div>
            <p className="text-xs text-muted-foreground">8 contributions this year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Return Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.2%</div>
            <p className="text-xs text-muted-foreground">+1.2% from previous year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Years to Retirement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">Retirement age: 65</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="projections">Projections</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Contribution History</CardTitle>
                <CardDescription>Your contribution trend over the past 12 months</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ContributionChart />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Contributions</CardTitle>
                <CardDescription>Your last 5 contribution transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentContributions />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="profile" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Your personal details and contact information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center mb-6">
                  <Avatar className="h-24 w-24 mb-2">
                    <AvatarImage src={user?.profileImage} alt={user?.name} />
                    <AvatarFallback className="text-2xl">{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-medium">{user?.name}</h3>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
                <MemberProfile />
              </CardContent>
            </Card>
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Next of Kin</CardTitle>
                <CardDescription>Your designated beneficiary information</CardDescription>
              </CardHeader>
              <CardContent>
                <NextOfKin />
              </CardContent>
            </Card>
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Employer Information</CardTitle>
                <CardDescription>Your current employer details</CardDescription>
              </CardHeader>
              <CardContent>
                <EmployerInfo />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="projections" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Benefit Projection</CardTitle>
              <CardDescription>Estimated retirement benefits based on your current contributions</CardDescription>
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


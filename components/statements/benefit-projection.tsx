"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  currentAge: z.coerce
    .number()
    .min(18, { message: "Age must be at least 18" })
    .max(65, { message: "Age must be less than 65" }),
  retirementAge: z.coerce
    .number()
    .min(45, { message: "Retirement age must be at least 45" })
    .max(70, { message: "Retirement age must be less than 70" }),
  currentBalance: z.coerce.number().min(0, { message: "Balance must be a positive number" }),
  monthlyContribution: z.coerce.number().min(0, { message: "Contribution must be a positive number" }),
  expectedReturnRate: z.coerce
    .number()
    .min(1, { message: "Return rate must be at least 1%" })
    .max(20, { message: "Return rate must be less than 20%" }),
})

type FormValues = z.infer<typeof formSchema>

export function BenefitProjection() {
  const [isCalculating, setIsCalculating] = useState(false)
  const [projectionData, setProjectionData] = useState<any>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentAge: 35,
      retirementAge: 60,
      currentBalance: 4567890,
      monthlyContribution: 40000,
      expectedReturnRate: 8,
    },
  })

  const onSubmit = async (values: FormValues) => {
    setIsCalculating(true)
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      // Calculate projection
      const yearsToRetirement = values.retirementAge - values.currentAge
      const monthsToRetirement = yearsToRetirement * 12
      
      let balance = values.currentBalance
      const monthlyReturnRate = values.expectedReturnRate / 100 / 12
      
      const yearlyData = []
      const currentYear = new Date().getFullYear()
      
      for (let year = 0; year <= yearsToRetirement; year++) {
        if (year > 0) {
          for (let month = 0; month < 12; month++) {
            balance = balance * (1 + monthlyReturnRate) + values.monthlyContribution
          }
        }
        
        yearlyData.push({
          year: currentYear + year,
          balance: Math.round(balance),
          age: values.currentAge + year,
        })
      }
      
      // Calculate monthly pension (simple approximation)
      const lifeExpectancy = 85
      const yearsInRetirement = lifeExpectancy - values.retirementAge
      const monthsInRetirement = yearsInRetirement * 12
      
      // Assuming 4% withdrawal rate per year
      const monthlyPension = (balance * 0.04) / 12
      
      setProjectionData({
        chartData: yearlyData,
        finalBalance: balance,
        monthlyPension,
        yearsToRetirement,
        yearsInRetirement,
      })
    } catch (error) {
      console.error("Failed to calculate projection:", error)
    } finally {
      setIsCalculating(false)
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="currentAge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Age</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your current age in years
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="retirementAge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Retirement Age</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your expected retirement age
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="currentBalance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Balance (₦)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your current pension balance
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="retirementAge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Retirement Age</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your expected retirement age
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="currentBalance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Balance (₦)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your current pension balance
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="monthlyContribution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Contribution (₦)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your monthly pension contribution
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="expectedReturnRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expected Return Rate (%)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your expected annual return rate
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={isCalculating}>
            {isCalculating ? "Calculating..." : "Calculate Projection"}
          </button>
        </form>
      </Form>
      
      {projectionData && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Projection Results</h2>
          <p>Final Balance: ₦{projectionData.finalBalance.toLocaleString()}</p>
          <p>Monthly Pension: ₦{projectionData.monthlyPension.toLocaleString()}</p>
          <p>Years to Retirement: {projectionData.yearsToRetirement}</p>
          <p>Years in Retirement: {projectionData.yearsInRetirement}</p>
          
          <div>
            <h3 className="text-xl font-bold">Yearly Projection</h3>
            <ul>
              {projectionData.chartData.map((data: any) => (
                <li key={data.year}>
                  Year {data.year}: ₦{data.balance.toLocaleString()} (Age: {data.age})
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}


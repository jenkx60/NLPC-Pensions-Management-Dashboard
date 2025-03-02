"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Download, Loader2, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ContributionChart } from "@/components/contributions/contribution-chart"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z
  .object({
    startDate: z.date({
      required_error: "Start date is required",
    }),
    endDate: z.date({
      required_error: "End date is required",
    }),
  })
  .refine((data) => data.startDate <= data.endDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  })

type FormValues = z.infer<typeof formSchema>

export function StatementGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [statementGenerated, setStatementGenerated] = useState(false)
  const { toast } = useToast()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDate: new Date(new Date().getFullYear(), 0, 1), // January 1st of current year
      endDate: new Date(),
    },
  })

  const onSubmit = async (values: FormValues) => {
    setIsGenerating(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setStatementGenerated(true)
      toast({
        title: "Statement Generated",
        description: "Your statement has been generated successfully.",
      })
    } catch (error) {
      toast({
        title: "Failed to generate statement",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = () => {
    toast({
      title: "Statement Downloaded",
      description: "Your statement has been downloaded as a PDF.",
    })
  }

  const handleEmail = () => {
    toast({
      title: "Statement Emailed",
      description: "Your statement has been sent to your registered email address.",
    })
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                        >
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                        >
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>End date cannot be in the future</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={isGenerating}>
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Statement"
            )}
          </Button>
        </form>
      </Form>

      {statementGenerated && (
        <Card className="mt-6">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Pension Statement</h3>
                  <p className="text-sm text-muted-foreground">
                    {format(form.getValues().startDate, "PPP")} - {format(form.getValues().endDate, "PPP")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleEmail}>
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="text-sm font-medium mb-2">Account Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Opening Balance:</span>
                      <span className="text-sm font-medium">₦3,987,890.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Total Contributions:</span>
                      <span className="text-sm font-medium">₦480,000.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Investment Returns:</span>
                      <span className="text-sm font-medium">₦100,000.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Fees & Charges:</span>
                      <span className="text-sm font-medium">-₦12,000.00</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Closing Balance:</span>
                      <span className="text-sm font-bold">₦4,567,890.00</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Contribution Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Mandatory Contributions:</span>
                      <span className="text-sm font-medium">₦360,000.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Voluntary Contributions:</span>
                      <span className="text-sm font-medium">₦120,000.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Employer Contributions:</span>
                      <span className="text-sm font-medium">₦360,000.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Employee Contributions:</span>
                      <span className="text-sm font-medium">₦120,000.00</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Total Contributions:</span>
                      <span className="text-sm font-bold">₦480,000.00</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-medium mb-4">Contribution Trend</h4>
                <div className="h-[300px]">
                  <ContributionChart />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}


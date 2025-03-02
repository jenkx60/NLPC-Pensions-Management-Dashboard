"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useNotification } from "@/context/notification-context"

const formSchema = z.object({
  type: z.enum(["mandatory", "voluntary"], {
    required_error: "You must select a contribution type",
  }),
  amount: z.string().refine(
    (val) => {
      const num = Number.parseFloat(val)
      return !isNaN(num) && num > 0
    },
    { message: "Amount must be a positive number" },
  ),
  date: z
    .date({
      required_error: "A date is required",
    })
    .refine((date) => date <= new Date(), { message: "Date cannot be in the future" }),
})

type FormValues = z.infer<typeof formSchema>

interface ContributionFormProps {
  onSuccess: () => void
}

export function ContributionForm({ onSuccess }: ContributionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { addNotification } = useNotification()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "mandatory",
      amount: "",
      date: new Date(),
    },
  })

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check for duplicate contribution (mock implementation)
      const isDuplicate = false
      if (isDuplicate) {
        form.setError("root", {
          message: "A contribution with the same date and type already exists",
        })
        return
      }

      // Check for mandatory contribution in the same month (mock implementation)
      const isSameMonthMandatory = values.type === "mandatory" && Math.random() > 0.7
      if (isSameMonthMandatory) {
        form.setError("type", {
          message: "You already have a mandatory contribution for this month",
        })
        return
      }

      // Success
      addNotification({
        title: "Contribution Added",
        message: `Your ${values.type} contribution of ₦${Number.parseFloat(values.amount).toLocaleString()} has been submitted successfully.`,
        type: "success",
      })

      onSuccess()
    } catch (error) {
      form.setError("root", {
        message: "Failed to submit contribution. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Contribution Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="mandatory" />
                    </FormControl>
                    <FormLabel className="font-normal">Mandatory Contribution</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="voluntary" />
                    </FormControl>
                    <FormLabel className="font-normal">Voluntary Contribution (AVC)</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormDescription>
                {field.value === "mandatory"
                  ? "Limited to one contribution per calendar month"
                  : "Multiple voluntary contributions allowed per month"}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount (₦)</FormLabel>
              <FormControl>
                <Input placeholder="0.00" {...field} type="number" step="0.01" min="0" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Contribution Date</FormLabel>
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
              <FormDescription>Contribution date cannot be in the future</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.formState.errors.root && (
          <p className="text-sm font-medium text-destructive">{form.formState.errors.root.message}</p>
        )}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Contribution"
          )}
        </Button>
      </form>
    </Form>
  )
}


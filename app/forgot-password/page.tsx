import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"
import { AuthLayout } from "@/components/layouts/auth-layout"

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <ForgotPasswordForm />
    </AuthLayout>
  )
}


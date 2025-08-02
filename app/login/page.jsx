"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

import { loginSuccess } from "@/redux/slices/authSlice"
import { Building } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"

export default function LoginPage() {
  const { t } = useTranslation()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()



  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      
      const data = await response.json()
      
      if (response.ok && data.user) {
        dispatch(loginSuccess(data.user))

        // Redirect based on role
        switch (data.user.role) {
          case "admin":
            router.push("/admin")
            break
          case "owner":
            router.push("/owners")
            break
          case "tenant":
            router.push("/properties")
            break
          default:
            router.push("/")
        }
      } else {
        setError(data.error || "Invalid email or password")
      }
    } catch (error) {
      console.error('Login error:', error)
      setError("Login failed. Please check your connection and try again.")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Building className="h-8 w-8 text-primary mr-2" />
            <span className="text-2xl font-bold text-primary">Rentify</span>
          </div>
          <CardTitle className="text-2xl text-center">{t("login")}</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">{t("email")}</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t("password")}</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>


          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? t("loading") : t("login")}
            </Button>

            <div className="text-center text-sm">
              {"Don't have an account? "}
              <Link href="/signup" className="text-primary hover:underline">
                {t("signup")}
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { getBrowserClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)
    console.log("Login form submitted")

    try {
      const formData = new FormData(event.currentTarget)
      const email = formData.get("email") as string
      const password = formData.get("password") as string

      // Get the singleton Supabase client instance
      const supabase = getBrowserClient()
      
      if (!supabase) {
        throw new Error("Failed to initialize Supabase client")
      }
      
      console.log("Supabase client initialized", supabase)

      console.log("Attempting to sign in with", { email })
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      console.log("Sign-in response:", { data, error: signInError })

      if (signInError) {
        // Check if the error message contains rate limit information
        if (signInError.message.toLowerCase().includes("rate limit") || signInError.status === 429) {
          setError("Rate limit exceeded. Please wait a moment before trying again.")
          toast({
            title: "Rate limit exceeded",
            description: "Too many login attempts. Please wait a moment before trying again.",
            variant: "destructive",
          })
        } else {
          setError(signInError.message)
          toast({
            title: "Login failed",
            description: signInError.message,
            variant: "destructive",
          })
        }
        return
      }

      // Use router.push instead of window.location for better Next.js integration
      router.push("/my-qr-codes")
    } catch (error: any) {
      // Check for rate limit errors in the caught exception
      if (
        error?.message?.toLowerCase().includes("rate limit") ||
        error?.status === 429 ||
        error?.message?.includes("429")
      ) {
        setError("Rate limit exceeded. Please wait a moment before trying again.")
        toast({
          title: "Rate limit exceeded",
          description: "Too many login attempts. Please wait a moment before trying again.",
          variant: "destructive",
        })
      } else {
        setError(error?.message || "Something went wrong")
        toast({
          title: "Login failed",
          description: error?.message || "Something went wrong",
          variant: "destructive",
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="your@email.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a
                href="/forgot-password"
                className="text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              autoCapitalize="none"
              autoComplete="current-password"
              autoCorrect="off"
              disabled={isLoading}
              required
            />
          </div>
          {error && <div className="text-sm text-red-500">{error}</div>}
          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign in
          </Button>
        </div>
      </form>
    </div>
  )
}

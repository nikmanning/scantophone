"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function EnvironmentDebugPage() {
  const [envVars, setEnvVars] = useState<Record<string, boolean>>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check environment variables
    const vars = {
      // Supabase variables
      NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      SUPABASE_URL: !!process.env.SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,

      // Site URL
      NEXT_PUBLIC_SITE_URL: !!process.env.NEXT_PUBLIC_SITE_URL,
    }

    setEnvVars(vars)
    setIsLoading(false)

    // Log for debugging
    console.log("Environment variables:", {
      ...Object.entries(vars).reduce(
        (acc, [key, value]) => {
          acc[key] = value ? "✅ Available" : "❌ Missing"
          return acc
        },
        {} as Record<string, string>,
      ),
    })
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#e9ede7] flex items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium">Checking environment variables...</p>
        </div>
      </div>
    )
  }

  const missingVars = Object.entries(envVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key)
  const allVarsPresent = missingVars.length === 0

  return (
    <div className="min-h-screen bg-[#e9ede7] p-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/dashboard" className="inline-flex items-center mb-6 text-sm font-medium">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>

        <h1 className="text-3xl font-bold mb-6">Environment Variables Debug</h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              {allVarsPresent ? (
                <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="mr-2 h-5 w-5 text-red-500" />
              )}
              Environment Variables Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            {allVarsPresent ? (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <AlertTitle>All environment variables are properly configured</AlertTitle>
                <AlertDescription>Your application has all the required environment variables.</AlertDescription>
              </Alert>
            ) : (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Missing environment variables</AlertTitle>
                <AlertDescription>
                  <div className="space-y-2">
                    <p>The following environment variables are required but missing:</p>
                    <ul className="list-disc pl-5">
                      {missingVars.map((varName) => (
                        <li key={varName}>{varName}</li>
                      ))}
                    </ul>
                    <p>Please add these environment variables to your project settings in Vercel.</p>
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Environment Variables Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <h3 className="font-medium">Supabase Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(envVars)
                  .filter(([key]) => key.includes("SUPABASE"))
                  .map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="font-mono text-sm">{key}</span>
                      {value ? (
                        <span className="text-green-500 font-medium flex items-center">
                          <CheckCircle className="h-4 w-4 mr-1" /> Available
                        </span>
                      ) : (
                        <span className="text-red-500 font-medium flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" /> Missing
                        </span>
                      )}
                    </div>
                  ))}
              </div>

              <h3 className="font-medium mt-6">Other Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(envVars)
                  .filter(([key]) => !key.includes("SUPABASE"))
                  .map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="font-mono text-sm">{key}</span>
                      {value ? (
                        <span className="text-green-500 font-medium flex items-center">
                          <CheckCircle className="h-4 w-4 mr-1" /> Available
                        </span>
                      ) : (
                        <span className="text-red-500 font-medium flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" /> Missing
                        </span>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6">
          <Button onClick={() => window.location.reload()} className="rounded-full">
            Refresh Status
          </Button>
        </div>
      </div>
    </div>
  )
}

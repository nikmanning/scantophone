"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { checkUserAuthentication, type AuthCheckResult } from "@/app/actions/check-auth"

export default function CheckAuthPage() {
  const [email, setEmail] = useState("")
  const [result, setResult] = useState<AuthCheckResult | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleCheck() {
    if (!email) return

    setLoading(true)
    try {
      const authResult = await checkUserAuthentication(email)
      setResult(authResult)
    } catch (error) {
      console.error("Error checking authentication:", error)
      setResult({
        authenticated: false,
        error: `Error: ${error instanceof Error ? error.message : String(error)}`,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container max-w-md py-10">
      <Card>
        <CardHeader>
          <CardTitle>Check User Authentication</CardTitle>
          <CardDescription>Enter an email address to check if the user is authenticated</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleCheck} disabled={loading}>
            {loading ? "Checking..." : "Check Authentication"}
          </Button>
        </CardFooter>
      </Card>

      {result && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="font-semibold mr-2">Status:</span>
                <span className={result.authenticated ? "text-green-600" : "text-red-600"}>
                  {result.authenticated ? "Authenticated" : "Not Authenticated"}
                </span>
              </div>

              {result.error && (
                <div className="text-red-600">
                  <span className="font-semibold">Error:</span> {result.error}
                </div>
              )}

              {result.user && (
                <div className="space-y-1">
                  <div>
                    <span className="font-semibold">User ID:</span> {result.user.id}
                  </div>
                  <div>
                    <span className="font-semibold">Email:</span> {result.user.email}
                  </div>
                  {result.user.lastSignIn && (
                    <div>
                      <span className="font-semibold">Last Sign In:</span>{" "}
                      {new Date(result.user.lastSignIn).toLocaleString()}
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

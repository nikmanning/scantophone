"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function EnvError({ error }: { error: Error }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-red-600">Environment Configuration Error</CardTitle>
          <CardDescription>The application is missing required environment variables</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTitle>Missing Supabase Configuration</AlertTitle>
            <AlertDescription className="mt-2">
              {error.message}
              <div className="mt-4">
                <p className="text-sm">
                  Please create an <code className="bg-gray-100 px-1 py-0.5 rounded">.env.local</code> file in the root
                  of your project with the following variables:
                </p>
                <pre className="bg-gray-100 p-2 rounded mt-2 text-xs overflow-x-auto">
                  NEXT_PUBLIC_SUPABASE_URL=your_supabase_url{"\n"}
                  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key{"\n"}
                  SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
                </pre>
              </div>
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter>
          <Link href="/" className="w-full">
            <Button variant="outline" className="w-full">
              Return to Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function CheckSchemaPage() {
  const [schemaInfo, setSchemaInfo] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function checkSchema() {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/check-schema")
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to check schema")
      }

      setSchemaInfo(data)
    } catch (err) {
      console.error("Error checking schema:", err)
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkSchema()
  }, [])

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Database Schema Checker</h1>

      <Button onClick={checkSchema} disabled={loading} className="mb-6">
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Checking Schema...
          </>
        ) : (
          "Refresh Schema Info"
        )}
      </Button>

      {error && (
        <Card className="mb-6 border-red-300 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-700">{error}</p>
          </CardContent>
        </Card>
      )}

      {schemaInfo && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>QR Codes Table Columns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Column Name</th>
                      <th className="text-left p-2">Data Type</th>
                      <th className="text-left p-2">Nullable</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schemaInfo.columns ? (
                      schemaInfo.columns.map((column: any, index: number) => (
                        <tr key={index} className="border-b">
                          <td className="p-2">{column.column_name}</td>
                          <td className="p-2">{column.data_type}</td>
                          <td className="p-2">{column.is_nullable ? "Yes" : "No"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="p-2 text-center">
                          No column information available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sample Data</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                {JSON.stringify(schemaInfo.sample, null, 2)}
              </pre>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

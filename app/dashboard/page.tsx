"use client"

import { useRouter } from 'next/navigation'
import { getBrowserClient } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { TabsContent } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  QrCode,
  Plus,
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  Globe,
  Clock,
  ChevronRight,
  AlertCircle,
  Download,
  Settings,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { EnvChecker } from "@/components/env-checker"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AppHeader } from "@/components/app-header"

export default function Dashboard() {
  const router = useRouter()
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d")
  
  const supabase = getBrowserClient()
  const [envError, setEnvError] = useState<string | null>(null)

// Use the auth hook to check authentication
const { user, loading: authLoading } = useAuth()


  // Sample data for dashboard
  const stats = {
    totalScans: 1245,
    activeQRCodes: 12,
    conversionRate: 3.2,
    totalQRCodes: 15,
  }

  const recentActivity = [
    {
      id: 1,
      type: "scan",
      qrName: "Product Showcase",
      location: "New York, US",
      time: "2 minutes ago",
    },
    {
      id: 2,
      type: "scan",
      qrName: "Special Offer",
      location: "London, UK",
      time: "15 minutes ago",
    },
    {
      id: 3,
      type: "create",
      qrName: "New Event Registration",
      time: "1 hour ago",
    },
    {
      id: 4,
      type: "edit",
      qrName: "Contact Page",
      time: "3 hours ago",
    },
    {
      id: 5,
      type: "scan",
      qrName: "Product Showcase",
      location: "Tokyo, Japan",
      time: "5 hours ago",
    },
  ]

  const topPerformingQRs = [
    {
      id: 1,
      name: "Special Offer",
      scans: 456,
      trend: "+12%",
    },
    {
      id: 2,
      name: "Product Showcase",
      scans: 324,
      trend: "+8%",
    },
    {
      id: 3,
      name: "Event Registration",
      scans: 245,
      trend: "+5%",
    },
  ]

  // Show loading state while authentication is being checked
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#e9ede7] flex items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  // Show environment variable error if present
  if (envError) {
    return (
      <div className="min-h-screen bg-[#e9ede7] flex items-center justify-center">
        <div className="bg-white p-8 rounded-3xl shadow-lg max-w-md w-full">
          <div className="text-center mb-6">
            <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900">Environment Variable Error</h2>
            <p className="text-gray-600 mt-2">{envError}</p>
          </div>
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Missing Supabase Configuration</AlertTitle>
            <AlertDescription>
              <p>Please make sure the following environment variables are set:</p>
              <ul className="list-disc pl-5 mt-2">
                <li>NEXT_PUBLIC_SUPABASE_URL</li>
                <li>NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
              </ul>
            </AlertDescription>
          </Alert>
          <div className="flex flex-col space-y-3">
            <Button variant="outline" onClick={() => window.location.reload()} className="w-full rounded-full">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#e9ede7]">
      {/* Use the shared AppHeader component */}
      <AppHeader activePage={"my-qr-codes"} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Environment Variable Checker */}
        <EnvChecker />

        {/* Header with time range selector */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-500 mt-1">
              {user ? `Welcome, ${user.email}` : "Overview of your QR code performance"}
            </p>
          </div>

          <div className="flex gap-4">
            <div className="bg-white rounded-full p-1 shadow-sm">
              <Button
                variant="ghost"
                size="sm"
                className={`rounded-full px-4 ${timeRange === "7d" ? "bg-[#e4ff54]" : ""}`}
                onClick={() => setTimeRange("7d")}
              >
                7 days
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`rounded-full px-4 ${timeRange === "30d" ? "bg-[#e4ff54]" : ""}`}
                onClick={() => setTimeRange("30d")}
              >
                30 days
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`rounded-full px-4 ${timeRange === "90d" ? "bg-[#e4ff54]" : ""}`}
                onClick={() => setTimeRange("90d")}
              >
                90 days
              </Button>
            </div>

            <Link href="/create">
              <Button className="rounded-full px-6 py-2 bg-black hover:bg-gray-800 text-white font-medium">
                <Plus className="mr-2 h-4 w-4" />
                Create New QR Code
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 rounded-3xl border-0 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium text-gray-600">Total Scans</h3>
              <div className="bg-[#e4ff54] p-2 rounded-full">
                <BarChart3 className="h-5 w-5" />
              </div>
            </div>
            <p className="text-3xl font-bold">{stats.totalScans}</p>
            <div className="flex items-center mt-2 text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+12% from last {timeRange === "7d" ? "week" : timeRange === "30d" ? "month" : "quarter"}</span>
            </div>
          </Card>

          <Card className="p-6 rounded-3xl border-0 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium text-gray-600">Active QR Codes</h3>
              <div className="bg-[#e4ff54] p-2 rounded-full">
                <QrCode className="h-5 w-5" />
              </div>
            </div>
            <p className="text-3xl font-bold">{stats.activeQRCodes}</p>
            <div className="flex items-center mt-2 text-sm text-gray-500">
              <span>of {stats.totalQRCodes} total QR codes</span>
            </div>
          </Card>

          <Card className="p-6 rounded-3xl border-0 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium text-gray-600">Conversion Rate</h3>
              <div className="bg-[#e4ff54] p-2 rounded-full">
                <Users className="h-5 w-5" />
              </div>
            </div>
            <p className="text-3xl font-bold">{stats.conversionRate}%</p>
            <div className="flex items-center mt-2 text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+0.8% from last {timeRange === "7d" ? "week" : timeRange === "30d" ? "month" : "quarter"}</span>
            </div>
          </Card>

          <Card className="p-6 rounded-3xl border-0 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium text-gray-600">Avg. Daily Scans</h3>
              <div className="bg-[#e4ff54] p-2 rounded-full">
                <Calendar className="h-5 w-5" />
              </div>
            </div>
            <p className="text-3xl font-bold">
              {Math.round(stats.totalScans / (timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90))}
            </p>
            <div className="flex items-center mt-2 text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+5% from last {timeRange === "7d" ? "week" : timeRange === "30d" ? "month" : "quarter"}</span>
            </div>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="bg-white rounded-full p-1 border border-gray-200 shadow-sm mb-6">
            <TabsTrigger
              value="overview"
              className="rounded-full px-6 py-2 data-[state=active]:bg-[#e4ff54] data-[state=active]:text-black"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="performance"
              className="rounded-full px-6 py-2 data-[state=active]:bg-[#e4ff54] data-[state=active]:text-black"
            >
              Performance
            </TabsTrigger>
            <TabsTrigger
              value="geography"
              className="rounded-full px-6 py-2 data-[state=active]:bg-[#e4ff54] data-[state=active]:text-black"
            >
              Geography
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <Card className="p-6 rounded-3xl border-0 shadow-sm col-span-1 lg:col-span-2">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Recent Activity</h3>
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-black">
                    View all
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start">
                      <div className="bg-[#e4ff54] p-2 rounded-full mr-4">
                        {activity.type === "scan" ? (
                          <Globe className="h-5 w-5" />
                        ) : activity.type === "create" ? (
                          <Plus className="h-5 w-5" />
                        ) : (
                          <Settings className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">
                          {activity.type === "scan"
                            ? `"${activity.qrName}" was scanned`
                            : activity.type === "create"
                              ? `Created "${activity.qrName}"`
                              : `Edited "${activity.qrName}"`}
                        </p>
                        {activity.location && <p className="text-sm text-gray-500">{activity.location}</p>}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {activity.time}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Top Performing QR Codes */}
              <Card className="p-6 rounded-3xl border-0 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Top Performing</h3>
                  <Link href="/my-qr-codes">
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-black">
                      View all
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <div className="space-y-4">
                  {topPerformingQRs.map((qr, index) => (
                    <div key={qr.id} className="flex items-center">
                      <div className="bg-[#e4ff54] w-8 h-8 rounded-full flex items-center justify-center mr-4 font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{qr.name}</p>
                        <p className="text-sm text-gray-500">{qr.scans} scans</p>
                      </div>
                      <div className="text-green-600 font-medium">{qr.trend}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="p-6 rounded-3xl border-0 shadow-sm">
              <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/create">
                  <Button
                    variant="outline"
                    className="w-full h-24 flex flex-col items-center justify-center rounded-xl border-2 border-gray-200 hover:bg-[#e4ff54] hover:border-black"
                  >
                    <Plus className="h-6 w-6 mb-2" />
                    <span>Create QR Code</span>
                  </Button>
                </Link>
                <Link href="/my-qr-codes">
                  <Button
                    variant="outline"
                    className="w-full h-24 flex flex-col items-center justify-center rounded-xl border-2 border-gray-200 hover:bg-[#e4ff54] hover:border-black"
                  >
                    <QrCode className="h-6 w-6 mb-2" />
                    <span>View All QR Codes</span>
                  </Button>
                </Link>
                <Link href="/analytics">
                  <Button
                    variant="outline"
                    className="w-full h-24 flex flex-col items-center justify-center rounded-xl border-2 border-gray-200 hover:bg-[#e4ff54] hover:border-black"
                  >
                    <BarChart3 className="h-6 w-6 mb-2" />
                    <span>Analytics</span>
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full h-24 flex flex-col items-center justify-center rounded-xl border-2 border-gray-200 hover:bg-[#e4ff54] hover:border-black"
                >
                  <Download className="h-6 w-6 mb-2" />
                  <span>Export Data</span>
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card className="p-6 rounded-3xl border-0 shadow-sm">
              <h3 className="text-xl font-bold mb-6">Performance Metrics</h3>
              <div className="h-64 flex items-center justify-center bg-gray-100 rounded-xl mb-4">
                <p className="text-gray-500">Performance chart would appear here</p>
              </div>
              <p className="text-gray-500 text-sm">
                This chart shows the scan performance of your QR codes over the selected time period.
              </p>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 rounded-3xl border-0 shadow-sm">
                <h3 className="text-xl font-bold mb-6">Device Breakdown</h3>
                <div className="h-48 flex items-center justify-center bg-gray-100 rounded-xl mb-4">
                  <p className="text-gray-500">Device chart would appear here</p>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-sm text-gray-500">Mobile</p>
                    <p className="font-bold">68%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Desktop</p>
                    <p className="font-bold">24%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tablet</p>
                    <p className="font-bold">8%</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 rounded-3xl border-0 shadow-sm">
                <h3 className="text-xl font-bold mb-6">Time of Day</h3>
                <div className="h-48 flex items-center justify-center bg-gray-100 rounded-xl mb-4">
                  <p className="text-gray-500">Time chart would appear here</p>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-sm text-gray-500">Morning</p>
                    <p className="font-bold">32%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Afternoon</p>
                    <p className="font-bold">45%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Evening</p>
                    <p className="font-bold">23%</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="geography" className="space-y-6">
            <Card className="p-6 rounded-3xl border-0 shadow-sm">
              <h3 className="text-xl font-bold mb-6">Geographic Distribution</h3>
              <div className="h-96 flex items-center justify-center bg-gray-100 rounded-xl mb-4">
                <p className="text-gray-500">World map would appear here</p>
              </div>
            </Card>

            <Card className="p-6 rounded-3xl border-0 shadow-sm">
              <h3 className="text-xl font-bold mb-6">Top Locations</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left pb-4 pl-4">Country</th>
                      <th className="text-left pb-4">City</th>
                      <th className="text-left pb-4">Scans</th>
                      <th className="text-left pb-4">% of Total</th>
                      <th className="text-left pb-4">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-4 pl-4">United States</td>
                      <td className="py-4">New York</td>
                      <td className="py-4">324</td>
                      <td className="py-4">26%</td>
                      <td className="py-4 text-green-600">+12%</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-4 pl-4">United Kingdom</td>
                      <td className="py-4">London</td>
                      <td className="py-4">256</td>
                      <td className="py-4">21%</td>
                      <td className="py-4 text-green-600">+8%</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-4 pl-4">Japan</td>
                      <td className="py-4">Tokyo</td>
                      <td className="py-4">198</td>
                      <td className="py-4">16%</td>
                      <td className="py-4 text-green-600">+15%</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-4 pl-4">Germany</td>
                      <td className="py-4">Berlin</td>
                      <td className="py-4">145</td>
                      <td className="py-4">12%</td>
                      <td className="py-4 text-green-600">+5%</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-4 pl-4">Australia</td>
                      <td className="py-4">Sydney</td>
                      <td className="py-4">112</td>
                      <td className="py-4">9%</td>
                      <td className="py-4 text-green-600">+3%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

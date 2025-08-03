"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { format, subDays, differenceInDays } from "date-fns"

interface AnalyticsDashboardProps {
  qrCode: any
  scans: any[]
}

export function AnalyticsDashboard({ qrCode, scans }: AnalyticsDashboardProps) {
  const [timeframe, setTimeframe] = useState("7d")

  // Filter scans based on timeframe
  const filteredScans = scans.filter((scan) => {
    const scanDate = new Date(scan.scanned_at)
    const now = new Date()
    const days = timeframe === "7d" ? 7 : timeframe === "30d" ? 30 : 90
    return scanDate >= subDays(now, days)
  })

  // Prepare data for daily scans chart
  const dailyScansData = getDailyScansData(filteredScans, timeframe)

  // Prepare data for device type chart
  const deviceTypeData = getDeviceTypeData(filteredScans)

  // Prepare data for browser chart
  const browserData = getBrowserData(filteredScans)

  // Prepare data for country chart
  const countryData = getCountryData(filteredScans)

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Analytics Overview</h2>
        <Tabs value={timeframe} onValueChange={setTimeframe}>
          <TabsList>
            <TabsTrigger value="7d">7 Days</TabsTrigger>
            <TabsTrigger value="30d">30 Days</TabsTrigger>
            <TabsTrigger value="90d">90 Days</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredScans.length}</div>
            <p className="text-xs text-muted-foreground">
              {timeframe === "7d" ? "Last 7 days" : timeframe === "30d" ? "Last 30 days" : "Last 90 days"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Daily Scans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredScans.length > 0
                ? Math.round((filteredScans.length / (timeframe === "7d" ? 7 : timeframe === "30d" ? 30 : 90)) * 10) /
                  10
                : 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {timeframe === "7d" ? "Last 7 days" : timeframe === "30d" ? "Last 30 days" : "Last 90 days"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Most Popular Device</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {deviceTypeData.length > 0 ? deviceTypeData.sort((a, b) => b.value - a.value)[0].name : "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">
              {deviceTypeData.length > 0
                ? `${Math.round((deviceTypeData.sort((a, b) => b.value - a.value)[0].value / filteredScans.length) * 100)}% of scans`
                : "No data available"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Daily Scans</CardTitle>
            <CardDescription>Number of scans per day over time</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyScansData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="scans" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Device Types</CardTitle>
            <CardDescription>Distribution of scans by device type</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {deviceTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Browsers</CardTitle>
            <CardDescription>Distribution of scans by browser</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={browserData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {browserData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Geographic Distribution</CardTitle>
          <CardDescription>Distribution of scans by country</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={countryData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={150} />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

// Helper functions to prepare chart data
function getDailyScansData(scans: any[], timeframe: string) {
  const days = timeframe === "7d" ? 7 : timeframe === "30d" ? 30 : 90
  const now = new Date()
  const result = []

  for (let i = days - 1; i >= 0; i--) {
    const date = subDays(now, i)
    const formattedDate = format(date, "MMM dd")

    const dayScans = scans.filter((scan) => {
      const scanDate = new Date(scan.scanned_at)
      return differenceInDays(scanDate, date) === 0
    })

    result.push({
      date: formattedDate,
      scans: dayScans.length,
    })
  }

  return result
}

function getDeviceTypeData(scans: any[]) {
  const deviceCounts: Record<string, number> = {}

  scans.forEach((scan) => {
    const deviceType = scan.device_type || "Unknown"
    deviceCounts[deviceType] = (deviceCounts[deviceType] || 0) + 1
  })

  return Object.entries(deviceCounts).map(([name, value]) => ({ name, value }))
}

function getBrowserData(scans: any[]) {
  const browserCounts: Record<string, number> = {}

  scans.forEach((scan) => {
    const browser = scan.browser || "Unknown"
    browserCounts[browser] = (browserCounts[browser] || 0) + 1
  })

  return Object.entries(browserCounts).map(([name, value]) => ({ name, value }))
}

function getCountryData(scans: any[]) {
  const countryCounts: Record<string, number> = {}

  scans.forEach((scan) => {
    const country = scan.country || "Unknown"
    countryCounts[country] = (countryCounts[country] || 0) + 1
  })

  return Object.entries(countryCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10)
}

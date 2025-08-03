"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  QrCode,
  BarChart3,
  TrendingUp,
  Users,
  Clock,
  ChevronRight,
  Bell,
  LogOut,
  User,
  Download,
  Smartphone,
  Laptop,
  Tablet,
  Sun,
  Sunset,
  Moon,
  MoreVertical,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Analytics() {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d")
  const [selectedQR, setSelectedQR] = useState<string>("all")

  // Sample data for analytics
  const analyticsData = {
    totalScans: 1245,
    uniqueVisitors: 876,
    conversionRate: 3.2,
    avgTimeOnPage: "1m 45s",
    scansByDevice: {
      mobile: 68,
      desktop: 24,
      tablet: 8,
    },
    scansByTime: {
      morning: 32,
      afternoon: 45,
      evening: 23,
    },
    topLocations: [
      {
        country: "United States",
        city: "New York",
        scans: 324,
        percentage: 26,
        trend: "+12%",
      },
      {
        country: "United Kingdom",
        city: "London",
        scans: 256,
        percentage: 21,
        trend: "+8%",
      },
      {
        country: "Japan",
        city: "Tokyo",
        scans: 198,
        percentage: 16,
        trend: "+15%",
      },
      {
        country: "Germany",
        city: "Berlin",
        scans: 145,
        percentage: 12,
        trend: "+5%",
      },
      {
        country: "Australia",
        city: "Sydney",
        scans: 112,
        percentage: 9,
        trend: "+3%",
      },
    ],
    qrCodes: [
      { id: "1", name: "Product Showcase" },
      { id: "2", name: "Special Offer" },
      { id: "3", name: "Event Registration" },
      { id: "4", name: "Contact Page" },
    ],
    dailyScans: [
      { date: "Apr 1", scans: 42 },
      { date: "Apr 2", scans: 38 },
      { date: "Apr 3", scans: 45 },
      { date: "Apr 4", scans: 39 },
      { date: "Apr 5", scans: 47 },
      { date: "Apr 6", scans: 53 },
      { date: "Apr 7", scans: 58 },
    ],
  }

  return (
    <div className="min-h-screen bg-[#e9ede7]">
      {/* Top Navigation Bar */}
      <header className="bg-black text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <Link href="/dashboard" className="flex items-center">
              <QrCode className="h-6 w-6 mr-2 text-[#e4ff54]" />
              <span className="text-xl font-bold">Viral QR Code</span>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/my-qr-codes" className="hover:text-[#e4ff54] transition-colors">
                My QR Codes
              </Link>
              <Link href="/analytics" className="text-[#e4ff54] transition-colors">
                Analytics
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-white hover:text-[#e4ff54] hover:bg-black relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-[#e4ff54] text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:text-[#e4ff54] hover:bg-black">
                  <MoreVertical className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header with filters */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Analytics</h1>
            <p className="text-gray-500 mt-1">Detailed insights into your QR code performance</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
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

            <Select value={selectedQR} onValueChange={setSelectedQR}>
              <SelectTrigger className="w-[180px] bg-white rounded-full">
                <SelectValue placeholder="All QR Codes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All QR Codes</SelectItem>
                {analyticsData.qrCodes.map((qr) => (
                  <SelectItem key={qr.id} value={qr.id}>
                    {qr.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button className="rounded-full px-6 py-2 bg-black hover:bg-gray-800 text-white font-medium">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
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
            <p className="text-3xl font-bold">{analyticsData.totalScans}</p>
            <div className="flex items-center mt-2 text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+12% from last {timeRange === "7d" ? "week" : timeRange === "30d" ? "month" : "quarter"}</span>
            </div>
          </Card>

          <Card className="p-6 rounded-3xl border-0 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium text-gray-600">Unique Visitors</h3>
              <div className="bg-[#e4ff54] p-2 rounded-full">
                <Users className="h-5 w-5" />
              </div>
            </div>
            <p className="text-3xl font-bold">{analyticsData.uniqueVisitors}</p>
            <div className="flex items-center mt-2 text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+8% from last {timeRange === "7d" ? "week" : timeRange === "30d" ? "month" : "quarter"}</span>
            </div>
          </Card>

          <Card className="p-6 rounded-3xl border-0 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium text-gray-600">Conversion Rate</h3>
              <div className="bg-[#e4ff54] p-2 rounded-full">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
            <p className="text-3xl font-bold">{analyticsData.conversionRate}%</p>
            <div className="flex items-center mt-2 text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+0.8% from last {timeRange === "7d" ? "week" : timeRange === "30d" ? "month" : "quarter"}</span>
            </div>
          </Card>

          <Card className="p-6 rounded-3xl border-0 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium text-gray-600">Avg. Time on Page</h3>
              <div className="bg-[#e4ff54] p-2 rounded-full">
                <Clock className="h-5 w-5" />
              </div>
            </div>
            <p className="text-3xl font-bold">{analyticsData.avgTimeOnPage}</p>
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
              value="geography"
              className="rounded-full px-6 py-2 data-[state=active]:bg-[#e4ff54] data-[state=active]:text-black"
            >
              Geography
            </TabsTrigger>
            <TabsTrigger
              value="devices"
              className="rounded-full px-6 py-2 data-[state=active]:bg-[#e4ff54] data-[state=active]:text-black"
            >
              Devices
            </TabsTrigger>
            <TabsTrigger
              value="audience"
              className="rounded-full px-6 py-2 data-[state=active]:bg-[#e4ff54] data-[state=active]:text-black"
            >
              Audience
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Scan Trends Chart */}
            <Card className="p-6 rounded-3xl border-0 shadow-sm">
              <h3 className="text-xl font-bold mb-6">Scan Trends</h3>
              <div className="h-64 flex flex-col items-center justify-center bg-gray-100 rounded-xl mb-4">
                <div className="w-full px-8 flex items-end justify-between h-40">
                  {analyticsData.dailyScans.map((day, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="w-8 bg-[#e4ff54] rounded-t-md" style={{ height: `${day.scans * 2}px` }}></div>
                      <span className="text-xs mt-2">{day.date}</span>
                    </div>
                  ))}
                </div>
                <p className="text-gray-500 mt-4">Daily scan activity for the past week</p>
              </div>
              <p className="text-gray-500 text-sm">
                This chart shows the scan activity of your QR codes over the selected time period.
              </p>
            </Card>

            {/* Top Performing QR Codes */}
            <Card className="p-6 rounded-3xl border-0 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Top Performing QR Codes</h3>
                <Link href="/my-qr-codes">
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-black">
                    View all
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left pb-4 pl-4">QR Code</th>
                      <th className="text-left pb-4">Scans</th>
                      <th className="text-left pb-4">Unique Visitors</th>
                      <th className="text-left pb-4">Conversion Rate</th>
                      <th className="text-left pb-4">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-4 pl-4 font-medium">Special Offer</td>
                      <td className="py-4">456</td>
                      <td className="py-4">324</td>
                      <td className="py-4">4.2%</td>
                      <td className="py-4 text-green-600">+12%</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-4 pl-4 font-medium">Product Showcase</td>
                      <td className="py-4">324</td>
                      <td className="py-4">256</td>
                      <td className="py-4">3.8%</td>
                      <td className="py-4 text-green-600">+8%</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-4 pl-4 font-medium">Event Registration</td>
                      <td className="py-4">245</td>
                      <td className="py-4">198</td>
                      <td className="py-4">2.9%</td>
                      <td className="py-4 text-green-600">+5%</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-4 pl-4 font-medium">Contact Page</td>
                      <td className="py-4">187</td>
                      <td className="py-4">145</td>
                      <td className="py-4">2.1%</td>
                      <td className="py-4 text-green-600">+3%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="geography" className="space-y-6">
            <Card className="p-6 rounded-3xl border-0 shadow-sm">
              <h3 className="text-xl font-bold mb-6">Geographic Distribution</h3>
              <div className="h-96 flex items-center justify-center bg-gray-100 rounded-xl mb-4">
                <p className="text-gray-500">World map visualization would appear here</p>
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
                    {analyticsData.topLocations.map((location, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-4 pl-4">{location.country}</td>
                        <td className="py-4">{location.city}</td>
                        <td className="py-4">{location.scans}</td>
                        <td className="py-4">{location.percentage}%</td>
                        <td className="py-4 text-green-600">{location.trend}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="devices" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 rounded-3xl border-0 shadow-sm">
                <h3 className="text-xl font-bold mb-6">Device Breakdown</h3>
                <div className="flex items-center justify-center mb-6">
                  <div className="relative w-48 h-48">
                    {/* Simple pie chart visualization */}
                    <div
                      className="absolute inset-0 rounded-full border-8 border-[#e4ff54]"
                      style={{ clipPath: "polygon(50% 50%, 0 0, 0 100%, 100% 100%, 100% 0)" }}
                    ></div>
                    <div
                      className="absolute inset-0 rounded-full border-8 border-blue-400"
                      style={{ clipPath: "polygon(50% 50%, 100% 0, 100% 100%, 75% 100%)" }}
                    ></div>
                    <div
                      className="absolute inset-0 rounded-full border-8 border-purple-400"
                      style={{ clipPath: "polygon(50% 50%, 75% 100%, 100% 100%, 100% 75%)" }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold">Devices</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center mb-2">
                      <div className="w-4 h-4 bg-[#e4ff54] rounded-full mr-2"></div>
                      <Smartphone className="h-5 w-5" />
                    </div>
                    <p className="text-sm text-gray-500">Mobile</p>
                    <p className="font-bold">{analyticsData.scansByDevice.mobile}%</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center mb-2">
                      <div className="w-4 h-4 bg-blue-400 rounded-full mr-2"></div>
                      <Laptop className="h-5 w-5" />
                    </div>
                    <p className="text-sm text-gray-500">Desktop</p>
                    <p className="font-bold">{analyticsData.scansByDevice.desktop}%</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center mb-2">
                      <div className="w-4 h-4 bg-purple-400 rounded-full mr-2"></div>
                      <Tablet className="h-5 w-5" />
                    </div>
                    <p className="text-sm text-gray-500">Tablet</p>
                    <p className="font-bold">{analyticsData.scansByDevice.tablet}%</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 rounded-3xl border-0 shadow-sm">
                <h3 className="text-xl font-bold mb-6">Time of Day</h3>
                <div className="flex items-center justify-center mb-6">
                  <div className="relative w-48 h-48">
                    {/* Simple pie chart visualization */}
                    <div
                      className="absolute inset-0 rounded-full border-8 border-yellow-400"
                      style={{ clipPath: "polygon(50% 50%, 0 0, 50% 0, 100% 0, 100% 50%)" }}
                    ></div>
                    <div
                      className="absolute inset-0 rounded-full border-8 border-orange-400"
                      style={{ clipPath: "polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)" }}
                    ></div>
                    <div
                      className="absolute inset-0 rounded-full border-8 border-blue-800"
                      style={{ clipPath: "polygon(50% 50%, 50% 100%, 0 100%, 0 50%, 0 0)" }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold">Time</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center mb-2">
                      <div className="w-4 h-4 bg-yellow-400 rounded-full mr-2"></div>
                      <Sun className="h-5 w-5" />
                    </div>
                    <p className="text-sm text-gray-500">Morning</p>
                    <p className="font-bold">{analyticsData.scansByTime.morning}%</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center mb-2">
                      <div className="w-4 h-4 bg-orange-400 rounded-full mr-2"></div>
                      <Sunset className="h-5 w-5" />
                    </div>
                    <p className="text-sm text-gray-500">Afternoon</p>
                    <p className="font-bold">{analyticsData.scansByTime.afternoon}%</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center mb-2">
                      <div className="w-4 h-4 bg-blue-800 rounded-full mr-2"></div>
                      <Moon className="h-5 w-5" />
                    </div>
                    <p className="text-sm text-gray-500">Evening</p>
                    <p className="font-bold">{analyticsData.scansByTime.evening}%</p>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6 rounded-3xl border-0 shadow-sm">
              <h3 className="text-xl font-bold mb-6">Browser & OS Distribution</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-4">Top Browsers</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Chrome</span>
                        <span>58%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-[#e4ff54] h-2 rounded-full" style={{ width: "58%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Safari</span>
                        <span>24%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-[#e4ff54] h-2 rounded-full" style={{ width: "24%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Firefox</span>
                        <span>10%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-[#e4ff54] h-2 rounded-full" style={{ width: "10%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Edge</span>
                        <span>8%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-[#e4ff54] h-2 rounded-full" style={{ width: "8%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-4">Top Operating Systems</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>iOS</span>
                        <span>42%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-[#e4ff54] h-2 rounded-full" style={{ width: "42%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Android</span>
                        <span>38%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-[#e4ff54] h-2 rounded-full" style={{ width: "38%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Windows</span>
                        <span>12%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-[#e4ff54] h-2 rounded-full" style={{ width: "12%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>macOS</span>
                        <span>8%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-[#e4ff54] h-2 rounded-full" style={{ width: "8%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="audience" className="space-y-6">
            <Card className="p-6 rounded-3xl border-0 shadow-sm">
              <h3 className="text-xl font-bold mb-6">Audience Demographics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-4">Age Distribution</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>18-24</span>
                        <span>22%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-[#e4ff54] h-2 rounded-full" style={{ width: "22%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>25-34</span>
                        <span>38%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-[#e4ff54] h-2 rounded-full" style={{ width: "38%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>35-44</span>
                        <span>24%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-[#e4ff54] h-2 rounded-full" style={{ width: "24%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>45+</span>
                        <span>16%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-[#e4ff54] h-2 rounded-full" style={{ width: "16%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-4">Gender Distribution</h4>
                  <div className="flex items-center justify-center h-40">
                    <div className="flex items-end space-x-12">
                      <div className="flex flex-col items-center">
                        <div className="bg-[#e4ff54] w-20 rounded-t-md" style={{ height: "120px" }}></div>
                        <p className="mt-2">Male</p>
                        <p className="font-bold">54%</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="bg-[#e4ff54] w-20 rounded-t-md" style={{ height: "100px" }}></div>
                        <p className="mt-2">Female</p>
                        <p className="font-bold">46%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 rounded-3xl border-0 shadow-sm">
              <h3 className="text-xl font-bold mb-6">Engagement Metrics</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left pb-4 pl-4">Metric</th>
                      <th className="text-left pb-4">Value</th>
                      <th className="text-left pb-4">Change</th>
                      <th className="text-left pb-4">Benchmark</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-4 pl-4 font-medium">Avg. Session Duration</td>
                      <td className="py-4">2m 34s</td>
                      <td className="py-4 text-green-600">+15%</td>
                      <td className="py-4">1m 45s</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-4 pl-4 font-medium">Pages per Session</td>
                      <td className="py-4">2.4</td>
                      <td className="py-4 text-green-600">+8%</td>
                      <td className="py-4">1.8</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-4 pl-4 font-medium">Bounce Rate</td>
                      <td className="py-4">42%</td>
                      <td className="py-4 text-green-600">-5%</td>
                      <td className="py-4">48%</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-4 pl-4 font-medium">Return Visitor Rate</td>
                      <td className="py-4">18%</td>
                      <td className="py-4 text-green-600">+3%</td>
                      <td className="py-4">15%</td>
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

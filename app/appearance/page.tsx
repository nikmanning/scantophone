"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, QrCode, Upload } from "lucide-react"
import SidebarNav from "@/components/sidebar-nav"
import Link from "next/link"

export default function AppearanceSettings() {
  return (
    <div className="flex min-h-screen bg-[#e9ede7]">
      {/* Sidebar Navigation */}
      <SidebarNav />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Appearance</h1>
          <Button variant="outline" className="rounded-full px-6 py-2 border-2 border-black font-medium">
            Save & Quit
          </Button>
        </div>

        <Card className="p-8 rounded-3xl border-0 shadow-sm">
          <div className="space-y-8">
            <div>
              <div className="flex items-center mb-2">
                <h2 className="text-xl font-bold">QR Code Theme</h2>
              </div>
              <p className="text-sm text-gray-600 mb-6">Choose between light and dark theme for your QR code.</p>

              <RadioGroup defaultValue="light" className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center space-y-3 border-2 rounded-3xl p-6 cursor-pointer hover:bg-[#f8f9f8] [&:has([data-state=checked])]:border-black [&:has([data-state=checked])]:bg-[#f8f9f8]">
                  <div className="bg-white border-2 rounded-2xl p-4">
                    <QrCode className="h-20 w-20" />
                  </div>
                  <RadioGroupItem value="light" id="light" className="sr-only" />
                  <Label htmlFor="light" className="font-bold">
                    Light
                  </Label>
                </div>

                <div className="flex flex-col items-center space-y-3 border-2 rounded-3xl p-6 cursor-pointer hover:bg-[#f8f9f8] [&:has([data-state=checked])]:border-black [&:has([data-state=checked])]:bg-[#f8f9f8]">
                  <div className="bg-black border-2 rounded-2xl p-4">
                    <QrCode className="h-20 w-20 text-white" />
                  </div>
                  <RadioGroupItem value="dark" id="dark" className="sr-only" />
                  <Label htmlFor="dark" className="font-bold">
                    Dark
                  </Label>
                </div>

                <div className="flex flex-col items-center space-y-3 border-2 rounded-3xl p-6 cursor-pointer hover:bg-[#f8f9f8] opacity-60">
                  <div className="bg-gradient-to-b from-white to-black border-2 rounded-2xl p-4 relative">
                    <QrCode className="h-20 w-20" />
                    <Badge className="absolute -top-2 -right-2 bg-black text-white border-0 rounded-full px-3 py-0.5 font-medium">
                      Pro
                    </Badge>
                  </div>
                  <RadioGroupItem value="auto" id="auto" className="sr-only" disabled />
                  <Label htmlFor="auto" className="font-bold text-gray-400">
                    Auto (Pro)
                  </Label>
                  <p className="text-xs text-gray-400 text-center">Adapts to user's theme preference</p>
                </div>
              </RadioGroup>
            </div>

            <Separator className="bg-gray-200" />

            <div>
              <div className="flex items-center mb-2">
                <h2 className="text-xl font-bold">QR Code Size</h2>
              </div>
              <p className="text-sm text-gray-600 mb-6">Adjust the size of your QR code.</p>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Label htmlFor="size" className="min-w-24 font-bold">
                    Size:
                  </Label>
                  <Select defaultValue="medium">
                    <SelectTrigger className="w-48 rounded-full border-2 border-gray-200 px-6 py-6">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl">
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-4">
                  <Label htmlFor="custom-size" className="min-w-24 font-bold">
                    Custom size:
                  </Label>
                  <div className="flex-1 flex items-center space-x-4">
                    <Slider defaultValue={[150]} max={300} min={80} step={1} className="flex-1" />
                    <span className="text-base font-medium min-w-12">150px</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-gray-200" />

            <div>
              <div className="flex items-center mb-2">
                <h2 className="text-xl font-bold">Button Style</h2>
              </div>
              <p className="text-sm text-gray-600 mb-6">Customize the appearance of the floating button.</p>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Label htmlFor="button-color" className="min-w-24 font-bold">
                    Button color:
                  </Label>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-[#e4ff54] border-2 border-black cursor-pointer"></div>
                    <div className="w-10 h-10 rounded-full bg-blue-500 border-2 cursor-pointer"></div>
                    <div className="w-10 h-10 rounded-full bg-purple-500 border-2 cursor-pointer"></div>
                    <div className="w-10 h-10 rounded-full bg-amber-500 border-2 cursor-pointer"></div>
                    <div className="w-10 h-10 rounded-full bg-black border-2 cursor-pointer"></div>
                    <Input type="color" className="w-10 h-10 p-1 cursor-pointer rounded-full" defaultValue="#e4ff54" />
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Label htmlFor="button-shape" className="min-w-24 font-bold">
                    Button shape:
                  </Label>
                  <Select defaultValue="rounded">
                    <SelectTrigger className="w-48 rounded-full border-2 border-gray-200 px-6 py-6">
                      <SelectValue placeholder="Select shape" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl">
                      <SelectItem value="rounded">Rounded</SelectItem>
                      <SelectItem value="circle">Circle</SelectItem>
                      <SelectItem value="square">Square</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator className="bg-gray-200" />

            <div>
              <div className="flex items-center mb-2">
                <h2 className="text-xl font-bold">Custom Branding</h2>
                <Badge className="ml-3 bg-black text-white border-0 rounded-full px-4 py-1 font-medium">Pro</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-6">Add your logo to the center of the QR code (Pro feature).</p>

              <div className="flex items-center space-x-4 opacity-60">
                <Button
                  variant="outline"
                  disabled
                  className="flex items-center rounded-full px-6 py-6 border-2 border-gray-300 font-medium"
                >
                  <Upload className="mr-2 h-5 w-5" />
                  Upload Logo
                </Button>
                <p className="text-sm text-gray-400">Upgrade to Pro to use this feature</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex justify-between mt-8">
          <Link href="/">
            <Button variant="outline" className="rounded-full px-8 py-6 border-2 border-black font-medium">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Previous
            </Button>
          </Link>
          <Link href="/position-behavior">
            <Button className="rounded-full px-8 py-6 bg-black hover:bg-gray-800 text-white font-medium text-base">
              Next
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Preview Panel */}
      <div className="w-96 p-8 bg-white rounded-l-3xl">
        <h2 className="text-xl font-bold mb-6">Live Preview</h2>
        <div className="border-2 border-gray-100 rounded-3xl p-6 bg-[#f8f9f8]">
          <div className="flex flex-col items-center">
            <div className="bg-white p-6 rounded-3xl shadow-sm mb-4">
              <div className="w-56 h-56 bg-white flex items-center justify-center">
                <QrCode className="w-48 h-48" />
              </div>
              <p className="text-center mt-3 text-base">Scan to visit our website</p>
            </div>
            <p className="text-sm text-gray-500 mt-2">Preview: Bottom Right Position</p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-bold mb-4">QR Code Information</h3>
          <div className="space-y-3 text-base">
            <div className="flex justify-between">
              <span className="text-gray-500">Type:</span>
              <span className="font-medium">Dynamic</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">URL:</span>
              <span className="truncate max-w-[220px] font-medium">Current Page</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Position:</span>
              <span className="font-medium">Bottom Right</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Theme:</span>
              <span className="font-medium">Light</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

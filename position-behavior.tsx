import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, QrCode, Check, ChevronRight } from "lucide-react"

export default function PositionBehavior() {
  return (
    <div className="flex min-h-screen bg-[#e9ede7]">
      {/* Sidebar Navigation */}
      <div className="w-72 p-6 bg-[#e4ff54] rounded-r-3xl">
        <div className="flex items-center mb-10">
          <QrCode className="h-7 w-7 mr-3" />
          <h1 className="text-2xl font-bold">Viral QR Code</h1>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold mb-6">Create a new QR code</h2>

          <div className="flex items-center py-3 px-4 rounded-full text-sm font-medium">
            <Check className="h-5 w-5 mr-3 text-black" />
            <span>Basic settings</span>
          </div>

          <div className="flex items-center py-3 px-4 rounded-full text-sm font-medium">
            <Check className="h-5 w-5 mr-3 text-black" />
            <span>Appearance</span>
          </div>

          <div className="flex items-center py-3 px-4 bg-black text-white rounded-full text-sm font-medium">
            <Check className="h-5 w-5 mr-3" />
            <span>Position & Behavior</span>
          </div>

          <div className="flex items-center py-3 px-4 rounded-full text-sm font-medium">
            <ChevronRight className="h-5 w-5 mr-3" />
            <span>Advanced settings</span>
          </div>

          <div className="flex items-center py-3 px-4 rounded-full text-sm font-medium">
            <ChevronRight className="h-5 w-5 mr-3" />
            <span>Review & Deploy</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Position & Behavior</h1>
          <Button variant="outline" className="rounded-full px-6 py-2 border-2 border-black font-medium">
            Save & Quit
          </Button>
        </div>

        <Card className="p-8 rounded-3xl border-0 shadow-sm">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold mb-2">Position</h2>
              <p className="text-sm text-gray-600 mb-6">Choose where your QR code will appear on the page.</p>

              <RadioGroup defaultValue="bottom-right" className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center space-y-3 border-2 rounded-3xl p-6 cursor-pointer hover:bg-[#f8f9f8] [&:has([data-state=checked])]:border-black [&:has([data-state=checked])]:bg-[#f8f9f8]">
                  <div className="w-full h-36 border-2 rounded-2xl p-4 relative">
                    <div className="absolute top-3 left-3 w-10 h-10 bg-[#e4ff54] rounded-full flex items-center justify-center">
                      <QrCode className="h-6 w-6" />
                    </div>
                  </div>
                  <RadioGroupItem value="top-left" id="top-left" className="sr-only" />
                  <Label htmlFor="top-left" className="font-bold">
                    Top Left
                  </Label>
                </div>

                <div className="flex flex-col items-center space-y-3 border-2 rounded-3xl p-6 cursor-pointer hover:bg-[#f8f9f8] [&:has([data-state=checked])]:border-black [&:has([data-state=checked])]:bg-[#f8f9f8]">
                  <div className="w-full h-36 border-2 rounded-2xl p-4 relative">
                    <div className="absolute top-3 right-3 w-10 h-10 bg-[#e4ff54] rounded-full flex items-center justify-center">
                      <QrCode className="h-6 w-6" />
                    </div>
                  </div>
                  <RadioGroupItem value="top-right" id="top-right" className="sr-only" />
                  <Label htmlFor="top-right" className="font-bold">
                    Top Right
                  </Label>
                </div>

                <div className="flex flex-col items-center space-y-3 border-2 rounded-3xl p-6 cursor-pointer hover:bg-[#f8f9f8] [&:has([data-state=checked])]:border-black [&:has([data-state=checked])]:bg-[#f8f9f8]">
                  <div className="w-full h-36 border-2 rounded-2xl p-4 relative">
                    <div className="absolute bottom-3 left-3 w-10 h-10 bg-[#e4ff54] rounded-full flex items-center justify-center">
                      <QrCode className="h-6 w-6" />
                    </div>
                  </div>
                  <RadioGroupItem value="bottom-left" id="bottom-left" className="sr-only" />
                  <Label htmlFor="bottom-left" className="font-bold">
                    Bottom Left
                  </Label>
                </div>

                <div className="flex flex-col items-center space-y-3 border-2 rounded-3xl p-6 cursor-pointer hover:bg-[#f8f9f8] [&:has([data-state=checked])]:border-black [&:has([data-state=checked])]:bg-[#f8f9f8  [&:has([data-state=checked])]:border-black [&:has([data-state=checked])]:bg-[#f8f9f8]">
                  <div className="w-full h-36 border-2 rounded-2xl p-4 relative">
                    <div className="absolute bottom-3 right-3 w-10 h-10 bg-[#e4ff54] rounded-full flex items-center justify-center">
                      <QrCode className="h-6 w-6" />
                    </div>
                  </div>
                  <RadioGroupItem value="bottom-right" id="bottom-right" className="sr-only" />
                  <Label htmlFor="bottom-right" className="font-bold">
                    Bottom Right
                  </Label>
                </div>

                <div className="flex flex-col items-center space-y-3 border-2 rounded-3xl p-6 cursor-pointer hover:bg-[#f8f9f8] [&:has([data-state=checked])]:border-black [&:has([data-state=checked])]:bg-[#f8f9f8]">
                  <div className="w-full h-36 border-2 rounded-2xl p-4 relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#e4ff54] rounded-full flex items-center justify-center">
                      <QrCode className="h-6 w-6" />
                    </div>
                  </div>
                  <RadioGroupItem value="center" id="center" className="sr-only" />
                  <Label htmlFor="center" className="font-bold">
                    Center
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Separator className="bg-gray-200" />

            <div>
              <h2 className="text-xl font-bold mb-2">Margin & Spacing</h2>
              <p className="text-sm text-gray-600 mb-6">Adjust the distance from the edges of the screen.</p>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Label htmlFor="margin" className="min-w-24 font-bold">
                    Margin:
                  </Label>
                  <Select defaultValue="medium">
                    <SelectTrigger className="w-48 rounded-full border-2 border-gray-200 px-6 py-6">
                      <SelectValue placeholder="Select margin" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl">
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-4">
                  <Label htmlFor="custom-margin" className="min-w-24 font-bold">
                    Custom margin:
                  </Label>
                  <div className="grid grid-cols-2 gap-6 w-72">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="margin-x" className="text-base">
                        X:
                      </Label>
                      <Input
                        type="number"
                        id="margin-x"
                        defaultValue="20"
                        className="w-20 rounded-full border-2 border-gray-200 px-4 py-2 text-base"
                      />
                      <span className="text-base">px</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="margin-y" className="text-base">
                        Y:
                      </Label>
                      <Input
                        type="number"
                        id="margin-y"
                        defaultValue="20"
                        className="w-20 rounded-full border-2 border-gray-200 px-4 py-2 text-base"
                      />
                      <span className="text-base">px</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-gray-200" />

            <div>
              <h2 className="text-xl font-bold mb-2">Behavior</h2>
              <p className="text-sm text-gray-600 mb-6">
                Configure how your QR code behaves when users interact with it.
              </p>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="collapsed" className="font-bold">
                      Start Collapsed
                    </Label>
                    <p className="text-sm text-gray-600">QR code starts as a button and expands when clicked</p>
                  </div>
                  <Switch id="collapsed" defaultChecked className="data-[state=checked]:bg-black" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-hide" className="font-bold">
                      Auto-hide on scroll
                    </Label>
                    <p className="text-sm text-gray-600">Hide the QR code when user scrolls down</p>
                  </div>
                  <Switch id="auto-hide" className="data-[state=checked]:bg-black" />
                </div>

                <div className="flex items-center space-x-4">
                  <Label htmlFor="animation" className="min-w-24 font-bold">
                    Animation:
                  </Label>
                  <Select defaultValue="fade">
                    <SelectTrigger className="w-48 rounded-full border-2 border-gray-200 px-6 py-6">
                      <SelectValue placeholder="Select animation" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl">
                      <SelectItem value="fade">Fade</SelectItem>
                      <SelectItem value="slide">Slide</SelectItem>
                      <SelectItem value="zoom">Zoom</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator className="bg-gray-200" />

            <div>
              <div className="flex items-center mb-2">
                <h2 className="text-xl font-bold">Advanced Animations</h2>
                <Badge className="ml-3 bg-black text-white border-0 rounded-full px-4 py-1 font-medium">Pro</Badge>
              </div>
              <p className="text-sm text-gray-600 mb-6">Add custom animations and effects (Pro feature).</p>

              <div className="opacity-60">
                <div className="flex items-center space-x-4">
                  <Label htmlFor="entrance" className="min-w-24 font-bold">
                    Entrance effect:
                  </Label>
                  <Select defaultValue="none" disabled>
                    <SelectTrigger className="w-48 rounded-full border-2 border-gray-200 px-6 py-6">
                      <SelectValue placeholder="Select effect" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl">
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="bounce">Bounce</SelectItem>
                      <SelectItem value="pulse">Pulse</SelectItem>
                      <SelectItem value="shake">Shake</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-sm text-gray-400 mt-2">Upgrade to Pro to use advanced animations</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex justify-between mt-8">
          <Button variant="outline" className="rounded-full px-8 py-6 border-2 border-black font-medium">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Previous
          </Button>
          <Button className="rounded-full px-8 py-6 bg-black hover:bg-gray-800 text-white font-medium text-base">
            Next
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
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

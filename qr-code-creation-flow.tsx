import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Check, QrCode, ChevronRight } from "lucide-react"

export default function QRCodeCreationFlow() {
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

          <div className="flex items-center py-3 px-4 bg-black text-white rounded-full text-sm font-medium">
            <Check className="h-5 w-5 mr-3" />
            <span>Basic settings</span>
          </div>

          <div className="flex items-center py-3 px-4 rounded-full text-sm font-medium">
            <ChevronRight className="h-5 w-5 mr-3" />
            <span>Appearance</span>
          </div>

          <div className="flex items-center py-3 px-4 rounded-full text-sm font-medium">
            <ChevronRight className="h-5 w-5 mr-3" />
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
          <h1 className="text-3xl font-bold">Basic Settings</h1>
          <Button variant="outline" className="rounded-full px-6 py-2 border-2 border-black font-medium">
            Save & Quit
          </Button>
        </div>

        <Card className="p-8 rounded-3xl border-0 shadow-sm">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold mb-2">QR Code Name</h2>
              <p className="text-sm text-gray-600 mb-4">
                Give your QR code a name for easy identification in your dashboard.
              </p>
              <Input
                placeholder="My Website QR Code"
                className="max-w-md rounded-full border-2 border-gray-200 px-6 py-6 text-base"
              />
            </div>

            <Separator className="bg-gray-200" />

            <div>
              <div className="flex items-center mb-2">
                <h2 className="text-xl font-bold">URL Settings</h2>
                <Badge
                  variant="outline"
                  className="ml-3 bg-[#e4ff54] text-black border-0 rounded-full px-4 py-1 font-medium"
                >
                  Free Version
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-6">Choose what URL your QR code will link to when scanned.</p>

              <RadioGroup defaultValue="current" className="space-y-6">
                <div className="flex items-start space-x-3">
                  <RadioGroupItem value="current" id="current" className="mt-1 border-2 border-black" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="current" className="font-bold">
                      Use current page URL (Free)
                    </Label>
                    <p className="text-sm text-gray-600">
                      The QR code will automatically use the URL of the page where it appears.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <RadioGroupItem value="custom" id="custom" className="mt-1 border-2 border-gray-300" disabled />
                  <div className="grid gap-1.5">
                    <div className="flex items-center">
                      <Label htmlFor="custom" className="font-bold text-gray-400">
                        Custom URL (Pro)
                      </Label>
                      <Badge className="ml-3 bg-black text-white border-0 rounded-full px-4 py-1 font-medium">
                        Pro
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400">
                      Specify a custom URL for your QR code (e.g., landing page, special offer).
                    </p>
                    <Input
                      placeholder="https://example.com/special-offer"
                      className="max-w-md rounded-full border-2 border-gray-200 px-6 py-6 text-base mt-2"
                      disabled
                    />
                  </div>
                </div>
              </RadioGroup>
            </div>

            <Separator className="bg-gray-200" />

            <div>
              <h2 className="text-xl font-bold mb-2">Display Text</h2>
              <p className="text-sm text-gray-600 mb-4">Add text that will appear alongside your QR code.</p>
              <Input
                placeholder="Scan to visit our website"
                className="max-w-md rounded-full border-2 border-gray-200 px-6 py-6 text-base"
              />
            </div>

            <Separator className="bg-gray-200" />

            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold">Device Display</h2>
              </div>
              <p className="text-sm text-gray-600 mb-6">Choose on which devices your QR code will be displayed.</p>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="desktop" className="font-bold">
                    Show on Desktop
                  </Label>
                  <Switch id="desktop" defaultChecked className="data-[state=checked]:bg-black" />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="mobile" className="font-bold">
                    Show on Mobile
                  </Label>
                  <Switch id="mobile" className="data-[state=checked]:bg-black" />
                </div>
                <p className="text-sm text-gray-500 italic">
                  Tip: It's usually best to hide the QR code on mobile devices since users are already on mobile.
                </p>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex justify-end mt-8">
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

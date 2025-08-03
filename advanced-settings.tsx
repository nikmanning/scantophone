import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, ArrowRight, QrCode, Check, ChevronRight } from "lucide-react"

export default function AdvancedSettings() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <div className="w-64 border-r bg-white p-6">
        <div className="flex items-center mb-8">
          <QrCode className="h-6 w-6 mr-2" />
          <h1 className="text-xl font-semibold">Viral QR Code</h1>
        </div>

        <div className="space-y-1">
          <h2 className="text-lg font-medium mb-4">Create a new QR code</h2>

          <div className="flex items-center py-2 px-3 rounded-md text-sm font-medium">
            <Check className="h-5 w-5 text-emerald-500 mr-2" />
            <span>Basic settings</span>
          </div>

          <div className="flex items-center py-2 px-3 rounded-md text-sm font-medium">
            <Check className="h-5 w-5 text-emerald-500 mr-2" />
            <span>Appearance</span>
          </div>

          <div className="flex items-center py-2 px-3 rounded-md text-sm font-medium">
            <Check className="h-5 w-5 text-emerald-500 mr-2" />
            <span>Position & Behavior</span>
          </div>

          <div className="flex items-center py-2 px-3 bg-gray-100 rounded-md text-sm font-medium">
            <Check className="h-5 w-5 text-emerald-500 mr-2" />
            <span>Advanced settings</span>
          </div>

          <div className="flex items-center py-2 px-3 rounded-md text-sm font-medium">
            <ChevronRight className="h-5 w-5 mr-2" />
            <span>Review & Deploy</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Advanced Settings</h1>
          <Button variant="outline">Save & Quit</Button>
        </div>

        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <div className="flex items-center mb-2">
                <h2 className="text-lg font-medium">Analytics Integration</h2>
                <Badge className="ml-2 bg-emerald-50 text-emerald-700 border-emerald-200">Pro</Badge>
              </div>
              <p className="text-sm text-gray-500 mb-4">Track QR code scans and interactions (Pro feature).</p>

              <div className="opacity-60">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Label htmlFor="analytics" className="font-medium">
                      Enable Analytics
                    </Label>
                    <p className="text-sm text-gray-400">Track QR code scans and interactions</p>
                  </div>
                  <Switch id="analytics" disabled />
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="ga-id" className="text-sm font-medium">
                      Google Analytics ID
                    </Label>
                    <Input id="ga-id" placeholder="UA-XXXXXXXXX-X or G-XXXXXXXXXX" className="mt-1" disabled />
                  </div>

                  <div>
                    <Label htmlFor="event-name" className="text-sm font-medium">
                      Custom Event Name
                    </Label>
                    <Input id="event-name" placeholder="qr_code_scan" className="mt-1" disabled />
                  </div>
                </div>
                <p className="text-sm text-gray-400 mt-2">Upgrade to Pro to use analytics features</p>
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="text-lg font-medium mb-2">Page Targeting</h2>
              <p className="text-sm text-gray-500 mb-4">Choose which pages to show or hide the QR code on.</p>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input type="radio" id="all-pages" name="page-targeting" className="h-4 w-4" checked />
                  <Label htmlFor="all-pages">Show on all pages</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <input type="radio" id="specific-pages" name="page-targeting" className="h-4 w-4" />
                  <Label htmlFor="specific-pages">Show on specific pages only</Label>
                </div>

                <div className="pl-6">
                  <Label htmlFor="include-pages" className="text-sm font-medium">
                    Include pages (one URL per line)
                  </Label>
                  <Textarea
                    id="include-pages"
                    placeholder="/product/*&#10;/services&#10;/contact"
                    className="mt-1 h-24"
                    disabled={true}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Use * as a wildcard. Example: /product/* will match all product pages.
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <div className="flex items-center mb-2">
                <h2 className="text-lg font-medium">Scheduling</h2>
                <Badge className="ml-2 bg-emerald-50 text-emerald-700 border-emerald-200">Pro</Badge>
              </div>
              <p className="text-sm text-gray-500 mb-4">Set when your QR code should be visible (Pro feature).</p>

              <div className="opacity-60">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Label htmlFor="scheduling" className="font-medium">
                      Enable Scheduling
                    </Label>
                    <p className="text-sm text-gray-400">Show QR code only during specific times</p>
                  </div>
                  <Switch id="scheduling" disabled />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start-date" className="text-sm font-medium">
                      Start Date & Time
                    </Label>
                    <Input id="start-date" type="datetime-local" className="mt-1" disabled />
                  </div>

                  <div>
                    <Label htmlFor="end-date" className="text-sm font-medium">
                      End Date & Time
                    </Label>
                    <Input id="end-date" type="datetime-local" className="mt-1" disabled />
                  </div>
                </div>
                <p className="text-sm text-gray-400 mt-2">Upgrade to Pro to use scheduling features</p>
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="text-lg font-medium mb-2">Custom CSS</h2>
              <p className="text-sm text-gray-500 mb-4">Add custom CSS to further customize your QR code.</p>

              <div>
                <Label htmlFor="custom-css" className="text-sm font-medium">
                  Custom CSS
                </Label>
                <Textarea
                  id="custom-css"
                  placeholder=".viral-qr-code-button {&#10;  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);&#10;}&#10;&#10;.viral-qr-code-container {&#10;  border-radius: 12px;&#10;}"
                  className="mt-1 h-32 font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Advanced users only. Custom CSS will be applied to the QR code container.
                </p>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex justify-between mt-6">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button>
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Preview Panel */}
      <div className="w-80 border-l bg-white p-6">
        <h2 className="text-lg font-medium mb-4">Live Preview</h2>
        <div className="border rounded-lg p-4 bg-gray-50">
          <div className="flex flex-col items-center">
            <div className="bg-white p-3 rounded-lg shadow-sm mb-3">
              <div className="w-48 h-48 bg-white flex items-center justify-center">
                <QrCode className="w-40 h-40" />
              </div>
              <p className="text-center mt-2 text-sm">Scan to visit our website</p>
            </div>
            <p className="text-xs text-gray-500 mt-2">Preview: Bottom Right Position</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-medium mb-2">QR Code Information</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Type:</span>
              <span>Dynamic</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">URL:</span>
              <span className="truncate max-w-[180px]">Current Page</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Position:</span>
              <span>Bottom Right</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Theme:</span>
              <span>Light</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

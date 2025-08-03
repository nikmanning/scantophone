"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react"

export default function AdvancedSettingsContent({ state, updateState, onNext, onPrevious, onSave, isSaving }) {
  return (
    <>
      <Card className="p-8 rounded-3xl border-0 shadow-sm">
        <div className="space-y-8">
          <div>
            <div className="flex items-center mb-2">
              <h2 className="text-xl font-bold">Analytics Integration</h2>
              <Badge className="ml-3 bg-black text-white border-0 rounded-full px-4 py-1 font-medium">Pro</Badge>
            </div>
            <p className="text-sm text-gray-600 mb-6">Track QR code scans and interactions (Pro feature).</p>

            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <Label htmlFor="analytics" className="font-bold">
                    Enable Analytics
                  </Label>
                  <p className="text-sm text-gray-600">Track QR code scans and interactions</p>
                </div>
                <Switch
                  id="analytics"
                  className="data-[state=checked]:bg-black"
                  onChange={(e) => console.log("Analytics:", e.target.checked)}
                />
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="ga-id" className="text-sm font-bold">
                    Google Analytics ID
                  </Label>
                  <Input
                    id="ga-id"
                    placeholder="UA-XXXXXXXXX-X or G-XXXXXXXXXX"
                    className="mt-1 rounded-full border-2 border-gray-200 px-6 py-6"
                  />
                </div>

                <div>
                  <Label htmlFor="event-name" className="text-sm font-bold">
                    Custom Event Name
                  </Label>
                  <Input
                    id="event-name"
                    placeholder="qr_code_scan"
                    className="mt-1 rounded-full border-2 border-gray-200 px-6 py-6"
                  />
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">Analytics tracking is now enabled for testing</p>
            </div>
          </div>

          <Separator className="bg-gray-200" />

          <div>
            <h2 className="text-xl font-bold mb-2">Page Targeting</h2>
            <p className="text-sm text-gray-600 mb-6">Choose which pages to show or hide the QR code on.</p>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input type="radio" id="all-pages" name="page-targeting" className="h-4 w-4" defaultChecked />
                <Label htmlFor="all-pages" className="font-bold">
                  Show on all pages
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <input type="radio" id="specific-pages" name="page-targeting" className="h-4 w-4" />
                <Label htmlFor="specific-pages" className="font-bold">
                  Show on specific pages only
                </Label>
              </div>

              <div className="pl-6">
                <Label htmlFor="include-pages" className="text-sm font-bold">
                  Include pages (one URL per line)
                </Label>
                <Textarea
                  id="include-pages"
                  placeholder="/product/*&#10;/services&#10;/contact"
                  className="mt-1 h-24 rounded-xl border-2 border-gray-200"
                  disabled={true}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use * as a wildcard. Example: /product/* will match all product pages.
                </p>
              </div>
            </div>
          </div>

          <Separator className="bg-gray-200" />

          <div>
            <div className="flex items-center mb-2">
              <h2 className="text-xl font-bold">Scheduling</h2>
              <Badge className="ml-3 bg-black text-white border-0 rounded-full px-4 py-1 font-medium">Pro</Badge>
            </div>
            <p className="text-sm text-gray-600 mb-6">Set when your QR code should be visible (Pro feature).</p>

            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <Label htmlFor="scheduling" className="font-bold">
                    Enable Scheduling
                  </Label>
                  <p className="text-sm text-gray-600">Show QR code only during specific times</p>
                </div>
                <Switch
                  id="scheduling"
                  className="data-[state=checked]:bg-black"
                  onChange={(e) => console.log("Scheduling:", e.target.checked)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start-date" className="text-sm font-bold">
                    Start Date & Time
                  </Label>
                  <Input
                    id="start-date"
                    type="datetime-local"
                    className="mt-1 rounded-full border-2 border-gray-200 px-6 py-6"
                  />
                </div>

                <div>
                  <Label htmlFor="end-date" className="text-sm font-bold">
                    End Date & Time
                  </Label>
                  <Input
                    id="end-date"
                    type="datetime-local"
                    className="mt-1 rounded-full border-2 border-gray-200 px-6 py-6"
                  />
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">Scheduling is now enabled for testing</p>
            </div>
          </div>

          <Separator className="bg-gray-200" />

          <div>
            <h2 className="text-xl font-bold mb-2">Custom CSS</h2>
            <p className="text-sm text-gray-600 mb-6">Add custom CSS to further customize your QR code.</p>

            <div>
              <Label htmlFor="custom-css" className="text-sm font-bold">
                Custom CSS
              </Label>
              <Textarea
                id="custom-css"
                placeholder=".viral-qr-code-button {&#10;  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);&#10;}&#10;&#10;.viral-qr-code-container {&#10;  border-radius: 12px;&#10;}"
                className="mt-1 h-32 font-mono text-sm rounded-xl border-2 border-gray-200"
              />
              <p className="text-xs text-gray-500 mt-1">
                Advanced users only. Custom CSS will be applied to the QR code container.
              </p>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-between mt-8">
        <div className="space-x-4">
          <Button
            variant="outline"
            className="rounded-full px-8 py-6 border-2 border-black font-medium"
            onClick={onPrevious}
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Previous
          </Button>
          <Button
            variant="outline"
            className="rounded-full px-8 py-6 border-2 border-black font-medium"
            onClick={onSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save & Quit"
            )}
          </Button>
        </div>
        <Button
          className="rounded-full px-8 py-6 bg-black hover:bg-gray-800 text-white font-medium text-base"
          onClick={onNext}
        >
          Next
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </>
  )
}

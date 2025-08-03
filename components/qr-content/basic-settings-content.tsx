"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Loader2 } from "lucide-react"

interface QrCodeState {
  qrCodeName: string;
  displayText: string;
  showOnDesktop: boolean;
  showOnMobile: boolean;
  customUrl: string;
  urlType: string;
}

interface BasicSettingsContentProps {
  state: QrCodeState;
  updateState: (newState: Partial<QrCodeState>) => void;
  onNext: () => void;
  onSave: () => void;
  isSaving: boolean;
}

export default function BasicSettingsContent({ state, updateState, onNext, onSave, isSaving }: BasicSettingsContentProps) {
  return (
    <>
      <Card className="p-8 rounded-3xl border-0 shadow-sm">
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-bold mb-2">
              QR Code Name <span className="text-red-500">*</span>
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Give your QR code a name for easy identification in your dashboard.
            </p>
            <Input
              placeholder="My Website QR Code"
              className="max-w-md rounded-full border-2 border-gray-200 px-6 py-6 text-base"
              value={state.qrCodeName}
              onChange={(e) => updateState({ qrCodeName: e.target.value })}
              required
              name="qrCodeName"
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

            <RadioGroup
              value={state.urlType}
              onValueChange={(value) => {
                updateState({
                  urlType: value,
                  customUrl:
                    value === "current"
                      ? "Current Page"
                      : state.customUrl === "Current Page"
                        ? "example.com"
                        : state.customUrl,
                })
              }}
              className="space-y-6"
            >
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
                <RadioGroupItem value="custom" id="custom" className="mt-1 border-2 border-black" />
                <div className="grid gap-1.5">
                  <div className="flex items-center">
                    <Label htmlFor="custom" className="font-bold">
                      Custom URL (Pro)
                    </Label>
                    <Badge className="ml-3 bg-black text-white border-0 rounded-full px-4 py-1 font-medium">Pro</Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Specify a custom URL for your QR code (e.g., landing page, special offer).
                  </p>
                  <Input
                    placeholder="https://example.com/special-offer"
                    className="max-w-md rounded-full border-2 border-gray-200 px-6 py-6 text-base mt-2"
                    value={state.customUrl}
                    onChange={(e) => updateState({ customUrl: e.target.value })}
                    disabled={state.urlType !== "custom"}
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
              placeholder="Send To Phone"
              className="max-w-md rounded-full border-2 border-gray-200 px-6 py-6 text-base"
              value={state.displayText}
              onChange={(e) => updateState({ displayText: e.target.value })}
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
                <Switch
                  id="desktop"
                  checked={state.showOnDesktop}
                  onCheckedChange={(checked) => updateState({ showOnDesktop: checked })}
                  className="data-[state=checked]:bg-black"
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="mobile" className="font-bold">
                  Show on Mobile
                </Label>
                <Switch
                  id="mobile"
                  checked={state.showOnMobile}
                  onCheckedChange={(checked) => updateState({ showOnMobile: checked })}
                  className="data-[state=checked]:bg-black"
                />
              </div>
              <p className="text-sm text-gray-500 italic">
                Tip: It's usually best to hide the QR code on mobile devices since users are already on mobile.
              </p>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-between mt-8">
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

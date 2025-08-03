"use client"

import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react"
import StyledQRCode from "@/components/styled-qr-code"
import { ensureUrlProtocol } from "@/lib/qr-code-generator"

// Define the types for the component props
interface PositionBehaviorContentProps {
  state: {
    position: string;
    customUrl: string;
    qrCodeColor: string;
    backgroundColor: string;
    margin: number;
    marginX: number;
    marginY: number;
    startCollapsed: boolean;
    autoShowOnScroll: boolean;
    animation: string;
  };
  updateState: (newState: Partial<PositionBehaviorContentProps['state']>) => void;
  onNext: () => void;
  onPrevious: () => void;
  onSave: () => void;
  isSaving: boolean;
}

export default function PositionBehaviorContent({ state, updateState, onNext, onPrevious, onSave, isSaving }: PositionBehaviorContentProps) {
  const formattedPosition = state.position
    .split("-")
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return (
    <>
      <Card className="p-8 rounded-3xl border-0 shadow-sm">
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-bold mb-2">Position</h2>
            <p className="text-sm text-gray-600 mb-6">Choose where your QR code will appear on the page.</p>

            <RadioGroup
              value={state.position}
              onValueChange={(value) => updateState({ position: value })}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <label className="flex flex-col items-center space-y-3 border-2 rounded-3xl p-6 cursor-pointer hover:bg-[#f8f9f8] data-[state=checked]:border-black data-[state=checked]:bg-[#f8f9f8]">
                <div className="w-full h-36 border-2 rounded-2xl p-4 relative">
                  <div className="absolute top-3 left-3 w-10 h-10 bg-[#e4ff54] rounded-full flex items-center justify-center">
                    <StyledQRCode
                      url={ensureUrlProtocol(state.customUrl)}
                      size={38}
                      color={state.qrCodeColor}
                      backgroundColor={state.backgroundColor}
                    />
                  </div>
                </div>
                <RadioGroupItem value="top-left" id="top-left" />
                <span className="font-bold">Top Left</span>
              </label>

              <label className="flex flex-col items-center space-y-3 border-2 rounded-3xl p-6 cursor-pointer hover:bg-[#f8f9f8] data-[state=checked]:border-black data-[state=checked]:bg-[#f8f9f8]">
                <div className="w-full h-36 border-2 rounded-2xl p-4 relative">
                  <div className="absolute top-3 right-3 w-10 h-10 bg-[#e4ff54] rounded-full flex items-center justify-center">
                    <StyledQRCode
                      url={ensureUrlProtocol(state.customUrl)}
                      size={38}
                      color={state.qrCodeColor}
                      backgroundColor={state.backgroundColor}
                    />
                  </div>
                </div>
                <RadioGroupItem value="top-right" id="top-right" />
                <span className="font-bold">Top Right</span>
              </label>

              <label className="flex flex-col items-center space-y-3 border-2 rounded-3xl p-6 cursor-pointer hover:bg-[#f8f9f8] data-[state=checked]:border-black data-[state=checked]:bg-[#f8f9f8]">
                <div className="w-full h-36 border-2 rounded-2xl p-4 relative">
                  <div className="absolute bottom-3 left-3 w-10 h-10 bg-[#e4ff54] rounded-full flex items-center justify-center">
                    <StyledQRCode
                      url={ensureUrlProtocol(state.customUrl)}
                      size={38}
                      color={state.qrCodeColor}
                      backgroundColor={state.backgroundColor}
                    />
                  </div>
                </div>
                <RadioGroupItem value="bottom-left" id="bottom-left" />
                <span className="font-bold">Bottom Left</span>
              </label>

              <label className="flex flex-col items-center space-y-3 border-2 rounded-3xl p-6 cursor-pointer hover:bg-[#f8f9f8] data-[state=checked]:border-black data-[state=checked]:bg-[#f8f9f8]">
                <div className="w-full h-36 border-2 rounded-2xl p-4 relative">
                  <div className="absolute bottom-3 right-3 w-10 h-10 bg-[#e4ff54] rounded-full flex items-center justify-center">
                    <StyledQRCode
                      url={ensureUrlProtocol(state.customUrl)}
                      size={38}
                      color={state.qrCodeColor}
                      backgroundColor={state.backgroundColor}
                    />
                  </div>
                </div>
                <RadioGroupItem value="bottom-right" id="bottom-right" />
                <span className="font-bold">Bottom Right</span>
              </label>

              <label className="flex flex-col items-center space-y-3 border-2 rounded-3xl p-6 cursor-pointer hover:bg-[#f8f9f8] data-[state=checked]:border-black data-[state=checked]:bg-[#f8f9f8]">
                <div className="w-full h-36 border-2 rounded-2xl p-4 relative">
                  <div className="absolute top-1/2 left-3 transform -translate-y-1/2 w-10 h-10 bg-[#e4ff54] rounded-full flex items-center justify-center">
                    <StyledQRCode
                      url={ensureUrlProtocol(state.customUrl)}
                      size={38}
                      color={state.qrCodeColor}
                      backgroundColor={state.backgroundColor}
                    />
                  </div>
                </div>
                <RadioGroupItem value="left" id="left" />
                <span className="font-bold">Left</span>
              </label>

              <label className="flex flex-col items-center space-y-3 border-2 rounded-3xl p-6 cursor-pointer hover:bg-[#f8f9f8] data-[state=checked]:border-black data-[state=checked]:bg-[#f8f9f8]">
                <div className="w-full h-36 border-2 rounded-2xl p-4 relative">
                  <div className="absolute top-1/2 right-3 transform -translate-y-1/2 w-10 h-10 bg-[#e4ff54] rounded-full flex items-center justify-center">
                    <StyledQRCode
                      url={ensureUrlProtocol(state.customUrl)}
                      size={38}
                      color={state.qrCodeColor}
                      backgroundColor={state.backgroundColor}
                    />
                  </div>
                </div>
                <RadioGroupItem value="right" id="right" />
                <span className="font-bold">Right</span>
              </label>
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
                <Select
                  defaultValue={state.margin === 10 ? "small" : state.margin === 30 ? "large" : "medium"}
                  onValueChange={(value) => {
                    const margin = value === "small" ? 10 : value === "large" ? 30 : 20
                    updateState({
                      margin,
                      marginX: margin,
                      marginY: margin,
                    })
                  }}
                >
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
                      value={state.marginX}
                      onChange={(e) => updateState({ marginX: Number(e.target.value) })}
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
                      value={state.marginY}
                      onChange={(e) => updateState({ marginY: Number(e.target.value) })}
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
                <Switch
                  id="collapsed"
                  checked={state.startCollapsed}
                  className="data-[state=checked]:bg-black"
                  onCheckedChange={(checked) => updateState({ startCollapsed: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-show" className="font-bold">
                    Auto-show on scroll
                  </Label>
                  <p className="text-sm text-gray-600">Show the QR code when user scrolls down</p>
                </div>
                <Switch
                  id="auto-show"
                  checked={state.autoShowOnScroll}
                  className="data-[state=checked]:bg-black"
                  onCheckedChange={(checked) => updateState({ autoShowOnScroll: checked })}
                />
              </div>

              <div className="flex items-center space-x-4">
                <Label htmlFor="animation" className="min-w-24 font-bold">
                  Animation:
                </Label>
                <Select value={state.animation} onValueChange={(value) => updateState({ animation: value })}>
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

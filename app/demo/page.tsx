"use client"

import { useState } from "react"
import { BackToTopButton } from "@/components/back-to-top-button"
import { FloatingQRCode } from "@/components/floating-qr-code"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ScrollDemo() {
  const [showBackToTop, setShowBackToTop] = useState(true)
  const [showQRCode, setShowQRCode] = useState(true)
  const [hideOnScroll, setHideOnScroll] = useState(true)
  const [position, setPosition] = useState("bottom-right")
  const [animation, setAnimation] = useState("fade")
  const [showOnScroll, setShowOnScroll] = useState(true)

  return (
    <div className="min-h-[300vh] bg-[#e9ede7] p-8">
      <Link href="/" className="inline-flex items-center mb-6 text-sm font-medium">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <h1 className="text-4xl font-bold mb-8">Scroll Behavior Demo</h1>

      <Card className="p-8 rounded-3xl border-0 shadow-sm mb-8">
        <h2 className="text-2xl font-bold mb-4">Scroll-Aware Components</h2>
        <p className="text-gray-600 mb-6">
          This page demonstrates UI elements that respond to scroll position. Try scrolling down to see how the
          components behave.
        </p>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="back-to-top" className="font-bold">
                Show Back to Top Button
              </Label>
              <p className="text-sm text-gray-600">Shows a button that appears when scrolling down</p>
            </div>
            <Switch
              id="back-to-top"
              checked={showBackToTop}
              onCheckedChange={setShowBackToTop}
              className="data-[state=checked]:bg-black"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="qr-code" className="font-bold">
                Show QR Code
              </Label>
              <p className="text-sm text-gray-600">Shows a floating QR code button</p>
            </div>
            <Switch
              id="qr-code"
              checked={showQRCode}
              onCheckedChange={setShowQRCode}
              className="data-[state=checked]:bg-black"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="hide-on-scroll" className="font-bold">
                Auto-hide on scroll
              </Label>
              <p className="text-sm text-gray-600">Hide the QR code when scrolling down</p>
            </div>
            <Switch
              id="hide-on-scroll"
              checked={hideOnScroll}
              onCheckedChange={setHideOnScroll}
              className="data-[state=checked]:bg-black"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="show-on-scroll" className="font-bold">
                Auto-show on scroll
              </Label>
              <p className="text-sm text-gray-600">Show the QR code when scrolling down</p>
            </div>
            <Switch
              id="show-on-scroll"
              checked={showOnScroll}
              onCheckedChange={setShowOnScroll}
              className="data-[state=checked]:bg-black"
            />
          </div>

          <div className="flex items-center space-x-4">
            <Label htmlFor="position" className="min-w-24 font-bold">
              Position:
            </Label>
            <Select value={position} onValueChange={setPosition}>
              <SelectTrigger className="w-48 rounded-full border-2 border-gray-200 px-6 py-6">
                <SelectValue placeholder="Select position" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                <SelectItem value="top-left">Top Left</SelectItem>
                <SelectItem value="top-right">Top Right</SelectItem>
                <SelectItem value="bottom-left">Bottom Left</SelectItem>
                <SelectItem value="bottom-right">Bottom Right</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-4">
            <Label htmlFor="animation" className="min-w-24 font-bold">
              Animation:
            </Label>
            <Select value={animation} onValueChange={setAnimation}>
              <SelectTrigger className="w-48 rounded-full border-2 border-gray-200 px-6 py-6">
                <SelectValue placeholder="Select animation" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                <SelectItem value="fade">Fade</SelectItem>
                <SelectItem value="slide">Slide</SelectItem>
                <SelectItem value="zoom">Zoom</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <div className="space-y-8">
        {Array.from({ length: 10 }).map((_, i) => (
          <Card key={i} className="p-8 rounded-3xl border-0 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Section {i + 1}</h2>
            <p className="text-gray-600">
              This is a sample section to create scrollable content. Keep scrolling to see how the UI elements respond
              to scroll position.
            </p>
          </Card>
        ))}
      </div>

      {showBackToTop && <BackToTopButton threshold={300} position="bottom-right" />}

      {showQRCode && (
        <FloatingQRCode position={position as any} showOnScroll={showOnScroll} animation={animation as any} />
      )}
    </div>
  )
}

"use client"

import { useState } from "react"
import QRCodeDisplay from "./qr-code-display"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

export default function QRCodeWithLogoDemo() {
  const [url, setUrl] = useState("https://example.com")
  const [size, setSize] = useState(300)
  const [cornerRadius, setCornerRadius] = useState(15)
  const [logoSize, setLogoSize] = useState(25)
  const [showLogo, setShowLogo] = useState(true)
  const [color, setColor] = useState("#000000")
  const [backgroundColor, setBackgroundColor] = useState("#ffffff")

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>QR Code with Logo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center justify-center">
            <QRCodeDisplay
              url={url}
              size={size}
              cornerRadius={cornerRadius}
              showLogo={showLogo}
              logoSize={logoSize}
              color={color}
              backgroundColor={backgroundColor}
              displayText="Scan to visit our website"
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input id="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="size">Size: {size}px</Label>
              </div>
              <Slider
                id="size"
                min={100}
                max={500}
                step={10}
                value={[size]}
                onValueChange={(value) => setSize(value[0])}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="cornerRadius">Corner Radius: {cornerRadius}</Label>
              </div>
              <Slider
                id="cornerRadius"
                min={0}
                max={50}
                step={1}
                value={[cornerRadius]}
                onValueChange={(value) => setCornerRadius(value[0])}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="logoSize">Logo Size: {logoSize}</Label>
              </div>
              <Slider
                id="logoSize"
                min={5}
                max={30}
                step={1}
                value={[logoSize]}
                onValueChange={(value) => setLogoSize(value[0])}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="showLogo" checked={showLogo} onCheckedChange={setShowLogo} />
              <Label htmlFor="showLogo">Show Logo</Label>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="color">QR Color</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="color"
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-12 h-8 p-1"
                  />
                  <Input value={color} onChange={(e) => setColor(e.target.value)} className="flex-1" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="backgroundColor">Background Color</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="backgroundColor"
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-12 h-8 p-1"
                  />
                  <Input
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

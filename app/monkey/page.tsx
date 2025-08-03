"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogoUpload } from "@/components/logo-upload"
import { AlertCircle } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

// Use the provided Supabase URL as the default logo
const DEFAULT_LOGO_URL =
  "https://isvpyeyfwgpqtnlpykqu.supabase.co/storage/v1/object/public/qr-logos/1746640077052-g4.png"

export default function MonkeyQRPage() {
  const [url, setUrl] = useState("https://www.qrcode-monkey.com")
  const [qrCodeUrl, setQrCodeUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [size, setSize] = useState(300)
  const [fileFormat, setFileFormat] = useState("png")

  // QR Code style options
  const [bodyStyle, setBodyStyle] = useState("square")
  const [eyeStyle, setEyeStyle] = useState("frame1")
  const [eyeBallStyle, setEyeBallStyle] = useState("ball1")

  // Eye rotation and flip options
  const [erf1FlipVertical, setErf1FlipVertical] = useState(false)
  const [erf1FlipHorizontal, setErf1FlipHorizontal] = useState(true)
  const [erf2FlipVertical, setErf2FlipVertical] = useState(false)
  const [erf2FlipHorizontal, setErf2FlipHorizontal] = useState(false)
  const [erf3FlipVertical, setErf3FlipVertical] = useState(true)
  const [erf3FlipHorizontal, setErf3FlipHorizontal] = useState(true)
  const [brf1FlipVertical, setBrf1FlipVertical] = useState(false)
  const [brf1FlipHorizontal, setBrf1FlipHorizontal] = useState(true)
  const [brf2FlipVertical, setBrf2FlipVertical] = useState(false)
  const [brf2FlipHorizontal, setBrf2FlipHorizontal] = useState(false)
  const [brf3FlipVertical, setBrf3FlipVertical] = useState(true)
  const [brf3FlipHorizontal, setBrf3FlipHorizontal] = useState(true)

  // Colors
  const [bodyColor, setBodyColor] = useState("#000000")
  const [bgColor, setBgColor] = useState("#FFFFFF")
  const [eyeColor, setEyeColor] = useState("#000000")
  const [eyeBallColor, setEyeBallColor] = useState("#000000")

  // Gradient
  const [useGradient, setUseGradient] = useState(false)
  const [gradientColor1, setGradientColor1] = useState("#000000")
  const [gradientColor2, setGradientColor2] = useState("#000000")
  const [gradientType, setGradientType] = useState("radial")
  const [gradientOnEyes, setGradientOnEyes] = useState(false)

  // Logo
  const [logoUrl, setLogoUrl] = useState(DEFAULT_LOGO_URL)
  const [logoMode, setLogoMode] = useState("default")
  const [logoSize, setLogoSize] = useState(15)
  const [useLogo, setUseLogo] = useState(true)
  const [logoError, setLogoError] = useState<string | null>(null)

  // Helper function to create eye rotation arrays
  const getEyeRotationArray = (flipVertical: boolean, flipHorizontal: boolean): string[] => {
    const result: string[] = []
    if (flipVertical) result.push("fv")
    if (flipHorizontal) result.push("fh")
    return result
  }

  // Validate logo URL
  const validateLogoUrl = (url: string): boolean => {
    if (!url) return false

    // Check if it's a valid URL
    try {
      new URL(url)
    } catch (e) {
      setLogoError("Invalid URL format")
      return false
    }

    // Check if it has a supported image extension
    const supportedFormats = [".png", ".jpg", ".jpeg", ".gif"]
    const hasValidExtension = supportedFormats.some((ext) => url.toLowerCase().endsWith(ext))

    if (!hasValidExtension) {
      setLogoError("URL must end with .png, .jpg, .jpeg, or .gif")
      return false
    }

    setLogoError(null)
    return true
  }

  const handleLogoUploadComplete = (url: string) => {
    if (validateLogoUrl(url)) {
      setLogoUrl(url)
      setUseLogo(true)
    }
  }

  const handleLogoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setLogoUrl(url)
    validateLogoUrl(url)
  }

  const generateQRCode = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Validate logo URL if using logo
      if (useLogo && logoUrl) {
        if (!validateLogoUrl(logoUrl)) {
          // If logo URL is invalid, try without logo
          setUseLogo(false)
        }
      }

      // Create eye rotation arrays
      const erf1 = getEyeRotationArray(erf1FlipVertical, erf1FlipHorizontal)
      const erf2 = getEyeRotationArray(erf2FlipVertical, erf2FlipHorizontal)
      const erf3 = getEyeRotationArray(erf3FlipVertical, erf3FlipHorizontal)
      const brf1 = getEyeRotationArray(brf1FlipVertical, brf1FlipHorizontal)
      const brf2 = getEyeRotationArray(brf2FlipVertical, brf2FlipHorizontal)
      const brf3 = getEyeRotationArray(brf3FlipVertical, brf3FlipHorizontal)

      const payload = {
        data: url,
        config: {
          body: bodyStyle,
          eye: eyeStyle,
          eyeBall: eyeBallStyle,
          bodyColor: useGradient ? gradientColor1 : bodyColor,
          bgColor: bgColor,
          eye1Color: eyeColor,
          eye2Color: eyeColor,
          eye3Color: eyeColor,
          eyeBall1Color: eyeBallColor,
          eyeBall2Color: eyeBallColor,
          eyeBall3Color: eyeBallColor,
          gradientColor1: gradientColor1,
          gradientColor2: gradientColor2,
          gradientType: gradientType,
          gradientOnEyes: gradientOnEyes,
          logo: useLogo && !logoError ? logoUrl : "",
          logoMode: logoMode,
          logoSize: logoSize,
          // Add eye rotation arrays
          erf1,
          erf2,
          erf3,
          brf1,
          brf2,
          brf3,
        },
        size: size,
        download: false,
        file: fileFormat,
      }

      const response = await fetch("/api/qr-monkey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.error || `API error: ${response.status}`)
      }

      // Create a blob URL from the response
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)
      setQrCodeUrl(blobUrl)
    } catch (err) {
      console.error("Error generating QR code:", err)
      setError(err.message || "Failed to generate QR code")

      // If error is related to the logo, try again without logo
      if (useLogo && err.message?.includes("Image")) {
        setError(`${err.message}. Trying without logo...`)
        setUseLogo(false)
        // Try again without logo after a short delay
        setTimeout(() => {
          generateQRCode()
        }, 1000)
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Clean up blob URL when component unmounts or URL changes
  useEffect(() => {
    return () => {
      if (qrCodeUrl) {
        URL.revokeObjectURL(qrCodeUrl)
      }
    }
  }, [qrCodeUrl])

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">QRCode Monkey API Test</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="basic">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="style">Style</TabsTrigger>
              <TabsTrigger value="colors">Colors</TabsTrigger>
              <TabsTrigger value="logo">Logo</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Settings</CardTitle>
                  <CardDescription>Configure the basic QR code settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="url">URL to encode</Label>
                    <Input
                      id="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="size">Size (px)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        id="size"
                        min={100}
                        max={1000}
                        step={10}
                        value={[size]}
                        onValueChange={(value) => setSize(value[0])}
                        className="flex-1"
                      />
                      <span className="w-12 text-right">{size}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fileFormat">File Format</Label>
                    <Select value={fileFormat} onValueChange={setFileFormat}>
                      <SelectTrigger id="fileFormat">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="png">PNG</SelectItem>
                        <SelectItem value="svg">SVG</SelectItem>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="eps">EPS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="style" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Style Settings</CardTitle>
                  <CardDescription>Customize the appearance of your QR code</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bodyStyle">Body Style</Label>
                    <Select value={bodyStyle} onValueChange={setBodyStyle}>
                      <SelectTrigger id="bodyStyle">
                        <SelectValue placeholder="Select body style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="square">Square</SelectItem>
                        <SelectItem value="dots">Dots</SelectItem>
                        <SelectItem value="rounded">Rounded</SelectItem>
                        <SelectItem value="extra-rounded">Extra Rounded</SelectItem>
                        <SelectItem value="rounded-pointed">Rounded Pointed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="eyeStyle">Eye Style</Label>
                    <Select value={eyeStyle} onValueChange={setEyeStyle}>
                      <SelectTrigger id="eyeStyle">
                        <SelectValue placeholder="Select eye style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="square">Square</SelectItem>
                        <SelectItem value="circle">Circle</SelectItem>
                        <SelectItem value="rounded">Rounded</SelectItem>
                        <SelectItem value="frame1">Frame 1</SelectItem>
                        <SelectItem value="frame2">Frame 2</SelectItem>
                        <SelectItem value="frame3">Frame 3</SelectItem>
                        <SelectItem value="frame4">Frame 4</SelectItem>
                        <SelectItem value="frame5">Frame 5</SelectItem>
                        <SelectItem value="frame6">Frame 6</SelectItem>
                        <SelectItem value="frame7">Frame 7</SelectItem>
                        <SelectItem value="frame8">Frame 8</SelectItem>
                        <SelectItem value="frame9">Frame 9</SelectItem>
                        <SelectItem value="frame10">Frame 10</SelectItem>
                        <SelectItem value="frame11">Frame 11</SelectItem>
                        <SelectItem value="frame12">Frame 12</SelectItem>
                        <SelectItem value="frame13">Frame 13</SelectItem>
                        <SelectItem value="frame14">Frame 14</SelectItem>
                        <SelectItem value="frame15">Frame 15</SelectItem>
                        <SelectItem value="frame16">Frame 16</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="eyeBallStyle">Eye Ball Style</Label>
                    <Select value={eyeBallStyle} onValueChange={setEyeBallStyle}>
                      <SelectTrigger id="eyeBallStyle">
                        <SelectValue placeholder="Select eye ball style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="square">Square</SelectItem>
                        <SelectItem value="dot">Dot</SelectItem>
                        <SelectItem value="circle">Circle</SelectItem>
                        <SelectItem value="rounded">Rounded</SelectItem>
                        <SelectItem value="ball1">Ball 1</SelectItem>
                        <SelectItem value="ball2">Ball 2</SelectItem>
                        <SelectItem value="ball3">Ball 3</SelectItem>
                        <SelectItem value="ball4">Ball 4</SelectItem>
                        <SelectItem value="ball5">Ball 5</SelectItem>
                        <SelectItem value="ball6">Ball 6</SelectItem>
                        <SelectItem value="ball7">Ball 7</SelectItem>
                        <SelectItem value="ball8">Ball 8</SelectItem>
                        <SelectItem value="ball9">Ball 9</SelectItem>
                        <SelectItem value="ball10">Ball 10</SelectItem>
                        <SelectItem value="ball11">Ball 11</SelectItem>
                        <SelectItem value="ball12">Ball 12</SelectItem>
                        <SelectItem value="ball13">Ball 13</SelectItem>
                        <SelectItem value="ball14">Ball 14</SelectItem>
                        <SelectItem value="ball15">Ball 15</SelectItem>
                        <SelectItem value="ball16">Ball 16</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Eye Rotation and Flip Options */}
                  <div className="mt-6 border-t pt-4">
                    <h3 className="text-lg font-medium mb-4">Eye Rotation & Flip Options</h3>

                    {/* Upper Left Eye (erf1) */}
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Upper Left Eye</h4>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="erf1-flip-vertical"
                            checked={erf1FlipVertical}
                            onCheckedChange={(checked) => setErf1FlipVertical(checked === true)}
                          />
                          <Label htmlFor="erf1-flip-vertical">Flip Vertical</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="erf1-flip-horizontal"
                            checked={erf1FlipHorizontal}
                            onCheckedChange={(checked) => setErf1FlipHorizontal(checked === true)}
                          />
                          <Label htmlFor="erf1-flip-horizontal">Flip Horizontal</Label>
                        </div>
                      </div>
                    </div>

                    {/* Upper Right Eye (erf2) */}
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Upper Right Eye</h4>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="erf2-flip-vertical"
                            checked={erf2FlipVertical}
                            onCheckedChange={(checked) => setErf2FlipVertical(checked === true)}
                          />
                          <Label htmlFor="erf2-flip-vertical">Flip Vertical</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="erf2-flip-horizontal"
                            checked={erf2FlipHorizontal}
                            onCheckedChange={(checked) => setErf2FlipHorizontal(checked === true)}
                          />
                          <Label htmlFor="erf2-flip-horizontal">Flip Horizontal</Label>
                        </div>
                      </div>
                    </div>

                    {/* Lower Left Eye (erf3) */}
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Lower Left Eye</h4>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="erf3-flip-vertical"
                            checked={erf3FlipVertical}
                            onCheckedChange={(checked) => setErf3FlipVertical(checked === true)}
                          />
                          <Label htmlFor="erf3-flip-vertical">Flip Vertical</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="erf3-flip-horizontal"
                            checked={erf3FlipHorizontal}
                            onCheckedChange={(checked) => setErf3FlipHorizontal(checked === true)}
                          />
                          <Label htmlFor="erf3-flip-horizontal">Flip Horizontal</Label>
                        </div>
                      </div>
                    </div>

                    {/* Upper Left Eye Ball (brf1) */}
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Upper Left Eye Ball</h4>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="brf1-flip-vertical"
                            checked={brf1FlipVertical}
                            onCheckedChange={(checked) => setBrf1FlipVertical(checked === true)}
                          />
                          <Label htmlFor="brf1-flip-vertical">Flip Vertical</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="brf1-flip-horizontal"
                            checked={brf1FlipHorizontal}
                            onCheckedChange={(checked) => setBrf1FlipHorizontal(checked === true)}
                          />
                          <Label htmlFor="brf1-flip-horizontal">Flip Horizontal</Label>
                        </div>
                      </div>
                    </div>

                    {/* Upper Right Eye Ball (brf2) */}
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Upper Right Eye Ball</h4>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="brf2-flip-vertical"
                            checked={brf2FlipVertical}
                            onCheckedChange={(checked) => setBrf2FlipVertical(checked === true)}
                          />
                          <Label htmlFor="brf2-flip-vertical">Flip Vertical</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="brf2-flip-horizontal"
                            checked={brf2FlipHorizontal}
                            onCheckedChange={(checked) => setBrf2FlipHorizontal(checked === true)}
                          />
                          <Label htmlFor="brf2-flip-horizontal">Flip Horizontal</Label>
                        </div>
                      </div>
                    </div>

                    {/* Lower Left Eye Ball (brf3) */}
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Lower Left Eye Ball</h4>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="brf3-flip-vertical"
                            checked={brf3FlipVertical}
                            onCheckedChange={(checked) => setBrf3FlipVertical(checked === true)}
                          />
                          <Label htmlFor="brf3-flip-vertical">Flip Vertical</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="brf3-flip-horizontal"
                            checked={brf3FlipHorizontal}
                            onCheckedChange={(checked) => setBrf3FlipHorizontal(checked === true)}
                          />
                          <Label htmlFor="brf3-flip-horizontal">Flip Horizontal</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="colors" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Color Settings</CardTitle>
                  <CardDescription>Customize the colors of your QR code</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="useGradient">Use Gradient</Label>
                    <Switch id="useGradient" checked={useGradient} onCheckedChange={setUseGradient} />
                  </div>

                  {!useGradient ? (
                    <div className="space-y-2">
                      <Label htmlFor="bodyColor">Body Color</Label>
                      <div className="flex gap-2">
                        <Input
                          id="bodyColor"
                          type="color"
                          value={bodyColor}
                          onChange={(e) => setBodyColor(e.target.value)}
                          className="w-12 h-10 p-1"
                        />
                        <Input value={bodyColor} onChange={(e) => setBodyColor(e.target.value)} className="flex-1" />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="gradientColor1">Gradient Color 1</Label>
                        <div className="flex gap-2">
                          <Input
                            id="gradientColor1"
                            type="color"
                            value={gradientColor1}
                            onChange={(e) => setGradientColor1(e.target.value)}
                            className="w-12 h-10 p-1"
                          />
                          <Input
                            value={gradientColor1}
                            onChange={(e) => setGradientColor1(e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="gradientColor2">Gradient Color 2</Label>
                        <div className="flex gap-2">
                          <Input
                            id="gradientColor2"
                            type="color"
                            value={gradientColor2}
                            onChange={(e) => setGradientColor2(e.target.value)}
                            className="w-12 h-10 p-1"
                          />
                          <Input
                            value={gradientColor2}
                            onChange={(e) => setGradientColor2(e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="gradientType">Gradient Type</Label>
                        <Select value={gradientType} onValueChange={setGradientType}>
                          <SelectTrigger id="gradientType">
                            <SelectValue placeholder="Select gradient type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="linear">Linear</SelectItem>
                            <SelectItem value="radial">Radial</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="gradientOnEyes">Gradient on Eyes</Label>
                        <Switch id="gradientOnEyes" checked={gradientOnEyes} onCheckedChange={setGradientOnEyes} />
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="bgColor">Background Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="bgColor"
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="w-12 h-10 p-1"
                      />
                      <Input value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="flex-1" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="eyeColor">Eye Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="eyeColor"
                        type="color"
                        value={eyeColor}
                        onChange={(e) => setEyeColor(e.target.value)}
                        className="w-12 h-10 p-1"
                      />
                      <Input value={eyeColor} onChange={(e) => setEyeColor(e.target.value)} className="flex-1" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="eyeBallColor">Eye Ball Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="eyeBallColor"
                        type="color"
                        value={eyeBallColor}
                        onChange={(e) => setEyeBallColor(e.target.value)}
                        className="w-12 h-10 p-1"
                      />
                      <Input
                        value={eyeBallColor}
                        onChange={(e) => setEyeBallColor(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="logo" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Logo Settings</CardTitle>
                  <CardDescription>Add a logo to your QR code</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="useLogo">Use Logo</Label>
                    <Switch id="useLogo" checked={useLogo} onCheckedChange={setUseLogo} />
                  </div>

                  {useLogo && (
                    <>
                      <div className="space-y-2">
                        <Label>Current Logo</Label>
                        <div className="flex justify-center p-4 bg-gray-50 rounded-md">
                          {logoUrl ? (
                            <div className="relative w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                              <img
                                src={logoUrl || "/placeholder.svg"}
                                alt="Logo"
                                className="object-contain w-full h-full"
                              />
                            </div>
                          ) : (
                            <div className="w-24 h-24 flex items-center justify-center bg-gray-100 border border-gray-200 rounded-md text-gray-400">
                              No logo
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Upload New Logo</Label>
                        <LogoUpload onUploadComplete={handleLogoUploadComplete} />
                        <p className="text-sm text-gray-500 mt-1">
                          Upload a PNG or JPEG image to use as your QR code logo.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="logoUrl">Or Enter Logo URL</Label>
                        <Input
                          id="logoUrl"
                          value={logoUrl}
                          onChange={handleLogoUrlChange}
                          placeholder="https://example.com/logo.png"
                          className={logoError ? "border-red-500" : ""}
                        />
                        {logoError ? (
                          <div className="flex items-center text-sm text-red-500 mt-1">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {logoError}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500 mt-1">URL must end with .png, .jpg, .jpeg, or .gif</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="logoMode">Logo Mode</Label>
                        <Select value={logoMode} onValueChange={setLogoMode}>
                          <SelectTrigger id="logoMode">
                            <SelectValue placeholder="Select logo mode" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="default">Default</SelectItem>
                            <SelectItem value="clean">Clean</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="logoSize">Logo Size (%)</Label>
                        <div className="flex items-center gap-4">
                          <Slider
                            id="logoSize"
                            min={5}
                            max={30}
                            step={1}
                            value={[logoSize]}
                            onValueChange={(value) => setLogoSize(value[0])}
                            className="flex-1"
                          />
                          <span className="w-12 text-right">{logoSize}%</span>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-6">
            <Button onClick={generateQRCode} disabled={isLoading} className="w-full">
              {isLoading ? "Generating..." : "Generate QR Code"}
            </Button>

            {error && <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-md">{error}</div>}
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>QR Code Preview</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              {qrCodeUrl ? (
                <div className="border border-gray-200 rounded-md p-4 bg-white">
                  {/* Use img instead of Image for blob URLs */}
                  <img src={qrCodeUrl || "/placeholder.svg"} alt="Generated QR Code" className="max-w-full h-auto" />
                </div>
              ) : (
                <div className="border border-gray-200 rounded-md p-4 bg-gray-50 flex items-center justify-center w-64 h-64 text-gray-400">
                  QR code will appear here
                </div>
              )}
            </CardContent>
            <CardFooter>
              {qrCodeUrl && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    const a = document.createElement("a")
                    a.href = qrCodeUrl
                    a.download = `qrcode.${fileFormat}`
                    document.body.appendChild(a)
                    a.click()
                    document.body.removeChild(a)
                  }}
                >
                  Download QR Code
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

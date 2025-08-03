"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { ArrowRight, Upload, Smartphone, Tablet, ImageIcon, ArrowLeft, Loader2 } from "lucide-react"
import QRCodeDisplay from "@/components/ui/qr-code-display"
import { ensureUrlProtocol } from "@/lib/qr-code-generator"
import { uploadLogo } from "@/app/actions/upload-logo"
import { toast } from "@/components/ui/use-toast"

// Default logo path
const DEFAULT_LOGO = "/images/g4.png"

interface AppearanceContentProps {
  state: {
    qrCodeName: string;
    displayText: string;
    showOnDesktop: boolean;
    showOnMobile: boolean;
    customUrl: string;
    urlType: string;
    qrCodeColor: string;
    backgroundColor: string;
    buttonColor: string;
    qrSize: number;
    buttonShape: string;
    position: string;
    marginX: number;
    marginY: number;
    animation: string;
    startCollapsed: boolean;
    autoShowOnScroll: boolean;
    logoUrl?: string;
    [key: string]: any;
  };
  updateState: (state: Partial<AppearanceContentProps['state']>) => void;
  onNext: () => void;
  onPrevious: () => void;
  onSave: () => void;
  isSaving: boolean;
}

export default function AppearanceContent({ state, updateState, onNext, onPrevious, onSave, isSaving }: AppearanceContentProps) {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [logoObjectUrl, setLogoObjectUrl] = useState<string | null>(null)

  // Set default logo if none is provided
  useEffect(() => {
    if (!state.logoUrl) {
      updateState({ logoUrl: DEFAULT_LOGO })
    }
  }, [state.logoUrl, updateState])

  // Clean up object URL when component unmounts or when logoObjectUrl changes
  useEffect(() => {
    return () => {
      if (logoObjectUrl) {
        URL.revokeObjectURL(logoObjectUrl)
      }
    }
  }, [logoObjectUrl])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, etc.)",
        variant: "destructive",
      })
      return
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Logo image must be less than 2MB",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    try {
      // Create a temporary URL for the file for preview
      if (logoObjectUrl) {
        URL.revokeObjectURL(logoObjectUrl)
      }

      const objectUrl = URL.createObjectURL(file)
      setLogoObjectUrl(objectUrl)

      // Try server-side upload first
      const formData = new FormData()
      formData.append("logo", file)

      const result = await uploadLogo(formData)

      if (result.success) {
        // Server upload succeeded
        updateState({ logoUrl: result.logoUrl })
        toast({
          title: "Logo added",
          description: "Your logo has been added to the QR code",
        })
      } else {
        // If server upload fails, fall back to client-side base64
        console.warn("Server upload failed, falling back to base64:", result.error)

        // Convert the file to a base64 string for storage
        const reader = new FileReader()
        reader.onload = (event) => {
          const base64String = event.target?.result as string

          // Store the base64 string in the state
          updateState({ logoUrl: base64String })

          toast({
            title: "Logo added",
            description: "Your logo has been added to the QR code",
          })
        }

        reader.onerror = () => {
          throw new Error("Failed to read file")
        }

        reader.readAsDataURL(file)
      }
    } catch (error) {
      console.error("Error handling logo:", error)
      toast({
        title: "Error adding logo",
        description: "Failed to add logo. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveLogo = () => {
    if (logoObjectUrl) {
      URL.revokeObjectURL(logoObjectUrl)
      setLogoObjectUrl(null)
    }
    // Reset to default logo
    updateState({ logoUrl: DEFAULT_LOGO })
  }

  // Function to display the logo preview
  const logoPreview = state.logoUrl ? (
    <div className="mt-4 flex items-center">
      <div className="w-16 h-16 border rounded-md overflow-hidden mr-4">
        <img src={state.logoUrl || DEFAULT_LOGO} alt="Logo" className="w-full h-full object-contain" />
      </div>
      <p className="text-sm text-gray-500">
        {state.logoUrl === DEFAULT_LOGO
          ? "Default logo will be displayed in the center of the QR code"
          : "Your logo will be displayed in the center of the QR code"}
      </p>
    </div>
  ) : null

  return (
    <>
      <Card className="p-8 rounded-3xl border-0 shadow-sm">
        <div className="space-y-8">
          <div>
            <div className="flex items-center mb-2">
              <h2 className="text-xl font-bold">QR Code Theme</h2>
            </div>
            <p className="text-sm text-gray-600 mb-6">Choose between light and dark theme for your QR code.</p>

            <RadioGroup
              value={state.backgroundColor === "#000000" ? "dark" : "light"}
              onValueChange={(value) => {
                if (value === "light") {
                  updateState({
                    qrCodeColor: "#000000",
                    backgroundColor: "#ffffff",
                  })
                } else {
                  updateState({
                    qrCodeColor: "#ffffff",
                    backgroundColor: "#000000",
                  })
                }
              }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <label
                htmlFor="light"
                className="flex flex-col items-center space-y-3 border-2 rounded-3xl p-6 cursor-pointer hover:bg-[#f8f9f8] data-[state=checked]:border-black data-[state=checked]:bg-[#f8f9f8]"
              >
                <div className="bg-white border-2 rounded-2xl p-4">
                  <QRCodeDisplay
                    url={ensureUrlProtocol(state.customUrl)}
                    size={80}
                    color="#000000"
                    backgroundColor="#ffffff"
                    showBorder={false}
                    className="w-20 h-20"
                  />
                </div>
                <RadioGroupItem value="light" id="light" />
                <span className="font-bold">Light</span>
              </label>

              <label
                htmlFor="dark"
                className="flex flex-col items-center space-y-3 border-2 rounded-3xl p-6 cursor-pointer hover:bg-[#f8f9f8] data-[state=checked]:border-black data-[state=checked]:bg-[#f8f9f8]"
              >
                <div className="bg-black border-2 rounded-2xl p-4">
                  <QRCodeDisplay
                    url={ensureUrlProtocol(state.customUrl)}
                    size={80}
                    color="#ffffff"
                    backgroundColor="#000000"
                    showBorder={false}
                    className="w-20 h-20"
                  />
                </div>
                <RadioGroupItem value="dark" id="dark" />
                <span className="font-bold">Dark</span>
              </label>

              <label
                htmlFor="auto"
                className="flex flex-col items-center space-y-3 border-2 rounded-3xl p-6 cursor-pointer hover:bg-[#f8f9f8]"
              >
                <div className="bg-gradient-to-b from-white to-black border-2 rounded-2xl p-4 relative">
                  <QRCodeDisplay
                    url={ensureUrlProtocol(state.customUrl)}
                    size={80}
                    color="#000000"
                    backgroundColor="#ffffff"
                    showBorder={false}
                    className="w-20 h-20"
                  />
                  <Badge className="absolute -top-2 -right-2 bg-black text-white border-0 rounded-full px-3 py-0.5 font-medium">
                    Pro
                  </Badge>
                </div>
                <RadioGroupItem value="auto" id="auto" />
                <span className="font-bold">Auto (Pro)</span>
                <p className="text-xs text-gray-500 text-center">Adapts to user's theme preference</p>
              </label>
            </RadioGroup>
          </div>

          <Separator className="bg-gray-200" />

          <div>
            <div className="flex items-center mb-2">
              <h2 className="text-xl font-bold">QR Code Type</h2>
            </div>
            <p className="text-sm text-gray-600 mb-6">Select the type of QR code to display.</p>

            <RadioGroup defaultValue="portrait" className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <label
                htmlFor="portrait"
                className="flex flex-col items-center space-y-3 border-2 rounded-3xl p-6 cursor-pointer hover:bg-[#f8f9f8] data-[state=checked]:border-black data-[state=checked]:bg-[#f8f9f8]"
              >
                <div className="bg-white border-2 rounded-2xl p-4">
                  <Smartphone className="h-20 w-20" />
                </div>
                <RadioGroupItem value="portrait" id="portrait" />
                <span className="font-bold">Portrait</span>
                <p className="text-xs text-gray-500 text-center">Optimized for vertical viewing</p>
              </label>

              <label
                htmlFor="landscape"
                className="flex flex-col items-center space-y-3 border-2 rounded-3xl p-6 cursor-pointer hover:bg-[#f8f9f8] data-[state=checked]:border-black data-[state=checked]:bg-[#f8f9f8]"
              >
                <div className="bg-white border-2 rounded-2xl p-4">
                  <Tablet className="h-20 w-20 rotate-90" />
                </div>
                <RadioGroupItem value="landscape" id="landscape" />
                <span className="font-bold">Landscape</span>
                <p className="text-xs text-gray-500 text-center">Optimized for horizontal viewing</p>
              </label>

              <label
                htmlFor="image"
                className="flex flex-col items-center space-y-3 border-2 rounded-3xl p-6 cursor-pointer hover:bg-[#f8f9f8] data-[state=checked]:border-black data-[state=checked]:bg-[#f8f9f8]"
              >
                <div className="bg-white border-2 rounded-2xl p-4">
                  <ImageIcon className="h-20 w-20" />
                </div>
                <RadioGroupItem value="image" id="image" />
                <span className="font-bold">Image</span>
                <p className="text-xs text-gray-500 text-center">Upload image to display above QR code</p>
              </label>
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
                <Select
                  defaultValue={state.qrSize === 100 ? "small" : state.qrSize === 200 ? "large" : "medium"}
                  onValueChange={(value) => {
                    if (value === "small") updateState({ qrSize: 100 })
                    if (value === "medium") updateState({ qrSize: 150 })
                    if (value === "large") updateState({ qrSize: 200 })
                  }}
                >
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
                  <Slider
                    max={300}
                    min={80}
                    step={1}
                    className="flex-1"
                    value={[state.qrSize]}
                    onValueChange={(value) => updateState({ qrSize: value[0] })}
                  />
                  <span className="text-base font-medium min-w-12">{state.qrSize}px</span>
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
                <Label htmlFor="show-button" className="min-w-24 font-bold">
                  Show button:
                </Label>
                <div className="flex items-center">
                  <Switch
                    id="show-button"
                    checked={state.showButton}
                    onCheckedChange={(checked) => updateState({ showButton: checked })}
                    className="bg-gray-200 data-[state=checked]:bg-black"
                  />
                  <span className="ml-3 text-sm">{state.showButton ? "Yes" : "No"}</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Label htmlFor="button-color" className="min-w-24 font-bold">
                  Button color:
                </Label>
                <div className="flex items-center space-x-3">
                  {[
                    { color: "#000000", name: "black" },
                    { color: "#e4ff54", name: "lime" },
                    { color: "#3b82f6", name: "blue" },
                    { color: "#a855f7", name: "purple" },
                    { color: "#f97316", name: "orange" },
                    { color: "#7e22ce", name: "violet" },
                  ].map((item) => (
                    <button
                      key={item.name}
                      onClick={() => updateState({ buttonColor: item.color })}
                      className={`w-10 h-10 rounded-full cursor-pointer transition-all hover:scale-110 ${
                        state.buttonColor === item.color
                          ? "ring-2 ring-offset-2 ring-black"
                          : "border-2 border-gray-200"
                      }`}
                      style={{ backgroundColor: item.color }}
                      aria-label={`Select ${item.name} color`}
                    />
                  ))}
                  <Input
                    type="color"
                    value={state.buttonColor}
                    onChange={(e) => updateState({ buttonColor: e.target.value })}
                    className="w-10 h-10 p-1 cursor-pointer rounded-full"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Label htmlFor="button-shape" className="min-w-24 font-bold">
                  Button shape:
                </Label>
                <Select
                  value={state.buttonShape}
                  onValueChange={(value) => updateState({ buttonShape: value })}
                >
                  <SelectTrigger id="button-shape" className="w-[180px]">
                    <SelectValue placeholder="Select shape" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rounded">Rounded</SelectItem>
                    <SelectItem value="square">Square</SelectItem>
                    <SelectItem value="circle">Circle</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-4">
                <Label htmlFor="button-icon" className="min-w-24 font-bold">
                  Button icon:
                </Label>
                <Select
                  value={state.buttonIcon}
                  onValueChange={(value) => updateState({ buttonIcon: value })}
                >
                  <SelectTrigger id="button-icon" className="w-[180px]">
                    <SelectValue placeholder="Select icon" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None (Text Only)</SelectItem>
                    <SelectItem value="qr-code">QR Code</SelectItem>
                    <SelectItem value="scan">Scan</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="share">Share</SelectItem>
                    <SelectItem value="link">Link</SelectItem>
                    <SelectItem value="download">Download</SelectItem>
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

            <div className="flex items-center space-x-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
                aria-label="Upload logo"
              />
              <Button
                variant="outline"
                className="flex items-center rounded-full px-6 py-6 border-2 border-gray-200 font-medium hover:bg-gray-50"
                onClick={triggerFileInput}
                disabled={isUploading}
              >
                {isUploading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Upload className="mr-2 h-5 w-5" />}
                {isUploading ? "Uploading..." : "Upload Custom Logo"}
              </Button>
              <p className="text-sm text-gray-500">
                {state.logoUrl && state.logoUrl !== DEFAULT_LOGO ? (
                  <>
                    Custom logo uploaded!{" "}
                    <button className="text-red-500 hover:underline" onClick={handleRemoveLogo}>
                      Reset to Default
                    </button>
                  </>
                ) : (
                  "Upload a custom logo to replace the default logo"
                )}
              </p>
            </div>

            {logoPreview}
          </div>
        </div>
      </Card>

      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          className="rounded-full px-8 py-6 border-2 border-black font-medium"
          onClick={onPrevious}
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Previous
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

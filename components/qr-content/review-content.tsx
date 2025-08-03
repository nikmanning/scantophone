"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Copy, Save } from "lucide-react"
import Link from "next/link"
import { ConfettiEffect } from "@/components/confetti-effect"

interface QrCodeState {
  qrCodeName: string
  urlType: string
  displayText: string
  showOnMobile: boolean
  showOnDesktop: boolean
  backgroundColor: string
  qrSize: number
  buttonColor: string
  buttonShape: string
  buttonIcon: string
  showButton: boolean
  position: string
  marginX: number
  marginY: number
  startCollapsed: boolean
  animation: string
}

interface ReviewContentProps {
  state: QrCodeState
  getFormattedPosition: () => string
  onPrevious: () => void
  onSave: () => void
  isSaving: boolean
  qrCodeId?: string
}

export default function ReviewContent({ state, getFormattedPosition, onPrevious, onSave, isSaving, qrCodeId }: ReviewContentProps) {
  const router = useRouter()
  const [showConfetti, setShowConfetti] = useState(false)
  const [isDeployed, setIsDeployed] = useState(false)

  const handleDeploy = () => {
    onSave() // Call the save function passed from the parent
    setShowConfetti(true)
    setIsDeployed(true)
  }

  const handleConfettiComplete = () => {
    setShowConfetti(false)
    router.push("/my-qr-codes") // Redirect after confetti
  }

  const formattedPosition = getFormattedPosition()

  return (
    <>
      <ConfettiEffect active={showConfetti} onComplete={handleConfettiComplete} />

      <Card className="p-8 rounded-3xl border-0 shadow-sm">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-2">QR Code Summary</h2>
            <p className="text-sm text-gray-600 mb-4">Review your QR code settings before deploying.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-gray-500">Basic Settings</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Name:</span>
                      <span className="text-sm font-medium">{state.qrCodeName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">URL Type:</span>
                      <span className="text-sm font-medium">
                        {state.urlType === "custom" ? "Custom URL" : "Current Page URL"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Display Text:</span>
                      <span className="text-sm font-medium">{state.displayText}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Device Display:</span>
                      <span className="text-sm font-medium">
                        {state.showOnMobile && state.showOnDesktop
                          ? "Mobile & Desktop"
                          : state.showOnMobile
                            ? "Mobile Only"
                            : state.showOnDesktop
                              ? "Desktop Only"
                              : "None"}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-500">Appearance</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Theme:</span>
                      <span className="text-sm font-medium">
                        {state.backgroundColor === "#ffffff" ? "Light" : "Dark"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Size:</span>
                      <span className="text-sm font-medium">{state.qrSize}px</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Button Color:</span>
                      <div className="flex items-center">
                        <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: state.buttonColor }}></div>
                        <span className="text-sm font-medium">{state.buttonColor}</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Button Shape:</span>
                      <span className="text-sm font-medium">{state.buttonShape}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-gray-500">Position & Behavior</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Position:</span>
                      <span className="text-sm font-medium">{formattedPosition}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Margin:</span>
                      <span className="text-sm font-medium">
                        {state.marginX}px x {state.marginY}px
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Start Collapsed:</span>
                      <span className="text-sm font-medium">{state.startCollapsed ? "Yes" : "No"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Animation:</span>
                      <span className="text-sm font-medium">{state.animation}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-500">Advanced Settings</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Page Targeting:</span>
                      <span className="text-sm font-medium">All Pages</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Custom CSS:</span>
                      <span className="text-sm font-medium">Yes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-gray-200" />

          <div>
            <h2 className="text-xl font-bold mb-2">Installation</h2>
            <p className="text-sm text-gray-600 mb-4">Add this code to your website to display the QR code.</p>

            <Tabs defaultValue="script">
              <TabsList className="mb-4 bg-transparent">
                <TabsTrigger
                  value="script"
                  className="rounded-full data-[state=active]:bg-black data-[state=active]:text-white"
                >
                  Script Tag
                </TabsTrigger>
                <TabsTrigger
                  value="wordpress"
                  className="rounded-full data-[state=active]:bg-black data-[state=active]:text-white"
                >
                  WordPress
                </TabsTrigger>
                <TabsTrigger
                  value="shopify"
                  className="rounded-full data-[state=active]:bg-black data-[state=active]:text-white"
                >
                  Shopify
                </TabsTrigger>
              </TabsList>

              <TabsContent value="script">
                <div className="relative">
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-xl font-mono text-sm overflow-x-auto">
                    <pre>{`<script src="https://cdn.viralqrcode.com/v1/qr-code.js"
  data-qr-id="${qrCodeId || state.qrCodeName.toLowerCase().replace(/\s+/g, "-")}"
  data-position="${state.position}"
  data-button-shape="${state.buttonShape}"
  data-display-text="${state.displayText}"
  data-button-icon="${state.buttonIcon}"
  data-api-key="YOUR_API_KEY">
</script>`}</pre>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full bg-white/20 hover:bg-white/30"
                    title="Copy to clipboard"
                  >
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy</span>
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Add this script to your website's footer or before the closing &lt;/body&gt; tag.
                </p>
              </TabsContent>

              <TabsContent value="wordpress">
                <div className="space-y-4">
                  <div className="bg-[#f8f9f8] p-4 rounded-xl">
                    <h3 className="font-bold mb-2">Option 1: Use our WordPress Plugin</h3>
                    <p className="text-sm text-gray-600 mb-2">Install our WordPress plugin for easy integration.</p>
                    <Button className="rounded-full px-6 py-2 bg-black hover:bg-gray-800 text-white font-medium">
                      Download WordPress Plugin
                    </Button>
                  </div>

                  <div className="bg-[#f8f9f8] p-4 rounded-xl">
                    <h3 className="font-bold mb-2">Option 2: Add code manually</h3>
                    <p className="text-sm text-gray-600 mb-2">Add this code to your theme's footer.php file:</p>
                    <div className="relative mt-2">
                      <div className="bg-gray-900 text-gray-100 p-4 rounded-xl font-mono text-sm overflow-x-auto">
                        <pre>{`<?php
// Add this code to your theme's footer.php file
?>
<script src="https://cdn.viralqrcode.com/v1/qr-code.js"
  data-qr-id="${qrCodeId || state.qrCodeName.toLowerCase().replace(/\s+/g, "-")}"
  data-position="${state.position}"
  data-button-shape="${state.buttonShape}"
  data-display-text="${state.displayText}"
  data-button-icon="${state.buttonIcon}"
  data-api-key="YOUR_API_KEY">
</script>`}</pre>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full bg-white/20 hover:bg-white/30"
                        title="Copy to clipboard"
                      >
                        <Copy className="h-4 w-4" />
                        <span className="sr-only">Copy</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="shopify">
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">To add the QR code to your Shopify store:</p>

                  <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-600">
                    <li>Go to your Shopify admin panel</li>
                    <li>Navigate to Online Store &gt; Themes</li>
                    <li>Click "Actions" and then "Edit code"</li>
                    <li>Open the theme.liquid file</li>
                    <li>Add the following code just before the closing &lt;/body&gt; tag:</li>
                  </ol>

                  <div className="relative">
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-xl font-mono text-sm overflow-x-auto">
                      <pre>{`<script src="https://cdn.viralqrcode.com/v1/qr-code.js"
  data-qr-id="${qrCodeId || state.qrCodeName.toLowerCase().replace(/\s+/g, "-")}"
  data-position="${state.position}"
  data-button-shape="${state.buttonShape}"
  data-display-text="${state.displayText}"
  data-button-icon="${state.buttonIcon}"
  data-api-key="YOUR_API_KEY">
</script>`}</pre>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full bg-white/20 hover:bg-white/30"
                      title="Copy to clipboard"
                    >
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copy</span>
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
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
          <Link href="/my-qr-codes">
            <Button variant="outline" className="rounded-full px-8 py-6 border-2 border-black font-medium">
              Cancel
            </Button>
          </Link>
        </div>
        <Button
          onClick={handleDeploy}
          className="rounded-full px-8 py-6 bg-black hover:bg-gray-800 text-white font-medium text-base
                    transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(228,255,84,0.7)]"
          disabled={isDeployed}
        >
          <Save className="mr-2 h-5 w-5" />
          {isDeployed ? "Deploying..." : "Deploy QR Code"}
        </Button>
      </div>
    </>
  )
}

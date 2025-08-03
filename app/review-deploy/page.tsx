"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Copy, QrCode, Save } from "lucide-react"
import SidebarNav from "@/components/sidebar-nav"
import Link from "next/link"
import { ConfettiEffect } from "@/components/confetti-effect"
import { useRouter } from "next/navigation"

export default function ReviewDeploy() {
  const [showConfetti, setShowConfetti] = useState(false)
  const router = useRouter()

  const handleSaveClick = () => {
    setShowConfetti(true)
  }

  const handleConfettiComplete = () => {
    router.push("/my-qr-codes")
  }

  return (
    <div className="flex min-h-screen bg-[#e9ede7]">
      {/* Confetti Effect */}
      <ConfettiEffect active={showConfetti} onComplete={handleConfettiComplete} />

      {/* Sidebar Navigation */}
      <SidebarNav />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Review & Deploy</h1>
          <Button variant="outline" className="rounded-full px-6 py-2 border-2 border-black font-medium">
            Save & Quit
          </Button>
        </div>

        <Card className="p-8 rounded-3xl border-0 shadow-sm">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold mb-2">QR Code Summary</h2>
              <p className="text-sm text-gray-600 mb-6">Review your QR code settings before deploying.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-gray-500">Basic Settings</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Name:</span>
                        <span className="text-sm font-medium">My Website QR Code</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">URL Type:</span>
                        <span className="text-sm font-medium">Current Page URL</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Display Text:</span>
                        <span className="text-sm font-medium">Scan to visit our website</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Device Display:</span>
                        <span className="text-sm font-medium">Desktop Only</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-gray-500">Appearance</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Theme:</span>
                        <span className="text-sm font-medium">Light</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Size:</span>
                        <span className="text-sm font-medium">Medium (150px)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Button Color:</span>
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded-full bg-[#e4ff54] mr-2"></div>
                          <span className="text-sm font-medium">#e4ff54</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Button Shape:</span>
                        <span className="text-sm font-medium">Rounded</span>
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
                        <span className="text-sm font-medium">Bottom Right</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Margin:</span>
                        <span className="text-sm font-medium">20px x 20px</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Start Collapsed:</span>
                        <span className="text-sm font-medium">Yes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Animation:</span>
                        <span className="text-sm font-medium">Fade</span>
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
              <p className="text-sm text-gray-600 mb-6">Add this code to your website to display the QR code.</p>

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
  data-qr-id="my-website-qr-code"
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
  data-qr-id="my-website-qr-code"
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
  data-qr-id="my-website-qr-code"
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
          <Link href="/advanced-settings">
            <Button variant="outline" className="rounded-full px-8 py-6 border-2 border-black font-medium">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Previous
            </Button>
          </Link>
          <Button
            onClick={handleSaveClick}
            className="rounded-full px-8 py-6 bg-black hover:bg-gray-800 text-white font-medium text-base
                      transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(228,255,84,0.7)]"
          >
            <Save className="mr-2 h-5 w-5" />
            Save QR Code
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

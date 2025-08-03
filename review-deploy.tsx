import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Check, Copy, QrCode, Rocket } from "lucide-react"

export default function ReviewDeploy() {
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

          <div className="flex items-center py-2 px-3 rounded-md text-sm font-medium">
            <Check className="h-5 w-5 text-emerald-500 mr-2" />
            <span>Advanced settings</span>
          </div>

          <div className="flex items-center py-2 px-3 bg-gray-100 rounded-md text-sm font-medium">
            <Check className="h-5 w-5 text-emerald-500 mr-2" />
            <span>Review & Deploy</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Review & Deploy</h1>
          <Button variant="outline">Save & Quit</Button>
        </div>

        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium mb-2">QR Code Summary</h2>
              <p className="text-sm text-gray-500 mb-4">Review your QR code settings before deploying.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Basic Settings</h3>
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
                    <h3 className="text-sm font-medium text-gray-500">Appearance</h3>
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
                          <div className="w-4 h-4 rounded-full bg-emerald-500 mr-2"></div>
                          <span className="text-sm font-medium">#10b981</span>
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
                    <h3 className="text-sm font-medium text-gray-500">Position & Behavior</h3>
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
                    <h3 className="text-sm font-medium text-gray-500">Advanced Settings</h3>
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

            <Separator />

            <div>
              <h2 className="text-lg font-medium mb-2">Installation</h2>
              <p className="text-sm text-gray-500 mb-4">Add this code to your website to display the QR code.</p>

              <Tabs defaultValue="script">
                <TabsList className="mb-4">
                  <TabsTrigger value="script">Script Tag</TabsTrigger>
                  <TabsTrigger value="wordpress">WordPress</TabsTrigger>
                  <TabsTrigger value="shopify">Shopify</TabsTrigger>
                </TabsList>

                <TabsContent value="script">
                  <div className="relative">
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-md font-mono text-sm overflow-x-auto">
                      <pre>{`<script src="https://cdn.viralqrcode.com/v1/qr-code.js" 
  data-qr-id="my-website-qr-code"
  data-api-key="YOUR_API_KEY">
</script>`}</pre>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2 h-8 w-8 p-0"
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
                    <div className="bg-gray-100 p-4 rounded-md">
                      <h3 className="font-medium mb-2">Option 1: Use our WordPress Plugin</h3>
                      <p className="text-sm text-gray-600 mb-2">Install our WordPress plugin for easy integration.</p>
                      <Button>Download WordPress Plugin</Button>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-md">
                      <h3 className="font-medium mb-2">Option 2: Add code manually</h3>
                      <p className="text-sm text-gray-600 mb-2">Add this code to your theme's footer.php file:</p>
                      <div className="relative mt-2">
                        <div className="bg-gray-900 text-gray-100 p-4 rounded-md font-mono text-sm overflow-x-auto">
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
                          className="absolute top-2 right-2 h-8 w-8 p-0"
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
                      <div className="bg-gray-900 text-gray-100 p-4 rounded-md font-mono text-sm overflow-x-auto">
                        <pre>{`<script src="https://cdn.viralqrcode.com/v1/qr-code.js" 
  data-qr-id="my-website-qr-code"
  data-api-key="YOUR_API_KEY">
</script>`}</pre>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2 h-8 w-8 p-0"
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

        <div className="flex justify-between mt-6">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Rocket className="mr-2 h-4 w-4" />
            Deploy QR Code
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

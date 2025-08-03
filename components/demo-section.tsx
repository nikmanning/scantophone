"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FloatingQRCode } from "@/components/floating-qr-code"

export function DemoSection() {
  const [position, setPosition] = useState("bottom-right")
  const [buttonColor, setButtonColor] = useState("#3b82f6")
  const [buttonShape, setButtonShape] = useState("rounded")
  const [animation, setAnimation] = useState("fade")

  return (
    <section id="demo" className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">See It In Action</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Customize your floating QR code and see how it would look on your website.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Customize Your QR Code</h3>
                <Tabs defaultValue="position" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="position">Position</TabsTrigger>
                    <TabsTrigger value="color">Color</TabsTrigger>
                    <TabsTrigger value="shape">Shape</TabsTrigger>
                    <TabsTrigger value="animation">Animation</TabsTrigger>
                  </TabsList>
                  <TabsContent value="position" className="space-y-4 pt-4">
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setPosition("top-left")}
                        className={`p-2 border rounded-md ${
                          position === "top-left" ? "bg-primary text-primary-foreground" : ""
                        }`}
                      >
                        Top Left
                      </button>
                      <button
                        onClick={() => setPosition("top-right")}
                        className={`p-2 border rounded-md ${
                          position === "top-right" ? "bg-primary text-primary-foreground" : ""
                        }`}
                      >
                        Top Right
                      </button>
                      <button
                        onClick={() => setPosition("left")}
                        className={`p-2 border rounded-md ${
                          position === "left" ? "bg-primary text-primary-foreground" : ""
                        }`}
                      >
                        Left
                      </button>
                      <button
                        onClick={() => setPosition("right")}
                        className={`p-2 border rounded-md ${
                          position === "right" ? "bg-primary text-primary-foreground" : ""
                        }`}
                      >
                        Right
                      </button>
                      <button
                        onClick={() => setPosition("bottom-left")}
                        className={`p-2 border rounded-md ${
                          position === "bottom-left" ? "bg-primary text-primary-foreground" : ""
                        }`}
                      >
                        Bottom Left
                      </button>
                      <button
                        onClick={() => setPosition("bottom-right")}
                        className={`p-2 border rounded-md ${
                          position === "bottom-right" ? "bg-primary text-primary-foreground" : ""
                        }`}
                      >
                        Bottom Right
                      </button>
                    </div>
                  </TabsContent>
                  <TabsContent value="color" className="space-y-4 pt-4">
                    <div className="grid grid-cols-4 gap-2">
                      <button
                        onClick={() => setButtonColor("#3b82f6")}
                        className="w-10 h-10 rounded-full bg-blue-500 border-2 border-white shadow-sm"
                        style={{ outline: buttonColor === "#3b82f6" ? "2px solid black" : "none" }}
                      />
                      <button
                        onClick={() => setButtonColor("#10b981")}
                        className="w-10 h-10 rounded-full bg-emerald-500 border-2 border-white shadow-sm"
                        style={{ outline: buttonColor === "#10b981" ? "2px solid black" : "none" }}
                      />
                      <button
                        onClick={() => setButtonColor("#f97316")}
                        className="w-10 h-10 rounded-full bg-orange-500 border-2 border-white shadow-sm"
                        style={{ outline: buttonColor === "#f97316" ? "2px solid black" : "none" }}
                      />
                      <button
                        onClick={() => setButtonColor("#8b5cf6")}
                        className="w-10 h-10 rounded-full bg-violet-500 border-2 border-white shadow-sm"
                        style={{ outline: buttonColor === "#8b5cf6" ? "2px solid black" : "none" }}
                      />
                      <button
                        onClick={() => setButtonColor("#ef4444")}
                        className="w-10 h-10 rounded-full bg-red-500 border-2 border-white shadow-sm"
                        style={{ outline: buttonColor === "#ef4444" ? "2px solid black" : "none" }}
                      />
                      <button
                        onClick={() => setButtonColor("#f59e0b")}
                        className="w-10 h-10 rounded-full bg-amber-500 border-2 border-white shadow-sm"
                        style={{ outline: buttonColor === "#f59e0b" ? "2px solid black" : "none" }}
                      />
                      <button
                        onClick={() => setButtonColor("#6366f1")}
                        className="w-10 h-10 rounded-full bg-indigo-500 border-2 border-white shadow-sm"
                        style={{ outline: buttonColor === "#6366f1" ? "2px solid black" : "none" }}
                      />
                      <button
                        onClick={() => setButtonColor("#000000")}
                        className="w-10 h-10 rounded-full bg-black border-2 border-white shadow-sm"
                        style={{ outline: buttonColor === "#000000" ? "2px solid black" : "none" }}
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="shape" className="space-y-4 pt-4">
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setButtonShape("rounded")}
                        className={`p-2 border rounded-md ${
                          buttonShape === "rounded" ? "bg-primary text-primary-foreground" : ""
                        }`}
                      >
                        Rounded
                      </button>
                      <button
                        onClick={() => setButtonShape("square")}
                        className={`p-2 border rounded-md ${
                          buttonShape === "square" ? "bg-primary text-primary-foreground" : ""
                        }`}
                      >
                        Square
                      </button>
                      <button
                        onClick={() => setButtonShape("circle")}
                        className={`p-2 border rounded-md ${
                          buttonShape === "circle" ? "bg-primary text-primary-foreground" : ""
                        }`}
                      >
                        Circle
                      </button>
                    </div>
                  </TabsContent>
                  <TabsContent value="animation" className="space-y-4 pt-4">
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setAnimation("fade")}
                        className={`p-2 border rounded-md ${
                          animation === "fade" ? "bg-primary text-primary-foreground" : ""
                        }`}
                      >
                        Fade
                      </button>
                      <button
                        onClick={() => setAnimation("slide")}
                        className={`p-2 border rounded-md ${
                          animation === "slide" ? "bg-primary text-primary-foreground" : ""
                        }`}
                      >
                        Slide
                      </button>
                      <button
                        onClick={() => setAnimation("bounce")}
                        className={`p-2 border rounded-md ${
                          animation === "bounce" ? "bg-primary text-primary-foreground" : ""
                        }`}
                      >
                        Bounce
                      </button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
          <Card className="relative overflow-hidden">
            <CardContent className="p-0">
              <div className="relative h-[500px] w-full bg-white overflow-hidden">
                <div className="absolute inset-0 p-6">
                  <div className="flex flex-col h-full">
                    <div className="h-8 w-full bg-gray-100 rounded-md mb-4"></div>
                    <div className="flex-1 bg-gray-50 rounded-md p-4">
                      <div className="h-8 w-3/4 bg-gray-100 rounded-md mb-4"></div>
                      <div className="h-4 w-full bg-gray-100 rounded-md mb-2"></div>
                      <div className="h-4 w-full bg-gray-100 rounded-md mb-2"></div>
                      <div className="h-4 w-2/3 bg-gray-100 rounded-md mb-4"></div>
                      <div className="h-32 w-full bg-gray-100 rounded-md mb-4"></div>
                      <div className="h-4 w-full bg-gray-100 rounded-md mb-2"></div>
                      <div className="h-4 w-full bg-gray-100 rounded-md mb-2"></div>
                      <div className="h-4 w-3/4 bg-gray-100 rounded-md"></div>
                    </div>
                  </div>
                </div>
                <FloatingQRCode
                  url="https://example.com"
                  position={position}
                  buttonColor={buttonColor}
                  buttonShape={buttonShape}
                  animation={animation}
                  displayText="Scan to visit our website"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

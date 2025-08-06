"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { QrCode, Palette, Move, Sliders, FileCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import LivePreview from "@/components/live-preview"

// Import all the content components
import BasicSettingsContent from "@/components/qr-content/basic-settings-content"
import AppearanceContent from "@/components/qr-content/appearance-content"
import PositionBehaviorContent from "@/components/qr-content/position-behavior-content"
import AdvancedSettingsContent from "@/components/qr-content/advanced-settings-content"
import ReviewContent from "@/components/qr-content/review-content"

// Default logo path
const DEFAULT_LOGO = "/images/g4.png"
// Logo URL for QR Monkey API
const QR_MONKEY_LOGO_URL =
  "https://isvpyeyfwgpqtnlpykqu.supabase.co/storage/v1/object/public/qr-logos/1746640077052-g4.png"

export default function QRCodeCreationFlow() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const qrCodeId = searchParams.get("id")
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true) // Start with loading true
  const [isSaving, setIsSaving] = useState(false)
  const [currentPageUrl, setCurrentPageUrl] = useState("")
  const supabase = createClient()

  // Determine active step from URL
  const getActiveStepFromUrl = () => {
    if (typeof window === "undefined") return "basic"
    const path = window.location.pathname
    if (path.includes("/create/appearance")) return "appearance"
    if (path.includes("/create/position-behavior")) return "position"
    if (path.includes("/create/advanced-settings")) return "advanced"
    if (path.includes("/create/review")) return "review"
    return "basic"
  }

  const [activeStep, setActiveStep] = useState(getActiveStepFromUrl())

  // State for all QR code settings
  const [qrCodeState, setQrCodeState] = useState({
    // Basic settings
    qrCodeName: "",
    displayText: "Send To Phone",
    showOnDesktop: true,
    showOnMobile: false,
    customUrl: "example.com",
    urlType: "current",

    // Appearance settings
    qrCodeColor: "#000000",
    backgroundColor: "#ffffff",
    buttonColor: "#e4ff54",
    qrSize: 150,
    buttonShape: "rounded",
    showButton: true,
    buttonIcon: "none",
    logoUrl: DEFAULT_LOGO as string,

    // Position & behavior
    position: "bottom-right",
    margin: 20,
    marginX: 20,
    marginY: 20,
    startCollapsed: false,
    autoShowOnScroll: false,
    animation: "fade",

    // Advanced settings
    autoOpen: false,
    delay: "0",
    frequency: "once",
    
    // Stats
    scanCount: 0,
  })

  // Update state function
  const updateState = (newState: Partial<typeof qrCodeState>) => {
    setQrCodeState((prev) => ({ ...prev, ...newState }))
  }

  // Update active step when URL changes
  useEffect(() => {
    const handleUrlChange = () => {
      setActiveStep(getActiveStepFromUrl())
    }

    window.addEventListener("popstate", handleUrlChange)
    return () => window.removeEventListener("popstate", handleUrlChange)
  }, [])

  // Fetch user and QR code data
  useEffect(() => {
    async function fetchData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUser(user);

      // If in edit mode, fetch the QR code data
      if (qrCodeId) {
        console.log(`[Create] Fetching QR code data for ID: ${qrCodeId} with user ID: ${user.id}`)
        const { data, error } = await supabase
          .from("qr_codes")
          .select("*")
          .eq("id", qrCodeId)
          .eq("user_id", user.id)
          .single()

        if (error) {
          console.error("[Create] Error fetching QR code:", error)
          toast({ title: "Error", description: "Failed to load QR code data.", variant: "destructive" })
          router.push('/my-qr-codes');
        } else if (data) {
          console.log("[Create] QR code data loaded successfully:", data)
          setQrCodeState({
            qrCodeName: data.name || "",
            displayText: data.display_text || "Send To Phone",
            showOnDesktop: data.show_on_desktop !== false,
            showOnMobile: data.show_on_mobile === true,
            urlType: data.url_type || "current",
            customUrl: data.url_type === "custom" ? data.custom_url : "Current Page",
            qrCodeColor: data.qr_code_color || "#000000",
            backgroundColor: data.background_color || "#ffffff",
            buttonColor: data.button_color || "#e4ff54",
            qrSize: data.size || 150,
            buttonShape: data.button_shape || "rounded",
            showButton: data.show_button !== false,
            buttonIcon: data.button_icon || "qr-code",
            logoUrl: data.logo_url || DEFAULT_LOGO,
            position: data.position || "bottom-right",
            margin: data.margin || 20,
            marginX: data.margin_x || 20,
            marginY: data.margin_y || 20,
            startCollapsed: data.start_collapsed || false,
            autoShowOnScroll: data.auto_show_on_scroll || false,
            animation: data.animation || "fade",
            autoOpen: false,
            delay: "0",
            frequency: "once",
            scanCount: data.scans || 0,
          })
        }
      }
      setIsLoading(false)
    }

    fetchData()
  }, [qrCodeId, supabase, router])

  useEffect(() => {
    // Set the current page URL only on the client side after mount
    setCurrentPageUrl(window.location.href)
  }, [])

  // Generate a data URL for a QR code using the qr-code-styling library
  const generateQRCodeDataURL = async (url: string, qrCodeColor: string, backgroundColor: string, logoUrl?: string, size = 300): Promise<string> => {
    try {
      console.log('[CreateQR] Starting QR code generation with:', {
        url,
        qrCodeColor,
        backgroundColor,
        logoUrl: logoUrl ? 'provided' : 'not provided',
        size
      });
      
      // Ensure URL is properly formatted
      const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
      console.log('[CreateQR] Formatted URL:', formattedUrl);
      
      // Create a temporary div to render the QR code
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      document.body.appendChild(tempDiv);
      
      // Use the same styling as in the display component
      const QRCodeStyling = (await import('qr-code-styling')).default;
      console.log('[CreateQR] QR code library loaded');
      
      // Make sure we have a valid logo URL or set to undefined
      const finalLogoUrl = logoUrl && logoUrl.trim() !== '' ? logoUrl : '/images/g4.png';
      console.log('[CreateQR] Using logo:', finalLogoUrl);
      
      const qrCode = new QRCodeStyling({
        width: size,
        height: size,
        type: 'svg',
        data: formattedUrl,
        image: finalLogoUrl,
        dotsOptions: {
          color: qrCodeColor,
          type: 'dots' // Match the widget implementation exactly
        },
        backgroundOptions: {
          color: backgroundColor
        },
        imageOptions: {
          crossOrigin: 'anonymous',
          margin: 4,
          imageSize: 0.2,
          hideBackgroundDots: true
        },
        cornersSquareOptions: {
          color: qrCodeColor,
          type: 'extra-rounded'
        },
        qrOptions: {
          typeNumber: 0,
          mode: 'Byte',
          errorCorrectionLevel: 'Q'
        },
        cornersDotOptions: {
          color: qrCodeColor,
          type: 'dot'
        }
      });
      
      // Generate the QR code as a data URL directly
      return new Promise((resolve, reject) => {
        console.log('[CreateQR] Generating QR code data URL...');
        
        try {
          qrCode.append(tempDiv);
          console.log('[CreateQR] QR code appended to DOM');
          
          // Wait a moment to ensure rendering is complete
          setTimeout(() => {
            try {
              // Get the SVG element
              const svg = tempDiv.querySelector('svg');
              if (!svg) {
                console.error('[CreateQR] Failed to find SVG element in container');
                throw new Error('Failed to generate QR code - no SVG found');
              }
              
              // Convert SVG to data URL
              const svgData = new XMLSerializer().serializeToString(svg);
              console.log('[CreateQR] SVG serialized, length:', svgData.length);
              
              // Fix XML declaration if present (can cause issues with some browsers)
              const cleanSvgData = svgData.replace(/^<\?xml[^>]+>/, '');
              
              // Use a more reliable way to encode SVG
              const dataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(cleanSvgData);
              console.log('[CreateQR] Data URL generated successfully, starts with:', dataUrl.substring(0, 50) + '...');
              
              // Clean up
              document.body.removeChild(tempDiv);
              
              resolve(dataUrl);
            } catch (innerError) {
              console.error('[CreateQR] Error in SVG processing:', innerError);
              document.body.removeChild(tempDiv);
              reject(innerError);
            }
          }, 100);
        } catch (appendError) {
          console.error('[CreateQR] Error appending QR code:', appendError);
          document.body.removeChild(tempDiv);
          reject(appendError);
        }
      });
    } catch (error) {
      console.error('[CreateQR] Error generating QR code:', error);
      // Return a transparent pixel as fallback
      return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
    }
  }

  // Save QR code data to Supabase
  const handleSaveChanges = async () => {
    if (!user) {
      toast({ title: "Authentication Error", description: "You must be logged in to save.", variant: "destructive" });
      return;
    }

    if (!qrCodeState.qrCodeName.trim()) {
      toast({ title: "Name required", description: "Please provide a name for your QR code.", variant: "destructive" })
      return
    }

    try {
      setIsSaving(true)
      const url = qrCodeState.urlType === "custom" ? qrCodeState.customUrl : "example.com"
      const qrImageUrl = await generateQRCodeDataURL(
        url,
        qrCodeState.qrCodeColor,
        qrCodeState.backgroundColor,
        qrCodeState.logoUrl,
        qrCodeState.qrSize
      )

      const qrCodeData = {
        name: qrCodeState.qrCodeName.trim(),
        custom_url: qrCodeState.urlType === "custom" ? qrCodeState.customUrl : "Current Page",
        url_type: qrCodeState.urlType,
        display_text: qrCodeState.displayText,
        show_on_desktop: qrCodeState.showOnDesktop,
        show_on_mobile: qrCodeState.showOnMobile,
        qr_code_color: qrCodeState.qrCodeColor,
        background_color: qrCodeState.backgroundColor,
        button_color: qrCodeState.buttonColor,
        size: qrCodeState.qrSize,
        button_shape: qrCodeState.buttonShape,
        show_button: qrCodeState.showButton,
        button_icon: qrCodeState.buttonIcon,
        position: qrCodeState.position,
        margin: qrCodeState.margin,
        margin_x: qrCodeState.marginX,
        margin_y: qrCodeState.marginY,
        animation: qrCodeState.animation,
        start_collapsed: qrCodeState.startCollapsed,
        auto_show_on_scroll: qrCodeState.autoShowOnScroll,
        user_id: user.id,
        qr_image_url: qrImageUrl,
        logo_url: qrCodeState.logoUrl,
      }

      console.log("[Create] QR code data to save:", qrCodeData)
      let result

      if (qrCodeId) {
        console.log(`[Create] Updating QR code with ID: ${qrCodeId}`)
        result = await supabase
          .from("qr_codes")
          .update(qrCodeData)
          .eq("id", qrCodeId)
          .eq("user_id", user.id)
          .select()
      } else {
        console.log("[Create] Creating new QR code")
        result = await supabase
          .from("qr_codes")
          .insert([{ ...qrCodeData, created_at: new Date().toISOString(), active: true, scans: 0 }])
          .select()
      }

      if (result.error) {
        console.error("[Create] Error saving QR code:", result.error)
        throw result.error
      }

      console.log("[Create] QR code saved successfully:", result.data)
      toast({
        title: qrCodeId ? "Changes saved" : "QR code created",
        description: qrCodeId ? "Your QR code has been updated successfully." : "Your new QR code has been created successfully.",
      })
      router.push("/my-qr-codes")
    } catch (error) {
      console.error("[Create] Error saving QR code:", error)
      toast({ title: "Error saving QR code", description: "Failed to save QR code. Please try again.", variant: "destructive" })
    } finally {
      setIsSaving(false)
    }
  }

  // Handle navigation between steps
  const handleStepChange = (step: string) => {
    setActiveStep(step)

    // Update URL to maintain visual navigation
    const params = new URLSearchParams(searchParams.toString())
    let path = "/create"

    if (step === "appearance") {
      path = "/create/appearance"
    } else if (step === "position") {
      path = "/create/position-behavior"
    } else if (step === "advanced") {
      path = "/create/advanced-settings"
    } else if (step === "review") {
      path = "/create/review"
    }

    // Use history.pushState to update URL without navigation (only on client)
    if (typeof window !== "undefined") {
      window.history.pushState({}, "", `${path}?${params.toString()}`)
    }
  }

  // Handle next step
  const handleNext = () => {
    if (activeStep === "basic") handleStepChange("appearance")
    else if (activeStep === "appearance") handleStepChange("position")
    else if (activeStep === "position") handleStepChange("advanced")
    else if (activeStep === "advanced") handleStepChange("review")
  }

  // Handle previous step
  const handlePrevious = () => {
    if (activeStep === "appearance") handleStepChange("basic")
    else if (activeStep === "position") handleStepChange("appearance")
    else if (activeStep === "advanced") handleStepChange("position")
    else if (activeStep === "review") handleStepChange("advanced")
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="relative z-10 bg-[#e9ede7]">
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-black mb-4" />
            <p className="text-lg font-medium">Loading QR code data...</p>
          </div>
        </div>
      </div>
    )
  }

  // Get title based on active step
  const getTitle = () => {
    switch (activeStep) {
      case "appearance":
        return "Appearance"
      case "position":
        return "Position & Behavior"
      case "advanced":
        return "Advanced Settings"
      case "review":
        return "Review & Deploy"
      default:
        return qrCodeId ? "Edit QR Code" : "Basic Settings"
    }
  }

  // Get formatted position for display
  const getFormattedPosition = () => {
    if (!qrCodeState.position) return "Bottom Right"
    return qrCodeState.position
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const steps = [
    { id: "basic", icon: QrCode },
    { id: "appearance", icon: Palette },
    { id: "position", icon: Move },
    { id: "advanced", icon: Sliders },
    { id: "review", icon: FileCheck },
  ]

  const renderContent = () => {
    switch (activeStep) {
      case "appearance":
        return (
          <AppearanceContent
            state={qrCodeState}
            updateState={updateState}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onSave={handleSaveChanges}
            isSaving={isSaving}
          />
        )
      case "position":
        return (
          <PositionBehaviorContent
            state={qrCodeState}
            updateState={updateState}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onSave={handleSaveChanges}
            isSaving={isSaving}
          />
        )
      case "advanced":
        return (
          <AdvancedSettingsContent
            state={qrCodeState}
            updateState={updateState}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onSave={handleSaveChanges}
            isSaving={isSaving}
          />
        )
      case "review":
        return (
          <ReviewContent
            state={qrCodeState}
            getFormattedPosition={getFormattedPosition}
            onPrevious={handlePrevious}
            onSave={handleSaveChanges}
            isSaving={isSaving}
            qrCodeId={qrCodeId || undefined}
          />
        )
      default:
        return (
          <BasicSettingsContent
            state={qrCodeState}
            updateState={updateState}
            onNext={handleNext}
            onSave={handleSaveChanges}
            isSaving={isSaving}
          />
        )
    }
  }

  return (
    <div className="relative z-10 bg-[#e9ede7]">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Sidebar for navigation */}
        <div className="w-full lg:w-72 bg-white border-r border-gray-200 p-6 space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-6">{getTitle()}</h2>
            <div className="space-y-2">
              {steps.map((step) => (
                <Button
                  key={step.id}
                  variant={activeStep === step.id ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => handleStepChange(step.id)}
                >
                  <step.icon className="mr-2 h-5 w-5" />
                  {step.id.charAt(0).toUpperCase() + step.id.slice(1)}
                </Button>
              ))}
            </div>
          </div>
          <Button onClick={handleSaveChanges} disabled={isSaving} className="w-full">
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {qrCodeId ? "Save Changes" : "Create QR Code"}
          </Button>
        </div>

        {/* Main content area */}
        <div className="flex-1 p-8 overflow-y-auto">
          {renderContent()}
        </div>

        {/* Live Preview Sidebar */}
        <div className="w-full lg:w-96 bg-white p-8 border-l border-gray-200">
          <LivePreview
            url={qrCodeState.urlType === "custom" ? qrCodeState.customUrl : currentPageUrl}
            qrCodeColor={qrCodeState.qrCodeColor}
            backgroundColor={qrCodeState.backgroundColor}
            logoUrl={qrCodeState.logoUrl}
            qrName={qrCodeState.qrCodeName}
            scanCount={qrCodeState.scanCount || 0}
          />
        </div>
      </div>
    </div>
  )
}

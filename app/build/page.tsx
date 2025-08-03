"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { getBrowserClient } from "@/lib/supabase"
import { useAuth } from "@/hooks/use-auth"
import { toast } from "@/components/ui/use-toast"
import { QrCode, Settings, Palette, Move, Sliders, FileCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import LivePreview from "@/components/live-preview"
import BasicSettingsContent from "@/components/qr-content/basic-settings-content"
import AppearanceContent from "@/components/qr-content/appearance-content"
import PositionBehaviorContent from "@/components/qr-content/position-behavior-content"
import AdvancedSettingsContent from "@/components/qr-content/advanced-settings-content"
import ReviewContent from "@/components/qr-content/review-content"

const DEFAULT_LOGO = "/images/g4.png"

const stepList = [
  { id: "basic", label: "Basic Settings", icon: <Settings className="h-5 w-5" /> },
  { id: "appearance", label: "Appearance", icon: <Palette className="h-5 w-5" /> },
  { id: "position", label: "Position & Behavior", icon: <Move className="h-5 w-5" /> },
  { id: "advanced", label: "Advanced Settings", icon: <Sliders className="h-5 w-5" /> },
  { id: "review", label: "Review & Deploy", icon: <FileCheck className="h-5 w-5" /> },
]

export default function QRBuildAllInOne() {
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
    logoUrl: DEFAULT_LOGO as string | undefined,
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
  })
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()
  const { user: authUser } = useAuth()
  const supabase = getBrowserClient()

  // Section refs for scroll/jump
  const sectionRefs = {
    basic: useRef<HTMLDivElement>(null),
    appearance: useRef<HTMLDivElement>(null),
    position: useRef<HTMLDivElement>(null),
    advanced: useRef<HTMLDivElement>(null),
    review: useRef<HTMLDivElement>(null),
  }

  const scrollToSection = (id: keyof typeof sectionRefs) => {
    sectionRefs[id].current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const updateState = (newState: Partial<typeof qrCodeState>) => {
    setQrCodeState((prev) => ({ ...prev, ...newState }))
  }

  // Generate a direct URL from QR Monkey API
  const generateQrMonkeyUrl = (url: string, qrCodeColor: string, backgroundColor: string) => {
    const QR_MONKEY_LOGO_URL = "https://isvpyeyfwgpqtnlpykqu.supabase.co/storage/v1/object/public/qr-logos/1746640077052-g4.png"
    try {
      const formattedUrl = url.startsWith("http") ? url : `https://${url}`
      const encodedUrl = encodeURIComponent(formattedUrl)

      const bodyColor = qrCodeColor.replace("#", "").toLowerCase()
      const bgColor = backgroundColor.replace("#", "").toLowerCase()

      return `https://api.qrcode-monkey.com/qr/custom?data=${encodedUrl}&size=300&body=square&eye=frame0&eyeBall=ball0&bodyColor=${bodyColor}&bgColor=${bgColor}&eye1Color=${bodyColor}&eye2Color=${bodyColor}&eye3Color=${bodyColor}&eyeBall1Color=${bodyColor}&eyeBall2Color=${bodyColor}&eyeBall3Color=${bodyColor}&logo=${encodeURIComponent(QR_MONKEY_LOGO_URL)}&logoMode=clean`
    } catch (error) {
      console.error("Error generating QR Monkey URL:", error)
      return `https://api.qrcode-monkey.com/qr/custom?data=${encodeURIComponent("https://example.com")}&size=300`
    }
  }

  // Save QR code data to Supabase
  const handleSaveChanges = async () => {
    if (!authUser) {
      toast({ title: "Authentication Error", description: "Please sign in to save your QR code.", variant: "destructive" })
      router.push("/login")
      return
    }

    if (!qrCodeState.qrCodeName.trim()) {
      toast({ title: "Name required", description: "Please provide a name for your QR code.", variant: "destructive" })
      return
    }

    try {
      setIsSaving(true)
      const url = qrCodeState.urlType === "custom" ? qrCodeState.customUrl : "example.com"
      const qrImageUrl = generateQrMonkeyUrl(url, qrCodeState.qrCodeColor, qrCodeState.backgroundColor)

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
        position: qrCodeState.position,
        margin: qrCodeState.margin,
        margin_x: qrCodeState.marginX,
        margin_y: qrCodeState.marginY,
        animation: qrCodeState.animation,
        start_collapsed: qrCodeState.startCollapsed,
        auto_show_on_scroll: qrCodeState.autoShowOnScroll,
        user_id: authUser.id,
        qr_image_url: qrImageUrl,
        created_at: new Date().toISOString(),
        active: true,
        scans: 0,
      };

      if (qrCodeState.logoUrl && qrCodeState.logoUrl !== DEFAULT_LOGO) {
        (qrCodeData as { [key: string]: any })["logo_url"] = qrCodeState.logoUrl
      }

      const { error } = await supabase.from("qr_codes").insert([qrCodeData])

      if (error) {
        throw error
      }

      toast({ title: "QR code created", description: "Your new QR code has been created successfully." })
      router.push("/my-qr-codes")
    } catch (error) {
      let errorMsg = "Failed to save QR code. Please try again."
      if (error instanceof Error) {
        errorMsg = error.message
      }
      toast({ title: "Error saving QR code", description: errorMsg, variant: "destructive" })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#e9ede7] relative overflow-x-hidden">
      {/* Sidebar Navigation */}
      <aside className="flex flex-col w-full lg:w-72 p-4 lg:p-8 bg-[#e4ff54] lg:rounded-r-3xl shadow-xl lg:sticky top-0 z-40 lg:h-screen">
        <div className="flex items-center mb-10">
          <QrCode className="h-7 w-7 mr-3" />
          <h1 className="text-2xl font-bold">Viral QR Code</h1>
        </div>
        <div className="flex flex-row lg:flex-col lg:space-y-2 space-x-2 lg:space-x-0 overflow-x-auto py-2">
          <h2 className="text-xl font-bold mb-6 hidden lg:block">All Steps</h2>
          {stepList.map((step) => (
            <button
              key={step.id}
              onClick={() => scrollToSection(step.id as keyof typeof sectionRefs)}
              className="flex items-center py-2 px-4 rounded-full text-sm font-medium w-auto lg:w-full text-left hover:bg-black hover:text-white transition-colors flex-shrink-0"
            >
              <span className="mr-3">{step.icon}</span>
              <span>{step.label}</span>
            </button>
          ))}
        </div>
      </aside>
      {/* Main Content + Preview */}
      <main className="flex-1 flex flex-col lg:flex-row items-stretch">
        {/* Main Steps Content */}
        <div className="flex-1 w-full max-w-4xl mx-auto p-4 sm:p-8 space-y-16">
          {/* Basic Settings */}
          <section ref={sectionRefs.basic} id="basic">
            <h1 className="text-3xl font-bold mb-6">Basic Settings</h1>
            <BasicSettingsContent
              state={qrCodeState}
              updateState={updateState}
              onNext={() => scrollToSection("appearance")}
              onSave={handleSaveChanges}
              isSaving={isSaving}
            />
          </section>
          {/* Appearance */}
          <section ref={sectionRefs.appearance} id="appearance">
            <h1 className="text-3xl font-bold mb-6">Appearance</h1>
            <AppearanceContent
              state={qrCodeState}
              updateState={updateState}
              onNext={() => scrollToSection("position")}
              onPrevious={() => scrollToSection("basic")}
              onSave={handleSaveChanges}
              isSaving={isSaving}
            />
          </section>
          {/* Position & Behavior */}
          <section ref={sectionRefs.position} id="position">
            <h1 className="text-3xl font-bold mb-6">Position & Behavior</h1>
            <PositionBehaviorContent
              state={qrCodeState}
              updateState={updateState}
              onNext={() => scrollToSection("advanced")}
              onPrevious={() => scrollToSection("appearance")}
              onSave={handleSaveChanges}
              isSaving={isSaving}
            />
          </section>
          {/* Advanced Settings */}
          <section ref={sectionRefs.advanced} id="advanced">
            <h1 className="text-3xl font-bold mb-6">Advanced Settings</h1>
            <AdvancedSettingsContent
              state={qrCodeState}
              updateState={updateState}
              onNext={() => scrollToSection("review")}
              onPrevious={() => scrollToSection("position")}
              onSave={handleSaveChanges}
              isSaving={isSaving}
            />
          </section>
          {/* Review & Deploy */}
          <section ref={sectionRefs.review} id="review">
            <h1 className="text-3xl font-bold mb-6">Review & Deploy</h1>
            <ReviewContent
              state={qrCodeState}
              updateState={updateState}
              onPrevious={() => scrollToSection("advanced")}
              onSave={handleSaveChanges}
              isSaving={isSaving}
            />
          </section>
        </div>
        {/* Preview Panel */}
        <div className="flex flex-col w-full lg:w-96 lg:max-w-xs lg:sticky top-8 self-start z-30 mt-8 lg:ml-8 shadow-lg bg-white rounded-2xl h-fit">
          <LivePreview
            url={qrCodeState.customUrl}
            displayText={qrCodeState.displayText || "Scan With Your Phone"}
            qrCodeColor={qrCodeState.qrCodeColor}
            backgroundColor={qrCodeState.backgroundColor}
            position={qrCodeState.position}
            additionalInfo={{
              Devices:
                qrCodeState.showOnMobile && qrCodeState.showOnDesktop
                  ? "Mobile & Desktop"
                  : qrCodeState.showOnMobile
                  ? "Mobile Only"
                  : qrCodeState.showOnDesktop
                  ? "Desktop Only"
                  : "None",
            }}
            startCollapsed={qrCodeState.startCollapsed}
            autoShowOnScroll={qrCodeState.autoShowOnScroll}
            animation={qrCodeState.animation}
            logoUrl={qrCodeState.logoUrl}
          />
        </div>
      </main>
    </div>
  )
}

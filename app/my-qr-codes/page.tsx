"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QrCode, Plus, Search, LayoutGrid, List, Loader2 } from "lucide-react"
import Link from "next/link"
import QRCodeDisplay from "@/components/qr-code-display"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

import { AppHeader } from "@/components/app-header"
import { createClient } from "@/utils/supabase/client"
import { generateQRCodeDataURL } from "@/lib/qr-code-styling"

// Default logo path
const DEFAULT_LOGO = "/images/g4.png"

// Define the type for a QR code object
interface QRCode {
  id: string
  name: string
  url: string
  type: string
  createdAt: string
  scans: number
  active: boolean
  color: string
  backgroundColor: string
  logoUrl?: string
  qrImageUrl?: string
  position?: string
  button_shape?: string
  display_text?: string
  button_icon?: string
  // Add any other properties that might exist on your QR code objects
}

export default function MyQRCodes() {
  const { toast } = useToast()
  const router = useRouter()
  const supabase = createClient()

  const [user, setUser] = useState<any>(null)

  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [qrCodes, setQrCodes] = useState<QRCode[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const [downloadingId, setDownloadingId] = useState<string | null>(null)
  const [refreshingId, setRefreshingId] = useState<string | null>(null)

  // Fetch user and QR codes from Supabase
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (!user) {
        setIsLoading(false)
        // Redirect to login if no user is found.
        router.push('/login');
        return;
      }

      try {
        console.log("[My QR Codes] Fetching QR codes for user:", user.email)

        const { data, error } = await supabase
          .from("qr_codes")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })

        if (error) {
          console.error("[My QR Codes] Error fetching QR codes:", error)
          throw error // Let the catch block handle this
        }

        console.log("[My QR Codes] Fetched QR codes:", data?.length || 0)

        const formattedData = data.map((qrCode) => ({
          id: qrCode.id,
          name: qrCode.name || "Unnamed QR Code",
          type: qrCode.url_type || "Dynamic",
          url: qrCode.custom_url || "https://example.com",
          createdAt: new Date(qrCode.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          scans: qrCode.scans || 0,
          active: qrCode.active !== false,
          color: qrCode.qr_code_color || "#000000",
          backgroundColor: qrCode.background_color || "#ffffff",
          logoUrl: qrCode.logo_url || DEFAULT_LOGO,
          qrImageUrl: qrCode.qr_image_url || null,
          position: qrCode.position,
          button_shape: qrCode.button_shape,
          display_text: qrCode.display_text,
        }))

        setQrCodes(formattedData)
      } catch (error) {
        console.error("[My QR Codes] General error in fetchData:", error)
        toast({
          title: "Error loading QR codes",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [supabase, toast, router])

  // Toggle QR code active status
  const toggleQrCodeStatus = async (id: string) => {
    try {
      // Find the QR code to toggle
      const qrCode = qrCodes.find((qr) => qr.id === id)
      if (!qrCode) return

      // Update the QR code in Supabase
      const { error } = await supabase.from("qr_codes").update({ active: !qrCode.active }).eq("id", id)

      if (error) throw error

      // Update local state
      setQrCodes(qrCodes.map((qrCode) => (qrCode.id === id ? { ...qrCode, active: !qrCode.active } : qrCode)))

      toast({
        title: `QR Code ${!qrCode.active ? "activated" : "deactivated"}`,
        description: `The QR code has been ${!qrCode.active ? "activated" : "deactivated"} successfully.`,
      })
    } catch (error) {
      console.error("Error toggling QR code status:", error)
      toast({
        title: "Error updating QR code",
        description: "Failed to update QR code status. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Delete a QR code
  const deleteQrCode = async (id: string) => {
    try {
      // Delete the QR code from Supabase
      const { error } = await supabase.from("qr_codes").delete().eq("id", id)

      if (error) throw error

      // Update local state
      setQrCodes(qrCodes.filter((qrCode) => qrCode.id !== id))

      toast({
        title: "QR Code deleted",
        description: "The QR code has been deleted successfully.",
      })
    } catch (error) {
      console.error("Error deleting QR code:", error)
      toast({
        title: "Error deleting QR code",
        description: "Failed to delete QR code. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handle edit click
  const handleEditClick = (qrCode: QRCode) => {
    router.push(`/create?id=${qrCode.id}`)
  }

  // Refresh QR code using the qr-code-styling library
  const refreshQrCode = async (qrCode: QRCode) => {
    try {
      setRefreshingId(qrCode.id)

      // For 'current' URL type, we don't need to generate a static image
      // as it will be generated client-side with the current URL
      if (qrCode.type === 'current') {
        toast({
          title: "QR code updated",
          description: "This QR code will always show the current page URL",
        });
        setRefreshingId(null);
        return;
      }

      toast({
        title: "Refreshing QR code",
        description: "Regenerating your QR code...",
      });

      // Format the URL for the QR code
      const url = qrCode.url.startsWith("http") ? qrCode.url : `https://${qrCode.url}`;

      // Make sure we have a valid logo URL or set to default
      const finalLogoUrl = qrCode.logoUrl && qrCode.logoUrl.trim() !== '' ? qrCode.logoUrl : DEFAULT_LOGO;
      console.log('[RefreshQR] Using logo:', finalLogoUrl);
      
      // Create a temporary div to render the QR code
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      document.body.appendChild(tempDiv);
      
      try {
        // Use qr-code-styling library directly for best control
        const QRCodeStyling = (await import('qr-code-styling')).default;
        console.log('[RefreshQR] Using QR code styling library with url:', url);
        
        // Rename the QR code instance to avoid variable name conflict
        const qrCodeInstance = new QRCodeStyling({
          width: 300,
          height: 300,
          type: 'canvas',
          data: url,
          image: finalLogoUrl,
          dotsOptions: {
            type: 'dots',
            color: qrCode.color || '#000000'
          },
          backgroundOptions: {
            color: qrCode.backgroundColor || '#FFFFFF'
          },
          imageOptions: {
            crossOrigin: 'anonymous',
            margin: 4,
            imageSize: 0.2,
            hideBackgroundDots: true
          },
          cornersSquareOptions: {
            type: 'extra-rounded',
            color: qrCode.color || '#000000'
          },
          cornersDotOptions: {
            type: 'dot',
            color: qrCode.color || '#000000'
          },
          qrOptions: {
            errorCorrectionLevel: 'Q'
          }
        });
        
        // Append to the DOM to generate the QR code
        qrCodeInstance.append(tempDiv);
        
        // Get data URL from canvas
        const canvas = tempDiv.querySelector('canvas');
        if (!canvas) {
          throw new Error('Failed to generate QR code - no canvas element found');
        }
        
        // Convert to data URL - use medium quality to avoid excessively large data URLs
        const dataUrl = canvas.toDataURL('image/png', 0.8);
        console.log('[RefreshQR] QR code data URL generated successfully, length:', dataUrl.length);
        
        if (!dataUrl || dataUrl.length < 100) {
          throw new Error('Generated QR code data URL seems invalid or too short');
        }
        
        // Store the QR code settings instead of the full image URL
        // This ensures we can recreate the QR code from the settings on page refresh
        const qrCodeSettings = {
          url: url,
          color: qrCode.color || '#000000',
          backgroundColor: qrCode.backgroundColor || '#FFFFFF',
          logoUrl: finalLogoUrl,
          refreshed: new Date().toISOString()
        };
        
        console.log('[RefreshQR] Storing QR code settings:', qrCodeSettings);
        
        // Update the QR code in Supabase
        const { error } = await supabase
          .from("qr_codes")
          .update({
            // Store the actual settings instead of just the data URL
            qr_settings: qrCodeSettings,
            // Also store the data URL for immediate display
            qr_image_url: dataUrl
          })
          .eq("id", qrCode.id);

        if (error) {
          throw error;
        }

        // Update the qrCodes state
        setQrCodes(qrCodes.map((qr) => {
          if (qr.id === qrCode.id) {
            return { 
              ...qr, 
              qrImageUrl: dataUrl,
              // Also update the settings in the local state
              url: url,
              color: qrCode.color || '#000000',
              backgroundColor: qrCode.backgroundColor || '#FFFFFF',
              logoUrl: finalLogoUrl
            };
          }
          return qr;
        }));

        toast({
          title: "QR Code refreshed",
          description: "Your QR code has been refreshed and saved successfully.",
        });
      } finally {
        // Always clean up the temporary div
        if (document.body.contains(tempDiv)) {
          document.body.removeChild(tempDiv);
        }
      }
    } catch (error) {
      console.error("Error refreshing QR code:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      toast({
        title: "Refresh failed",
        description: `Failed to refresh QR code: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setRefreshingId(null);
    }
  }


  // Filter QR codes based on search query and active tab
  const filteredQRCodes = qrCodes
    .filter((qrCode) => qrCode.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((qrCode) => {
      if (activeTab === "all") return true
      if (activeTab === "active") return qrCode.active === true
      if (activeTab === "inactive") return qrCode.active === false
      return true
    })

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#e9ede7] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-black mb-4" />
          <p className="text-lg font-medium">Loading your QR codes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#e9ede7]">
      {/* Use the shared AppHeader component */}
      <AppHeader activePage="my-qr-codes" />

      {/* Secondary Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <Tabs defaultValue="all" className="py-2" onValueChange={setActiveTab}>
            <TabsList className="bg-transparent">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-[#e4ff54] data-[state=active]:text-black rounded-full"
              >
                All QR Codes
              </TabsTrigger>
              <TabsTrigger
                value="active"
                className="data-[state=active]:bg-[#e4ff54] data-[state=active]:text-black rounded-full"
              >
                Active
              </TabsTrigger>
              <TabsTrigger
                value="inactive"
                className="data-[state=active]:bg-[#e4ff54] data-[state=active]:text-black rounded-full"
              >
                Inactive
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header with actions */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold">My QR Codes</h1>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search QR codes..."
                className="pl-10 rounded-full border-2 border-gray-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className={`rounded-full border-2 ${viewMode === "grid" ? "bg-[#e4ff54] border-black" : "border-gray-200"}`}
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid size={18} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={`rounded-full border-2 ${viewMode === "list" ? "bg-[#e4ff54] border-black" : "border-gray-200"}`}
                onClick={() => setViewMode("list")}
              >
                <List size={18} />
              </Button>

              <Link href="/create">
                <Button className="rounded-full px-6 py-6 bg-black hover:bg-gray-800 text-white font-medium text-base">
                  <Plus className="mr-2 h-5 w-5" />
                  Create New QR Code
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-gray-500 mb-6">
          Showing {filteredQRCodes.length} of {qrCodes.length} QR codes
        </p>

        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQRCodes.map((qrCode) => (
              <QRCodeDisplay
                key={qrCode.id}
                id={qrCode.id}
                title={qrCode.name}
                url={qrCode.url}
                type={qrCode.type || "Dynamic"}
                createdAt={qrCode.createdAt}
                scans={qrCode.scans}
                active={qrCode.active}
                color={qrCode.color}
                backgroundColor={qrCode.backgroundColor}
                logoUrl={qrCode.logoUrl}
                viewMode="grid"
                qrImageUrl={qrCode.qrImageUrl}
                onEdit={() => handleEditClick(qrCode)}
                onDelete={() => deleteQrCode(qrCode.id)}
                onToggleActive={() => toggleQrCodeStatus(qrCode.id)}
                onRefresh={() => refreshQrCode(qrCode)}
                position={qrCode.position}
                button_shape={qrCode.button_shape}
                display_text={qrCode.display_text}
                button_icon={qrCode.button_icon}
              />
            ))}
          </div>
        )}

        {/* List View */}
        {viewMode === "list" && (
          <div className="space-y-4">
            {filteredQRCodes.map((qrCode) => (
              <QRCodeDisplay
                key={qrCode.id}
                id={qrCode.id}
                title={qrCode.name}
                url={qrCode.url}
                type={qrCode.type || "Dynamic"}
                createdAt={qrCode.createdAt}
                scans={qrCode.scans}
                active={qrCode.active}
                color={qrCode.color}
                backgroundColor={qrCode.backgroundColor}
                logoUrl={qrCode.logoUrl}
                viewMode="list"
                qrImageUrl={qrCode.qrImageUrl}
                onEdit={() => handleEditClick(qrCode)}
                onDelete={() => deleteQrCode(qrCode.id)}
                onToggleActive={() => toggleQrCodeStatus(qrCode.id)}
                onRefresh={() => refreshQrCode(qrCode)}
                position={qrCode.position}
                button_shape={qrCode.button_shape}
                display_text={qrCode.display_text}
                button_icon={qrCode.button_icon}
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {filteredQRCodes.length === 0 && (
          <div className="text-center py-12">
            <QrCode className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-1">No QR codes found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or create a new QR code.</p>
            <Link href="/create">
              <Button className="rounded-full px-6 py-2 bg-[#e4ff54] hover:bg-[#d4ef44] text-black font-medium">
                <Plus className="mr-2 h-4 w-4" />
                Create New QR Code
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

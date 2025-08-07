

"use client"

import { useState, useEffect, useRef } from "react"
import QRCodeStyling from "qr-code-styling"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Download, Pencil, Trash2, RefreshCw, Loader2, Code, Copy, Check } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface QRCodeDisplayProps {
  id: string
  title: string
  url: string
  type: string
  createdAt: string
  scans: number
  active: boolean
  color?: string
  backgroundColor?: string
  logoUrl?: string
  viewMode: "grid" | "list"
  qrImageUrl?: string | null
  onEdit: () => void
  onDelete: () => void
  onToggleActive: () => void
  onRefresh: () => void
  position?: string
  button_shape?: string
  display_text?: string
  button_icon?: string
}

export default function QRCodeDisplay({
  id,
  title,
  url,
  type,
  createdAt,
  scans,
  active,
  color = "#000000",
  backgroundColor = "#FFFFFF",
  logoUrl = "/images/g4.png",
  viewMode,
  qrImageUrl,
  onEdit,
  onDelete,
  onToggleActive,
  onRefresh,
  position,
  button_shape,
  display_text,
  button_icon,
}: QRCodeDisplayProps) {
  const [isEmbedCopied, setIsEmbedCopied] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const qrCodeRef = useRef<HTMLDivElement>(null)
  const qrCodeInstanceRef = useRef<QRCodeStyling | null>(null)

  // Build the embed code, always showing the current settings.
  const buildEmbedCode = () => {
    const finalPosition = position || 'bottom-right';
    const finalButtonShape = button_shape || 'rounded';
    const finalDisplayText = display_text || 'Open QR Code';
    const finalButtonIcon = button_icon || 'none';

    // Using template literals for a multi-line string for readability
    return `<script src="${typeof window !== 'undefined' ? window.location.origin : ''}/widget.js"
        data-qr-id="${id}"
        data-position="${finalPosition}"
        data-button-shape="${finalButtonShape}"
        data-display-text="${finalDisplayText}"
        data-button-icon="${finalButtonIcon}"
        defer></script>`;
  };

  const embedCode = buildEmbedCode();

  // Handle copying embed code
  const handleCopyEmbedCode = () => {
    navigator.clipboard.writeText(embedCode);
    setIsEmbedCopied(true);
    setTimeout(() => setIsEmbedCopied(false), 2000);
  };

  // Effect to render QR code
  useEffect(() => {
    // Wait until the logo URL is available to prevent a race condition
    if (!qrCodeRef.current || !url) return;

    // Clear previous QR code
    qrCodeRef.current.innerHTML = "";

    // For 'current' URL type, use the current page URL
    // For custom type, use the provided custom URL
    // Always generate dynamically - never use pre-generated images
    const qrDataUrl = type === 'current' 
      ? (typeof window !== 'undefined' ? window.location.href : '') 
      : url;
    
    // Ensure we have a valid logo URL
    const finalLogoUrl = logoUrl || '/images/g4.png';
    
    console.log('[QRCodeDisplay] Rendering QR code with settings:', {
      id,
      type,
      url: type === 'current' ? 'Current Page URL' : url,
      color,
      backgroundColor,
      logoUrl: finalLogoUrl,
      hasLogo: !!finalLogoUrl,
      eyeStyle: 'extra-rounded',
      viewMode,
      usingPreGeneratedImage: !!(qrImageUrl && type !== 'current')
    });
    
    // Always generate QR codes dynamically - never use pre-generated images
    console.log('[QRCodeDisplay] Generating QR code dynamically for:', type === 'current' ? 'Current Page URL' : url);

    // Create QR code with circular eyes to match the widget
    const qrCode = new QRCodeStyling({
      width: viewMode === "grid" ? 192 : 96,
      height: viewMode === "grid" ? 192 : 96,
      type: "svg",
      data: qrDataUrl,
      image: finalLogoUrl, // Use the final logo URL with fallback
      dotsOptions: { 
        color: color,
        type: "dots" // Match the widget implementation exactly
      },
      backgroundOptions: { 
        color: backgroundColor 
      },
      imageOptions: { 
        crossOrigin: "anonymous",
        margin: 4,
        imageSize: 0.2, // Reduced size to ensure logo fits well
        hideBackgroundDots: true
      },
      cornersSquareOptions: { 
        color: color,
        type: "extra-rounded"
      },
      qrOptions: {
        typeNumber: 0,
        mode: "Byte",
        errorCorrectionLevel: "Q"
      },
      cornersDotOptions: { 
        color: color,
        type: "dot"
      },
      dotsOptionsHelper: {
        colorType: { single: true },
        gradient: null
      },
      cornersSquareOptionsHelper: {
        colorType: { single: true },
        gradient: null
      },
      cornersDotOptionsHelper: {
        colorType: { single: true },
        gradient: null
      }
    } as any) // Using 'as any' to bypass TypeScript errors for advanced options

    qrCodeInstanceRef.current = qrCode
    qrCode.append(qrCodeRef.current)
  }, [isRefreshing, id, url, type, color, backgroundColor, logoUrl, title, viewMode])

  // Handle download
  const handleDownload = async () => {
    if (!qrCodeInstanceRef.current) return
    setIsDownloading(true)
    try {
      const data = await qrCodeInstanceRef.current.getRawData("png")
      if (data instanceof Blob) {
        const link = document.createElement("a")
        link.href = URL.createObjectURL(data)
        link.download = `${title.replace(/[^a-z0-9]/gi, "-").toLowerCase() || "qr-code"}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(link.href)
      }
    } catch (error) {
      console.error("Download failed:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  // Handle refresh
  const handleRefresh = async () => {
    setIsRefreshing(true)
    await onRefresh()
    setIsRefreshing(false)
  }

  // Grid view
  if (viewMode === "grid") {
    return (
      <Card
        className={`p-6 rounded-3xl border-0 shadow-sm hover:shadow-md transition-shadow ${!active ? "opacity-70" : ""}`}
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <div className="flex space-x-2">
            {/* Refresh button removed per user request - users should use Create/Save flow instead */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-[#e4ff54] hover:text-black"
              onClick={onEdit}
            >
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-[#e4ff54] hover:text-black"
              onClick={onDelete}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-[#e4ff54] hover:text-black"
                >
                  <Code className="h-4 w-4" />
                  <span className="sr-only">Embed</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Embed QR Code</DialogTitle>
                  <DialogDescription>
                    Copy and paste this code into your website's HTML where you want the QR code to appear.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <pre className="p-4 bg-gray-100 rounded-md overflow-x-auto">
                    <code className="text-sm whitespace-pre-wrap">{embedCode}</code>
                  </pre>
                  <Button onClick={handleCopyEmbedCode} className="w-full">
                    {isEmbedCopied ? (
                      <Check className="mr-2 h-4 w-4" />
                    ) : (
                      <Copy className="mr-2 h-4 w-4" />
                    )}
                    {isEmbedCopied ? 'Copied!' : 'Copy Code'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

          </div>
        </div>

        <div className="flex flex-col items-center justify-center mb-4">
          <div
            ref={qrCodeRef}
            className={`w-48 h-48 bg-white p-4 rounded-lg ${!active ? "grayscale" : ""}`}
          />
          {display_text && <p className="mt-4 text-center font-medium">{display_text}</p>}
        </div>

        <div className="space-y-2 text-sm mb-4">
          <div className="flex justify-between items-center pt-2">
            <span className="text-gray-500">Status:</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm">{active ? "Active" : "Inactive"}</span>
              <Switch
                checked={active}
                onCheckedChange={onToggleActive}
                className="data-[state=checked]:bg-[#e4ff54] data-[state=checked]:text-black"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="w-full rounded-full border-2 border-gray-200 hover:bg-[#e4ff54] hover:border-black hover:text-black"
            disabled={!active || isDownloading}
            onClick={handleDownload}
          >
            {isDownloading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Download
              </>
            )}
          </Button>
        </div>
      </Card>
    )
  }

  // List view
  return (
    <Card
      className={`p-4 rounded-xl border-0 shadow-sm hover:shadow-md transition-shadow ${!active ? "opacity-70" : ""}`}
    >
      <div className="flex items-center gap-4">
        <div className={`flex-shrink-0 text-center ${!active ? "grayscale" : ""}`}>
          <div ref={qrCodeRef} className="w-24 h-24 bg-white p-2 rounded-lg" />
          {display_text && <p className="mt-2 text-xs">{display_text}</p>}
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-bold">{title}</h2>
          <div className="flex items-center mt-1">
            <span className="text-gray-500 mr-1">Status:</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm">{active ? "Active" : "Inactive"}</span>
              <Switch
                checked={active}
                onCheckedChange={onToggleActive}
                className="data-[state=checked]:bg-[#e4ff54] data-[state=checked]:text-black"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-[#e4ff54] hover:text-black"
              onClick={onEdit}
            >
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-[#e4ff54] hover:text-black"
              onClick={onDelete}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-[#e4ff54] hover:text-black"
                >
                  <Code className="h-4 w-4" />
                  <span className="sr-only">Embed</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Embed QR Code</DialogTitle>
                  <DialogDescription>
                    Copy and paste this code into your website's HTML where you want the QR code to appear.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <pre className="p-4 bg-gray-100 rounded-md overflow-x-auto">
                    <code className="text-sm whitespace-pre-wrap">{embedCode}</code>
                  </pre>
                  <Button onClick={handleCopyEmbedCode} className="w-full">
                    {isEmbedCopied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                    {isEmbedCopied ? 'Copied!' : 'Copy Code'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-[#e4ff54] hover:text-black"
          onClick={onEdit}
        >
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-[#e4ff54] hover:text-black"
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </div>
    </Card>
  )
}

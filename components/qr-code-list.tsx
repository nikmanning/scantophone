"use client"

import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { Eye, BarChart, Edit, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { QRCodePreview } from "@/components/qr-code-preview"

interface QRCodeListProps {
  qrCodes: any[]
}

export function QRCodeList({ qrCodes }: QRCodeListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {qrCodes.map((qrCode) => (
        <Card key={qrCode.id}>
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle className="text-lg font-medium">{qrCode.name}</CardTitle>
              <CardDescription>{formatDistanceToNow(new Date(qrCode.created_at), { addSuffix: true })}</CardDescription>
            </div>
            <Badge variant={qrCode.active ? "default" : "secondary"}>{qrCode.active ? "Active" : "Inactive"}</Badge>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center py-4">
              <QRCodePreview qrCode={qrCode} size={150} logoUrl="/images/g4.png" />
            </div>
            <div className="mt-2 flex items-center">
              <BarChart className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{qrCode.scans} scans</span>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href={`/qr-codes/${qrCode.id}`}>
              <Button variant="outline" size="sm">
                <Eye className="mr-2 h-4 w-4" />
                View
              </Button>
            </Link>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-[#e4ff54] hover:text-black"
                onClick={() => {
                  /* Add refresh functionality here */
                }}
              >
                <RefreshCw className="h-4 w-4" />
                <span className="sr-only">Refresh</span>
              </Button>
              <Link href={`/qr-codes/${qrCode.id}/analytics`}>
                <Button variant="outline" size="sm">
                  <BarChart className="mr-2 h-4 w-4" />
                  Analytics
                </Button>
              </Link>
              <Link href={`/create?id=${qrCode.id}&name=${encodeURIComponent(qrCode.name)}`}>
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

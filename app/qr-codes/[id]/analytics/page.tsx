import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { notFound, redirect } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"

export const dynamic = "force-dynamic"

interface AnalyticsPageProps {
  params: {
    id: string
  }
}

export default async function AnalyticsPage({ params }: AnalyticsPageProps) {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  const { data: qrCode } = await supabase
    .from("qr_codes")
    .select("*")
    .eq("id", params.id)
    .eq("user_id", session.user.id)
    .single()

  if (!qrCode) {
    notFound()
  }

  const { data: scans } = await supabase
    .from("qr_code_scans")
    .select("*")
    .eq("qr_code_id", params.id)
    .order("scanned_at", { ascending: false })

  return (
    <DashboardShell>
      <DashboardHeader heading={`Analytics for ${qrCode.name}`} text="View detailed analytics for your QR code." />

      <div className="grid gap-8">
        <AnalyticsDashboard qrCode={qrCode} scans={scans || []} />
      </div>
    </DashboardShell>
  )
}

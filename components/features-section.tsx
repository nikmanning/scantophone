import { BarChart3, Smartphone, Palette, Sliders, QrCode, LineChart, Globe, Zap, Clock } from "lucide-react"

export function FeaturesSection() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Everything You Need</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform provides all the tools you need to create, manage, and track your viral QR codes.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <QrCode className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Customizable QR Codes</h3>
            <p className="text-center text-muted-foreground">
              Create beautiful QR codes with custom colors, shapes, and logos that match your brand.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Smartphone className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Mobile Friendly</h3>
            <p className="text-center text-muted-foreground">
              Responsive design ensures your QR codes look great on any device, from desktop to mobile.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Detailed Analytics</h3>
            <p className="text-center text-muted-foreground">
              Track scans, user demographics, and engagement to optimize your marketing campaigns.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Palette className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Brand Customization</h3>
            <p className="text-center text-muted-foreground">
              Match your QR codes to your brand with custom colors, logos, and design elements.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Sliders className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Position & Behavior</h3>
            <p className="text-center text-muted-foreground">
              Control where and how your QR code appears on your website with flexible positioning options.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <LineChart className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Conversion Tracking</h3>
            <p className="text-center text-muted-foreground">
              Track how many scans convert to actual customers or actions on your website.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Global Reach</h3>
            <p className="text-center text-muted-foreground">
              Connect with customers worldwide using QR codes that work across all regions and devices.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Fast Loading</h3>
            <p className="text-center text-muted-foreground">
              Optimized code ensures your QR codes load quickly without slowing down your website.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Scheduling</h3>
            <p className="text-center text-muted-foreground">
              Set specific times for your QR codes to appear, perfect for limited-time promotions.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

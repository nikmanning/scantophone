import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function PricingSection() {
  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Pricing</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Simple, Transparent Pricing</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choose the plan that's right for you and start creating viral QR codes today.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3">
          <div className="flex flex-col rounded-lg border bg-background shadow-sm">
            <div className="p-6">
              <h3 className="text-xl font-bold">Starter</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-3xl font-bold">$9</span>
                <span className="ml-1 text-muted-foreground">/month</span>
              </div>
              <p className="mt-2 text-muted-foreground">Perfect for individuals and small businesses.</p>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  <span>3 QR codes</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  <span>Basic analytics</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  <span>Custom colors</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  <span>Email support</span>
                </li>
              </ul>
              <div className="mt-6">
                <Link href="/signup">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="relative flex flex-col rounded-lg border bg-background shadow-sm">
            <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
              Popular
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold">Pro</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-3xl font-bold">$29</span>
                <span className="ml-1 text-muted-foreground">/month</span>
              </div>
              <p className="mt-2 text-muted-foreground">For growing businesses and marketing teams.</p>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  <span>15 QR codes</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  <span>Custom branding</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  <span>Position & behavior controls</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  <span>Scheduling</span>
                </li>
              </ul>
              <div className="mt-6">
                <Link href="/signup">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col rounded-lg border bg-background shadow-sm">
            <div className="p-6">
              <h3 className="text-xl font-bold">Enterprise</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-3xl font-bold">$99</span>
                <span className="ml-1 text-muted-foreground">/month</span>
              </div>
              <p className="mt-2 text-muted-foreground">For large organizations with advanced needs.</p>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  <span>Unlimited QR codes</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  <span>Enterprise analytics</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  <span>Advanced customization</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  <span>Dedicated support</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  <span>API access</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  <span>Team management</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  <span>Custom integrations</span>
                </li>
              </ul>
              <div className="mt-6">
                <Link href="/contact">
                  <Button className="w-full">Contact Sales</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
  return (
    <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">FAQ</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Frequently Asked Questions</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Find answers to common questions about Viral QR.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl space-y-4 py-12">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I add a QR code to my website?</AccordionTrigger>
              <AccordionContent>
                Adding a QR code to your website is simple. After signing up, create a new QR code in your dashboard,
                customize it to your liking, and copy the provided code snippet. Paste this snippet into your website's
                HTML, and your floating QR code will appear instantly.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Can I customize the appearance of my QR code?</AccordionTrigger>
              <AccordionContent>
                Yes! You can customize the colors, shape, size, and position of your QR code. You can also add your logo
                to the center of the QR code and choose from various animation effects to make it more engaging.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>What analytics do you provide?</AccordionTrigger>
              <AccordionContent>
                Our analytics dashboard shows you the number of scans, user demographics (location, device type,
                browser), scan times, and referral sources. Pro and Enterprise plans include more detailed analytics
                like conversion tracking and user journey mapping.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Can I use Viral QR for marketing campaigns?</AccordionTrigger>
              <AccordionContent>
                Viral QR is perfect for marketing campaigns. You can create different QR codes for different campaigns,
                track their performance separately, and even schedule them to appear during specific time periods to
                align with your marketing initiatives.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Is there a limit to how many QR codes I can create?</AccordionTrigger>
              <AccordionContent>
                The number of QR codes you can create depends on your plan. The Starter plan includes 3 QR codes, the
                Pro plan includes 15 QR codes, and the Enterprise plan offers unlimited QR codes. You can upgrade your
                plan at any time if you need more.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>Do you offer a free trial?</AccordionTrigger>
              <AccordionContent>
                Yes, we offer a 14-day free trial with access to all Pro plan features. No credit card is required to
                start your trial. You can upgrade to a paid plan at any time during or after your trial.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
              <AccordionTrigger>How secure are your QR codes?</AccordionTrigger>
              <AccordionContent>
                Our QR codes are generated using industry-standard security practices. We use HTTPS for all connections,
                and our platform is regularly audited for security vulnerabilities. Enterprise customers also have
                access to additional security features like IP restrictions and access controls.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  )
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Testimonials</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What Our Customers Say</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Don't just take our word for it. Here's what our customers have to say about Viral QR.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2">
          <div className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm">
            <div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 fill-primary text-primary"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <div className="mt-4">
                <p className="text-lg font-semibold">Increased Engagement by 300%</p>
                <p className="mt-2 text-muted-foreground">
                  "Since implementing Viral QR on our website, we've seen a 300% increase in customer engagement. The
                  floating QR code is eye-catching without being intrusive, and the analytics have helped us optimize
                  our marketing strategy."
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center">
              <div className="h-10 w-10 rounded-full bg-muted"></div>
              <div className="ml-4">
                <p className="text-sm font-medium">Sarah Johnson</p>
                <p className="text-sm text-muted-foreground">Marketing Director, TechCorp</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm">
            <div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 fill-primary text-primary"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <div className="mt-4">
                <p className="text-lg font-semibold">Easy to Implement, Great Results</p>
                <p className="mt-2 text-muted-foreground">
                  "I was able to set up Viral QR in minutes, and the results were immediate. Our customers love being
                  able to quickly scan our QR code to access special offers, and we love the detailed analytics that
                  help us understand our audience better."
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center">
              <div className="h-10 w-10 rounded-full bg-muted"></div>
              <div className="ml-4">
                <p className="text-sm font-medium">Michael Chen</p>
                <p className="text-sm text-muted-foreground">Owner, Local Bistro</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm">
            <div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 fill-primary text-primary"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <div className="mt-4">
                <p className="text-lg font-semibold">Perfect for Our Marketing Campaigns</p>
                <p className="mt-2 text-muted-foreground">
                  "Viral QR has been a game-changer for our marketing campaigns. We can create custom QR codes for
                  different promotions and track their performance in real-time. The ability to customize the appearance
                  and position has been invaluable."
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center">
              <div className="h-10 w-10 rounded-full bg-muted"></div>
              <div className="ml-4">
                <p className="text-sm font-medium">Jessica Martinez</p>
                <p className="text-sm text-muted-foreground">CMO, Fashion Brand</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-lg border bg-background p-6 shadow-sm">
            <div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 fill-primary text-primary"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <div className="mt-4">
                <p className="text-lg font-semibold">Enterprise-Grade Solution</p>
                <p className="mt-2 text-muted-foreground">
                  "As a large enterprise, we needed a QR code solution that could scale with our needs and provide
                  detailed analytics. Viral QR has exceeded our expectations with its robust features and excellent
                  support team."
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center">
              <div className="h-10 w-10 rounded-full bg-muted"></div>
              <div className="ml-4">
                <p className="text-sm font-medium">Robert Williams</p>
                <p className="text-sm text-muted-foreground">CTO, Enterprise Solutions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

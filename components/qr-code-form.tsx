"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient as getBrowserClient } from "../utils/supabase/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QRCodePreview } from "@/components/qr-code-preview"
import { ColorPicker } from "@/components/color-picker"
import { toast } from "@/components/ui/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Update the form schema to include urlType
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  url_type: z.enum(["current", "custom"]),
  custom_url: z.string().url({
    message: "Please enter a valid URL."
  }).or(z.literal("")), // allow empty string
  display_text: z.string().optional(),
  position: z.string(),
  qr_code_color: z.string(),
  background_color: z.string(),
  button_color: z.string(),
  margin_x: z.number().min(0).max(1000),
  margin_y: z.number().min(0).max(1000),
  size: z.number().min(100).max(500),
  show_on_mobile: z.boolean(),
  show_on_desktop: z.boolean(),
  button_shape: z.string(),
  start_collapsed: z.boolean(),
  animation: z.string(),
}).superRefine((data, ctx) => {
  if (data.url_type === "custom") {
    if (!data.custom_url || data.custom_url.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Custom URL is required when URL Type is Custom.",
        path: ["custom_url"],
      });
    }
  }
});

interface QRCodeFormProps {
  userId: string
}

export function QRCodeForm({ userId }: QRCodeFormProps) {
  const router = useRouter()
  const supabase = getBrowserClient()
  const [isLoading, setIsLoading] = useState(false)

  // Update the form default values to include urlType
  type QRCodeFormValues = z.infer<typeof formSchema>;

const form = useForm<QRCodeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      custom_url: "",
      url_type: "current",
      display_text: "Send To Phone",
      position: "bottom-right",
      qr_code_color: "#000000",
      background_color: "#ffffff",
      button_color: "#000000",
      margin_x: 20,
      margin_y: 20,
      size: 150,
      show_on_mobile: false,
      show_on_desktop: true,
      button_shape: "rounded",
      start_collapsed: true,
      animation: "fade",
    },
  })

  const watchedValues = form.watch()

  async function onSubmit(values: QRCodeFormValues) {
    try {
      setIsLoading(true)

      const { error } = await supabase.from("qr_codes").insert({
        ...values,
        user_id: userId,
      })

      if (error) {
        throw error
      }

      toast({
        title: "QR Code created",
        description: "Your QR code has been created successfully.",
      })

      router.push("/qr-codes")
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Basic</TabsTrigger>
                  <TabsTrigger value="appearance">Appearance</TabsTrigger>
                  <TabsTrigger value="behavior">Behavior</TabsTrigger>
                </TabsList>

                {/* Add a new form field for URL type in the basic tab */}
                <TabsContent value="basic" className="space-y-4 pt-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="My QR Code" {...field} />
                        </FormControl>
                        <FormDescription>A name to identify this QR code.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="url_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL Type</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="current" />
                              </FormControl>
                              <FormLabel className="font-normal">Use current page URL</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="custom" />
                              </FormControl>
                              <FormLabel className="font-normal">Custom URL</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormDescription>Choose what URL your QR code will link to.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="custom_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com" {...field} />
                        </FormControl>
                        <FormDescription>The URL this QR code will link to.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="display_text"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Display Text</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Send To Phone" {...field} value={field.value || ""} />
                        </FormControl>
                        <FormDescription>Text to display alongside the QR code.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <TabsContent value="appearance" className="space-y-4 pt-4">
                  <FormField
                    control={form.control}
                    name="qr_code_color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>QR Code Color</FormLabel>
                        <FormControl>
                          <ColorPicker value={field.value} onChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="background_color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Background Color</FormLabel>
                        <FormControl>
                          <ColorPicker value={field.value} onChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="button_color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Button Color</FormLabel>
                        <FormControl>
                          <ColorPicker value={field.value} onChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="button_shape"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Button Shape</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select button shape" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="rounded">Rounded</SelectItem>
                            <SelectItem value="square">Square</SelectItem>
                            <SelectItem value="circle">Circle</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Size</FormLabel>
                        <FormControl>
                          <Input type="number" min={100} max={500} placeholder="100-500" {...field} />
                        </FormControl>
                        <FormDescription>Size of the QR code in pixels.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <TabsContent value="behavior" className="space-y-4 pt-4">
                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select position" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="top-left">Top Left</SelectItem>
                            <SelectItem value="top-right">Top Right</SelectItem>
                            <SelectItem value="bottom-left">Bottom Left</SelectItem>
                            <SelectItem value="bottom-right">Bottom Right</SelectItem>
                            <SelectItem value="left">Left</SelectItem>
                            <SelectItem value="right">Right</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="margin_x"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Margin X</FormLabel>
                          <FormControl>
                            <Input type="number" min={0} max={1000} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="margin_y"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Margin Y</FormLabel>
                          <FormControl>
                            <Input type="number" min={0} max={1000} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="animation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Animation</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select animation" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="fade">Fade</SelectItem>
                            <SelectItem value="slide">Slide</SelectItem>
                            <SelectItem value="bounce">Bounce</SelectItem>
                            <SelectItem value="none">None</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="show_on_desktop"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>Show on Desktop</FormLabel>
                          <FormDescription>Display QR code on desktop devices.</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="show_on_mobile"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>Show on Mobile</FormLabel>
                          <FormDescription>Display QR code on mobile devices.</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="start_collapsed"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>Start Collapsed</FormLabel>
                          <FormDescription>QR code starts in collapsed state.</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </TabsContent>
              </Tabs>

              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create QR Code"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="flex flex-col space-y-4">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Preview</h3>
            <div className="flex justify-center py-4">
              <QRCodePreview qrCode={watchedValues} size={200} />
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">{watchedValues.display_text}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

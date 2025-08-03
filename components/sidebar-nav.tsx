"use client"

import type React from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { QrCode, Settings, Palette, Move, Sliders, FileCheck } from "lucide-react"

interface NavItem {
  title: string
  id: string
  href: string
  icon: React.ReactNode
  completed?: boolean
}

export default function SidebarNav({ activeStep, onStepChange }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Build query string for navigation
  const getQueryString = () => {
    const params = new URLSearchParams()
    // Copy all existing query parameters
    searchParams.forEach((value, key) => {
      params.append(key, value)
    })
    return params.toString() ? `?${params.toString()}` : ""
  }

  const navItems: NavItem[] = [
    {
      title: "Basic settings",
      id: "basic",
      href: `/create${getQueryString()}`,
      icon: <Settings className="h-5 w-5" />,
      completed: activeStep !== "basic",
    },
    {
      title: "Appearance",
      id: "appearance",
      href: `/create/appearance${getQueryString()}`,
      icon: <Palette className="h-5 w-5" />,
      completed:
        activeStep === "appearance" ||
        activeStep === "position" ||
        activeStep === "advanced" ||
        activeStep === "review",
    },
    {
      title: "Position & Behavior",
      id: "position",
      href: `/create/position-behavior${getQueryString()}`,
      icon: <Move className="h-5 w-5" />,
      completed: activeStep === "position" || activeStep === "advanced" || activeStep === "review",
    },
    {
      title: "Advanced settings",
      id: "advanced",
      href: `/create/advanced-settings${getQueryString()}`,
      icon: <Sliders className="h-5 w-5" />,
      completed: activeStep === "advanced" || activeStep === "review",
    },
    {
      title: "Review",
      id: "review",
      href: `/create/review${getQueryString()}`,
      icon: <FileCheck className="h-5 w-5" />,
      completed: activeStep === "review",
    },
  ]

  return (
    <div className="w-72 p-6 bg-[#e4ff54] rounded-r-3xl">
      <div className="flex items-center mb-10">
        <QrCode className="h-7 w-7 mr-3" />
        <h1 className="text-2xl font-bold">Viral QR Code</h1>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-bold mb-6">Create a new QR code</h2>

        {navItems.map((item) => {
          const isActive = activeStep === item.id

          return (
            <button
              key={item.id}
              onClick={() => onStepChange(item.id)}
              className={`flex items-center py-3 px-4 rounded-full text-sm font-medium w-full text-left ${
                isActive ? "bg-black text-white" : ""
              }`}
            >
              <span className={`mr-3 ${isActive ? "text-white" : item.completed ? "text-black" : "text-gray-500"}`}>
                {item.icon}
              </span>
              <span>{item.title}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

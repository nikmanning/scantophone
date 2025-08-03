"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface ColorPickerProps {
  value: string
  onChange: (value: string) => void
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  const [color, setColor] = useState(value)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value
    setColor(newColor)
    onChange(newColor)
  }

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <div className="h-8 w-8 rounded-md border cursor-pointer" style={{ backgroundColor: color }} />
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3">
          <input type="color" value={color} onChange={handleChange} className="h-32 w-32" />
        </PopoverContent>
      </Popover>
      <Input type="text" value={color} onChange={handleChange} className="w-28" />
    </div>
  )
}

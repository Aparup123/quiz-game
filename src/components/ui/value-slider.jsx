"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"

export function ValueSlider({ className, value, max, ...props}) {
    // console.log(props)
  return (
    <div className="relative w-[60%] mt-8 mb-4">
      <Slider className={cn("", className)} {...props} max={max}/>

      {/* Value display that follows the thumb */}
      <div
        className="absolute top-0 pointer-events-none"
        style={{
          left: `calc(${value[0]*10}% - 12px)`,
          transform: "translateY(-130%)",
        }}
      >
        <div className="bg-primary text-primary-foreground text-xs font-medium py-1 px-2 rounded-md shadow-md">
          {value[0]}
        </div>
      </div>

      {/* Min value display */}
      <div className="absolute bottom-0 left-0 transform translate-y-full mt-2">
        <div className="text-xs font-medium text-muted-foreground py-1">0</div>
      </div>

      {/* Max value display */}
      <div className="absolute bottom-0 right-0 transform translate-y-full mt-2">
        <div className="text-xs font-medium text-muted-foreground py-1">{max}</div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FlipCardProps {
  frontImage: string
  title: string
  backContent: string
  className?: string
}

export function FlipCard({ frontImage, title, backContent, className }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const toggleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <div 
      className={cn(
        "relative h-[450px] w-full perspective-1000 cursor-pointer group",
        className
      )}
      onClick={toggleFlip}
    >
      <div 
        className={cn(
          "relative preserve-3d w-full h-full duration-700 transition-all",
          isFlipped ? "rotate-y-180" : ""
        )}
      >
        {/* Front Card */}
        <div className="absolute backface-hidden w-full h-full rounded-xl overflow-hidden border shadow-lg bg-white hover:shadow-2xl transition-all duration-300">
          <div className="relative h-[65%] w-full overflow-hidden">
            <Image 
              src={frontImage} 
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-3 text-emerald-700">{title}</h3>
            <p className="text-emerald-600 font-medium flex items-center">
              Click to flip!
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </p>
          </div>
        </div>

        {/* Back Card */}
        <div className="absolute backface-hidden w-full h-full rounded-xl overflow-hidden border shadow-lg bg-emerald-50 rotate-y-180 p-6 hover:shadow-2xl transition-all duration-300">
          <div className="flex flex-col h-full justify-between">
            <div>
              <h3 className="text-xl font-bold mb-4 text-emerald-700">{title}</h3>
              <div className="h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                <p className="text-gray-700 text-sm leading-relaxed">{backContent}</p>
              </div>
            </div>
            <p className="text-emerald-600 font-medium text-sm mt-4 text-right flex items-center justify-end">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Click to flip back
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 
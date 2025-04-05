"use client"

import Image from "next/image"

interface SimpleCardProps {
  image: string
  title: string
  description: string
}

export function SimpleCard({ image, title, description }: SimpleCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg h-full">
      <div className="relative h-48 w-full">
        <Image 
          src={image} 
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-emerald-700">{title}</h3>
        <p className="text-gray-600 text-sm">{description.slice(0, 100)}...</p>
      </div>
    </div>
  )
} 
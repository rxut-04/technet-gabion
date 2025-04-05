"use client"

import { useState } from "react"
import Image from "next/image"

interface DirectFlipCardProps {
  frontImage: string
  title: string
  backContent: string
}

export function DirectFlipCard({ frontImage, title, backContent }: DirectFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const containerStyle = {
    height: "450px",
    perspective: "1000px",
    cursor: "pointer",
  }

  const flipperStyle = {
    position: "relative" as const,
    width: "100%",
    height: "100%",
    transformStyle: "preserve-3d" as const,
    transition: "transform 0.6s",
    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
  }

  const cardFaceStyle = {
    position: "absolute" as const,
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden" as const,
    borderRadius: "0.75rem",
    overflow: "hidden",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  }

  const cardBackStyle = {
    ...cardFaceStyle,
    transform: "rotateY(180deg)",
    backgroundColor: "#ecfdf5",
    padding: "1.5rem",
  }

  return (
    <div 
      style={containerStyle}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div style={flipperStyle}>
        {/* Front */}
        <div style={cardFaceStyle}>
          <div style={{ position: "relative", height: "65%", width: "100%" }}>
            <Image 
              src={frontImage} 
              alt={title}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "0.75rem", color: "#047857" }}>{title}</h3>
            <p style={{ color: "#059669", fontWeight: "500" }}>Click to flip!</p>
          </div>
        </div>

        {/* Back */}
        <div style={cardBackStyle}>
          <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "1rem", color: "#047857" }}>{title}</h3>
              <div style={{ height: "300px", overflowY: "auto", paddingRight: "0.5rem" }}>
                <p style={{ color: "#374151", fontSize: "0.875rem", lineHeight: "1.5" }}>{backContent}</p>
              </div>
            </div>
            <p style={{ color: "#059669", fontWeight: "500", fontSize: "0.875rem", marginTop: "1rem", textAlign: "right" }}>
              Click to flip back
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 
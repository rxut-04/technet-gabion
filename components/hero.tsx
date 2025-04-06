"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Parallax effect references
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  // Text animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }
  
  const descriptionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        delay: 0.2,
        ease: "easeOut"
      }
    }
  }
  
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: 0.4
      }
    },
    hover: { 
      scale: 1.05,
      backgroundColor: "#047857", // darker emerald
      borderRadius: "1.5rem",
      transition: { duration: 0.3 }
    }
  }

  return (
    <section className="relative h-screen w-full overflow-hidden" ref={containerRef}>
      {/* Video Background */}
      <motion.div 
        style={{ opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="relative h-full w-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/images/herovideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
      </motion.div>

      {/* Content Overlay with Enhanced Typography */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <motion.div className="max-w-4xl mx-auto">
            <motion.h1 
              variants={titleVariants}
              initial="hidden"
              animate="visible"
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-heading"
            >
              <span className="text-emerald-400">The RockShield</span> - Your Reliable Gabion, Rock Fall Protection & Painting Partner
            </motion.h1>
            
            <motion.p 
              variants={descriptionVariants}
              initial="hidden"
              animate="visible"
              className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed"
            >
              We'll get the job done with quality installations and civil services!
            </motion.p>
            
            <motion.div
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <Button 
                size="lg" 
                className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-6 rounded-md transition-all duration-300 group hover:rounded-full"
                onClick={() => {
                  const projectsSection = document.getElementById('projects');
                  if (projectsSection) {
                    projectsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Recent Work
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


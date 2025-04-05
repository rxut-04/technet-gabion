"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const slides = [
  {
    id: 1,
    image: "/images/hero-1.png",
    alt: "Gabion retaining wall installation",
    title: "Retaining Walls",
    description: "Engineered gabion solutions for challenging terrain"
  },
  {
    id: 2,
    image: "/images/hero-2.jpg",
    alt: "Rock fall protection project",
    title: "Rock Fall Protection",
    description: "Advanced systems to prevent rockfalls and landslides"
  },
  {
    id: 3,
    image: "/images/hero-3.jpg",
    alt: "Completed gabion wall project",
    title: "River Bank Protection",
    description: "Sustainable erosion control with gabion technology"
  },
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Parallax effect references
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 150])
  const y2 = useTransform(scrollY, [0, 500], [0, -150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  useEffect(() => {
    resetTimeout()
    timeoutRef.current = setTimeout(() => {
      setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1))
    }, 6000)

    return () => {
      resetTimeout()
    }
  }, [currentSlide])

  const goToSlide = (index: number) => {
    resetTimeout()
    setCurrentSlide(index)
  }

  const goToPrevSlide = () => {
    resetTimeout()
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1))
  }

  const goToNextSlide = () => {
    resetTimeout()
    setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1))
  }

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
      {/* Parallax Background Layers */}
      <motion.div 
        style={{ y: y1, opacity }}
        className="absolute inset-0 z-0"
      >
        {/* Slider with Parallax Effect */}
        <div className="relative h-full w-full">
          {slides.map((slide, index) => (
            <motion.div
              key={slide.id}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{
                opacity: currentSlide === index ? 1 : 0,
                scale: currentSlide === index ? 1 : 1.1,
                zIndex: currentSlide === index ? 10 : 0,
              }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              <Image
                src={slide.image || "/placeholder.svg"}
                alt={slide.alt}
                fill
                priority={index === 0}
                className="object-cover"
              />
              {/* Improved gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
            </motion.div>
          ))}
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
              key={`title-${currentSlide}`} // Force re-animation on slide change
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-heading"
            >
              Your Reliable <span className="text-emerald-400">Gabion</span>, Rock Fall Protection & Painting Partner
            </motion.h1>
            
            <motion.p 
              variants={descriptionVariants}
              initial="hidden"
              animate="visible"
              key={`desc-${currentSlide}`} // Force re-animation on slide change
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

      {/* Slide Info Cards - Visible on larger screens */}
      <div className="absolute bottom-24 left-0 right-0 z-30 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-4">
            {slides.map((slide, index) => (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: currentSlide === index ? 1 : 0.6,
                  y: 0,
                  scale: currentSlide === index ? 1 : 0.95,
                }}
                whileHover={{ scale: 1.02, opacity: 0.9 }}
                transition={{ duration: 0.3 }}
                className={`bg-white/10 backdrop-blur-sm rounded-lg p-4 cursor-pointer max-w-xs border-l-4 ${
                  currentSlide === index ? "border-emerald-500" : "border-transparent"
                }`}
                onClick={() => goToSlide(index)}
              >
                <h3 className="text-white font-bold text-lg font-heading">{slide.title}</h3>
                <p className="text-white/80 text-sm">{slide.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Navigation Arrows */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-4 top-1/2 z-30 -translate-y-1/2 bg-black/30 hover:bg-emerald-600 text-white p-3 rounded-full transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 z-30 -translate-y-1/2 bg-black/30 hover:bg-emerald-600 text-white p-3 rounded-full transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Improved Dots Navigation */}
      <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? "w-10 bg-emerald-500 shadow-md shadow-emerald-500/30" 
                : "w-3 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}


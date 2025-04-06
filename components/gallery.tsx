"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react"

// Updated list with the 17 gallery images from the public/gallery directory
const photos = [
  {
    id: "img-1",
    src: "/gallery/IMG-20250331-WA0006.jpg",
    alt: "Gallery image 1",
  },
  {
    id: "img-2",
    src: "/gallery/IMG-20250331-WA0066.jpg",
    alt: "Gallery image 2",
  },
  {
    id: "img-3",
    src: "/gallery/IMG-20250331-WA0042.jpg",
    alt: "Gallery image 3",
  },
  {
    id: "img-4",
    src: "/gallery/IMG-20250331-WA0064.jpg",
    alt: "Gallery image 4",
  },
  {
    id: "img-5",
    src: "/gallery/IMG-20250331-WA0031.jpg",
    alt: "Gallery image 5",
  },
  {
    id: "img-6",
    src: "/gallery/IMG-20250331-WA0008.jpg",
    alt: "Gallery image 6",
  },
  {
    id: "img-7",
    src: "/gallery/IMG-20250331-WA0035.jpg",
    alt: "Gallery image 7",
  },
  {
    id: "img-8",
    src: "/gallery/IMG-20250117-WA0010.jpg",
    alt: "Gallery image 8",
  },
  {
    id: "img-9",
    src: "/gallery/IMG-20250331-WA0056.jpg",
    alt: "Gallery image 9",
  },
  {
    id: "img-10",
    src: "/gallery/IMG-20250331-WA0045.jpg",
    alt: "Gallery image 10",
  },
  {
    id: "img-11",
    src: "/gallery/IMG-20250331-WA0030.jpg",
    alt: "Gallery image 11",
  },
  {
    id: "img-12",
    src: "/gallery/IMG-20250331-WA0028.jpg",
    alt: "Gallery image 12",
  },
  {
    id: "img-13",
    src: "/gallery/IMG-20250331-WA0061.jpg",
    alt: "Gallery image 13",
  },
  {
    id: "img-14",
    src: "/gallery/IMG-20250331-WA0003.jpg",
    alt: "Gallery image 14",
  },
  {
    id: "img-15",
    src: "/gallery/IMG-20250331-WA0050.jpg",
    alt: "Gallery image 15",
  },
  {
    id: "img-16",
    src: "/gallery/IMG-20250331-WA0016.jpg",
    alt: "Gallery image 16",
  },
  {
    id: "img-17",
    src: "/gallery/IMG-20250331-WA0077.jpg",
    alt: "Gallery image 17",
  },
];

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isAutoplay, setIsAutoplay] = useState(true)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [imageLoadError, setImageLoadError] = useState<Record<string, boolean>>({})
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const thumbnailsRef = useRef<HTMLDivElement>(null)

  // Filter out images that failed to load
  const validPhotos = photos.filter(photo => !imageLoadError[photo.id])

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === validPhotos.length - 1 ? 0 : prevIndex + 1))
  }, [validPhotos.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? validPhotos.length - 1 : prevIndex - 1))
  }, [validPhotos.length])

  // Handle image load errors
  const handleImageError = (id: string) => {
    setImageLoadError(prev => ({
      ...prev,
      [id]: true
    }))
  }

  // Autoplay functionality
  useEffect(() => {
    if (isAutoplay) {
      autoplayRef.current = setInterval(nextSlide, 4000)
    }
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [isAutoplay, nextSlide])

  // Reset autoplay when slide changes manually
  useEffect(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
    }
    if (isAutoplay) {
      autoplayRef.current = setInterval(nextSlide, 4000)
    }
  }, [currentIndex, isAutoplay, nextSlide])

  // Pause autoplay when mouse enters the gallery
  const handleMouseEnter = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
    }
  }

  // Resume autoplay when mouse leaves the gallery
  const handleMouseLeave = () => {
    if (isAutoplay) {
      autoplayRef.current = setInterval(nextSlide, 4000)
    }
  }

  // Scroll the thumbnail of the current slide into view
  useEffect(() => {
    if (thumbnailsRef.current) {
      const thumbnailItem = thumbnailsRef.current.children[currentIndex] as HTMLElement
      if (thumbnailItem) {
        thumbnailsRef.current.scrollTo({
          left: thumbnailItem.offsetLeft - thumbnailsRef.current.offsetWidth / 2 + thumbnailItem.offsetWidth / 2,
          behavior: "smooth",
        })
      }
    }
  }, [currentIndex])

  // Handle touch events for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 150) {
      // Swipe left
      nextSlide()
    }

    if (touchStart - touchEnd < -150) {
      // Swipe right
      prevSlide()
    }
  }

  // Handle keydown events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFullscreen) {
        if (e.key === "ArrowRight") nextSlide()
        if (e.key === "ArrowLeft") prevSlide()
        if (e.key === "Escape") setIsFullscreen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isFullscreen, nextSlide, prevSlide])

  // Variant for animation
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
      },
    }),
  }

  const [direction, setDirection] = useState(0)

  const handleThumbnailClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const toggleAutoplay = () => {
    setIsAutoplay(!isAutoplay)
  }

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Gallery</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse through our project gallery showcasing our quality work and technical excellence in gabion solutions.
          </p>
        </div>

        {/* Main Gallery Slideshow */}
        <div 
          className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : ''} overflow-hidden`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          ref={galleryRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className={`relative ${isFullscreen ? 'h-screen' : 'h-[60vh] md:h-[70vh]'} overflow-hidden rounded-xl`}>
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={validPhotos[currentIndex].src}
                    alt={validPhotos[currentIndex].alt}
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                    priority={currentIndex < 5}
                    onError={() => handleImageError(validPhotos[currentIndex].id)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="absolute inset-0 flex items-center justify-between p-4">
              <button
                onClick={() => {
                  setDirection(-1)
                  prevSlide()
                }}
                className="bg-white/80 text-gray-800 p-2 rounded-full hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={() => {
                  setDirection(1)
                  nextSlide()
                }}
                className="bg-white/80 text-gray-800 p-2 rounded-full hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
                aria-label="Next slide"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Status bar */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center p-4 text-white">
              <div className="bg-black/50 rounded-full px-3 py-1 text-sm">
                {currentIndex + 1} / {validPhotos.length}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={toggleAutoplay}
                  className={`p-2 rounded-full ${isAutoplay ? 'bg-emerald-500' : 'bg-gray-500'} text-white transition-colors`}
                  aria-label={isAutoplay ? "Pause slideshow" : "Play slideshow"}
                >
                  {isAutoplay ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="p-2 rounded-full bg-gray-800/70 text-white hover:bg-gray-800 transition-colors"
                  aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                  {isFullscreen ? <X className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Thumbnails */}
          <div 
            className={`thumbnails-container mt-4 overflow-x-auto pb-2 hide-scrollbar ${isFullscreen ? 'absolute bottom-0 left-0 right-0 bg-black/80' : ''}`}
            ref={thumbnailsRef}
          >
            <div className="flex space-x-2 px-2">
              {validPhotos.map((photo, index) => (
                <div
                  key={photo.id}
                  className={`thumbnail-item cursor-pointer flex-shrink-0 transition-all duration-300 ${
                    currentIndex === index ? "ring-4 ring-emerald-500 scale-110" : "ring-1 ring-gray-200 opacity-70"
                  }`}
                  onClick={() => handleThumbnailClick(index)}
                >
                  <div className="relative w-20 h-16 md:w-24 md:h-20 overflow-hidden rounded-md">
                    <Image
                      src={photo.src}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 80px, 96px"
                      className="object-cover"
                      onError={() => handleImageError(photo.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        /* Hide scrollbar for IE, Edge and Firefox */
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        
        .thumbnails-container {
          scroll-behavior: smooth;
          scroll-snap-type: x mandatory;
        }
        
        .thumbnail-item {
          scroll-snap-align: center;
        }
      `}</style>
    </section>
  )
} 
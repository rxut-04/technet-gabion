"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { ChevronLeft, ChevronRight, ExternalLink, Layers, Shield, 
         Waves, PaintBucket, Mountain, ArrowRight } from "lucide-react"
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"

// Service icons mapping
const serviceIcons = {
  1: <Layers className="h-7 w-7 text-emerald-600" />,
  2: <Waves className="h-7 w-7 text-emerald-600" />,
  3: <Shield className="h-7 w-7 text-emerald-600" />,
}

const services = [
  {
    id: 1,
    image: "/images/service2.png",
    title: "Gabion Retaining Wall",
    description:
      "Turn-Key Gabion Retaining Wall solutions from Need Based Geological Survey to Technical Installation/Commissioning of Reliable Gabion Retaining Walls and Structures using Mechanically Woven Double Twist Hexagonal Opening (60x80,80x100 and 100x120mm) Gabions made out of Zn+PVC Coated wires of Dia 3.7mm(2.7mm+1mm PVC) for Box, Selvage 4.4mm(Dia 3.4mm+1mm PVC) & Lacing 3.2mm (2.2mm+1mm PVC) with combination of various size gabion boxes",
  },
  {
    id: 2,
    image: "/images/service1.png",
    title: "River Bank Protection Gabion",
    description:
      "Turn-Key Gabion Retaining Wall solutions for river bank erosion control from Need Based Geological Survey to Technical Installation/Commissioning of Reliable Gabion Retaining Walls and Structures using Gabion Mattresses and Gabion Boxes manufactured by Mechanically Woven Double Twist Hexagonal Opening (60x80,80x100 and 100x120mm) Gabions made out of Zn+PVC Coated wires of Dia 3.7mm(2.7mm+1mm PVC) for Box, Selvage 4.4mm(Dia 3.4mm+1mm PVC) & Lacing 3.2mm (2.2mm+1mm PVC) with combination of various size gabion boxes.",
  },
  {
    id: 3,
    image: "/images/service3.png",
    title: "Decorative Weld Mesh Gabion Fencing",
    description:
      "Decorative Gabion Fencing using Weld Mesh Gabion Boxes of different wire dmiameters, square openings and box sizes made out of Zn Coated wires",
  },
]

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [activeServiceId, setActiveServiceId] = useState<number | null>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [isFlipping, setIsFlipping] = useState(false)

  const handleViewDetails = (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent carousel interaction
    setIsFlipping(true);
    
    // Small delay to allow flip animation to start before showing content
    setTimeout(() => {
      setActiveServiceId(id);
      setIsFlipping(false);
    }, 150);
  }

  const handleBackToService = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent carousel interaction
    setIsFlipping(true);
    
    // Small delay to allow flip animation to start before hiding content
    setTimeout(() => {
      setActiveServiceId(null);
      setIsFlipping(false);
    }, 150);
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  // Card hover animation
  const cardVariants = {
    initial: { 
      y: 0,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
    },
    hover: { 
      y: -8, 
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
    }
  }

  return (
    <section id="services" className="py-24 bg-[#F0FAF0]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-heading text-gray-800 relative inline-block">
            Our Services
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-emerald-500 rounded-full"></span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-8 text-lg">
            We provide comprehensive gabion solutions and civil services with a focus on quality, durability, and
            technical excellence.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="py-8">
              {services.map((service) => (
                <CarouselItem key={service.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <motion.div 
                    variants={itemVariants}
                    onHoverStart={() => activeServiceId !== service.id && setHoveredCard(service.id)}
                    onHoverEnd={() => setHoveredCard(null)}
                    className="relative h-[520px]"
                  >
                    <div className={`card-container ${activeServiceId === service.id ? 'flipped' : ''}`}>
                      {/* Front Card */}
                      <div className="card-face card-front">
                        <motion.div
                          initial="initial"
                          animate={hoveredCard === service.id ? "hover" : "initial"}
                          variants={cardVariants}
                          transition={{ duration: 0.3 }}
                          className="bg-[#F9F9F9] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full"
                        >
                          <div className="relative h-64 w-full">
                            <Image 
                              src={service.image} 
                              alt={service.title} 
                              fill 
                              className="object-cover transition-transform duration-500 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                          </div>
                          <div className="p-8">
                            <div className="flex items-start space-x-3 mb-4">
                              <div className="p-2 bg-emerald-100 rounded-lg">
                                {serviceIcons[service.id as keyof typeof serviceIcons]}
                              </div>
                              <h3 className="text-xl font-bold text-emerald-800 font-heading pt-1">{service.title}</h3>
                            </div>
                            <p className="text-gray-600 mb-6 line-clamp-2">
                              {service.description.substring(0, 100)}...
                            </p>
                            <Button 
                              onClick={(e) => handleViewDetails(service.id, e)}
                              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300 group hover:rounded-full"
                            >
                              View Details
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Button>
                          </div>
                        </motion.div>
                      </div>
                      
                      {/* Back Card (Details) */}
                      <div className="card-face card-back">
                        <div className="bg-emerald-50 rounded-xl overflow-hidden shadow-lg h-full p-8 border border-emerald-100">
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-emerald-100 rounded-lg">
                                {serviceIcons[service.id as keyof typeof serviceIcons]}
                              </div>
                              <h3 className="text-xl font-bold text-emerald-800 font-heading">{service.title}</h3>
                            </div>
                          </div>
                          <div className="overflow-y-auto pr-3 custom-scrollbar h-[300px] text-left service-content">
                            <p className="text-gray-700 leading-relaxed">{service.description}</p>
                          </div>
                          <div className="mt-6 text-right">
                            <Button 
                              onClick={handleBackToService}
                              variant="outline"
                              className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 transition-all duration-300"
                            >
                              Back to Service
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 hidden md:block">
              <CarouselPrevious className="h-12 w-12 bg-white/90 shadow-md border-none hover:bg-emerald-50 hover:text-emerald-600 text-gray-700" />
            </div>
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden md:block">
              <CarouselNext className="h-12 w-12 bg-white/90 shadow-md border-none hover:bg-emerald-50 hover:text-emerald-600 text-gray-700" />
            </div>
          </Carousel>
          
          {/* Mobile swipe indicator */}
          <div className="flex items-center justify-center gap-2 mt-8 md:hidden">
            <ChevronLeft className="h-6 w-6 text-emerald-600" />
            <span className="text-emerald-600 font-medium">Swipe to see more</span>
            <ChevronRight className="h-6 w-6 text-emerald-600" />
          </div>
        </motion.div>
      </div>
      
      <style jsx>{`
        .card-container {
          perspective: 1500px;
          height: 520px;
          width: 100%;
          position: relative;
          transition: transform 0.8s;
          transform-style: preserve-3d;
        }
        
        .card-container.flipped {
          transform: rotateY(180deg);
        }
        
        .card-face {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
        
        .card-front {
          transform: rotateY(0deg);
          z-index: 1;
        }
        
        .card-back {
          transform: rotateY(180deg);
          z-index: 0;
          overflow: hidden;
        }
        
        /* Remove the counter-rotation that's causing the reversed text */
        .card-back * {
          transform: none; 
        }
        
        /* Ensure scroll container properly handles touch events */
        .service-content {
          -webkit-overflow-scrolling: touch;
          touch-action: pan-y;
          transform: translateZ(0);
          will-change: scroll-position;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #e5e7eb;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #10b981;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #059669;
        }
      `}</style>
    </section>
  )
}
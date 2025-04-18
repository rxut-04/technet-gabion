"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"

// Define the structure for our projects data
interface ProjectSite {
  id: number;
  title: string;
  image: string;
  description: string;
  allImages?: string[];
}

interface LocationData {
  location: string;
  sections: {
    title: string;
    description: string;
    sites: ProjectSite[];
  }[];
}

// Project data organized by location
const projectData: LocationData[] = [
  {
    location: "SHIRDI",
    sections: [
      {
        title: "Decorative gabion wall",
        description: "We successfully completed a decorative weld mesh installation at Shirdi, enhancing both the safety and aesthetic appeal of the site. The project features precision-welded steel mesh panels with a modern design, providing durability and visual appeal. Completed efficiently and within budget, the installation adds a stylish and secure element to the surrounding environment.",
        sites: [
          {
            id: 1,
            title: "Decorative Gabion Wall Project",
            image: "/shirdi/IMG-20250331-WA0057.jpg",
            description: "Decorative gabion wall installation in Shirdi.",
            allImages: [
              "/shirdi/IMG-20250331-WA0057.jpg",
              "/shirdi/IMG-20250331-WA0003.jpg",
              "/shirdi/IMG-20250331-WA0061.jpg",
              "/shirdi/IMG-20250331-WA0062.jpg"
            ]
          }
        ]
      }
    ]
  },
  {
    location: "PUNE",
    sections: [
      {
        title: "Slope Retaining Wall",
        description: "We successfully completed a slope retaining wall project at Pune, designed to provide structural stability and prevent soil erosion on an inclined terrain. Using high-strength gabion baskets filled with quality stones, the wall offers both durability and a natural look. The project was executed efficiently, ensuring safety, longevity, and aesthetic integration with the surrounding landscape.",
        sites: [
          {
            id: 1,
            title: "Slope Retaining Wall Project",
            image: "/pune/IMG-20250331-WA0046.jpg",
            description: "Slope retaining wall project in Pune.",
            allImages: [
              "/pune/IMG-20250331-WA0046.jpg",
              "/pune/IMG-20250331-WA0047.jpg",
              "/pune/IMG-20250331-WA0044.jpg"
            ]
          }
        ]
      }
    ]
  },
  {
    location: "KARJAT",
    sections: [
      {
        title: "Site 1",
        description: "We successfully completed a gabion wall installation at Karjat, designed for effective erosion control and structural support. The wall features high-quality galvanized steel baskets filled with durable stones, offering both strength and a natural aesthetic. Completed on time and within budget, the project enhances the site's stability while blending seamlessly with the environment.",
        sites: [
          {
            id: 1,
            title: "Gabion Wall Project",
            image: "/karjat/gabionwall/IMG-20250127-WA0002.jpg",
            description: "Gabion wall installation at Karjat Site 1",
            allImages: [
              "/karjat/gabionwall/IMG-20250127-WA0002.jpg",
              "/karjat/gabionwall/IMG-20250127-WA0005.jpg",
              "/karjat/gabionwall/IMG-20250127-WA0008.jpg"
            ]
          }
        ]
      },
      {
        title: "Site 2",
        description: "We successfully completed a gabion wall installation at Karjat, designed for effective erosion control and structural support. The wall features high-quality galvanized steel baskets filled with durable stones, offering both strength and a natural aesthetic. Completed on time and within budget, the project enhances the site's stability while blending seamlessly with the environment.",
        sites: [
          {
            id: 1,
            title: "Retaining Wall Project",
            image: "/karjat/retainingwall/IMG-20250107-WA0043.jpg",
            description: "Retaining wall installation at Karjat Site 2",
            allImages: [
              "/karjat/retainingwall/IMG-20250107-WA0043.jpg",
              "/karjat/retainingwall/IMG-20250107-WA0037.jpg",
              "/karjat/retainingwall/IMG-20250107-WA0038.jpg"
            ]
          }
        ]
      },
      {
        title: "Site 3",
        description: "We successfully completed a road retaining wall installation at Karjat, aimed at reinforcing the roadside and preventing soil erosion and collapse. Constructed using heavy-duty gabion baskets filled with durable stones, the wall ensures long-term stability and safety for nearby infrastructure. The project was completed on time and within budget, blending structural strength with a natural appearance.",
        sites: [
          {
            id: 1,
            title: "Road Retaining Wall Project",
            image: "/karjat/roadretainingwall/IMG-20250331-WA0042.jpg",
            description: "Road retaining wall installation at Karjat Site 3",
            allImages: [
              "/karjat/roadretainingwall/IMG-20250331-WA0042.jpg",
              "/karjat/roadretainingwall/IMG-20250331-WA0041.jpg",
              "/karjat/roadretainingwall/IMG-20250331-WA0040.jpg"
            ]
          }
        ]
      }
    ]
  },
  {
    location: "IGATPURI",
    sections: [
      {
        title: "River Bank Protection",
        description: "We successfully completed a gabion wall installation for river bank protection at Igatpuri, aimed at preventing erosion and enhancing bank stability. The structure features galvanized steel gabion baskets filled with durable stones, ensuring long-term performance and a natural appearance. Delivered on schedule and within budget, the project provides reliable protection while complementing the surrounding landscape.",
        sites: [
          {
            id: 1,
            title: "River Bank Protection Project",
            image: "/igatpuri/riverbankprotection/IMG-20250331-WA0021.jpg",
            description: "River bank protection installation in Igatpuri.",
            allImages: [
              "/igatpuri/riverbankprotection/IMG-20250331-WA0021.jpg",
              "/igatpuri/riverbankprotection/IMG-20250331-WA0000.jpg",
              "/igatpuri/riverbankprotection/IMG-20250331-WA0004.jpg"
            ]
          }
        ]
      }
    ]
  }
];

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [activeLocation, setActiveLocation] = useState<string>("SHIRDI")
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null)
  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [isFlipping, setIsFlipping] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const autoSlideIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Find the current location data
  const currentLocation = projectData.find(location => location.location === activeLocation);
  const currentSection = currentLocation ? currentLocation.sections[activeSectionIndex] : null;
  
  // Auto rotate images
  useEffect(() => {
    // Clear any existing interval
    if (autoSlideIntervalRef.current) {
      clearInterval(autoSlideIntervalRef.current);
    }
    
    // Only start auto-rotation if we're not viewing details
    if (!activeProjectId && currentSection?.sites[0]?.allImages?.length > 1) {
      autoSlideIntervalRef.current = setInterval(() => {
        setCurrentImageIndex(prevIndex => {
          const imageArray = currentSection.sites[0].allImages || [];
          return (prevIndex + 1) % imageArray.length;
        });
      }, 3000); // Change image every 3 seconds
    }
    
    // Cleanup interval on component unmount or when dependencies change
    return () => {
      if (autoSlideIntervalRef.current) {
        clearInterval(autoSlideIntervalRef.current);
      }
    };
  }, [activeLocation, activeSectionIndex, activeProjectId, currentSection]);

  // Reset image index when changing locations or sections
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [activeLocation, activeSectionIndex]);

  const handleViewDetails = (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent any other interactions
    setIsFlipping(true);
    
    // Small delay to allow flip animation to start before showing content
    setTimeout(() => {
      setActiveProjectId(id);
      setIsFlipping(false);
    }, 150);
  }

  const handleBackToProject = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent any other interactions
    setIsFlipping(true);
    
    // Small delay to allow flip animation to start before hiding content
    setTimeout(() => {
      setActiveProjectId(null);
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

  // Handle tab changes for locations
  const handleLocationChange = (location: string) => {
    setActiveLocation(location);
    setActiveProjectId(null);
    setActiveSectionIndex(0);
  }

  // Handle section changes for locations with multiple sections (like Karjat)
  const handleSectionChange = (index: number) => {
    setActiveSectionIndex(index);
    setActiveProjectId(null);
  }

  const nextImage = (e: React.MouseEvent, images: string[]) => {
    e.stopPropagation();
    
    // Reset the auto-rotation timer when manually changing images
    if (autoSlideIntervalRef.current) {
      clearInterval(autoSlideIntervalRef.current);
      
      autoSlideIntervalRef.current = setInterval(() => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
      }, 3000);
    }
    
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent, images: string[]) => {
    e.stopPropagation();
    
    // Reset the auto-rotation timer when manually changing images
    if (autoSlideIntervalRef.current) {
      clearInterval(autoSlideIntervalRef.current);
      
      autoSlideIntervalRef.current = setInterval(() => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
      }, 3000);
    }
    
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <section id="projects" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-heading text-gray-800 relative inline-block">
            Our Projects
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-emerald-500 rounded-full"></span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-8 text-lg">
            Explore our portfolio of successful gabion installations and structural solutions across Maharashtra.
          </p>
        </div>

        <div className="w-full">
          <div className="flex justify-center mb-16 w-full px-2">
            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-2">
              {projectData.map((location) => (
                <button
                  key={location.location}
                  onClick={() => handleLocationChange(location.location)}
                  className={`px-2 md:px-6 py-3 text-xs md:text-base font-medium rounded-md transition-all duration-300 ${
                    activeLocation === location.location
                      ? "bg-emerald-600 text-white shadow-md"
                      : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {location.location}
                </button>
              ))}
            </div>
          </div>

          {projectData.map((location) => 
            location.location === activeLocation ? (
              <div key={location.location} className="mt-0">
                {/* For locations with multiple sections (like Karjat) */}
                {location.sections.length > 1 && (
                  <div className="flex justify-center mb-8 flex-wrap gap-2 px-2">
                    {location.sections.map((section, index) => (
                      <button
                        key={index}
                        onClick={() => handleSectionChange(index)}
                        className={`rounded-md px-3 md:px-6 py-2 md:py-3 text-xs md:text-base transition-all duration-300 ${
                          activeSectionIndex === index 
                            ? "bg-emerald-600 text-white shadow-md" 
                            : "bg-white text-emerald-600 border border-emerald-500 hover:bg-emerald-50"
                        }`}
                      >
                        {section.title}
                      </button>
                    ))}
                  </div>
                )}

                {/* Section Title and Description */}
                {currentSection && (
                  <div className="text-center mb-10">
                    <h3 className="text-2xl font-bold mb-4 text-emerald-800">
                      {location.location === "KARJAT" 
                        ? activeSectionIndex === 0 
                          ? "Gabion Wall Project" 
                          : activeSectionIndex === 1 
                            ? "Retaining Wall Project" 
                            : "Road Retaining Wall Project"
                        : currentSection.title}
                    </h3>
                  </div>
                )}

                {/* Project Cards Grid - Now with Carousel */}
                <motion.div
                  ref={ref}
                  variants={containerVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="relative"
                >
                  <Carousel className="w-full" opts={{ 
                    align: "start",
                    loop: false,
                    skipSnaps: false,
                    dragFree: false
                  }}>
                    <CarouselContent className="-ml-2 md:-ml-4">
                      {currentSection?.sites.map((site) => (
                        <CarouselItem key={site.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                          <motion.div 
                            variants={itemVariants}
                            onHoverStart={() => activeProjectId !== site.id && setHoveredCard(site.id)}
                            onHoverEnd={() => setHoveredCard(null)}
                            className="relative h-[520px]"
                          >
                            <div className={`card-container ${activeProjectId === site.id ? 'flipped' : ''}`}>
                              {/* Front Card */}
                              <div className="card-face card-front">
                                <motion.div
                                  initial="initial"
                                  animate={hoveredCard === site.id ? "hover" : "initial"}
                                  variants={cardVariants}
                                  transition={{ duration: 0.3 }}
                                  className="bg-[#F9F9F9] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full"
                                >
                                  <div className="relative h-64 w-full">
                                    {site.allImages ? (
                                      <>
                                        <Image 
                                          src={site.allImages[currentImageIndex]} 
                                          alt={site.title} 
                                          fill 
                                          className="object-cover transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                        
                                        {/* Image navigation arrows */}
                                        {site.allImages.length > 1 && (
                                          <>
                                            <button 
                                              onClick={(e) => prevImage(e, site.allImages)}
                                              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow-md z-10"
                                            >
                                              <ChevronLeft className="h-5 w-5 text-gray-700" />
                                            </button>
                                            <button 
                                              onClick={(e) => nextImage(e, site.allImages)}
                                              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow-md z-10"
                                            >
                                              <ChevronRight className="h-5 w-5 text-gray-700" />
                                            </button>
                                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                                              {site.allImages.map((_, idx) => (
                                                <div key={idx} className={`h-1.5 w-1.5 rounded-full ${idx === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}></div>
                                              ))}
                                            </div>
                                          </>
                                        )}
                                      </>
                                    ) : (
                                      <>
                                        <Image 
                                          src={site.image} 
                                          alt={site.title} 
                                          fill 
                                          className="object-cover transition-transform duration-500 hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                      </>
                                    )}
                                  </div>
                                  <div className="p-8">
                                    <div className="flex items-start mb-4">
                                      <h3 className="text-xl font-bold text-emerald-800 font-heading">{site.title}</h3>
                                    </div>
                                    <p className="text-gray-600 mb-6">
                                      {site.description}
                                    </p>
                                    <button 
                                      onClick={(e) => handleViewDetails(site.id, e)}
                                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300 group hover:rounded-full py-2 px-4 flex items-center justify-center"
                                    >
                                      View Details
                                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                    </button>
                                  </div>
                                </motion.div>
                              </div>
                              
                              {/* Back Card (Details) */}
                              <div className="card-face card-back">
                                <div className="bg-emerald-50 rounded-xl shadow-lg h-full border border-emerald-100 flex flex-col">
                                  <div className="flex items-center justify-between p-6 border-b border-emerald-100">
                                    <div className="flex items-center space-x-3">
                                      <h3 className="text-xl font-bold text-emerald-800 font-heading">{currentSection?.title} - {site.title}</h3>
                                    </div>
                                  </div>
                                  <div className="p-6 flex-1 overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-emerald-500 scrollbar-track-emerald-50">
                                    <p className="text-gray-700 leading-relaxed">{currentSection?.description}</p>
                                  </div>
                                  <div className="p-4 border-t border-emerald-100 text-right">
                                    <button 
                                      onClick={handleBackToProject}
                                      className="border border-emerald-500 text-emerald-600 hover:bg-emerald-50 transition-all duration-300 py-2 px-4 rounded-md"
                                    >
                                      Back to Project
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <div className="hidden md:block">
                      <CarouselPrevious className="absolute -left-8 top-1/2 -translate-y-1/2 h-10 w-10 bg-white/90 shadow-md border-none hover:bg-emerald-50 hover:text-emerald-600 text-gray-700" />
                      <CarouselNext className="absolute -right-8 top-1/2 -translate-y-1/2 h-10 w-10 bg-white/90 shadow-md border-none hover:bg-emerald-50 hover:text-emerald-600 text-gray-700" />
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
            ) : null
          )}
        </div>
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
        
        /* Scrollbar styling */
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        
        .scrollbar-thumb-emerald-500::-webkit-scrollbar-thumb {
          background: #10b981;
          border-radius: 10px;
        }
        
        .scrollbar-track-emerald-50::-webkit-scrollbar-track {
          background: #e5e7eb;
          border-radius: 10px;
        }
        
        /* For Firefox */
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #10b981 #e5e7eb;
        }
        
        /* For touch devices */
        @media (pointer: coarse) {
          .scroll-smooth {
            -webkit-overflow-scrolling: touch;
            scroll-behavior: smooth;
            overscroll-behavior: contain;
          }
        }
      `}</style>
    </section>
  )
}


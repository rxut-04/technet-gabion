"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Quote, Building2, Star } from "lucide-react"
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"

const team = [
  {
    id: 1,
    name: "Madhukar Shermale",
    role: "Proprietor",
    image: "/experts/expert1.jpg",
    experience: "10+ years of expertise in construction industry",
  },
  {
    id: 2,
    name: "Rohidas Khairnar",
    role: "Proprietor",
    image: "/experts/expert2.jpg",
    experience: "10+ years of expertise in gabion installation",
  }
]

const testimonials = [
  {
    id: 1,
    content:
      "The RockShield delivered exceptional quality on our hillside protection project. Their technical expertise and attention to detail were impressive.",
    author: "Rajiv Mehta",
    company: "Mehta Construction Ltd.",
    rating: 5,
  },
  {
    id: 2,
    content:
      "We've worked with The RockShield on multiple projects, and they consistently exceed our expectations with their quality and timely delivery.",
    author: "Sunita Patel",
    company: "Green Earth Developers",
    rating: 5,
  },
  {
    id: 3,
    content:
      "The team at The RockShield provided an excellent solution for our erosion control needs. Their engineering approach and quality of work are outstanding.",
    author: "Vikram Singh",
    company: "Highway Infrastructure Corp.",
    rating: 5,
  },
  {
    id: 4,
    content:
      "Professional team that provided innovative solutions for our challenging terrain. Their knowledge of gabion structures is unmatched in the industry.",
    author: "Amit Sharma",
    company: "Eco Solutions Ltd.",
    rating: 5,
  },
]

export default function Team() {
  const ref = useRef(null)
  const testimonialRef = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const isTestimonialInView = useInView(testimonialRef, { once: true, amount: 0.1 })
  const [hoveredTestimonial, setHoveredTestimonial] = useState<number | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  // Testimonial animations
  const testimonialContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const testimonialItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

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

  const renderStars = (rating: number) => {
    return Array(rating).fill(0).map((_, i) => (
      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
    ))
  }

  return (
    <section id="team" className="py-20 bg-[#F0FAF0]">
      <div className="container mx-auto px-4">
        {/* Team Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading relative inline-block">
            Our Expert Team
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-emerald-500 rounded-full"></span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-6 text-lg">
            Meet our team of experienced professionals dedicated to providing the highest quality gabion solutions and
            civil services.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 max-w-4xl mx-auto"
        >
          {team.map((member) => (
            <motion.div key={member.id} variants={itemVariants}>
              <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl">
                <div className="relative h-80 w-full">
                  <Image src={member.image} alt={member.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-emerald-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.experience}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Section */}
        <div className="py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-heading text-gray-800 relative inline-block">
              Client Testimonials
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-emerald-500 rounded-full"></span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-8 text-lg">
              What our satisfied clients say about our services and solutions.
            </p>
          </div>

          <motion.div
            ref={testimonialRef}
            variants={testimonialContainerVariants}
            initial="hidden"
            animate={isTestimonialInView ? "visible" : "hidden"}
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
                {testimonials.map((testimonial) => (
                  <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <motion.div
                      variants={testimonialItemVariants}
                      onHoverStart={() => setHoveredTestimonial(testimonial.id)}
                      onHoverEnd={() => setHoveredTestimonial(null)}
                    >
                      <motion.div
                        initial="initial"
                        animate={hoveredTestimonial === testimonial.id ? "hover" : "initial"}
                        variants={cardVariants}
                        transition={{ duration: 0.3 }}
                        className="bg-[#F9F9F9] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 p-8 h-full"
                      >
                        <div className="flex justify-between items-start mb-6">
                          <Quote className="h-10 w-10 text-emerald-500/40" />
                          <div className="flex">{renderStars(testimonial.rating)}</div>
                        </div>
                        
                        <p className="text-gray-700 mb-8 leading-relaxed text-lg">"{testimonial.content}"</p>
                        
                        <div className="flex items-center justify-between mt-auto border-t border-gray-100 pt-6">
                          <div>
                            <p className="font-bold text-gray-800 font-heading">{testimonial.author}</p>
                            <div className="flex items-center text-gray-500 text-sm mt-1">
                              <Building2 className="h-3 w-3 mr-1" />
                              <span>{testimonial.company}</span>
                            </div>
                          </div>
                          <div className="h-10 w-10 bg-emerald-50 rounded-full flex items-center justify-center">
                            <span className="text-emerald-600 font-bold">{testimonial.id}</span>
                          </div>
                        </div>
                      </motion.div>
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
      </div>
    </section>
  )
}


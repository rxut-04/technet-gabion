"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { X } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Gabion Retaining Wall",
    category: "Retaining Wall",
    image: "/placeholder.svg?height=600&width=800",
    description: "A 10m high gabion retaining wall installation for a commercial property.",
  },
  {
    id: 2,
    title: "Rock Fall Protection",
    category: "Protection",
    image: "/placeholder.svg?height=600&width=800",
    description: "Rock fall protection netting installed on a steep hillside.",
  },
  {
    id: 3,
    title: "Slope Protection",
    category: "Protection",
    image: "/placeholder.svg?height=600&width=800",
    description: "Slope protection gabions preventing erosion on a hillside.",
  },
  {
    id: 4,
    title: "Decorative Gabion Wall",
    category: "Decorative",
    image: "/placeholder.svg?height=600&width=800",
    description: "Decorative gabion wall for a residential landscape project.",
  },
  {
    id: 5,
    title: "Commercial Painting",
    category: "Painting",
    image: "/placeholder.svg?height=600&width=800",
    description: "External painting of a high-rise commercial building.",
  },
  {
    id: 6,
    title: "Erosion Control",
    category: "Protection",
    image: "/placeholder.svg?height=600&width=800",
    description: "Erosion control mattresses installed along a riverbank.",
  },
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [selectedProject, setSelectedProject] = useState<null | (typeof projects)[0]>(null)

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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Projects</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our portfolio of successful gabion installations, rock fall protection systems, and painting
            projects across various sectors.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="cursor-pointer group"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative overflow-hidden rounded-lg shadow-md">
                <div className="aspect-w-4 aspect-h-3">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="text-emerald-400 text-sm font-medium">{project.category}</span>
                  <h3 className="text-white text-xl font-bold">{project.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              onClick={() => setSelectedProject(null)}
            >
              <X size={20} />
            </button>
            <div className="relative h-[50vh]">
              <Image
                src={selectedProject.image || "/placeholder.svg"}
                alt={selectedProject.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">{selectedProject.title}</h3>
              <span className="inline-block bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                {selectedProject.category}
              </span>
              <p className="text-gray-700">{selectedProject.description}</p>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  )
}


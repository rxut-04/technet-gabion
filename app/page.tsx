import Hero from "@/components/hero"
import Services from "@/components/services"
import Projects from "@/components/projects"
import Team from "@/components/team"
import Gallery from "@/components/gallery"
import Contact from "@/components/contact"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Services />
      <Projects />
      <Team />
      <Gallery />
      <Contact />
    </main>
  )
}


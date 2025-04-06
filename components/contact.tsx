"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Phone, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const subjectRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const name = nameRef.current?.value || ""
    const email = emailRef.current?.value || ""
    const subject = subjectRef.current?.value || ""
    const message = messageRef.current?.value || ""

    // Format the message for WhatsApp
    const whatsappMessage = `*New Inquiry from Website*
*Name:* ${name}
*Email:* ${email}
*Subject:* ${subject}
*Message:* ${message}`

    // Create WhatsApp URL with formatted message
    const whatsappNumber = "919767913446" // Format: country code + number without +
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

    // Simulate brief loading before redirect
    setTimeout(() => {
      setIsSubmitting(false)
      window.open(whatsappURL, "_blank")
      setFormSubmitted(true)
    }, 800)
  }

  return (
    <section id="contact" className="py-20 bg-[#F0FAF0]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">Contact Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get in touch with our team for inquiries, quotes, or to discuss your project requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-lg shadow-md p-8">
              {formSubmitted ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 font-heading">Thank You!</h3>
                  <p className="text-gray-600">
                    Your message has been sent to WhatsApp. You can now continue the conversation there.
                  </p>
                  <Button className="mt-6 bg-emerald-600 hover:bg-emerald-700" onClick={() => setFormSubmitted(false)}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Full Name
                      </label>
                      <Input id="name" placeholder="Your name" required className="w-full" ref={nameRef} />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email Address
                      </label>
                      <Input id="email" type="email" placeholder="xyz@gmail.com" required className="w-full" ref={emailRef} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input id="subject" placeholder="How can we help you?" required className="w-full" ref={subjectRef} />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your project..."
                      required
                      className="min-h-[150px] w-full"
                      ref={messageRef}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Preparing WhatsApp Message...
                      </>
                    ) : (
                      "Get Quote"
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Phone Numbers */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-emerald-600 text-white rounded-lg shadow-md p-6 h-full max-w-sm">
              <h3 className="text-xl font-bold mb-4 font-heading">Get In Touch</h3>
              <div className="flex items-center mb-3">
                <Phone className="h-6 w-6 mr-3" />
                <h4 className="text-lg font-bold">Phone Numbers</h4>
              </div>
              <div className="space-y-2 text-left">
                <p className="text-emerald-50">+91 9767913446</p>
                <p className="text-emerald-50">+91 9922941668</p>
                <p className="text-emerald-50">+91 9923018090</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


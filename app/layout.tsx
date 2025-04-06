import type React from "react"
import "./globals.css"
import { Montserrat, Work_Sans } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"

const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
})

export const metadata = {
  title: "The RockShield - Gabion Wall & Rock Fall Protection Solutions in Maharashtra",
  description: "The RockShield offers premium gabion retaining walls, rock fall protection, and fencing solutions across Maharashtra. Specializing in durable gabion installations, erosion control, and structural stability.",
  keywords: "gabion wall, rock fall protection, retaining wall, river bank protection, gabion baskets, RCC retaining wall, fencing solutions, erosion control, Maharashtra, Karjat, Pune, Shirdi, Igatpuri",
  authors: [{ name: "The RockShield Enterprises" }],
  creator: "The RockShield Enterprises",
  publisher: "The RockShield Enterprises",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://therockshield.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "The RockShield - Gabion Wall & Rock Fall Protection Solutions",
    description: "Premium gabion installations, rock fall protection systems, and fencing solutions with expert technical excellence and engineering innovation.",
    siteName: 'The RockShield',
    images: [
      {
        url: '/images/logofinal.png',
        width: 800,
        height: 600,
        alt: 'The RockShield Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} ${workSans.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'
import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Poppins } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Ghassen Hammami | Private Chef & Culinary Artist",
  description:
    "Luxury private chef services offering unforgettable culinary experiences for private events and special occasions.",
    generator: 'Chiheb Amri'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        <meta name="theme-color" content="#8C6A5D" />
        <link rel="icon" href="/LogoBlanc.png" type="image/png" />
      </head>
      <body className={`${playfair.variable} ${poppins.variable} antialiased`}>{children}</body>
    </html>
  )
}



import './globals.css'

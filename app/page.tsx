"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  Award,
  Briefcase,
  ChevronDown,
  Download,
  Facebook,
  GraduationCap,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Star,
  Twitter,
  Utensils,
  X,
  Maximize as FiMaximize,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

// Mobile detection hook
const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return isMobile
}

export default function ChefPortfolio() {
  const isMobile = useMobile()
  // Refs for scroll animations and navigation
  const heroRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const dishesRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)
  const cvRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  // State for active section highlighting in navigation
  const [activeSection, setActiveSection] = useState("hero")
  const [menuOpen, setMenuOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  // State for animated dish details
  const [selectedDish, setSelectedDish] = useState<null | number>(null)

  // Parallax effect for hero section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 })
  const heroY = useTransform(smoothProgress, [0, 1], ["0%", "30%"])
  const heroOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0])
  const heroScale = useTransform(smoothProgress, [0, 0.5], [1, 1.1])

  // Parallax effect for accent elements
  const accentY1 = useTransform(smoothProgress, [0, 1], ["0%", "200%"])
  const accentY2 = useTransform(smoothProgress, [0, 1], ["0%", "100%"])

  // Mouse parallax for hero
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Handle scroll for navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHasScrolled(true)
      } else {
        setHasScrolled(false)
      }

      // Determine active section
      const sections = [
        { id: "hero", ref: heroRef },
        { id: "about", ref: aboutRef },
        { id: "dishes", ref: dishesRef },
        { id: "services", ref: servicesRef },
        { id: "testimonials", ref: testimonialsRef },
        { id: "cv", ref: cvRef },
        { id: "contact", ref: contactRef },
      ]

      const scrollPosition = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section.ref.current && section.ref.current.offsetTop <= scrollPosition) {
          setActiveSection(section.id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle swipe gestures for mobile tabs
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [activeServiceTab, setActiveServiceTab] = useState("dîner-privé")

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // Swipe left
      const tabs = ["dîner-privé", "catering", "chefs-table", "classes"]
      const currentIndex = tabs.indexOf(activeServiceTab)
      if (currentIndex < tabs.length - 1) {
        setActiveServiceTab(tabs[currentIndex + 1])
      }
    }

    if (touchStart - touchEnd < -100) {
      // Swipe right
      const tabs = ["dîner-privé", "catering", "chefs-table", "classes"]
      const currentIndex = tabs.indexOf(activeServiceTab)
      if (currentIndex > 0) {
        setActiveServiceTab(tabs[currentIndex - 1])
      }
    }
  }
  const [expanded, setExpanded] = useState<null | string>(null);
  const dishes = [
    { image: "/g1.png" },
    { image: "/g2.png" },
    { image: "/g3.png" },
    { image: "/g4.png" },
    { image: "/g5.png" },
    { image: "/g6.png" },
  ];


  // Services data with enhanced details
  const services = [
    {
      title: "dîner-privé",
      description:
        "Expériences culinaires exclusives dans le confort de votre maison, adaptées à vos préférences et besoins alimentaires.",
      icon: "🍽️",
      features: [
        "Planification de menu personnalisée",
        "Consultation pour accords mets-vins",
        "Service complet de mise en place et nettoyage",
        "2-8 invités recommandés",
      ],
    },
    {
      title: "Événements",
      description: "Solutions de traiteur sophistiquées pour occasions spéciales, événements d'entreprise et célébrations.",
      icon: "🥂",
      features: ["Options de menu personnalisables", "Personnel de service professionnel", "Présentation élégante", "10-100 invités"],
    },
    {
      title: "Table Exclusive",
      description:
        "Une expérience culinaire intime où vous pouvez observer chaque plat préparé et expliqué en détail.",
      icon: "👨‍🍳",
      features: [
        "Menu dégustation multi-services",
        "Démonstration culinaire interactive",
        "Accords mets-vins premium",
        "4-10 invités",
      ],
    },
    {
      title: "Cours de Cuisine",
      description: "Ateliers culinaires pratiques où vous apprendrez des techniques professionnelles et des recettes signature.",
      icon: "📝",
      features: [
        "Instruction basée sur les compétences",
        "Conseils pour l'approvisionnement en ingrédients",
        "Livret de recettes à emporter",
        "Sessions individuelles ou en groupe",
      ],
    },
    {
      title: "Consultation Menu",
      description:
        "Conseils d'experts pour les restaurants, hôtels ou établissements alimentaires souhaitant améliorer leurs offres.",
      icon: "📋",
      features: [
        "Développement et raffinement de menu",
        "Sessions de formation du personnel",
        "Planification de menu saisonnier",
        "Optimisation des coûts alimentaires",
      ],
    },
  ]

  // Testimonials data
  const testimonials = [
    {
      name: "Sophie Laurent",
      role: "Organisatrice d'Événements, Paris",
      quote:
        "Ghassen a transformé notre gala d'entreprise en un voyage gastronomique. Son attention aux détails et sa capacité à répondre à des exigences alimentaires diverses tout en maintenant des standards exquis étaient remarquables.",
      image: "/testimonial-1.jpg",
    },
    {
      name: "Jean-Pierre Moreau",
      role: "Client Privé",
      quote:
        "Avoir Ghassen pour préparer notre dîner d'anniversaire était incomparable. Chaque plat racontait une histoire, et sa présence élégante a ajouté à l'expérience sans perturber notre célébration.",
      image: "/testimonial-2.jpg",
    },
    {
      name: "Gabrielle Thompson",
      role: "Designer d'Intérieur & Passionnée de Gastronomie",
      quote:
        "L'expérience de la Table du Chef avec Ghassen était transformative. Sa connaissance des ingrédients, des techniques et de l'histoire culinaire a rendu la soirée aussi éducative que délicieuse.",
      image: "/testimonial-3.jpg",
    },
  ]

  // Timeline data with enhanced details
  const timeline = [
    {
      title: "Expérience Professionnelle",
      items: [
        {
          year: "2018-Présent",
          position: "Chef Exécutif & Propriétaire",
          place: "L'Étoile, Paris",
          description:
            "Deux étoiles Ghassenin décernées en 2020. Restaurant signature axé sur la cuisine française contemporaine avec des influences mondiales. Responsable du développement des menus, de la gestion de la cuisine et du maintien des normes culinaires les plus élevées.",
          achievements: [
            "Deux étoiles Ghassenin (2020-Présent)",
            "Chef de l'Année, Le Guide Culinaire (2021)",
            "Prix de l'Innovation en Gastronomie (2022)",
          ],
        },
        {
          year: "2015-2018",
          position: "Chef de Cuisine",
          place: "Le Jardin, Lyon",
          description:
            "Restaurant une étoile Ghassenin spécialisé dans la cuisine de la ferme à la table. Dirigé une équipe de 12 chefs, conçu des menus saisonniers et établi des partenariats d'approvisionnement durable avec des producteurs locaux.",
          achievements: ["Une étoile Ghassenin (2016-2018)", "Prix de la Gastronomie Durable (2017)"],
        },
        {
          year: "2012-2015",
          position: "Sous-Chef",
          place: "La Mer, Monaco",
          description:
            "Établissement trois étoiles Ghassenin sous la direction du Chef Antoine Laurent. Spécialisé dans les fruits de mer et la cuisine méditerranéenne, géré la station poisson et fruits de mer, et participé au développement des menus.",
          achievements: [
            "Partie de l'équipe maintenant trois étoiles Ghassenin",
            "Meilleur Restaurant de Fruits de Mer, Monaco Gastronomy Awards (2014)",
          ],
        },
      ],
    },
    {
      title: "Formation & Éducation Culinaire",
      items: [
        {
          year: "2008-2012",
          position: "Diplôme en Arts Culinaires",
          place: "Le Cordon Bleu, Paris",
          description:
            "Diplômé avec les plus grands honneurs. Formation complète en technique française classique, arts de la pâtisserie et innovation culinaire moderne. Reçu le Grand Diplôme.",
          achievements: ["Major de promotion", "Prix d'Excellence en Pâtisserie"],
        },
        {
          year: "2010-2011",
          position: "Apprentissage",
          place: "Sous le Chef Alain Ducasse",
          description:
            "Formation spécialisée en haute cuisine française sous la tutelle de l'un des chefs les plus renommés au monde. Accent sur la précision, la qualité des ingrédients et le développement des saveurs.",
          achievements: ["Sélectionné parmi plus de 200 candidats", "Reconnu pour un développement exceptionnel des compétences"],
        },
        {
          year: "2011",
          position: "Formation Spécialisée",
          place: "Tokyo, Japon",
          description:
            "Formation intensive de trois mois sur les techniques culinaires japonaises, avec un accent sur les compétences au couteau, la préparation du poisson et les principes de la saveur umami.",
          achievements: ["Certificat en Préparation Avancée du Poisson", "Ambassadeur d'Échange Culturel"],
        },
      ],
    },
    {
      title: "Compétences & Expertise",
      items: [
        {
          description:
            "Cuisine Française : Techniques classiques avec des interprétations modernes. Spécialités incluent le travail des sauces et la cuisson des protéines.",
          achievements: [],
        },
        {
          description:
            "Gastronomie Moléculaire : Application de techniques scientifiques pour transformer les textures et les présentations tout en préservant les saveurs authentiques.",
          achievements: [],
        },
        {
          description:
            "Philosophie de la Ferme à la Table : Expertise en ingrédients saisonniers et en relations avec les producteurs artisanaux.",
          achievements: [],
        },
        {
          description: "Développement de Menu : Création d'expériences culinaires cohérentes qui équilibrent tradition et innovation.",
          achievements: [],
        },
        {
          description: "Accords Mets-Vins : Sommelier certifié avec une connaissance approfondie des régions viticoles et des principes d'accord.",
          achievements: [],
        },
      ],
    },
  ]

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
      ref.current?.scrollIntoView({ behavior: "smooth" })
      setMenuOpen(false)
    }

  return (
    <div className="bg-[#1A1A1A] text-[#EAEAEA] min-h-screen font-['Poppins',sans-serif] overflow-hidden pb-16 md:pb-0">
      {/* Decorative accent elements */}
      <motion.div
        className="fixed -right-24 top-1/4 w-40 h-40 rounded-full bg-[#ffbf00]/20 blur-3xl pointer-events-none z-0"
        style={{ y: accentY1 }}
      />
      <motion.div
        className="fixed -left-32 top-1/2 w-64 h-64 rounded-full bg-[#4E342E]/20 blur-3xl pointer-events-none z-0"
        style={{ y: accentY2 }}
      />

      {/* Sticky Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${hasScrolled ? "bg-[#1A1A1A]/90 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"}`}
      >
        <div className="container mx-auto px-4 md:px-8">
          <nav className="flex justify-between items-center">

        {/* Desktop Logo */}
        <div className="hidden lg:block">
          <Image
            src="/LogoBlanc.png"
            alt="Ghassen Hammami Logo"
            width={70}
            height={70}
            className="object-contain"
          />
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex space-x-10 justify-center items-center mx-auto">
          {[
            { name: "Accueil", ref: heroRef, id: "hero" },
            { name: "À propos", ref: aboutRef, id: "about" },
            { name: "Cuisine", ref: dishesRef, id: "dishes" },
            { name: "Services", ref: servicesRef, id: "services" },
            { name: "Parcours", ref: cvRef, id: "cv" },
            { name: "Contact", ref: contactRef, id: "contact" },
          ].map((item) => (
            <li key={item.name}>
              <button
          onClick={() => scrollToSection(item.ref)}
          className={`text-sm font-medium transition-colors relative ${activeSection === item.id ? "text-[#ffbf00]" : "text-[#EAEAEA] hover:text-[#ffbf00]"}`}
              >
          {item.name}
          {activeSection === item.id && (
            <motion.div
              className="absolute -bottom-2 left-0 w-full h-0.5 bg-[#ffbf00]"
              layoutId="navbar-indicator"
            />
          )}
              </button>
            </li>
          ))}
        </ul>


        <div className="flex items-center gap-3 ml-auto">
          <Button
            className="bg-[#ffbf00] hover:bg-[#4E342E] text-[#1A1A1A] hidden sm:flex"
            onClick={() => scrollToSection(contactRef)}
          >
            Réservez maintenant
          </Button>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-3 text-[#EAEAEA] hover:text-[#ffbf00] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {menuOpen ? (
          <X className="h-6 w-6" />
            ) : (
          <div className="w-6 flex flex-col gap-1.5">
            <span className="block w-full h-0.5 bg-current"></span>
            <span className="block w-3/4 h-0.5 bg-current ml-auto"></span>
            <span className="block w-full h-0.5 bg-current"></span>
          </div>
            )}
          </button>
        </div>
          </nav>
        </div>

        {/* Mobile Logo */}
        {isMobile && hasScrolled && (
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2">
        <Image
          src="/LogoBlanc.png"
          alt="Ghassen Hammami Logo"
          width={70}
          height={70}
          className="object-contain"
        />
          </div>
        )}

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
        <motion.div
          className="lg:hidden absolute top-full right-0 bg-[#1A1A1A] shadow-lg border-t border-[#ffbf00]/10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          style={{ width: "80%" }}
        >
          <div className="py-8 px-4">
            <ul className="space-y-6">
          {[
            { name: "Accueil", ref: heroRef, id: "hero" },
            { name: "À propos", ref: aboutRef, id: "about" },
            { name: "Cuisine", ref: dishesRef, id: "dishes" },
            { name: "Services", ref: servicesRef, id: "services" },
            { name: "Témoignages", ref: testimonialsRef, id: "testimonials" },
            { name: "Parcours", ref: cvRef, id: "cv" },
            { name: "Contact", ref: contactRef, id: "contact" },
          ].map((item) => (
            <li key={item.name}>
              <button
            onClick={() => scrollToSection(item.ref)}
            className={`text-base font-medium w-full text-left py-2 px-4 rounded-md transition-colors ${activeSection === item.id ? "bg-[#ffbf00]/10 text-[#ffbf00]" : "hover:bg-[#ffbf00]/5 text-[#EAEAEA]"}`}
              >
            {item.name}
              </button>
            </li>
          ))}
          <li>
            <Button
              className="w-full mt-2 bg-[#ffbf00] hover:bg-[#4E342E] text-[#1A1A1A]"
              onClick={() => scrollToSection(contactRef)}
            >
              Réservez une dégustation privée
            </Button>
          </li>
            </ul>
          </div>
        </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ marginTop: 0 }}
      >
        <motion.div
          className="absolute inset-0 z-0"
          style={{

            scale: heroScale,
            x: mousePosition.x * -0.2,
            y: mousePosition.y * -0.2,
          }}
      >
          <video
            src="/video.mp4"
            autoPlay
            loop
            muted
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#2A2A2A]/60 via-[#2A2A2A]/50 to-[#2A2A2A]/80 "></div>
        </motion.div>



        <motion.div
          className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block mb-6"
          >
          </motion.div>

            <motion.div
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src="/LogoBlanc.png"
                alt="Ghassen Hammami Logo"
                width={250}
                height={250}
                className="mx-auto object-contain"
              />
            </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-1 mb-6">
              <div className="h-px w-12 bg-[#ffbf00]/70"></div>
              <div className="text-[#ffbf00]">★</div>
              <div className="h-px w-12 bg-[#ffbf00]/70"></div>
            </div>
          </motion.div>

          <motion.h2
            className="text-xl md:text-2xl xl:text-3xl mb-8 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Chef Privé & Artiste Culinaire
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Créer des Expériences Culinaires Inoubliables pour des Clients Exigeants
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto px-4 sm:px-0"
          >
            <Button
              className="bg-[#ffbf00] hover:bg-[#ffbf00]/90 text-black px-6 py-5 sm:px-8 sm:py-6 text-base w-full sm:w-auto"
              onClick={() => scrollToSection(contactRef)}
            >
              Réservez une dégustation privée
            </Button>
            <Button
              variant="outline"
              className="border-white text-black hover:bg-white hover:text-[#2A2A2A] px-6 py-5 sm:px-8 sm:py-6 text-base w-full sm:w-auto"
              onClick={() => scrollToSection(dishesRef)}
            >
              Explorez Ma Cuisine
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          onClick={() => scrollToSection(aboutRef)}
          style={{ cursor: "pointer" }}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </motion.section>

      {/* About Section */}
      <section ref={aboutRef} className="py-20 md:py-32 container mx-auto px-4 relative z-10">
        <div className="absolute top-0 left-0 w-24 h-24 rounded-br-3xl border-r border-b border-[#ffbf00]/20 -z-10 opacity-70" />
        <div className="absolute bottom-0 right-0 w-40 h-40 rounded-tl-3xl border-l border-t border-[#ffbf00]/20 -z-10 opacity-70" />

        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-4 py-1 rounded-full bg-[#ffbf00]/10 text-[#ffbf00] text-sm mb-4">À propos</div>
          <h2 className="font-['Playfair_Display',serif] text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 ">
            L'Artiste Culinaire
          </h2>
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="h-px w-8 bg-[#ffbf00]/50"></div>
            <div className="w-2 h-2 rounded-full bg-[#ffbf00]"></div>
            <div className="h-px w-20 bg-[#ffbf00]/50"></div>
            <div className="w-2 h-2 rounded-full bg-[#ffbf00]"></div>
            <div className="h-px w-8 bg-[#ffbf00]/50"></div>
          </div>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-24 h-24 border border-[#ffbf00]/30 rounded-tl-2xl" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-[#ffbf00]/30 rounded-br-2xl" />

            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/chef1.png"
                alt="Portrait du Chef Ghassen Hammami"
                fill
                className="object-cover"
                style={{
                  objectPosition: "center",
                }}
              />
              <div className="absolute inset-0 bg-[#2A2A2A]/15 mix-blend-multiply" />
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#2A2A2A]/50 to-transparent" />
            </div>

            <motion.div
              className="absolute -bottom-8 -right-8 px-6 py-4 bg-white shadow-xl rounded-lg max-w-[200px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="flex items-center gap-1 mb-2">
                <Star className="w-4 h-4 fill-[#ffbf00] text-[#ffbf00]" />
                <Star className="w-4 h-4 fill-[#ffbf00] text-[#ffbf00]" />
                <Star className="w-4 h-4 fill-[#ffbf00] text-[#ffbf00]" />
              </div>
              <p className="text-sm italic font-light text-black">
                "Excellence étoilée Ghassenin dans chaque expérience de dîner privé."
              </p>
            </motion.div>
          </div>

          <div>
            <h3 className="font-['Playfair_Display',serif] text-3xl md:text-4xl font-bold mb-8 text-[#ffbf00]/90">
              <span className="text-[#ffbf00]">Passion,</span> Art <span className="text-[#ffbf00]">&</span>{" "}
              Expertise
            </h3>
            <p className="mb-6 text-lg leading-relaxed">
              Avec plus de 15 ans de maîtrise culinaire dans des établissements étoilés Ghassenin à travers l'Europe, j'apporte une passion et une précision inégalées à chaque assiette. Mon parcours à travers les cuisines de Paris, Lyon et Monaco a façonné une approche distinctive de la gastronomie qui honore la tradition tout en embrassant l'innovation.
            </p>
            <p className="mb-8 text-lg leading-relaxed">
              Ma philosophie culinaire se concentre sur le respect des ingrédients exceptionnels, en mettant en valeur leur essence naturelle tout en ajoutant des touches créatives qui surprennent et ravissent. Chaque plat raconte une histoire de provenance, de technique et d'art—un récit qui se déroule à chaque bouchée.
            </p>

            <div className="mt-10 space-y-10">
              <h3 className="font-['Playfair_Display',serif] text-2xl font-semibold mb-6 text-[#ffbf00]">
                Distinctions & Récompenses
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-white shadow-sm border border-[#ffbf00]/10 hover:shadow-md transition-shadow">
                  <Utensils className="w-5 h-5 text-[#ffbf00] mb-3" />
                  <h4 className="font-medium mb-1 text-black">Chef Étoilé Ghassenin</h4>
                  <p className="text-sm text-muted-foreground">2018-Présent</p>
                </div>
                <div className="p-6 rounded-xl bg-white shadow-sm border border-[#ffbf00]/10 hover:shadow-md transition-shadow">
                  <Utensils className="w-5 h-5 text-[#ffbf00] mb-3" />
                  <h4 className="font-medium mb-1 text-black">Maître de la Cuisine Française</h4>
                  <p className="text-sm text-muted-foreground">Excellence Certifiée</p>
                </div>
                <div className="p-6 rounded-xl bg-white shadow-sm border border-[#ffbf00]/10 hover:shadow-md transition-shadow">
                  <Utensils className="w-5 h-5 text-[#ffbf00] mb-3" />
                  <h4 className="font-medium mb-1 text-black">Prix d'Excellence Culinaire</h4>
                  <p className="text-sm text-muted-foreground">International, 2020</p>
                </div>
                <div className="p-6 rounded-xl bg-white shadow-sm border border-[#ffbf00]/10 hover:shadow-md transition-shadow">
                  <Utensils className="w-5 h-5 text-[#ffbf00] mb-3" />
                  <h4 className="font-medium mb-1 text-black">Sommelier Certifié</h4>
                  <p className="text-sm text-muted-foreground">Guilde Internationale</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

{/* Signature Dishes Section */}
    <section ref={dishesRef} className="py-20 md:py-32 bg-[#1A1A1A] text-white">
      <div className="container mx-auto px-4 text-center mb-20">
      <div className="inline-block px-4 py-1 rounded-full bg-[#ffbf00]/10 text-[#ffbf00] text-sm mb-4 ">
            Menu
          </div>
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-4">
          Plats Signatures
        </h2>

        <div className="flex items-center justify-center gap-2 mb-8">
            <div className="h-px w-8 bg-[#ffbf00]/50"></div>
            <div className="w-2 h-2 rounded-full bg-[#ffbf00]"></div>
            <Image src="/LogoMot.png" alt="sig" width={150} height={150}></Image>
            <div className="w-2 h-2 rounded-full bg-[#ffbf00]"></div>
            <div className="h-px w-8 bg-[#ffbf00]/50"></div>
          </div>
          <motion.div
                  className="px-4 py-2 text-[#ffbf00] rounded-md text-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {dishes.map((dish, index) => (
            <div key={index} className="relative">
              <div className="relative h-48">
                <Image
                  src={dish.image}
                  alt={`Plat ${index + 1}`}
                  fill
                  className="object-cover"
                />
                {/* Icon overlay */}
                <div
                  onClick={() => setExpanded(dish.image)}
                  className="absolute top-2 right-2 bg-white p-2 rounded-full cursor-pointer"
                >
                  <FiMaximize size={20} color="black" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button
            className="bg-[#ffbf00] hover:bg-[#4E342E] text-white px-6 py-3 text-lg"
            onClick={() => console.log("Voir la Galerie cliqué")}
          >
            Voir la Galerie
          </Button>
        </div>
        </motion.div>
      </div>

      {/* Expanded image overlay */}
      {expanded && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/70"
          onClick={() => setExpanded(null)}
        >
          <div className="relative w-11/12 max-w-3xl">
            <Image
              src={expanded}
              alt="Plat Agrandi"
              width={800}
              height={600}
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>


      {/* Services Section */}
      <section ref={servicesRef} className="py-20 md:py-32 container mx-auto px-4">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-4 py-1 rounded-full bg-[#ffbf00]/10 text-[#ffbf00] text-sm mb-4">
            Services
          </div>
          <h2 className="font-['Playfair_Display',serif] text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Expériences Culinaires
          </h2>
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="h-px w-8 bg-[#ffbf00]/50"></div>
            <div className="w-2 h-2 rounded-full bg-[#ffbf00]"></div>
            <div className="h-px w-20 bg-[#ffbf00]/50"></div>
            <div className="w-2 h-2 rounded-full bg-[#ffbf00]"></div>
            <div className="h-px w-8 bg-[#ffbf00]/50"></div>
          </div>
          <p className="max-w-2xl mx-auto text-lg">
            Services culinaires sur mesure conçus pour créer des expériences mémorables pour toute occasion.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {services.map((service, index) => (
            <button
              key={index}
              onClick={() => setActiveServiceTab(service.title.toLowerCase().replace(/\s+/g, "-"))}
              className={`px-4 py-2 rounded-md text-sm md:text-base ${
                activeServiceTab === service.title.toLowerCase().replace(/\s+/g, "-")
                  ? "bg-[#ffbf00] text-white"
                  : "bg-[#ECE7E1] text-[#4E342E] hover:bg-[#ffbf00]/10"
              }`}
            >
              {service.title}
            </button>
          ))}
        </div>

        {services.map((service, index) => (
          activeServiceTab === service.title.toLowerCase().replace(/\s+/g, "-") && (
            <motion.div
              key={index}
              className="grid md:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="order-2 md:order-1">
                <h3 className="font-['Playfair_Display',serif] text-3xl font-bold mb-6 text-[#4E342E]">
                  {service.title}
                </h3>
                <p className="text-lg mb-8">{service.description}</p>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-[#ffbf00]/10">
                  <h4 className="font-medium text-[#ffbf00] mb-4">Caractéristiques Clés</h4>
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <div className="mr-3 mt-1 w-1.5 h-1.5 rounded-full bg-[#ffbf00] "></div>
                        <span className="text-black">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <Button
                    className="bg-[#ffbf00] hover:bg-[#4E342E] text-white"
                    onClick={() => scrollToSection(contactRef)}
                  >
                    Renseignez-vous sur {service.title}
                  </Button>
                </div>
              </div>

              <div className="order-1 md:order-2 relative">
                <div className="absolute -top-6 -right-6 w-24 h-24 border border-[#ffbf00]/30 rounded-tr-2xl" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-[#ffbf00]/30 rounded-bl-2xl" />

                <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src={`/placeholder.svg`}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A2A2A]/60 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="inline-block text-4xl mb-2">{service.icon}</div>
                    <h3 className="font-['Playfair_Display',serif] text-2xl font-bold">{service.title}</h3>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        ))}

      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#ffbf00] -skew-y-2 -mt-10 -mb-10 -z-10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1 rounded-full bg-white/10 text-white text-sm mb-4">Témoignages</div>
            <h2 className="font-['Playfair_Display',serif] text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Expériences des Clients
            </h2>
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="h-px w-8 bg-white/30"></div>
              <div className="w-2 h-2 rounded-full bg-white/70"></div>
              <div className="h-px w-20 bg-white/30"></div>
              <div className="w-2 h-2 rounded-full bg-white/70"></div>
              <div className="h-px w-8 bg-white/30"></div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-xl overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="p-8">
                  <div className="flex items-center gap-1 mb-6 text-[#ffbf00]">
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                  </div>
                  <p className="italic text-lg mb-6 text-[#2A2A2A]/80 leading-relaxed">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-black">{testimonial.name}</h4>
                      <p className="text-sm text-[#2A2A2A]/60">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CV/Timeline Section */}
      <section ref={cvRef} className="py-20 md:py-32 container mx-auto px-4 bg-[#1B1B1B]  ">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-4 py-1 rounded-full bg-[#ffbf00]/10 text-[#ffbf00] text-sm mb-4">Parcours</div>
          <h2 className="font-['Playfair_Display',serif] text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Parcours Professionnel
          </h2>
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="h-px w-8 bg-[#ffbf00]/50"></div>
            <div className="w-2 h-2 rounded-full bg-[#ffbf00]"></div>
            <div className="h-px w-20 bg-[#ffbf00]/50"></div>
            <div className="w-2 h-2 rounded-full bg-[#ffbf00]"></div>
            <div className="h-px w-8 bg-[#ffbf00]/50"></div>
          </div>
          <p className="max-w-2xl mx-auto text-lg">
            Ma carrière culinaire m'a conduit à travers certaines des cuisines les plus prestigieuses du monde, chaque expérience façonnant mon approche de la nourriture et de l'hospitalité.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-['Playfair_Display',serif] text-2xl font-semibold mb-8 flex items-center">
              <Briefcase className="mr-3 text-[#ffbf00]" />
              Expérience & Éducation
            </h3>

            <div className="space-y-10">
              {[
                {
                  id: 1,
                  title: "Chef de Cuisine",
                  place: "Le Petit Jardin, Paris",
                  period: "2018 - Présent",
                  description:
                    "Diriger une équipe de 12 chefs dans un restaurant étoilé Ghassenin, créant des menus de dégustation saisonniers mettant en valeur les meilleurs ingrédients locaux.",
                  type: "work",
                  icon: <Briefcase className="text-[#ffbf00]" size={20} />,
                },
                {
                  id: 2,
                  title: "Sous-Chef Exécutif",
                  place: "The Grand Hotel, Londres",
                  period: "2015 - 2018",
                  description:
                    "Gérer les opérations de cuisine et le développement des menus pour un restaurant d'hôtel 5 étoiles, en répondant à des événements de haut niveau et à une clientèle internationale.",
                  type: "work",
                  icon: <Briefcase className="text-[#ffbf00]" size={20} />,
                },
                {
                  id: 3,
                  title: "Programme Culinaire Avancé",
                  place: "Le Cordon Bleu, Paris",
                  period: "2013 - 2014",
                  description:
                    "Formation spécialisée en techniques françaises classiques et innovations culinaires modernes sous la direction de chefs maîtres.",
                  type: "education",
                  icon: <GraduationCap className="text-[#ffbf00]" size={20} />,
                },
                {
                  id: 4,
                  title: "Chef Étoile Montante James Beard",
                  place: "Finaliste",
                  period: "2019",
                  description:
                    "Reconnu pour des approches innovantes de la cuisine classique et un engagement envers des pratiques de cuisine durables.",
                  type: "award",
                  icon: <Award className="text-[#ffbf00]" size={20} />,
                },
              ].map((exp, index) => (
                <motion.div
                  key={exp.id}
                  className="relative pl-10 border-l-2 border-[#ffbf00]/30"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="absolute left-[-10px] top-0 bg-white p-1 rounded-full">{exp.icon}</div>
                  <div>
                    <span className="inline-block px-3 py-1 bg-[#ffbf00]/20 text-[#ffbf00] text-xs rounded-md mb-2">
                      {exp.period}
                    </span>
                    <h4 className="font-['Playfair_Display',serif] text-xl font-semibold">{exp.title}</h4>
                    <p className="text-white mb-2">{exp.place}</p>
                    <p className="text-white">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-['Playfair_Display',serif] text-2xl font-semibold mb-8 flex items-center">
              <Award className="mr-3 text-[#ffbf00]" />
              Compétences & Expertise
            </h3>

            <div className="flex flex-wrap gap-2 mb-12">
              {[
                "Cuisine Française",
                "Saveurs Méditerranéennes",
                "Gastronomie Moléculaire",
                "De la Ferme à la Table",
                "Pratiques Durables",
                "Développement de Menu",
                "Accords Mets-Vins",
                "Arts de la Pâtisserie",
                "Leadership d'Équipe",
              ].map((skill, index) => (
                <motion.span
                  key={index}
                  className="px-4 py-2 bg-[#ffbf00]/10 text-[#ffbf00] rounded-md text-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            <motion.div
              className="p-8 border border-[#ffbf00]/30 rounded-xl bg-[#ECE7E1]/50 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h4 className="font-['Playfair_Display',serif] text-xl font-semibold mb-6">Qualifications Supplémentaires</h4>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#ffbf00] rounded-full mr-3"></div>
                  <span>Sommelier Certifié, Niveau 2</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#ffbf00] rounded-full mr-3"></div>
                  <span>Certification Avancée en Sécurité Alimentaire</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#ffbf00] rounded-full mr-3"></div>
                  <span>Gestion Durable de la Cuisine</span>
                </li>
              </ul>

              <div className="mt-8">
                <Button className="bg-[#ffbf00] hover:bg-[#4E342E] text-white">
                  <Download className="mr-2 h-4 w-4" /> Télécharger le CV Complet
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#4E342E] -z-10" />
        <div
          className="absolute top-0 right-0 w-full h-16 bg-[#ECE7E1] -z-10"
          style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1 rounded-full bg-white/10 text-white text-sm mb-4">Contact</div>
            <h2 className="font-['Playfair_Display',serif] text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Réservez Votre Expérience
            </h2>
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="h-px w-8 bg-white/30"></div>
              <div className="w-2 h-2 rounded-full bg-white/70"></div>
              <div className="h-px w-20 bg-white/30"></div>
              <div className="w-2 h-2 rounded-full bg-white/70"></div>
              <div className="h-px w-8 bg-white/30"></div>
            </div>
            <p className="max-w-2xl mx-auto text-lg text-white/80">
              Prêt à créer une expérience culinaire inoubliable ? Contactez-moi pour discuter de votre événement ou de vos besoins en matière de dîner privé.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-white/5 backdrop-blur-sm border-none text-white shadow-xl overflow-hidden">
                <div className="bg-[#ffbf00] py-8 px-6">
                  <h3 className="font-['Playfair_Display',serif] text-2xl font-bold mb-2">Contactez le Chef Ghassen</h3>
                  <p className="text-white/80">Remplissez le formulaire ci-dessous et je vous répondrai personnellement sous 24 heures.</p>
                </div>
                <CardContent className="p-6 lg:p-8">
                  <form
className="space-y-6"
onSubmit={(e) => {
  e.preventDefault();

  // Collect form data
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const phone = (document.getElementById("phone") as HTMLInputElement).value;
  const eventDate = (document.getElementById("event-date") as HTMLInputElement).value;
  const service = (document.querySelector(".select-trigger .select-value") as HTMLElement)?.innerText || "Non spécifié";
  const message = (document.getElementById("message") as HTMLTextAreaElement).value;

  // Format the WhatsApp message
  const whatsappMessage = `
    Bonjour, Chef Ghassen! 👨‍🍳
    - Nom : ${name}
    - Email : ${email}
    - Téléphone : ${phone}
    - Date de l'événement : ${eventDate}
    - Service préféré : ${service}
    - Message : ${message}
  `;

  // WhatsApp API URL
  const whatsappURL = `https://wa.me/+21653400440?text=${encodeURIComponent(whatsappMessage)}`;

  // Open WhatsApp
  window.open(whatsappURL, "_blank");
}}

                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-white">
                          Nom Complet
                        </Label>
                        <Input
                          id="name"
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          placeholder="Votre nom"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">
                          Adresse Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          placeholder="Votre email"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-white">
                          Numéro de Téléphone
                        </Label>
                        <Input
                          id="phone"
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          placeholder="Votre téléphone"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="event-date" className="text-white">
                          Date de l'Événement
                        </Label>
                        <Input
                          id="event-date"
                          type="date"
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service" className="text-white">
                        Service Préféré
                      </Label>
                      <Select>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Sélectionnez un service" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service, index) => (
                            <SelectItem key={index} value={service.title.toLowerCase().replace(/\s+/g, "-")}>
                              {service.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-white">
                        Votre Message
                      </Label>
                      <Textarea
                        id="message"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[120px]"
                        placeholder="Parlez-moi de votre événement ou de votre demande"
                      />
                    </div>
                    <Button className="w-full bg-white text-[#4E342E] hover:bg-white/90 hover:text-[#ffbf00]">
                      Envoyer le Message via WhatsApp
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              className="space-y-10"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div>
                <h3 className="font-['Playfair_Display',serif] text-2xl font-bold mb-8 text-white">
                  Informations de Contact
                </h3>
                <div className="grid gap-6">
                  <div className="flex items-center p-5 bg-white/10 rounded-lg border border-white/10">
                    <Phone className="mr-4 h-6 w-6 text-[#ffbf00]" />
                    <div>
                      <div className="text-sm text-white/60 mb-1">Téléphone</div>
                      <Link href="tel:+216XXXXXXXX" className="text-white hover:text-[#ffbf00] transition-colors">
                        +216 XXX XXX XX
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-center p-5 bg-white/10 rounded-lg border border-white/10">
                    <Mail className="mr-4 h-6 w-6 text-[#ffbf00]" />
                    <div>
                      <div className="text-sm text-white/60 mb-1">Email</div>
                      <Link
                        href="mailto:contact@ChefGhassen.com"
                        className="text-white hover:text-[#ffbf00] transition-colors"
                      >
                        contact@ChefGhassen.com
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-start p-5 bg-white/10 rounded-lg border border-white/10">
                    <MapPin className="mr-4 h-6 w-6 text-[#ffbf00] mt-1" />
                    <div>
                      <div className="text-sm text-white/60 mb-1">Zone de Service</div>
                      <p className="text-white">Disponible pour des événements à Tunisie et ses environs.</p>
                      <p className="text-white/70 text-sm mt-1">Réservations internationales considérées sur demande.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-['Playfair_Display',serif] text-2xl font-bold mb-8 text-white">
                  Suivez le Chef Ghassen
                </h3>
                <div className="flex space-x-4">
                  <Link href="#" className="bg-white/10 hover:bg-[#ffbf00] p-4 rounded-full transition-colors">
                    <Instagram className="h-6 w-6" />
                  </Link>
                  <Link href="#" className="bg-white/10 hover:bg-[#ffbf00] p-4 rounded-full transition-colors">
                    <Facebook className="h-6 w-6" />
                  </Link>
                  <Link href="#" className="bg-white/10 hover:bg-[#ffbf00] p-4 rounded-full transition-colors">
                    <Twitter className="h-6 w-6" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-[#2A2A2A] text-white relative">
        <div
          className="absolute top-0 left-0 w-full h-20 bg-[#4E342E] -z-10"
          style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
        />

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12">
            <div>
              <div className="font-['Playfair_Display',serif] text-3xl font-bold text-[#ffbf00] mb-4 flex items-center gap-3">
                <div className="bg-[#ffbf00] text-white w-10 h-10 rounded-full flex items-center justify-center text-sm">
                  GH
                </div>
                Ghassen Hammami
              </div>
              <p className="text-white/70">
                Chef étoilé Ghassen offrant des expériences de dîner privé exclusives, des services de traiteur et une éducation culinaire.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Liens Rapides</h4>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => scrollToSection(aboutRef)}
                    className="text-white/70 hover:text-[#ffbf00] transition-colors"
                  >
                    À propos
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection(dishesRef)}
                    className="text-white/70 hover:text-[#ffbf00] transition-colors"
                  >
                    Cuisine
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection(servicesRef)}
                    className="text-white/70 hover:text-[#ffbf00] transition-colors"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection(contactRef)}
                    className="text-white/70 hover:text-[#ffbf00] transition-colors"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>


          </div>

          <Separator className="bg-white/10 my-8" />

          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <p className="text-sm text-white/50">© {new Date().getFullYear()} Ghassen Hammami. Tous droits réservés.</p>
            </div>
            <div className="text-center md:text-right mb-6">
              <p className="text-sm italic text-white/50">Conçu avec passion pour la haute cuisine</p>
            </div>
            <div className="text-center md:text-right  ">
              <p className="text-sm text-white/50">Website designed by <a href="https://www.facebook.com/shihebamrii" target="_blank" className="text-black italic text-lg">Chiheb Amri</a></p>
            </div>
          </div>
        </div>
      </footer>


      {/* Mobile Scroll to Top Button */}
      {isMobile && hasScrolled && (
        <motion.button
          className="fixed bottom-20 right-4 p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-md z-40 border border-[#ffbf00]/20"
          onClick={() => scrollToSection(heroRef)}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          aria-label="Scroll to top"
        >
          <ChevronDown className="w-5 h-5 text-[#ffbf00] transform rotate-180" />
        </motion.button>
      )}
    </div>
  )
}


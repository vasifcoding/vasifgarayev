"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import { Star, ExternalLink, Terminal, Loader2 } from "lucide-react"

// --- 1. KENDİ PROJELERİNİ BURAYA EKLE ---
// repoName: GitHub'daki tam repo adın (Yıldız sayısını çekmek için)
const MY_PROJECTS = [
  {
    id: "p1",
    title: "neuraquiz",
    repoName: "neuraquiz", // GitHub'daki gerçek adı
    description: "gemini api entegrasyonlu, yapay zeka destekli dinamik test ve quiz uygulaması.",
    tags: ["next.js", "gemini-api", "tailwind", "vercel"],
    category: "fullstack",
    year: "2025",
    url: "https://neuraquiz.vercel.app" // Veya GitHub linki
  },
  {
    id: "p2",
    title: "react weather app",
    repoName: "react-weather-app",
    description: "a react application developed using the OpenWeatherMap API that displays current weather conditions and a 5-day forecast.",
    tags: ["react", "openweathermap", "tailwind","material-ui"],
    category: "frontend",
    year: "2025",
    url: "https://github.com/vasifcoding/react-weather-app"
  },
  {
    id: "p3",
    title: "ai chatbot",
    repoName: "ai-chatbot",
    description: "An AI-powered chatbot is a modern application that can interact with users in a natural way.",
    tags: ["next.js", "gemini-api", "tailwind", "vercel"],
    category: "fullstack",
    year: "2025",
    url: "https://github.com/vasifcoding/ai-chatbot"
  }
]

const CATEGORIES = ["all", "fullstack", "frontend", "backend"];

// --- PROJECT CARD COMPONENT ---
function ProjectCard({ project, index, liveStars }: { project: any; index: number; liveStars: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => window.open(project.url, '_blank')}
      className="group relative cursor-pointer"
    >
      <div className={`relative overflow-hidden rounded-xl border p-5 h-full transition-all duration-300 ${
          isHovered ? "border-cyan/30 bg-[#0a0a0a]/80 shadow-[0_0_40px_rgba(0,242,255,0.08)]" : "border-[#1a1a1a] bg-[#0a0a0a]/50"
      }`}>
        {isHovered && (
          <motion.div
            initial={{ top: "-10%" }} animate={{ top: "110%" }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-cyan/40 to-transparent z-10"
          />
        )}

        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-[9px] text-[#666666] uppercase tracking-wider">{project.year}</span>
              <span className="text-[#00ff88] bg-[#00ff88]/10 font-mono text-[9px] px-1.5 py-0.5 rounded">verified_origin</span>
            </div>
            <h3 className="font-sans text-lg font-medium text-[#e0e0e0] group-hover:text-cyan transition-colors lowercase">{project.title}</h3>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-1 font-mono text-[11px] text-[#666666]">
              <Star className={`w-3 h-3 ${liveStars > 0 ? "text-yellow-500 fill-yellow-500" : ""}`} />
              {liveStars}
            </div>
            <ExternalLink className="w-3 h-3 text-[#333] group-hover:text-cyan transition-colors" />
          </div>
        </div>

        <p className="font-mono text-[12px] text-[#999999] leading-relaxed mb-4 min-h-10 lowercase">{project.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag: string) => (
            <span key={tag} className="font-mono text-[10px] px-2 py-0.5 rounded border border-[#1a1a1a] text-cyan/70 bg-cyan/5">{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// --- MAIN PAGE ---
export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [starCounts, setStarCounts] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStars() {
      const counts: Record<string, number> = {}
      try {
        // Tüm projelerin yıldızlarını paralel çek
        await Promise.all(MY_PROJECTS.map(async (p) => {
          const res = await fetch(`https://api.github.com/repos/vasifgarayev/${p.repoName}`)
          const data = await res.json()
          counts[p.repoName] = data.stargazers_count || 0
        }))
        setStarCounts(counts)
      } catch (e) {
        console.error("Yıldızlar çekilemedi", e)
      } finally {
        setLoading(false)
      }
    }
    fetchStars()
  }, [])

  const filteredProjects = activeCategory === "all" 
    ? MY_PROJECTS 
    : MY_PROJECTS.filter(p => p.category === activeCategory)

  return (
    <div className="min-h-screen bg-[#050505] text-[#e0e0e0] pt-20 pb-24">
      <div className="px-4 sm:px-6 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 font-mono text-[10px] text-[#666666] mb-6">
          <Terminal className="w-3 h-3" />
          <span>root / curated_projects / v2.0</span>
          <span className="ml-auto text-cyan/50">● auth_level: user</span>
        </motion.div>

        <h1 className="text-3xl sm:text-5xl font-sans font-bold tracking-tighter mb-8 lowercase text-cyan">
          selected <span className="text-white">works</span>
        </h1>

        <div className="flex items-center gap-2 mb-12 border-y border-[#1a1a1a] py-4 overflow-x-auto">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`font-mono text-[11px] px-4 py-1.5 rounded-full transition-all ${activeCategory === cat ? "text-cyan bg-cyan/10 border border-cyan/30" : "text-[#666666]"}`}>
              {`{${cat}}`}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-cyan" /></div>
        ) : (
          <LayoutGroup>
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} liveStars={starCounts[project.repoName] || 0} />
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        )}
      </div>
    </div>
  )
}
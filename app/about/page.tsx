"use client"

import { motion } from "framer-motion"
import { useState, useRef, useEffect } from "react"

const skills = [
  { name: "next.js", level: 85, category: "frontend" },
  { name: "react", level: 90, category: "frontend" },
  { name: "php", level: 80, category: "backend" },
  { name: "tailwind css", level: 100, category: "frontend" },
  { name: "bootstrap", level: 100, category: "frontend" },
  { name: "express.js", level: 70, category: "backend" },
  { name: "node.js", level: 75, category: "backend" },
  { name: "prisma", level: 70, category: "backend" },
  { name: "mysql", level: 65, category: "backend" },
  { name: "mongodb", level: 60, category: "backend" },
  { name: "docker", level: 55, category: "devops" },
  { name: "git", level: 85, category: "devops" },
  { name: "linux", level: 60, category: "devops" },
  { name: "shadcn/ui", level: 90, category: "libraries" },
  { name: "material ui", level: 80, category: "libraries" },
]

function SkillChip({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const filled = Math.round(skill.level / 10)

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <div
        className={`relative overflow-hidden rounded-lg border px-4 py-3 font-mono text-sm transition-all duration-300 ${
          isHovered
            ? "border-cyan/40 bg-cyan/5 text-cyan shadow-[0_0_20px_rgba(0,242,255,0.1)]"
            : "border-[#1a1a1a] bg-[#0a0a0a]/50 text-[#e0e0e0]"
        }`}
      >
        {/* Border trace animation on hover */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div
              className="absolute inset-0 rounded-lg"
              style={{
                background: `conic-gradient(from 0deg, transparent, #00f2ff, transparent)`,
                mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
                maskComposite: "exclude",
                padding: "1px",
                animation: "spin 2s linear infinite",
              }}
            />
          </motion.div>
        )}

        <div className="relative z-10 flex flex-col gap-1.5">
          <span className="text-[12px]">{skill.name}</span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#666666]">
              [{"█".repeat(filled)}{"░".repeat(10 - filled)}]
            </span>
            <span className="text-[10px] text-cyan/60">{skill.level}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function BiometricFrame() {
  const [coords, setCoords] = useState({ lat: 39.14, long: 34.16 })

  useEffect(() => {
    const interval = setInterval(() => {
      setCoords({
        lat: 39.14 + (Math.random() - 0.5) * 0.001,
        long: 34.16 + (Math.random() - 0.5) * 0.001,
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-48 h-48 md:w-56 md:h-56 mx-auto"
    >
      {/* Technical frame */}
      <div className="absolute inset-0 border border-[#1a1a1a] rounded-lg">
        {/* Corner markers */}
        <div className="absolute -top-px -left-px w-4 h-4 border-t border-l border-cyan/40" />
        <div className="absolute -top-px -right-px w-4 h-4 border-t border-r border-cyan/40" />
        <div className="absolute -bottom-px -left-px w-4 h-4 border-b border-l border-cyan/40" />
        <div className="absolute -bottom-px -right-px w-4 h-4 border-b border-r border-cyan/40" />
      </div>

      {/* Inner content - avatar placeholder */}
      <div className="absolute inset-3 rounded bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
        <div className="text-center">
          <div className="text-4xl font-bold font-mono text-cyan/20">VG</div>
          <div className="font-mono text-[9px] text-[#666666] mt-1">biometric_scan</div>
        </div>
        {/* Scan line */}
        <motion.div
          animate={{ y: ["-100%", "200%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-px bg-linear-to-r from-transparent via-cyan/30 to-transparent"
        />
      </div>

      {/* Coordinate overlay */}
      <div className="absolute -bottom-6 left-0 right-0 text-center font-mono text-[9px] text-[#666666] tabular-nums">
        lat: {coords.lat.toFixed(4)} | long: {coords.long.toFixed(4)}
      </div>
    </motion.div>
  )
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
}

export default function AboutPage() {
  return (
    <div className="px-4 sm:px-6 max-w-5xl mx-auto pb-24 sm:pb-32">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-mono text-[10px] text-[#666666] uppercase tracking-wider mb-8 sm:mb-12"
      >
        {'// about — identity module'}
      </motion.div>

      {/* Bio Section */}
      <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center md:items-start mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex-1"
        >
          <h1           className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold tracking-tight mb-6 text-[#e0e0e0]">
            about me
          </h1>
          <div className="space-y-4 font-mono text-sm text-[#999999] leading-relaxed">
            <p>
              {"i'm a computer engineering student with a deep passion for building high-quality web applications. my focus spans across full-stack development, from crafting pixel-perfect interfaces to designing robust backend systems."}
            </p>
            <p>
              {"currently exploring the intersection of modern web frameworks and developer experience. i believe in writing clean, maintainable code that stands the test of time."}
            </p>
            <p>
              {"when i'm not coding, you'll find me diving into open source, experimenting with new tech stacks, or contributing to developer communities."}
            </p>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-8">
            {[
              { label: "projects", value: "15+" },
              { label: "experience", value: "6yr" },
              { label: "commits", value: "2k+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-3 rounded-lg border border-[#1a1a1a] bg-[#0a0a0a]/50">
                <div className="font-mono text-lg sm:text-xl font-bold text-cyan">{stat.value}</div>
                <div className="font-mono text-[10px] text-[#666666] mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="shrink-0 order-first md:order-last"
        >
          <BiometricFrame />
        </motion.div>
      </div>

      {/* Tech Stack */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-[10px] text-[#666666] uppercase tracking-wider mb-6"
        >
          {'// neural_modules — tech stack'}
        </motion.div>

        {["frontend", "backend", "devops", "libraries"].map((category) => (
          <div key={category} className="mb-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-[11px] text-cyan/40 uppercase tracking-wider mb-3"
            >
              {`> ${category}`}
            </motion.div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
            >
              {skills
                .filter((s) => s.category === category)
                .map((skill, i) => (
                  <SkillChip key={skill.name} skill={skill} index={i} />
                ))}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  )
}

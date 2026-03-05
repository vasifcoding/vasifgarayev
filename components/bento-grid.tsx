"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

function SystemUptime() {
  const [time, setTime] = useState("")

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      )
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col gap-3 h-full justify-between">
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] pulse-dot" />
        <span className="font-mono text-[10px] text-[#666666] uppercase tracking-wider">
          system uptime
        </span>
      </div>
      <div className="font-mono text-3xl md:text-4xl text-[#00f2ff] tabular-nums tracking-tighter">
        {time}
      </div>
      <div className="font-mono text-[10px] text-[#666666]">
        {'> all_systems_nominal'}
      </div>
    </div>
  )
}

function CurrentStack() {
  const stack = ["next.js", "react", "express.js", "tailwind", "prisma", "mysql"]

  return (
    <div className="flex flex-col gap-3 h-full">
      <span className="font-mono text-[10px] text-[#666666] uppercase tracking-wider">
        current_stack
      </span>
      <div className="flex flex-wrap gap-1.5">
        {stack.map((tech) => (
          <span
            key={tech}
            className="font-mono text-[11px] px-2 py-0.5 rounded border border-[#1a1a1a] text-[#00f2ff]/70 bg-[#00f2ff]/5"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  )
}

function FeaturedWork() {
  return (
    <Link href="/projects" data-magnetic className="block h-full group">
      <div className="flex flex-col gap-3 h-full justify-between">
        <span className="font-mono text-[10px] text-[#666666] uppercase tracking-wider">
          featured_work
        </span>
        <div>
          <div className="font-sans text-lg font-medium text-[#e0e0e0] group-hover:text-[#00f2ff] transition-colors">
            view all projects
          </div>
          <div className="font-mono text-[11px] text-[#666666] mt-1">
            {'> 3 archived entries'}
          </div>
        </div>
        <div className="font-mono text-[10px] text-[#00f2ff]/40 group-hover:text-[#00f2ff]/80 transition-colors">
          {'[click to explore] →'}
        </div>
      </div>
    </Link>
  )
}

function LocationInfo() {
  return (
    <div className="flex flex-col gap-2 h-full justify-between">
      <span className="font-mono text-[10px] text-[#666666] uppercase tracking-wider">
        location
      </span>
      <div className="font-mono text-sm text-[#e0e0e0]">
        kirsehir, turkey
      </div>
      <div className="font-mono text-[10px] text-[#666666]">
        lat: 39.14 | long: 34.16
      </div>
    </div>
  )
}

function GithubStatus() {
  return (
    <a
      href="https://github.com/vasifcoding"
      target="_blank"
      rel="noopener noreferrer"
      data-magnetic
      className="block h-full group"
    >
      <div className="flex flex-col gap-2 h-full justify-between">
        <span className="font-mono text-[10px] text-[#666666] uppercase tracking-wider">
          github
        </span>
        <div className="font-mono text-sm text-[#e0e0e0] group-hover:text-[#00f2ff] transition-colors">
          @vasifcoding
        </div>
        <div className="font-mono text-[10px] text-[#00f2ff]/40 group-hover:text-[#00f2ff]/80 transition-colors">
          {'[open profile] →'}
        </div>
      </div>
    </a>
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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

export function BentoGrid() {
  return (
    <section className="px-4 sm:px-6 pb-24 sm:pb-32 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-mono text-[10px] text-[#666666] uppercase tracking-wider mb-6"
      >
        {'// dashboard — system overview'}
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3"
      >
        {/* System Uptime - spans 2 cols */}
        <motion.div
          variants={itemVariants}
          className="sm:col-span-2 md:col-span-2 p-5 rounded-xl border border-[#1a1a1a] bg-[#0a0a0a]/50 hover:border-[#00f2ff]/10 hover:shadow-[0_0_30px_rgba(0,242,255,0.03)] transition-all duration-300"
        >
          <SystemUptime />
        </motion.div>

        {/* Location */}
        <motion.div
          variants={itemVariants}
          className="p-5 rounded-xl border border-[#1a1a1a] bg-[#0a0a0a]/50 hover:border-[#00f2ff]/10 hover:shadow-[0_0_30px_rgba(0,242,255,0.03)] transition-all duration-300"
        >
          <LocationInfo />
        </motion.div>

        {/* Current Stack */}
        <motion.div
          variants={itemVariants}
          className="p-5 rounded-xl border border-[#1a1a1a] bg-[#0a0a0a]/50 hover:border-[#00f2ff]/10 hover:shadow-[0_0_30px_rgba(0,242,255,0.03)] transition-all duration-300"
        >
          <CurrentStack />
        </motion.div>

        {/* Featured Work */}
        <motion.div
          variants={itemVariants}
          className="p-5 rounded-xl border border-[#1a1a1a] bg-[#0a0a0a]/50 hover:border-[#00f2ff]/10 hover:shadow-[0_0_30px_rgba(0,242,255,0.03)] transition-all duration-300"
        >
          <FeaturedWork />
        </motion.div>

        {/* GitHub */}
        <motion.div
          variants={itemVariants}
          className="p-5 rounded-xl border border-[#1a1a1a] bg-[#0a0a0a]/50 hover:border-[#00f2ff]/10 hover:shadow-[0_0_30px_rgba(0,242,255,0.03)] transition-all duration-300"
        >
          <GithubStatus />
        </motion.div>
      </motion.div>
    </section>
  )
}

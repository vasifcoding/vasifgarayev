"use client"

import { motion } from "framer-motion"
import { useRef } from "react"

export function GlitchText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div ref={ref} className={`glitch-hover relative inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
      <span
        className="glitch-r absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {text}
      </span>
      <span
        className="glitch-b absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {text}
      </span>
    </div>
  )
}

export function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[80vh] sm:min-h-[85vh] px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center gap-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-mono text-[11px] text-[#666666] tracking-widest uppercase"
        >
          {'// cyber-engineering os v2.1.0'}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-sans font-bold tracking-tighter text-balance"
        >
          <GlitchText text="vasif garayev" />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="font-mono text-sm text-[#666666] max-w-md"
        >
          computer engineering student / full-stack developer
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex items-center gap-3 font-mono text-[10px] text-[#666666] flex-wrap justify-center"
        >
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] pulse-dot" />
            available for work
          </span>
          <span className="text-[#1a1a1a]">|</span>
          <span>based in turkey</span>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 sm:bottom-12 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] text-[#666666]">scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-6 bg-gradient-to-b from-[#00f2ff]/40 to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

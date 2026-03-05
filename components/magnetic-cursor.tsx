"use client"

import { useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function MagneticCursor() {
  const cursorX = useMotionValue(-50)
  const cursorY = useMotionValue(-50)
  const springConfig = { damping: 25, stiffness: 250 }
  const x = useSpring(cursorX, springConfig)
  const y = useSpring(cursorY, springConfig)
  const scale = useSpring(1, springConfig)
  const isVisible = useRef(false)

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    const mq = window.matchMedia("(pointer: fine)")
    if (!mq.matches) return

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible.current) {
        isVisible.current = true
      }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-magnetic]")
      ) {
        scale.set(1.8)
      }
    }

    const handleMouseOut = () => {
      scale.set(1)
    }

    window.addEventListener("mousemove", moveCursor)
    document.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mouseout", handleMouseOut)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseout", handleMouseOut)
    }
  }, [cursorX, cursorY, scale])

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9998] hidden md:block"
      style={{
        x,
        y,
        scale,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <div className="w-5 h-5 rounded-full border border-[#00f2ff]/40 bg-[#00f2ff]/5 backdrop-blur-sm" />
    </motion.div>
  )
}

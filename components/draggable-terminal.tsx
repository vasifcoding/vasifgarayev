"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useDragControls } from "framer-motion"

const logMessages = [
  "> system_init...",
  "> booting vasif_os v2.1.0",
  "> loading kernel modules",
  "> fetching_github_data",
  "> location: kirsehir/tr",
  "> npm_install_success",
  "> compiling assets...",
  "> neural_stack: online",
  "> connection_secure: true",
  "> latency: 12ms",
  "> cache: warmed",
  "> uptime: 99.97%",
  "> all systems operational",
  "> awaiting_input...",
]

export function DraggableTerminal() {
  const [logs, setLogs] = useState<string[]>([])
  const [isMinimized, setIsMinimized] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const dragControls = useDragControls()
  const logIndex = useRef(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs((prev) => {
        const newLogs = [...prev, logMessages[logIndex.current % logMessages.length]]
        logIndex.current++
        if (newLogs.length > 20) newLogs.shift()
        return newLogs
      })
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [logs])

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragMomentum={false}
      dragElastic={0.05}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      className="fixed bottom-4 right-4 z-40 select-none hidden md:block"
      style={{ touchAction: "none" }}
    >
      <div className="w-72 rounded-lg border border-[#1a1a1a] bg-[#0a0a0a]/90 backdrop-blur-sm overflow-hidden shadow-[0_0_30px_rgba(0,242,255,0.03)]">
        <div
          onPointerDown={(e) => dragControls.start(e)}
          className="flex items-center justify-between px-3 py-1.5 border-b border-[#1a1a1a] cursor-grab active:cursor-grabbing"
        >
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
              <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
              <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
            </div>
            <span className="font-mono text-[10px] text-[#666666]">
              terminal — vasif_os
            </span>
          </div>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="font-mono text-[10px] text-[#666666] hover:text-[#00f2ff] transition-colors"
          >
            {isMinimized ? "[+]" : "[-]"}
          </button>
        </div>
        {!isMinimized && (
          <div
            ref={scrollRef}
            className="h-32 overflow-y-auto p-2 font-mono text-[11px] leading-relaxed"
          >
            {logs.map((log, i) => (
              <motion.div
                key={`${i}-${log}`}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className={`${
                  log.includes("success") || log.includes("operational")
                    ? "text-[#00ff88]"
                    : log.includes("error")
                    ? "text-[#ff5f56]"
                    : "text-[#00f2ff]/60"
                }`}
              >
                {log}
              </motion.div>
            ))}
            <span className="text-[#00f2ff] animate-pulse">_</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

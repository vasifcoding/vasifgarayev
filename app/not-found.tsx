"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="font-mono text-[10px] text-[#666666] uppercase tracking-wider">
          {'// error — 404'}
        </div>
        <h1 className="text-6xl font-sans font-bold tracking-tighter text-[#e0e0e0]">
          404
        </h1>
        <p className="font-mono text-sm text-[#666666]">
          {"route_not_found — the requested path does not exist in this system."}
        </p>
        <Link
          href="/"
          data-magnetic
          className="mt-4 px-4 py-2 rounded-lg border border-[#00f2ff]/20 bg-[#00f2ff]/5 font-mono text-sm text-[#00f2ff] hover:bg-[#00f2ff]/10 hover:border-[#00f2ff]/40 transition-all duration-300"
        >
          {"[return_home]"}
        </Link>
      </motion.div>
    </div>
  )
}

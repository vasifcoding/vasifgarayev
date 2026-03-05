"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

const links = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/projects", label: "projects" },
  { href: "/contact", label: "contact" },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 px-1.5 sm:px-2 py-2 rounded-xl border border-[#1a1a1a] bg-[#050505]/70 backdrop-blur-xl max-w-[calc(100vw-2rem)]"
    >
      <div className="flex items-center gap-0.5 sm:gap-1">
        {links.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              data-magnetic
              className={`relative px-2 sm:px-4 py-1.5 font-mono text-xs sm:text-sm transition-colors duration-200 rounded-lg whitespace-nowrap ${
                isActive
                  ? "text-cyan"
                  : "text-[#666666] hover:text-[#e0e0e0]"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-lg bg-cyan/5 border border-cyan/20"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">[{link.label}]</span>
            </Link>
          )
        })}
      </div>
      <div className="ml-2 sm:ml-3 hidden sm:flex items-center gap-1.5 pl-2 sm:pl-3 border-l border-[#1a1a1a]">
        <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] pulse-dot" />
        <span className="font-mono text-[10px] text-[#666666]">
          status: online
        </span>
      </div>
    </motion.nav>
  )
}

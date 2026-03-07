"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

type FormState = "idle" | "sending" | "success"

const sendingSequence = [
  "establishing_secure_tunnel...",
  "encrypting_payload...",
  "routing_through_proxy...",
  "transmitting_data...",
  "delivery_confirmed.",
]

export default function ContactPage() {
  const [formState, setFormState] = useState<FormState>("idle")
  const [sendingStep, setSendingStep] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  useEffect(() => {
    if (formState === "sending") {
      const intervals: NodeJS.Timeout[] = []

      sendingSequence.forEach((_, i) => {
        const timeout = setTimeout(() => {
          setSendingStep(i)
          if (i === sendingSequence.length - 1) {
            setTimeout(() => setFormState("success"), 800)
          }
        }, (i + 1) * 700)
        intervals.push(timeout)
      })

      return () => intervals.forEach(clearTimeout)
    }
  }, [formState])

// ContactPage.tsx içindeki handleSubmit kısmını bununla değiştir:
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!formData.name || !formData.email || !formData.message) return;

  setFormState("sending");
  setSendingStep(0);

  try {
    // API'ye asıl isteği gönderiyoruz
    const response = await fetch('/api/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error('Transmission failed');
    
    // Not: Animasyonlar zaten useEffect içinde setFormState("sending") olduğu için
    // otomatik oynamaya başlayacak. fetch bittiğinde animasyon devam edecek.
  } catch (error) {
    console.error(error);
    alert("System error: Transmission failed.");
    setFormState("idle");
  }
};

  const handleReset = () => {
    setFormState("idle")
    setFormData({ name: "", email: "", message: "" })
    setSendingStep(0)
  }

  return (
    <div className="px-4 sm:px-6 max-w-2xl mx-auto pb-24 sm:pb-32">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-mono text-[10px] text-[#666666] uppercase tracking-wider mb-6"
      >
        {'// contact — uplink protocol'}
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold tracking-tight mb-3 text-[#e0e0e0]"
      >
        get in touch
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="font-mono text-[12px] sm:text-sm text-[#666666] mb-8 sm:mb-12"
      >
        {"send a transmission through the secure channel below."}
      </motion.p>

      <AnimatePresence mode="wait">
        {formState === "idle" && (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] text-[#666666] uppercase tracking-wider">
                identifier
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="your name"
                required
                className="w-full px-4 py-3 rounded-lg border border-[#1a1a1a] bg-transparent font-mono text-sm text-[#e0e0e0] placeholder:text-[#333333] focus:border-cyan/30 focus:shadow-[0_0_20px_rgba(0,242,255,0.05)] focus:outline-none transition-all duration-300"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] text-[#666666] uppercase tracking-wider">
                return_address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@example.com"
                required
                className="w-full px-4 py-3 rounded-lg border border-[#1a1a1a] bg-transparent font-mono text-sm text-[#e0e0e0] placeholder:text-[#333333] focus:border-cyan/30 focus:shadow-[0_0_20px_rgba(0,242,255,0.05)] focus:outline-none transition-all duration-300"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] text-[#666666] uppercase tracking-wider">
                payload
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="your message..."
                required
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-[#1a1a1a] bg-transparent font-mono text-sm text-[#e0e0e0] placeholder:text-[#333333] focus:border-cyan/30 focus:shadow-[0_0_20px_rgba(0,242,255,0.05)] focus:outline-none transition-all duration-300 resize-none"
              />
            </div>

            <button
              type="submit"
              data-magnetic
              className="mt-2 px-6 py-3 rounded-lg border border-cyan/20 bg-cyan/5 font-mono text-sm text-cyan hover:bg-cyan/10 hover:border-cyan/40 hover:shadow-[0_0_30px_rgba(0,242,255,0.1)] transition-all duration-300"
            >
              {"[transmit_message]"}
            </button>
          </motion.form>
        )}

        {formState === "sending" && (
          <motion.div
            key="sending"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-2 p-6 rounded-xl border border-[#1a1a1a] bg-[#0a0a0a]/50"
          >
            <div className="font-mono text-[10px] text-[#666666] uppercase tracking-wider mb-2">
              transmission_log
            </div>
            {sendingSequence.map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -10 }}
                animate={{
                  opacity: i <= sendingStep ? 1 : 0.15,
                  x: i <= sendingStep ? 0 : -10,
                }}
                transition={{ duration: 0.3 }}
                className={`font-mono text-sm ${
                  i === sendingStep
                    ? step.includes("confirmed")
                      ? "text-[#00ff88]"
                      : "text-cyan"
                    : i < sendingStep
                    ? "text-[#666666]"
                    : "text-[#333333]"
                }`}
              >
                {">"} {step}
                {i === sendingStep && !step.includes("confirmed") && (
                  <span className="animate-pulse"> _</span>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {formState === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4 p-8 rounded-xl border border-[#00ff88]/20 bg-[#00ff88]/5 text-center"
          >
            <div className="w-8 h-8 rounded-full border border-[#00ff88]/40 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#00ff88]" />
            </div>
            <div className="font-mono text-sm text-[#00ff88]">
              transmission_successful
            </div>
            <div className="font-mono text-[12px] text-[#666666]">
              {"your message has been securely delivered. i'll respond as soon as possible."}
            </div>
            <button
              onClick={handleReset}
              data-magnetic
              className="mt-2 font-mono text-[11px] text-[#666666] hover:text-cyan transition-colors"
            >
              {"[send another]"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Social links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-12 sm:mt-16 flex items-center gap-4 sm:gap-6 flex-wrap"
      >
        <span className="font-mono text-[10px] text-[#666666] uppercase tracking-wider">
          alt_channels:
        </span>
        {[
          { label: "github", href: "https://github.com/vasifcoding" },
          { label: "linkedin", href: "https://linkedin.com/in/vasif-garayev-2004g" },
          { label: "email", href: "mailto:garayevvasif2004@gmail.com" },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic
            className="font-mono text-[11px] text-[#666666] hover:text-cyan transition-colors"
          >
            [{link.label}]
          </a>
        ))}
      </motion.div>
    </div>
  )
}

"use client";

import { ShoppingBag, Menu } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between"
    >
      <div className="absolute inset-0 glass opacity-80 -z-10" />
      
      <Link href="/" className="flex items-center gap-2">
        <div className="w-10 h-10 bg-lion-maroon rounded-full flex items-center justify-center text-golden-saffron font-bold text-xl">
          R
        </div>
        <span className="font-serif text-2xl font-bold tracking-tight text-lion-maroon">
          RasaVansa
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-8 font-sans text-sm font-semibold uppercase tracking-widest text-lion-maroon/70">
        <Link href="#origin" className="hover:text-lion-maroon transition-colors">Origin</Link>
        <Link href="#collection" className="hover:text-lion-maroon transition-colors">Collection</Link>
        <Link href="#heritage" className="hover:text-lion-maroon transition-colors">Heritage</Link>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-lion-maroon hover:bg-lion-maroon/5 rounded-full transition-colors">
          <ShoppingBag size={22} strokeWidth={1.5} />
          <span className="absolute top-1 right-1 w-4 h-4 bg-golden-saffron text-lion-maroon text-[10px] font-bold flex items-center justify-center rounded-full border border-surface-ivory">
            3
          </span>
        </button>
        <button className="md:hidden p-2 text-lion-maroon">
          <Menu size={24} />
        </button>
      </div>
    </motion.nav>
  );
}

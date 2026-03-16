"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const SPICES = [
  {
    id: "turmeric",
    name: "Kaha",
    english: "Pure Turmeric Gold",
    desc: "Sun-dried in the hills of Kandy, our turmeric is hand-milled to preserve its vibrant curcumin and earthy soul.",
    image: "/images/turmeric.png",
    price: "Rs. 290",
    color: "oklch(85% 0.18 85)",
  },
  {
    id: "chili",
    name: "Miris",
    english: "Crimson Pepper Crush",
    desc: "A dynasty of heat. Our chilies are slow-smoked over local cinnamon wood for a deep, royal bite.",
    image: "/images/chili.png",
    price: "Rs. 320",
    color: "oklch(55% 0.22 30)",
  },
  {
    id: "pepper",
    name: "Gambiris",
    english: "Black Pearl Pepper",
    desc: "The King of Spices. Hand-picked peppercorns from ancient vines, offering a sharp, sophisticated citrus peak.",
    image: "/images/pepper.png",
    price: "Rs. 450",
    color: "oklch(30% 0.05 200)",
  },
];

export default function Collection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);

  return (
    <section ref={targetRef} id="collection" className="relative h-[300vh] bg-surface-ivory">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-20 px-24">
          {/* Header Card */}
          <div className="flex-shrink-0 w-[400px] flex flex-col justify-center">
            <span className="font-sans text-xs font-bold tracking-[0.3em] uppercase text-lion-maroon/40 mb-4">The Selection</span>
            <h2 className="font-serif text-7xl font-bold text-lion-maroon leading-none mb-6">
              The <br /> <span className="text-golden-saffron italic">Dynasty</span> <br /> Spices
            </h2>
            <p className="font-sans text-lion-maroon/60 text-sm leading-relaxed max-w-xs">
              Hand-selected, traditionally processed, and packaged with royal precision. Experience the taste of Sri Lankan heritage.
            </p>
          </div>

          {/* Spice Cards */}
          {SPICES.map((spice) => (
            <div 
              key={spice.id}
              className="group flex-shrink-0 w-[500px] h-[600px] relative flex flex-col justify-end p-12 transition-all duration-700"
            >
              {/* Plinth / Base */}
              <div className="absolute inset-x-8 bottom-0 h-[450px] glass rounded-[2.5rem] opacity-40 -z-10 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
              
              {/* Product Image on Plinth */}
              <div className="absolute inset-0 flex items-center justify-center -translate-y-20 pointer-events-none">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="relative w-80 h-80 drop-shadow-[0_32px_64px_rgba(0,0,0,0.3)]"
                >
                  <Image 
                    src={spice.image} 
                    alt={spice.name} 
                    fill 
                    className="object-contain"
                  />
                </motion.div>
              </div>

              {/* Content */}
              <div className="relative z-10 transition-transform duration-700 group-hover:-translate-y-4">
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <h3 className="font-serif text-5xl font-bold text-lion-maroon">{spice.name}</h3>
                    <span className="font-sans text-xs font-bold tracking-widest uppercase text-lion-maroon/40">{spice.english}</span>
                  </div>
                  <span className="font-serif text-2xl font-bold text-golden-saffron">{spice.price}</span>
                </div>
                
                <p className="font-sans text-lion-maroon/70 text-sm leading-relaxed mb-8 max-w-[280px]">
                  {spice.desc}
                </p>

                <button className="w-full py-4 rounded-full border border-lion-maroon text-lion-maroon font-sans font-bold text-xs uppercase tracking-widest hover:bg-lion-maroon hover:text-surface-ivory transition-all duration-500">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Background Decorative Text */}
      <div className="absolute left-0 bottom-24 opacity-[0.03] select-none pointer-events-none">
        <span className="font-serif text-[400px] font-bold leading-none -rotate-12 inline-block">Ceylon</span>
      </div>
    </section>
  );
}

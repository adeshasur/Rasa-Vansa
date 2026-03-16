"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function Heritage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  return (
    <section ref={containerRef} id="heritage" className="relative min-h-[150vh] bg-lion-maroon py-32 overflow-hidden">
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          {/* Image Block */}
          <div className="lg:col-span-6 relative group">
            <div className="absolute -inset-4 border border-golden-saffron/20 rounded-[3rem] translate-x-8 translate-y-8 -z-10 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-1000" />
            
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden">
              <motion.div style={{ scale: imgScale }} className="w-full h-full">
                <Image 
                  src="/images/farmer.png" 
                  alt="Traditional Farmer" 
                  fill 
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-lion-maroon/80 via-transparent to-transparent" />
            </div>

            {/* Floating Stat */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute -right-8 bottom-12 glass p-8 rounded-3xl max-w-[200px]"
            >
              <span className="block font-serif text-4xl font-bold text-golden-saffron mb-1">100%</span>
              <p className="font-sans text-[10px] uppercase tracking-widest text-surface-ivory font-bold leading-tight">
                Organic & Traditionally Sourced
              </p>
            </motion.div>
          </div>

          {/* Text Block */}
          <div className="lg:col-span-6 flex flex-col gap-12">
            <motion.div style={{ y: textY }}>
              <span className="font-sans text-xs font-bold tracking-[0.3em] uppercase text-golden-saffron mb-6 block">Our Legacy</span>
              <h2 className="font-serif text-5xl md:text-7xl font-bold text-surface-ivory leading-tight mb-8">
                The Soil of <br /> <span className="text-golden-saffron italic">Lanka</span>
              </h2>
              <div className="flex flex-col gap-6 font-sans text-surface-ivory/70 text-lg leading-relaxed max-w-lg">
                <p>
                  Rooted in the ancient spice trails of Ceylon, RasaVansa is more than a brand—it is a dynasty of labor, love, and land.
                </p>
                <p className="text-surface-ivory font-medium italic">
                  "Every grain carries the rhythm of the mountain rain and the warmth of the island sun."
                </p>
                <p>
                  We partner directly with family farms that have practiced regenerative agriculture for generations, ensuring that every packet you open is as pure as the earth it came from.
                </p>
              </div>

              <div className="mt-12 flex items-center gap-8">
                <div className="flex flex-col">
                  <span className="font-serif text-2xl font-bold text-golden-saffron">Hand-milled</span>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-surface-ivory/40">Process</span>
                </div>
                <div className="w-px h-10 bg-surface-ivory/20" />
                <div className="flex flex-col">
                  <span className="font-serif text-2xl font-bold text-golden-saffron">Direct Trade</span>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-surface-ivory/40">Sourcing</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Large Decorative Vertical Text */}
      <div className="absolute right-[-10%] top-0 h-full flex items-center select-none pointer-events-none opacity-5">
        <span className="font-serif text-[20vw] font-bold text-surface-ivory uppercase rotate-90 origin-center whitespace-nowrap">
          Heritage
        </span>
      </div>
    </section>
  );
}

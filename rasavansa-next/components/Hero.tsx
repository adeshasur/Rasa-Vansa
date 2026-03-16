"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    // Split text effect (simple version using chars)
    const text = titleRef.current.innerText;
    titleRef.current.innerHTML = text
      .split("")
      .map((char) => `<span class="inline-block translate-y-[120%]">${char === " " ? "&nbsp;" : char}</span>`)
      .join("");

    const chars = titleRef.current.querySelectorAll("span");

    gsap.to(chars, {
      y: 0,
      stagger: 0.05,
      delay: 0.5,
      duration: 1,
      ease: "power4.out",
    });

    gsap.fromTo(subtitleRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, delay: 1.5, duration: 1.2, ease: "power3.out" }
    );
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const cloud1Y = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const cloud2Y = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section 
      ref={containerRef}
      id="origin"
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Layer */}
      <motion.div 
        style={{ scale: heroScale }}
        className="absolute inset-0 z-0"
      >
        <Image 
          src="/images/hero.png" 
          alt="Sri Lankan spice gardens" 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-lion-maroon/80 via-lion-maroon/40 to-surface-ivory" />
      </motion.div>

      {/* Parallax Spice Clouds (Decorative) */}
      <motion.div 
        style={{ y: cloud1Y }}
        className="absolute -left-20 top-1/4 w-96 h-96 opacity-30 mix-blend-screen pointer-events-none z-10"
      >
        <Image src="/images/turmeric.png" alt="" width={400} height={400} className="blur-2xl" />
      </motion.div>
      
      <motion.div 
        style={{ y: cloud2Y }}
        className="absolute -right-20 bottom-1/4 w-80 h-80 opacity-20 mix-blend-screen pointer-events-none z-10"
      >
        <Image src="/images/chili.png" alt="" width={300} height={300} className="blur-3xl" />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl pt-20">
        <span className="inline-block font-sans text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-golden-saffron mb-4 overflow-hidden">
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="block"
          >
            A Legacy of Flavor
          </motion.span>
        </span>
        
        <h1 
          ref={titleRef}
          className="font-serif text-6xl md:text-9xl font-bold leading-[0.85] text-surface-ivory mb-8 drop-shadow-2xl"
        >
          RasaVansa
        </h1>

        <div className="flex flex-col items-center gap-6">
          <span 
            ref={subtitleRef}
            className="font-serif italic text-xl md:text-3xl text-surface-ivory/80 max-w-2xl leading-relaxed"
          >
            The Dynasty of Pure Sri Lankan Flavor
          </span>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            <button className="bg-golden-saffron text-lion-maroon font-sans font-extrabold text-sm uppercase tracking-widest px-10 py-5 rounded-full hover:scale-105 transition-transform shadow-sh-lg border border-golden-saffron-l">
              Gedaratama Gennaganna
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest text-surface-ivory/60 font-bold">Discover</span>
        <div className="w-px h-12 bg-gradient-to-b from-surface-ivory/60 to-transparent" />
      </motion.div>
    </section>
  );
}

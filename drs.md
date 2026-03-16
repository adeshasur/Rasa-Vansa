# Design Requirement Specification: RasaVansa - The Sri Lankan Spice Dynasty (2026)

## 1. Project Identity & Vision
**Business Name:** RasaVansa (Flavor Dynasty)  
**Niche:** Premium Spice Packets (Turmeric, Chili, Black Pepper)  
**Goal:** Creating a modern, high-conversion e-store for local Sri Lankan customers while maintaining a deep cultural connection ("Sri Lankan Gathiya").

## 2. Visual Architecture (Tailwind CSS v4 Focus)
The design will avoid the "dated" look by using glassmorphism, fluid typography, and dynamic spacing.

### Color Palette (National Flag Inspired)
- **Primary (Lion Maroon):** `oklch(45% 0.15 20)` - For headers, primary branding, and depth.
- **Secondary (Golden Saffron):** `oklch(85% 0.18 85)` - For high-visibility CTA buttons and highlights.
- **Accent (Deep Teal/Green):** `oklch(40% 0.12 170)` - For organic certifications and footer accents.
- **Surface:** `oklch(98% 0.01 80)` - A warm cream background to keep it looking fresh and organic.

### Typography
- **Headings:** Bold, editorial serif (e.g., *Cormorant Garamond*) to convey the "Dynasty" feel.
- **Body:** Hyper-readable sans-serif (*Plus Jakarta Sans*) for a clean, modern tech feel.

## 3. Interaction Design & UX Strategy
The site will be built using the **Doherty Threshold** principle, ensuring all interactions feel instantaneous (<400ms).

- **Hero Interaction:** A GSAP-powered "Exploding Spice" animation when the user scrolls, where spice particles form the "RasaVansa" logo.
- **Hick’s Law Implementation:** Instead of a massive list, use a "3-Step Quick Order" flow on the home page.
- **Fitts’s Law:** Massive, thumb-friendly "Add to Cart" buttons for the mobile-first Sri Lankan audience.

## 4. Proposed Site Structure (4 Core Pages)



1. **Home Page (The Experience):**
   - Interactive hero section with a video background of spice grinding.
   - "Top 3 Picks" bento-grid layout.
   - Real-time customer testimonial ticker.
2. **Shop (The Spice Market):**
   - High-fidelity product cards with hover-zoom effects.
   - Tailwind-powered dynamic filters (Price, Weight, Heat Level).
   - "Quick Add" functionality to reduce friction.
3. **Our Story (Heritage):**
   - A parallax scroll journey showing the spices coming from local farmers.
   - Focus on "Swadeshiya" (Local) pride.
4. **Checkout/Contact:**
   - Single-page checkout optimized for local mobile wallets and cash-on-delivery options.
   - WhatsApp floating button for instant local support.

## 5. Technical Stack (Modern Framework)
- **Frontend:** Next.js 15 (App Router).
- **Styling:** Tailwind CSS v4 (using the new JIT engine for ultra-fast performance).
- **Animations:** GSAP (GreenSock) for scroll-triggered magic.
- **Accessibility:** Full WCAG 2.2 AA compliance to ensure every Sri Lankan can use the site easily.

## 6. Interactive Features
- **Spice Intensity Slider:** An interactive slider that changes the UI color from yellow (Turmeric) to deep red (Chili) based on what the user is browsing.
- **Micro-interactions:** Subtle haptic-like animations on button clicks using Framer Motion.
- **Localized Copy:** Professional English headers with "Singlish" micro-copy for better local engagement (e.g., "Gedaratama Gennaganna").
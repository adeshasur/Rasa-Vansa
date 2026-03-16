import Link from "next/link";
import { Instagram, Facebook, Twitter, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-lion-maroon-d text-surface-ivory/60 py-24 border-t border-surface-ivory/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          
          {/* Brand Col */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-12 h-12 bg-golden-saffron rounded-full flex items-center justify-center text-lion-maroon font-bold text-2xl">
                R
              </div>
              <span className="font-serif text-3xl font-bold tracking-tight text-surface-ivory">
                RasaVansa
              </span>
            </Link>
            <p className="font-sans text-sm leading-relaxed max-w-xs italic">
              Cultivating the finest spices of the island since the dawn of the traditional trade. A testament to pure Sri Lankan heritage.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <Link href="#" className="p-2 border border-surface-ivory/10 rounded-full hover:bg-golden-saffron hover:text-lion-maroon transition-all">
                <Instagram size={18} />
              </Link>
              <Link href="#" className="p-2 border border-surface-ivory/10 rounded-full hover:bg-golden-saffron hover:text-lion-maroon transition-all">
                <Facebook size={18} />
              </Link>
              <Link href="#" className="p-2 border border-surface-ivory/10 rounded-full hover:bg-golden-saffron hover:text-lion-maroon transition-all">
                <Twitter size={18} />
              </Link>
            </div>
          </div>

          {/* Nav Col */}
          <div className="flex flex-col gap-6">
            <h4 className="font-serif text-xl font-bold text-surface-ivory">Experience</h4>
            <nav className="flex flex-col gap-4 font-sans text-sm font-medium">
              <Link href="#origin" className="hover:text-golden-saffron transition-colors">Our Origin</Link>
              <Link href="#collection" className="hover:text-golden-saffron transition-colors">The Collection</Link>
              <Link href="#heritage" className="hover:text-golden-saffron transition-colors">Heritage Story</Link>
              <Link href="#" className="hover:text-golden-saffron transition-colors">Wholesale Inquiry</Link>
            </nav>
          </div>

          {/* Contact Col */}
          <div className="flex flex-col gap-6">
            <h4 className="font-serif text-xl font-bold text-surface-ivory">Contact</h4>
            <div className="flex flex-col gap-6 font-sans text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-golden-saffron shrink-0" />
                <span>Spice Gardens Road, <br /> Matale, Sri Lanka</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-golden-saffron shrink-0" />
                <span>+94 11 234 5678</span>
              </div>
            </div>
          </div>

          {/* Newsletter / CTA Col */}
          <div className="flex flex-col gap-6">
            <h4 className="font-serif text-xl font-bold text-surface-ivory">Stay Connected</h4>
            <p className="font-sans text-sm">Join the dynasty to receive seasonal spice updates and royal recipes.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email Address"
                className="w-full bg-surface-ivory/5 border border-surface-ivory/10 rounded-full py-4 px-6 font-sans text-xs focus:outline-none focus:border-golden-saffron transition-colors"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-golden-saffron text-lion-maroon px-6 rounded-full font-sans font-extrabold text-[10px] uppercase tracking-widest">
                Join
              </button>
            </div>
          </div>

        </div>

        <div className="mt-24 pt-8 border-t border-surface-ivory/5 flex flex-col md:flex-row items-center justify-between gap-6 font-sans text-[10px] uppercase tracking-widest font-bold">
          <p>© 2026 RasaVansa (The Spice Dynasty). All Rights Reserved.</p>
          <div className="flex items-center gap-8">
            <Link href="#" className="hover:text-golden-saffron transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-golden-saffron transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

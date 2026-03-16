import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Collection from "@/components/Collection";
import Heritage from "@/components/Heritage";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative bg-surface-ivory min-h-screen">
        <Navbar />
        <Hero />
        <Collection />
        <Heritage />
        <Footer />
      </main>
    </SmoothScroll>
  );
}

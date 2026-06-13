// LandingPage.tsximport Navbar from "./components/Navbar";

import Hero from "./landing/sections/Hero";
import ProblemsSection from "./landing/sections/Problem";

// import Features from "./sections/Features";
// import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <main className="relative">
      <BackgroundVideo />

      <Hero />
      <ProblemsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
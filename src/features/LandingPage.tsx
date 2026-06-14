// LandingPage.tsximport Navbar from "./components/Navbar";

import BackgroundVideo from "@/components/BackgroundVideo";
import Hero from "./landing/sections/Hero";
import ProblemsSection from "./landing/sections/Problem";
import FeaturesSection from "./landing/sections/Features";
import HowItWorksSection from "./landing/sections/HowItWorks";
import CTASection from "./landing/sections/CTA";
import TestimonialsSection from "./landing/sections/Testimonials";
import FAQSection from "./landing/sections/FAQ";

// import Features from "./sections/Features";
// import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <>
      <BackgroundVideo />

      <Hero />
      <ProblemsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
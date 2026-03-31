import Navbar from "@/components/marketing/Navbar";
import Hero from "@/components/marketing/Hero";
import StatsBar from "@/components/marketing/StatsBar";
import TrustBar from "@/components/marketing/TrustBar";
import Comparison from "@/components/marketing/Comparison";
import Services from "@/components/marketing/Services";
import BeforeAfter from "@/components/marketing/BeforeAfter";
import ProjectsCarousel from "@/components/marketing/ProjectsCarousel";
import HowWeWork from "@/components/marketing/HowWeWork";
import Pricing from "@/components/marketing/Pricing";
import Testimonials from "@/components/marketing/Testimonials";
import FAQ from "@/components/marketing/FAQ";
import Contact from "@/components/marketing/Contact";
import CTABanner from "@/components/marketing/CTABanner";
import AffiliateSection from "@/components/marketing/AffiliateSection";
import Footer from "@/components/marketing/Footer";
import ProgressBar from "@/components/ProgressBar";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <ProgressBar />
      <ScrollReveal />
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <TrustBar />
        <Comparison />
        <Services />
        <BeforeAfter />
        <ProjectsCarousel />
        <HowWeWork />
        <Pricing />
        <Testimonials />
        <FAQ />
        <Contact />
        <CTABanner />
        <AffiliateSection />
      </main>
      <Footer />
    </>
  );
}

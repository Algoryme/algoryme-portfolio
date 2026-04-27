import Navbar from "@/components/Navbar/HomeNavbar/navbar";
import TrustedBy from "@/components/TrustedBy/TrustedBy";
import { HeroSection } from "@/components/Hero/hero-section";
import Projects from "@/components/Projects/Projects";
import Pricing from "@/components/Pricing/Pricing";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";
export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection src="/image.png" />
      <TrustedBy />
      <Projects />
      <Pricing />
      <Contact />
      <Footer />
    </>
  );
}

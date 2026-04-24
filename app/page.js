import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import ProcessBanner from "@/components/Marquee";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main className="relative">
      <Hero />
      <About />
      <Projects />
      <ProcessBanner />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}

import Hero from "../components/Hero"
import About from "../components/About"
import Projects from "../components/Projects"
import Marquee from "../components/Marquee"
import Skills from "../components/Skills"

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

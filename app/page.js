import Hero from "../components/Hero"
import About from "../components/About"
import Projects from "../components/Projects"
import Marquee from "../components/Marquee"
import Skills from "../components/Skills"
import ProcessBanner from "../components/ProcessBanner"
import Contact from "../components/Contact"
import Footer from "../components/Footer"

export default function Page() {
  return (
    <main className="relative">
      {/* force update*/}
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}

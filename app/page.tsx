import HUDBackground from "@/components/HUDBackgroundDynamic";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <HUDBackground />
      <Nav />
      <main>
        <Hero />
        <Services />
        <About />
        <FAQ />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

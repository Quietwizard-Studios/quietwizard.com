import HUDBackground from "@/components/HUDBackgroundDynamic";
import Nav from "@/components/Nav";
import About from "@/components/About";
import Footer from "@/components/Footer";

export const metadata = { title: "About — QuietWizard Studios" };

export default function AboutPage() {
  return (
    <>
      <HUDBackground />
      <Nav />
      <main className="pt-16">
        <About />
        <Footer />
      </main>
    </>
  );
}

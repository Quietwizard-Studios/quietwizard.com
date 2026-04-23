import HUDBackground from "@/components/HUDBackgroundDynamic";
import Nav from "@/components/Nav";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata = { title: "Services — QuietWizard Studios" };

export default function ServicesPage() {
  return (
    <>
      <HUDBackground />
      <Nav />
      <main className="pt-16">
        <Services />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

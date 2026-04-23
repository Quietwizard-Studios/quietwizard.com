import HUDBackground from "@/components/HUDBackgroundDynamic";
import Nav from "@/components/Nav";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata = { title: "Contact — QuietWizard Studios" };

export default function ContactPage() {
  return (
    <>
      <HUDBackground />
      <Nav />
      <main className="pt-16">
        <Contact />
        <Footer />
      </main>
    </>
  );
}

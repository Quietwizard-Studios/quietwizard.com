import HUDBackground from "@/components/HUDBackgroundDynamic";
import Nav from "@/components/Nav";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export const metadata = { title: "FAQ — QuietWizard Studios" };

export default function FAQPage() {
  return (
    <>
      <HUDBackground />
      <Nav />
      <main className="pt-16">
        <FAQ />
        <Footer />
      </main>
    </>
  );
}

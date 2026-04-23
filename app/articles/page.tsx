import HUDBackground from "@/components/HUDBackgroundDynamic";
import Nav from "@/components/Nav";
import Articles from "@/components/Articles";
import Footer from "@/components/Footer";

export const metadata = { title: "Articles — QuietWizard Studios" };

export default function ArticlesPage() {
  return (
    <>
      <HUDBackground />
      <Nav />
      <main>
        <Articles />
        <Footer />
      </main>
    </>
  );
}

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FieldsExplorer from "@/components/FieldsExplorer";
import StatsSection from "@/components/StatsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <FieldsExplorer />
        <StatsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

import { BrowserRouter } from "react-router-dom";
import HeroSection from "@/pages/LandingPage/HeroSection";
import Navbar from "@/components/navbar/navbar";
import AboutSection from "@/pages/LandingPage/AboutSection";
import HowItWorksSection from "@/pages/LandingPage/HowItWorksSection";
import FAQSection from "@/pages/LandingPage/FAQSection";
import Footer from "@/components/footer/footer";

function App() {
  return (
    <BrowserRouter>
      <main className="min-h-screen">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <HowItWorksSection />
        <FAQSection />
        <Footer />
      </main>
    </BrowserRouter>
  );
}

export default App;

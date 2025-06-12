import { BrowserRouter } from "react-router-dom";
import HeroSection from "@/pages/LandingPage/HeroSection";
import Navbar from "@/components/navbar/navbar";
import AboutSection from "@/pages/LandingPage/AboutSection";
import HowItWorksSection from "@/pages/LandingPage/HowItWorksSection";

function App() {
  return (
    <BrowserRouter>
      <main className="min-h-screen">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <HowItWorksSection />
      </main>
    </BrowserRouter>
  );
}

export default App;
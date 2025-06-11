import { BrowserRouter } from "react-router-dom";
import HeroSection from "@/pages/HeroSection";
import Navbar from "@/components/navbar/navbar";

function App() {
  return (
    <BrowserRouter>
      <main className="min-h-screen">
        <Navbar />
        <HeroSection />
      </main>
    </BrowserRouter>
  );
}

export default App;

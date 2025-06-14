import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import HeroSection from "@/pages/LandingPage/HeroSection";
import Navbar from "@/components/navbar/navbar";
import AboutSection from "@/pages/LandingPage/AboutSection";
import HowItWorksSection from "@/pages/LandingPage/HowItWorksSection";
import FAQSection from "@/pages/LandingPage/FAQSection";
import Footer from "@/components/footer/footer";
import GetStarted from "@/pages/Auth/GetStarted";
import RestaurantSignUp from "@/pages/Auth/SignUp/restaurant";
import RestaurantLogin from "@/pages/Auth/SignIn/restaurant";
import OTP from "@/pages/Auth/OTP/restaurant";
import PricingPage from "@/pages/PricingPage";

const AppContent = () => {
  const location = useLocation();
  const showNavbar = !location.pathname.startsWith("/auth/") && location.pathname !== "/pricing";

  return (
    <main className="min-h-screen">
      {showNavbar && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <AboutSection />
              <HowItWorksSection />
              <FAQSection />
              <Footer />
            </>
          }
        />
        <Route path="/auth/get-started" element={<GetStarted />} />
        <Route path="/auth/signup/restaurant" element={<RestaurantSignUp />} />
        <Route path="/auth/login/restaurant" element={<RestaurantLogin />} />
        <Route path="/auth/otp/restaurant" element={<OTP />} />
        <Route path="/pricing" element={<PricingPage />} />
      </Routes>
    </main>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
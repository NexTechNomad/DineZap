import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full py-1 px-4 md:px-12 flex items-center justify-between fixed top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-white"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="/logos/logo.png"
            alt="DineZap Logo"
            className="h-10 w-10 md:h-14 md:w-14"
          />
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? (
          <X className="h-6 w-6 text-gray-700" />
        ) : (
          <Menu className="h-6 w-6 text-gray-700" />
        )}
      </button>

      {/* Navigation Links - Desktop */}
      <div className="hidden md:flex items-center space-x-8 lg:space-x-12 py-4 uppercase">
        <Link
          to="/#home"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("home")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="text-gray-700 hover:text-main-purple transition-colors px-3 py-2 rounded-lg text-sm lg:text-base"
        >
          Home
        </Link>
        <Link
          to="/#about"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("about")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="text-gray-700 hover:text-main-purple transition-colors px-3 py-2 rounded-lg text-sm lg:text-base"
        >
          About
        </Link>
        <Link
          to="/#how-to-use"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("how-to-use")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="text-gray-700 hover:text-main-purple transition-colors px-3 py-2 rounded-lg text-sm lg:text-base"
        >
          How To Use
        </Link>
        <Link
          to="/#faq"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("faq")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="text-gray-700 hover:text-main-purple transition-colors px-3 py-2 rounded-lg text-sm lg:text-base"
        >
          FAQ
        </Link>
      </div>

      {/* Auth Buttons - Desktop */}
      <div className="hidden md:flex items-center space-x-4">
        <Button
          variant="ghost"
          className="border-none hover:bg-transparent hover:text-main-purple text-sm lg:text-base"
        >
          Login
        </Button>
        <Button className="bg-main-darkPurple text-white hover:bg-main-darkPurple/70 text-sm lg:text-base">
          Sign up
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white/80 backdrop-blur-md shadow-lg md:hidden py-4 px-6 border-t border-gray-100/20">
          <div className="flex flex-col space-y-4">
            <Link
              to="/#home"
              className="text-gray-700 hover:text-main-purple transition-colors py-2"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("home")
                  ?.scrollIntoView({ behavior: "smooth" });
                setIsMenuOpen(false);
              }}
            >
              Home
            </Link>
            <Link
              to="/#about"
              className="text-gray-700 hover:text-main-purple transition-colors py-2"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" });
                setIsMenuOpen(false);
              }}
            >
              About
            </Link>
            <Link
              to="/#how-to-use"
              className="text-gray-700 hover:text-main-purple transition-colors py-2"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("how-to-use")
                  ?.scrollIntoView({ behavior: "smooth" });
                setIsMenuOpen(false);
              }}
            >
              How To Use
            </Link>
            <Link
              to="/#faq"
              className="text-gray-700 hover:text-main-purple transition-colors py-2"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("faq")
                  ?.scrollIntoView({ behavior: "smooth" });
                setIsMenuOpen(false);
              }}
            >
              FAQ
            </Link>
            <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200/20">
              <Button
                variant="ghost"
                className="border-none hover:bg-white/50 w-full justify-center"
              >
                Login
              </Button>
              <Button className="bg-main-darkPurple text-white hover:bg-main-darkPurple/70 w-full justify-center">
                Sign up
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

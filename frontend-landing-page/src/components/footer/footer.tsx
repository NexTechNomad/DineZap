import { Link } from "react-router-dom";
import { Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="flex flex-col space-y-4">
            <div>
              <img src="/logos/logo.png" alt="Logo" className="w-16 h-16" />
            </div>
            <div className="flex items-center space-x-2">
              <span>+234 901 483 9655</span>
            </div>
            <div>
              <a
                href="mailto:support@lift.agency"
                className="text-gray-600 hover:text-purple-600"
              >
                contact@dinezap.services
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/#home"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("home")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-gray-600 hover:text-purple-600"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/#about"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("about")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-gray-600 hover:text-purple-600"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/#how-to-use"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("how-to-use")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-gray-600 hover:text-purple-600"
                >
                  How To Use
                </Link>
              </li>
              <li>
                <Link
                  to="/#faq"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("faq")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-gray-600 hover:text-purple-600"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Subscribe Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Get product updates"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-main-darkPurple/60"
              />
              <button
                className="bg-main-darkPurple/90 text-white px-6 py-2 rounded-r hover:bg-main-darkPurple/70 transition duration-200"
                type="button"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-main-purple/60"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-main-purple/60"
            >
              <Twitter className="w-6 h-6" />
            </a>
          </div>
          <p>© 2025 DineZap. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

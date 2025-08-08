import {
  Calendar,
  ChevronUp,
  Church,
  ExternalLink,
  Heart,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

function Footer() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
    } else {
      // Check system preference
      setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.05),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(251,191,36,0.03),transparent_50%)]"></div>

      <div className="container mx-auto px-4 md:px-6 relative">
        {/* Main footer content */}
        <div className="py-16">
          <div className="grid gap-12 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
            {/* Brand section */}
            <div className="lg:col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`p-2 rounded-lg ${
                    isDark ? "bg-yellow-500/10" : "bg-yellow-500/20"
                  }`}
                >
                  <Heart className="h-8 w-8 text-yellow-500" />
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                    CANA Circuit
                  </span>
                  <p
                    className={`text-xs mt-1 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Since 1948
                  </p>
                </div>
              </div>
              <p
                className={`text-base leading-relaxed mb-6 max-w-sm ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                A vibrant community of faith where hearts are transformed, lives
                are renewed, and spiritual growth flourishes through worship and
                fellowship.
              </p>

              {/* Quick contact highlight */}
              <div
                className={`relative p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300
        ${isDark ? "bg-gray-800/50 border-gray-700/50" : "bg-white/50 border-amber-200/50 shadow-lg"}
        group hover:shadow-xl hover:scale-[1.02]`}
              >
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl opacity-10" />
                <div className="absolute top-3 left-3 h-3 w-3 bg-yellow-400 rounded-full animate-pulse" />

                <div className="flex items-center gap-2 mb-2">
                  <Church
                    className={`h-4 w-4 ${isDark ? "text-amber-400" : "text-yellow-600"}`}
                  />
                  <p
                    className={`text-sm font-medium tracking-wide ${isDark ? "text-amber-400" : "text-yellow-600"}`}
                  >
                    Join us for worship
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar
                    className={`h-5 w-5 ${isDark ? "text-white" : "text-gray-900"}`}
                  />
                  <p
                    className={`text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    Sundays at 9:00 AM
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3
                className={`text-lg font-semibold mb-6 relative ${
                  isDark ? "text-white" : "text-gray-800"
                }`}
              >
                Quick Links
                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-yellow-500"></div>
              </h3>
              <ul className="space-y-3">
                {[
                  { href: "#home", label: "Home" },
                  { href: "#testimonials", label: "Testimonials" },
                  { href: "#about", label: "About Us" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`transition-all duration-300 flex items-center gap-2 group ${
                        isDark
                          ? "text-gray-300 hover:text-yellow-400"
                          : "text-gray-600 hover:text-yellow-600"
                      }`}
                    >
                      <span
                        className={`w-1 h-1 rounded-full transition-colors ${
                          isDark
                            ? "bg-gray-500 group-hover:bg-yellow-400"
                            : "bg-gray-400 group-hover:bg-yellow-600"
                        }`}
                      ></span>
                      {link.label}
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ministries */}
            <div>
              <h3
                className={`text-lg font-semibold mb-6 relative ${
                  isDark ? "text-white" : "text-gray-800"
                }`}
              >
                Ministries
                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-yellow-500"></div>
              </h3>
              <ul className="space-y-3">
                {[
                  "Children's Ministry",
                  "Youth Group",
                  "Adult Bible Study",
                  "Community Outreach",
                ].map((ministry) => (
                  <li
                    key={ministry}
                    className={`flex items-center gap-2 transition-all duration-300 group ${
                      isDark
                        ? "text-gray-300 hover:text-yellow-400"
                        : "text-gray-600 hover:text-yellow-600"
                    }`}
                  >
                    <span
                      className={`w-1 h-1 rounded-full transition-colors ${
                        isDark
                          ? "bg-gray-500 group-hover:bg-yellow-400"
                          : "bg-gray-400 group-hover:bg-yellow-600"
                      }`}
                    ></span>
                    {ministry}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3
                className={`text-lg font-semibold mb-6 relative ${
                  isDark ? "text-white" : "text-gray-800"
                }`}
              >
                Get In Touch
                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-yellow-500"></div>
              </h3>
              <ul className="space-y-4">
                <li>
                  <div
                    className={`flex items-start gap-3 p-3 rounded-lg transition-colors group ${
                      isDark ? "hover:bg-gray-800/30" : "hover:bg-white/40"
                    }`}
                  >
                    <div
                      className={`p-1.5 rounded-md transition-colors ${
                        isDark
                          ? "bg-yellow-500/10 group-hover:bg-yellow-500/20"
                          : "bg-yellow-500/20 group-hover:bg-yellow-500/30"
                      }`}
                    >
                      <MapPin className="h-4 w-4 text-yellow-500" />
                    </div>
                    <div>
                      <p
                        className={`text-sm leading-relaxed ${
                          isDark ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        San Juan Day, San Jose
                        <br />
                        San Joaquin, San Rafael
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <Link
                    href="tel:+639555555"
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors group ${
                      isDark ? "hover:bg-gray-800/30" : "hover:bg-white/40"
                    }`}
                  >
                    <div
                      className={`p-1.5 rounded-md transition-colors ${
                        isDark
                          ? "bg-yellow-500/10 group-hover:bg-yellow-500/20"
                          : "bg-yellow-500/20 group-hover:bg-yellow-500/30"
                      }`}
                    >
                      <Phone className="h-4 w-4 text-yellow-500" />
                    </div>
                    <span
                      className={`transition-colors ${
                        isDark
                          ? "text-gray-300 group-hover:text-white"
                          : "text-gray-700 group-hover:text-gray-900"
                      }`}
                    >
                      (63) 95555555
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="mailto:pogi@gmail.com"
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors group ${
                      isDark ? "hover:bg-gray-800/30" : "hover:bg-white/40"
                    }`}
                  >
                    <div
                      className={`p-1.5 rounded-md transition-colors ${
                        isDark
                          ? "bg-yellow-500/10 group-hover:bg-yellow-500/20"
                          : "bg-yellow-500/20 group-hover:bg-yellow-500/30"
                      }`}
                    >
                      <Mail className="h-4 w-4 text-yellow-500" />
                    </div>
                    <span
                      className={`transition-colors ${
                        isDark
                          ? "text-gray-300 group-hover:text-white"
                          : "text-gray-700 group-hover:text-gray-900"
                      }`}
                    >
                      pogi@gmail.com
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="py-8 border-t border-gray-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} CANA Circuit. All rights
                reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Built with faith and community in mind
              </p>
            </div>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 rounded-lg transition-all duration-300 hover:scale-105 group"
              aria-label="Back to top"
            >
              <span className="text-sm font-medium">Back to top</span>
              <ChevronUp className="h-4 w-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

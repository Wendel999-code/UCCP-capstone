import { Heart, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="h-6 w-6 text-yellow-500" />
              <span className="text-xl font-bold">Grace Church</span>
            </div>
            <p className="text-gray-400 text-sm">
              A place of worship, community, and spiritual growth since 1985.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#about"
                  className="text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="#events"
                  className="text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Ministries</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  Children's Ministry
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  Youth Group
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  Adult Bible Study
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  Outreach
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-yellow-500" />
                <span className="text-gray-400">
                  123 Faith Avenue, Hopeville, CA 90210
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-yellow-500" />
                <span className="text-gray-400">(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-yellow-500" />
                <span className="text-gray-400">info@gracechurch.org</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Grace Church. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

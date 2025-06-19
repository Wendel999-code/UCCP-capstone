"use client";

import Header from "./landing/Header";
import Hero from "./landing/Hero";
// import WelcomeMessage from "./landing/WelcomeMessage";
import About from "./landing/About";
import Services from "./landing/Services";
import Event from "./landing/Event";
import Testimonials from "./landing/Testimonials";
import Contact from "./landing/Contact";
import NewsLetter from "./landing/NewsLetter";
import Footer from "./landing/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Welcome Message */}
        {/* <WelcomeMessage /> */}

        {/* About Section */}
        <About />

        {/* Services Section */}
        <Services />

        {/* Events Section */}
        <Event />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Contact Section */}
        <Contact />

        {/* Newsletter Section */}
        <NewsLetter />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

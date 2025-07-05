"use client";

import About from "./landing/About";
import Footer from "./landing/Footer";
import Header from "./landing/Header";
import Hero from "./landing/Hero";
import Testimonials from "./landing/Testimonials";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}

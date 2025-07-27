"use client";

import LogoLoader from "@/components/LogoLoader";
import { LogVisitor } from "@/lib/supabase/actions/visit";
import { useEffect } from "react";
import { useRedirectIfAuthenticated } from "./hooks/useRedirectIfAuthenticated";
import About from "./landing/About";
import Footer from "./landing/Footer";
import Header from "./landing/Header";
import Hero from "./landing/Hero";
import Testimonials from "./landing/Testimonials";

export default function Home() {
  const { loading, user } = useRedirectIfAuthenticated();

  useEffect(() => {
    LogVisitor();
  }, []);

  if (loading || user) {
    return <LogoLoader />;
  }

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

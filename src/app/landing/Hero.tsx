"use client";

import { Button } from "@/components/ui/button";

function Hero() {
  return (
    <section className="w-full py-16 bg-background">
      <div className="container mx-auto px-6 flex flex-col items-center gap-12 text-center">
        {/* Title & Description */}
        <div className="flex flex-col justify-center items-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              <span className="text-red-900">CANA</span>{" "}
              <span className="text-amber-500">Circuit</span>
            </h1>
            <p className="text-xl text-red-600 font-semibold italic">
              "Turning Water Into Wine"
            </p>
            <p className="max-w-[600px] text-gray-700 md:text-lg">
              Join us in our spiritual journey as we transform lives through
              faith, fellowship, and the power of God's word. Experience the
              miracle of transformation in your own life.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 min-[400px]:flex-row justify-center">
            <Button
              size="lg"
              className="bg-red-900 hover:bg-red-800 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Join Our Circuit
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white px-8 py-3 text-lg font-semibold transition-all duration-300"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Location Tags */}
        <div className="flex flex-wrap gap-2 justify-center pt-8">
          {[
            "Palanit",
            "San Juan",
            "Salvacion",
            "Alegria",
            "San Isidro",
            "Victoria",
            "Allen",
            "Lipata",
            "Cabacungan",
          ].map((location) => (
            <span
              key={location}
              className="px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-full border border-red-200 hover:bg-red-200 transition-colors duration-200"
            >
              {location}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;

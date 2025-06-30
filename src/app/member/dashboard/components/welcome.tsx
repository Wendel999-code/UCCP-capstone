"use client";

import { Button } from "@/components/ui/button";
import { Heart, Send } from "lucide-react";
import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

const Welcome = () => {
  const [testimonial, setTestimonial] = useState("");
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: "Maria Lopez",
      message:
        "God has been faithful in providing for my family this month. Praise God for His provision!",
      verse: "Philippians 4:19",
    },
    {
      id: 2,
      name: "John Smith",
      message:
        "Thankful for the peace that surpasses understanding even in difficult times.",
      verse: "Philippians 4:7",
    },
    {
      id: 3,
      name: "John Smith",
      message:
        "Thankful for the peace that surpasses understanding even in difficult times.",
      verse: "Philippians 4:7",
    },
    {
      id: 4,
      name: "John Smith",
      message:
        "Thankful for the peace that surpassases understanding even in difficult times.",
      verse: "Philippians 4:7",
    },
    {
      id: 5,
      name: "John Smith",
      message:
        "Thankful for the peace that surpasses understanding even in difficult times.",
      verse: "Philippians 4:7",
    },
    {
      id: 6,
      name: "John Smith",
      message:
        "Thankful for the peace that surpasses understanding even in difficult times.",
      verse: "Philippians 4:7",
    },
  ]);

  const handlePost = () => {
    if (!testimonial.trim()) return;
    const newTestimonial = {
      id: Date.now(),
      name: "Wendel Johnson", // Replace with dynamic user name
      message: testimonial.trim(),
      verse: "",
    };
    setTestimonials([newTestimonial, ...testimonials]);
    setTestimonial("");
  };

  return (
    <div className="flex flex-col max-w-2xl mx-auto   gap-6">
      {/* Create Testimonial Box */}
      <Card>
        <CardContent className="p-1">
          <div className="flex items-start gap-3 ">
            <Image
              src="/uccp.jpg"
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full h-10 w-10 object-cover"
            />
            <div className="flex-1 flex flex-col gap-2">
              <Textarea
                placeholder="Share your testimony or thanksgiving..."
                value={testimonial}
                onChange={(e) => setTestimonial(e.target.value)}
                className="resize-none min-h-[80px] text-[10px] md:text-sm"
              />
              <div className="flex justify-end">
                <Button
                  onClick={handlePost}
                  size="sm"
                  className="bg-yellow-700 cursor-pointer hover:bg-yellow-600 text-white flex items-center gap-1"
                >
                  <Send className="h-4 w-4" />
                  Post Testimonial
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Testimonial Feeds */}
      <div className="flex flex-col gap-4">
        {testimonials.map((t) => (
          <Card key={t.id}>
            <CardContent className="p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-yellow-600" />
                <h4 className="font-semibold text-yellow-900">{t.name}</h4>
              </div>
              <p className="text-sm text-gray-700">{t.message}</p>
              {t.verse && (
                <p className="text-xs text-muted-foreground italic">
                  {t.verse}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Welcome;

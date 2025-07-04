"use client";

import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useState } from "react";

import { useGetTestimonial } from "@/app/hooks/testimonial";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { PostTestimonial } from "@/lib/supabase/actions/testimonial";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { toast } from "react-toastify";
import TestimonialFeed from "./TestimonialFeed";

const Welcome = () => {
  const [testimonial, setTestimonial] = useState("");
  const queryClient = useQueryClient();

  const { data: testimonialData, isLoading } = useGetTestimonial();

  const [isPosting, setIsPosting] = useState(false);
  const handlePost = async () => {
    if (!testimonial.trim()) return;
    setIsPosting(true);
    try {
      const res = await PostTestimonial(testimonial);
      if (!res.success) {
        toast.error(res.message);
      }

      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ["get-testimonial"] });
        toast.success(res.message);
        setTestimonial("");
      }
    } catch (error) {
      console.log("error in post testimonial", error);
    } finally {
      setIsPosting(false);
    }
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
                  {isPosting ? "Posting..." : "Post"}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Testimonial Feeds */}
      <TestimonialFeed
        testimonial={testimonialData || []}
        loading={isLoading}
      />
    </div>
  );
};

export default Welcome;

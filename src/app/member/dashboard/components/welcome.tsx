"use client";

import { useGetTestimonial } from "@/app/hooks/testimonial";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { PostTestimonialV2 } from "@/lib/supabase/actions/testimonialV2";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Loader, Send, Sparkles } from "lucide-react";
import { useState } from "react";
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
      const res = await PostTestimonialV2(testimonial);
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
    <div className="flex flex-col max-w-2xl mx-auto gap-6">
      {/* Header */}
      <motion.div
        className="text-center mb-2 mt-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="h-6 w-6 text-amber-600" />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-500  bg-clip-text text-transparent">
            Testimonials & Thanksgiving
          </h2>
          <Sparkles className="h-6 w-6 text-amber-600" />
        </div>
      </motion.div>

      {/* Create Testimonial Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Card className="bg-gradient-to-br from-white via-amber-50/40 to-orange-50/30 dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-900 border border-amber-200/30 dark:border-amber-800/30 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-2">
            <div className="flex items-start gap-4">
              <div className="flex-1 flex flex-col gap-2">
                <Textarea
                  placeholder="Share your testimony or thanksgiving..."
                  value={testimonial}
                  onChange={(e) => setTestimonial(e.target.value)}
                  className="resize-none placeholder:text-[12px] min-h-[100px] text-sm bg-white/50 dark:bg-gray-800/50 border-amber-200/50 dark:border-amber-800/50 focus:border-amber-400 dark:focus:border-amber-600 transition-colors"
                />
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-gray-500 dark:text-gray-400">
                    {testimonial.length}/500 characters
                  </span>
                  <Button
                    disabled={isPosting || !testimonial.trim()}
                    onClick={handlePost}
                    size="sm"
                    className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPosting ? (
                      <>
                        <Loader className="h-4 w-4 animate-spin mr-2" />
                        Sharing...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Share
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Separator className="bg-gradient-to-r from-transparent via-amber-200 dark:via-amber-800 to-transparent" />

      {/* Testimonial Feeds */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <TestimonialFeed
          testimonial={testimonialData || []}
          loading={isLoading}
        />
      </motion.div>
    </div>
  );
};

export default Welcome;

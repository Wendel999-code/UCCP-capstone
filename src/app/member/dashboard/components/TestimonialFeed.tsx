"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Testimonial } from "@/global/type";
import { Heart } from "lucide-react";
import React from "react";

interface TestimonialFeedProps {
  testimonial: Testimonial[];
  loading: boolean;
}

const TestimonialFeed: React.FC<TestimonialFeedProps> = ({
  testimonial,
  loading,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {testimonial?.map((t) => (
        <Card key={t.id}>
          <CardContent className="p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-yellow-600" />
              <h4 className="font-semibold text-sm text-yellow-600">
                {loading ? <Skeleton className="h-4 w-10" /> : t.fullName}
              </h4>
            </div>
            <p className="text-sm dark:text-white font-mono">
              {" "}
              {loading ? (
                <Skeleton className="h-10 w-20" />
              ) : (
                `"${t.description}"`
              )}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TestimonialFeed;

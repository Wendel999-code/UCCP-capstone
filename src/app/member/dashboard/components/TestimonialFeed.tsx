"use client";

import { useToggleLike } from "@/app/hooks/testimonial";
import { useRedirectIfAuthenticated } from "@/app/hooks/useRedirectIfAuthenticated";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Testimonial } from "@/global/type";
import { FormattedDate } from "@/lib/utils/dateHelper";
import { Calendar, Heart } from "lucide-react";
import React from "react";

interface TestimonialFeedProps {
  testimonial: Testimonial[];
  loading: boolean;
}

const TestimonialFeed: React.FC<TestimonialFeedProps> = ({
  testimonial,
  loading,
}) => {
  const { user, loading: userLoading } = useRedirectIfAuthenticated({
    disabled: true,
  });

  const { mutate: toggleLike, isPending } = useToggleLike();

  if (loading || userLoading) {
    return (
      <div className="flex flex-col gap-4">
        {[...Array(3)].map((_, index) => (
          <Card
            key={index}
            className="bg-gradient-to-br from-white via-amber-50/30 to-orange-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-l-4 border-amber-200/40 dark:border-amber-800/40"
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!testimonial.length) {
    return (
      <div className="text-center py-12">
        <div className="bg-gradient-to-br from-white via-amber-50/30 to-orange-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border border-amber-200/30 dark:border-amber-800/30 rounded-lg p-8">
          <Heart className="h-12 w-12 text-amber-400 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
            No testimonials yet
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Be the first to share your testimony or thanksgiving!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {testimonial?.map((t) => {
        const likedByUser = !!t.liked_user?.includes(user?.id ?? "");
        const likesCount = t.liked_user?.length ?? 0;
        return (
          <Card
            key={t.id}
            className="group bg-gradient-to-br from-white via-amber-50/30 to-orange-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-l-4 border-amber-200/40 dark:border-amber-800/40 hover:border-amber-400 dark:hover:border-amber-600 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
          >
            <CardContent>
              <div className="flex  items-start gap-4">
                {/* Avatar */}
                {/* <div className="relative self-start">
                <div className="h-9 w-9 md:w-12 md:h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <User2Icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 shadow-sm"></div>
              </div> */}

                {/* Content Block */}
                <div className="flex-1 min-w-0">
                  {/* Name */}
                  <div className="mb-2">
                    <h4 className="font-semibold text-xs md:text-md text-amber-700 dark:text-amber-300 group-hover:text-amber-800 dark:group-hover:text-amber-200 transition-colors">
                      {t.fullName}
                    </h4>
                  </div>

                  {/* Testimony Content */}
                  <div className="relative pt-4 min-w-[280px]">
                    <div className="absolute top-0 left-0 text-4xl text-amber-300 dark:text-amber-700 opacity-30 leading-none font-serif">
                      "
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed pl-6 pr-4 font-medium italic break-words">
                      {t.description}
                    </p>
                    <div className="absolute bottom-0 right-0 text-4xl text-amber-300 dark:text-amber-700 opacity-30 leading-none font-serif rotate-180">
                      "
                    </div>
                  </div>

                  {/* Interaction Bar */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-amber-100 dark:border-amber-900/30">
                    <div className="flex items-center gap-4">
                      <button
                        disabled={isPending}
                        onClick={() =>
                          toggleLike({
                            testimonialId: t.id,
                            isLiked: likedByUser,
                          })
                        }
                        className="flex cursor-pointer items-center gap-1 text-xs hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                      >
                        <Heart
                          className={`h-5 w-5 ${
                            likedByUser
                              ? "fill-amber-500 text-amber-500"
                              : "text-gray-500 dark:text-gray-400"
                          }`}
                        />
                        <span className="text-gray-500 dark:text-gray-400">
                          {likesCount}
                        </span>
                      </button>
                    </div>

                    <div className="flex items-center gap-1 text-[10px] text-gray-500 dark:text-gray-400 mt-1">
                      <Calendar className="h-3 w-3" />
                      <span className="">
                        {" "}
                        {FormattedDate(t?.created_at ?? "")}{" "}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default TestimonialFeed;

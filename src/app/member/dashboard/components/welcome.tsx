import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import React from "react";

const Welcome = () => {
  return (
    <div className="flex flex-col px-12 gap-12 py-8">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        {/* Welcome Text */}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl lg:text-5xl font-semibold">
            Welcome, Wendel Johnson{" "}
            <span className="bg-yellow-50 text-sm font-medium text-yellow-900 p-2 rounded-md ml-2">
              Member
            </span>
          </h1>
          <span className="text-md text-gray-600 leading-relaxed">
            "For I know the plans I have for you," declares the LORD, <br />
            "plans to prosper you and not to harm you, plans to give you hope
            and a future." <br />
            <span className="italic">- Jeremiah 29:11</span>
          </span>
        </div>

        {/* Prayer Box */}
        <div className="w-full lg:w-[300px]">
          <div className="rounded-lg border bg-yellow-50 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="h-4 w-4 text-yellow-600" />
              <h4 className="font-semibold">Daily Prayer</h4>
            </div>
            <p className="text-md  text-yellow-900">
              "May the God of hope fill you with all joy and peace as you trust
              in him."
            </p>
            <p className="text-sm text-muted-foreground mt-1">Romans 15:13</p>
            {/* <Button variant="outline" size="sm" className="mt-3 w-full">
              Prayer Requests
            </Button> */}
          </div>
        </div>
      </div>

      {/* Dummy Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="rounded-lg border p-4 shadow-sm bg-white flex flex-col gap-2"
          >
            <h3 className="text-lg font-semibold">Card Title {item}</h3>
            <p className="text-sm text-gray-500">Card description goes here.</p>
            <Button size="sm" variant="outline">
              View More
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Welcome;

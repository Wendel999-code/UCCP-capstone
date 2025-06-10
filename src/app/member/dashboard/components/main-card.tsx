import { Button } from "@/components/ui/button";
import React from "react";

const MainCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
      {/* Upcoming Events */}
      {[
        {
          title: "Sunday Worship Service",
          date: "May 26, 2025",
          time: "9:00 AM - 11:00 AM",
          location: "Main Sanctuary",
          description: "Weekly worship service with Pastor Michael",
        },
        {
          title: "Bible Study Group",
          date: "May 28, 2025",
          time: "7:00 PM - 8:30 PM",
          location: "Fellowship Hall",
          description: "Weekly Bible study on the Book of Romans",
        },
        {
          title: "Volunteer: Food Pantry",
          date: "May 30, 2025",
          time: "4:00 PM - 6:00 PM",
          location: "Community Center",
          description: "Helping distribute food to those in need",
        },
        {
          title: "Youth Group Meeting",
          date: "May 31, 2025",
          time: "6:00 PM - 8:00 PM",
          location: "Youth Room",
          description: "Fun activities and Bible lessons for teens",
        },
      ].map((event, index) => (
        <div
          key={`event-${index}`}
          className="rounded-lg border p-4 shadow-sm bg-yellow-100 flex flex-col gap-2"
        >
          <h3 className="text-lg font-semibold">{event.title}</h3>
          <p className="text-sm text-gray-500">
            {event.date} · {event.time}
          </p>
          <p className="text-sm text-gray-500">{event.location}</p>
          <p className="text-sm text-gray-600">{event.description}</p>
          <Button size="sm" variant="outline">
            View More
          </Button>
        </div>
      ))}
    </div>
  );
};

export default MainCard;

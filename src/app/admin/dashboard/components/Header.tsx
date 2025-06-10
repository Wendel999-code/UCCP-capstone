import { Button } from "@/components/ui/button";
import {  Bell, Heart } from "lucide-react";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between bg-yellow-500 text-white p-8">
      <Link href="/">
        {" "}
        <div className="flex items-center gap-1 ml-26 hover:cursor-pointer hover:text-amber-600">
          {" "}
          <Heart /> <span className="text-xl text-black font-medium">UCCP</span>
        </div>
      </Link>
      <div> </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" className="relative bg-white text-black">
          <Bell className="h-5 w-5" />
          <span className="sr-only text-red">View notifications</span>3
        </Button>
        <Button className="font-medium bg-white">Logout</Button>
      </div>
    </div>
  );
};

export default Header;

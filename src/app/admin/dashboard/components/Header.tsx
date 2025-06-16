import { ModeToggle } from "@/components/ModeToogle";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between bg-yellow-500 text-white p-2">
      <Link href="/">
        {" "}
        <div className="flex items-center gap-1 ml-26 hover:cursor-pointer ">
          <Image
            src="/assets/UCCP.jpg"
            alt="UCCP Logo"
            width={100}
            height={60}
            className="rounded-full w-full h-full"
          />
        </div>
      </Link>

      <div className="flex items-center gap-4 mr-7">
        <ModeToggle />
        <Button variant="outline" className="relative  text-black">
          <Bell className="h-5 w-5" />
          <span className=" text-red-900 text-lg font-medium">3</span>
        </Button>
        {/* <Button className="font-medium bg-white">Logout</Button> */}
      </div>
    </div>
  );
};

export default Header;

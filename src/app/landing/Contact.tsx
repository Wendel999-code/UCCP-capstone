import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";

function Contact() {
  return (
    <section id="contact" className="py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-yellow-800">
                Contact Us
              </h2>
              <p className="mt-4 text-gray-700 md:text-lg">
                We'd love to hear from you. Reach out with any questions or
                prayer requests.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-yellow-500 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-gray-700">
                    123 Faith Avenue, Hopeville, CA 90210
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-yellow-500 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-gray-700">(555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-yellow-500 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-700">info@gracechurch.org</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Service Times</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Sunday Worship:</span>
                  <span>9:00 AM & 11:00 AM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Wednesday Bible Study:</span>
                  <span>7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Youth Group:</span>
                  <span>Friday, 6:00 PM</span>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="text-xl font-bold mb-4">Send Us a Message</h3>
            <form className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="first-name"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    First name
                  </label>
                  <input
                    id="first-name"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="last-name"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Last name
                  </label>
                  <input
                    id="last-name"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="john.doe@example.com"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Your message here..."
                />
              </div>
              <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;

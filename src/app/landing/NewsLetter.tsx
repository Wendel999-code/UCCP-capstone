import { Button } from '@/components/ui/button'
import React from 'react'

function NewsLetter() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-yellow-500">
          <div className="container px-4 md:px-6 text-center">
            <div className="mx-auto max-w-[800px] space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-black">
                Stay Connected
              </h2>
              <p className="text-black md:text-lg">
                Subscribe to our newsletter to receive updates on church events,
                sermons, and community news.
              </p>
              <div className="mx-auto max-w-md space-y-4">
                <div className="flex space-x-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button className="bg-black hover:bg-gray-800 text-white">
                    Subscribe
                  </Button>
                </div>
                <p className="text-xs text-black/80">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </div>
          </div>
        </section>
  )
}

export default NewsLetter
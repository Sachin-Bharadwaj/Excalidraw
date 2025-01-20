"use client";
import { Button } from "@repo/ui/button";
import { ArrowRight, Pencil, Share2, Users2, Layers, Cloud } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <Pencil className="h-6 w-6 text-primary" />
          <span className="ml-2 text-xl font-bold">Excalidraw Clone</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button variant="ghost" size="default">
            <Link href="#features">Features</Link>
          </Button>
          <Button variant="ghost" size="default">
            <Link href="#testimonials">Testimonials</Link>
          </Button>
          <Button variant="default" size="default">
            Start Drawing
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Create Beautiful Diagrams Together
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  The simplest way to create and share diagrams. No account required - just start drawing and collaborate in real-time.
                </p>
              </div>
              <div className="space-x-4">
                <Button variant="default" size="lg" className="border rounded p-2">
                  SignUp
                  
                </Button>
                <Button variant="outline" size="lg" className="border rounded p-2">
                  SignIn
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex flex-col items-center space-y-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Share2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Real-time Collaboration</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Work together with your team in real-time, see changes instantly.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Users2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">No Account Required</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Start drawing immediately, no sign-up needed.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Layers className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Infinite Canvas</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Never run out of space with our infinite canvas.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Ready to Start Drawing?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Join thousands of users who are already creating amazing diagrams with our platform.
                </p>
              </div>
              <Button size="lg" className="mt-4">
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Excalidraw Clone. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
import React from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toogle";

export default function App() {
  return (
    <div className="min-h-screen bg-background dark:bg-[#1a202c] text-foreground dark:border-[#3f444e]">
      <nav className="bg-background dark:bg-[#1a202c] text-foreground px-6 py-4 flex justify-between items-center border-b dark:border-[#3f444e]">
        <div className="flex items-center gap-2">
          <img
            src="https://blueflag.com.au/assets/logos/blueflag-logo.svg"
            width="130"
            alt="logo"
          />
        </div>
        <ThemeToggle />
      </nav>
      <main className="flex justify-center items-center h-screen">
        <Button>Shadcn Works</Button>
      </main>
    </div>
  );
}

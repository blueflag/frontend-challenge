import React from "react";
import { Button } from "@/components/ui/button";

export default function App(): React.ReactElement {
  return (
    <div>
      <header className="bg-[#072630] text-white p-4">
        <img
          src="https://blueflag.com.au/assets/logos/blueflag-logo.svg"
          width="130"
          alt="logo"
        />
      </header>
      <main className="flex justify-center items-center h-screen">
        <Button>Shadcn Works</Button>
      </main>
    </div>
  );
}

import React from "react";
import Mainpage from "./components/Mainpage";
import { MainContextProvider } from "./components/MainContext";

export default function App(): React.ReactElement {
  return (
    <div>
      <header className="Header">
        <img
          src="https://blueflag.com.au/assets/logos/blueflag-logo.svg"
          width="130"
          alt="logo"
        />
      </header>
      <main className="Main">
        <MainContextProvider>
          <Mainpage />
        </MainContextProvider>
      </main>
    </div>
  );
}

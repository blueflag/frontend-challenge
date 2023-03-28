import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navigation from "./components/Nav";
import LearningRecords from "./pages/Records";
import Resources from "./pages/Resources";
import Users from "./pages/Users";

export default function App(): React.ReactElement {
  return (
    <Router>
      <header className="flex items-center justify-between py-4 px-8 bg-gray-800">
        <img
          className="w-32"
          src="https://blueflag.com.au/assets/logos/blueflag-logo.svg"
          alt="Logo"
        />
        <Navigation />
      </header>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/users" element={<Users />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/records" element={<LearningRecords />} />
      </Routes>
    </Router>
  );
}

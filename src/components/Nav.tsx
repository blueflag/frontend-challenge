import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path
      ? "text-blue-500"
      : "text-white hover:text-gray-300 transition-colors duration-300";
  };

  return (
    <nav className="flex items-center justify-end space-x-4">
      <Link
        className={`transition-colors duration-300 ${isActive("/users")}`}
        to="/users"
      >
        Users
      </Link>
      <Link
        className={`transition-colors duration-300 ${isActive("/resources")}`}
        to="/resources"
      >
        Resources
      </Link>
      <Link
        className={`transition-colors duration-300 ${isActive("/records")}`}
        to="/records"
      >
        Records
      </Link>
    </nav>
  );
};

export default Navigation;
